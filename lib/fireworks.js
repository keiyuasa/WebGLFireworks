// Launching Points
this.num_points=0;
this.lx=null;
this.ly=null;
this.lz=null;
var radius = 0;
var px=0;
var py=0;
var pz=0;
var svel=3.0;

function fireworks() {
	this.arr=new Array();
}

fireworks.prototype.setup_fireworks=function(num, r, x, y, z) {
	this.num_points = num;
	this.radius = r;
	px=x;
	py=y;
	pz=z;
	this.lx=new Array();
	this.ly=new Array();
	this.lz=new Array();
	for(var i=0;i<this.num_points;i++) {
		var th=Math.PI*2.0*i/this.num_points;
		var c=Math.cos(th);
		var s=Math.sin(th);
		this.lx[i]=px+this.radius*c;
		this.ly[i]=py;
		this.lz[i]=pz+this.radius*s;
		this.arr[i]=new firework();
		this.arr[i].create(this.lx[i], this.ly[i], this.lz[i]);
	}
};

// parameter looks like 
// {"spot": 0, "color": "red"}

fireworks.prototype.generate = function(param) {
	pi=param.spot;	
	var color;
	if(param.color!=null) {
		color = new RGBColor(param.color);
	} else {
		color = new RGBColor("yellow");
	}
	if(color.ok) {
	    //alert(color.r + ', ' + color.g + ', ' + color.b);
	} else {
		color = new RGBColor("yellow");
	}

	size=param.size;
	if(size==null) 
		size=3;
	var vel=param.velocity;
	if(vel==null) 
		vel = 3;
	if(this.arr[pi]!=null && this.arr[pi].isActive()) return;
	var fw=new firework();
	fw.color = color;
	fw.ssize = size;
	fw.vel = vel/10;
	fw.create(this.lx[pi], this.ly[pi], this.lz[pi]);
	this.arr[pi]=fw;
}

fireworks.prototype.proceed = function() {
	var end=true;
	for(var i=0;i<this.num_points;i++) {
		var shell=this.arr[i];
		var x=true;
		if(shell!=null) {
			x=shell.proceed();
			end &= x;
		}
	}
	return end;
}

fireworks.prototype.render_triangle_strip = function(position, color, index) {
	var num=0;
	var alive=0;
	if(this.arr[i]!=null) {
		num = this.arr[index].render_triangle_strip(position, color, num);
	}
	return num;
}

fireworks.prototype.render_points =  function(position, color, num) {
	for(var i=0;i<this.num_points;i++) {
		if(this.arr[i]!=null)
			num += this.arr[i].render_points(position, color, num);
	}
	return num;
}

function firework() {
	this.ground = null;
	this.launcher = null;
	this.shell = null;
};

var life=120;

firework.prototype.create=function (x, y, z) {
	this.start = 0;
	this.end = 30;
	this.life = life;
	this.x = x;
	this.y = y;
	this.z = z;
	this.lstart = 0;
	this.lend = 40;
	this.lvx= 0.0;
	this.lvy=-0.9;
	this.lvz= 0.0;
	this.color=colors[0];
	//this.color = new color(0xF0, 0xD0, 0x20);
	this.red=this.color.red / 256.0;
	this.green=this.color.green / 256.0;
	this.blue=this.color.blue / 256.0;
    this.ground = new groundEffect(this.start, this.end, this.life, this.x, this.y, this.z);
    this.ground.setColors(this.red, this.green, this.blue);
    this.launcher = new launcher(this.x, this.y, this.z, this.lvx, this.lvy, this.lvz, this.lstart, this.lend, this.life);
    this.sx = this.launcher.endx;
    this.sy = this.launcher.endy;
    this.sz = this.launcher.endz;
    //this.size = ssize;
    //this.vel = -this.lvy*0.2;
    this.sstart = 50;
    this.send = 90;
    this.slife = life;    
    this.shell = new shell(this.sx, this.sy, this.sz, this.ssize, this.vel, this.sstart, this.send, this.slife);
    this.shell.setColors(this.red, this.green, this.blue);
};

firework.prototype.proceed = function() {
	var end0=false, end1=false, end2=false;
	if(this.ground!=null && this.ground.active) {
		this.ground.proceed();
	} else {
		end0 = true;
	}
	if(this.launcher!=null && this.launcher.active) {
		this.launcher.proceed();
	} else {
		end1 = true;
	}
	
	if(this.shell != null && this.shell.active) {
		this.shell.proceed();
	} else {
		/*
	    this.shell = new shell(this.sx, this.sy, this.sz, this.size, this.vel, this.sstart, this.send, this.slife);
	    this.shell.setColors(this.red, this.green, this.blue);
	    */
		end2 = true;
	}
	return (end0 && end1 && end2);
	
}

firework.prototype.isActive = function() {
	if(this.ground==null) return false;
	var x=this.ground.active || this.launcher.active || this.shell.active;
	return x;
}

firework.prototype.render_triangle_strip = function(position, color, num) {
	if(this.ground!=null && this.ground.active) {
		//console.log("Draw Triangle_Strip:"+((this.ground.active!=null)?"true":"false"));
		num=this.ground.draw(position, color, num);
	} else {
		//console.log("@@@="+this.ground);
	}
	return num;
}

firework.prototype.render_points = function(position, color, num) {;
	if(this.launcher!=null && this.launcher.active) {
		num=this.launcher.draw(position, color, num);
	}
	//console.log("render points: num="+num);
	var num1;
	if(this.shell!=null && this.shell.active) {
		num=this.shell.draw(position, color, num);
		//console.log("render points: num="+num+" num1="+num1);
//		return num+num1;
	} 
	return num;
};

function init_ground() {
	cindex_ground=pindex_ground=0;
	pattern=1;
	patternLoop=2;
	ring_g=ring_r=.5;
	ring_b=1;
	img=textureImage=graphicLib=null;
	count=0;
	uniLocation=[];
	theGroundEffects=[]
}

function genEffect(a){
	return new groundEffect(0+35*a,10+35*a,24+35*a,lx[a],ly[a],lz[a]);
}
