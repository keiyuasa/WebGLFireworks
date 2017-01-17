

function shell() {
	this.r = 0xFF;
	this.g = 0xFF;
	this.b = 0x80;
	this.time = 0;
};

function shell(x, y, z, size, vel, start, end, life) {
	this.r = 0x40;
	this.g = 0xFF;
	this.b = 0x40;
	this.ox = x;
	this.oy = y;
	this.oz = z;
	this.start = start;
	this.end = end;
	this.life = life;
	this.time = start;
	this.gravity = 0.00008;
	this.shooters = new Array();
	var sphere = new Sphere();
	sphere.create(size, vel);
	this.numShooter = sphere.numStars;
	this.position = new Array();
	this.color = new Array();
	this.sphere=new Sphere()
	this.sphere.create(size, vel);
	this.num=this.sphere.numStars;
	this.time = 0; // for color changing
	this.active = true;
};

shell.prototype.setTime = function (t) {
    this.time = t;
};

shell.prototype.setColors = function (r,g,b) {
	this.r = r;
	this.g = g;
	this.b = b;
};

shell.prototype.draw = function(position, color, num) {
    if(this.time<this.start || this.time>this.end) return num;
    var time=this.time-this.start;
	var div=(this.end-this.start)*.8;
	var grad=(this.end-this.time)/div;
	var pindex=num*3;
	var cindex=num*4;

	for (var i=0;i<this.num;i++) {
	    position[pindex++]=this.ox+this.sphere.px[i]*time;
	    position[pindex++]=this.oy+(this.sphere.py[i]/*+this.gravity*time*/)*time;
	    position[pindex++]=this.oz+this.sphere.pz[i]*time;
	    var r=this.r*grad;
	    var g=this.g*grad;
	    var b=this.b*grad;
	    var a=1.0;
	    color[cindex++]=r;
	    color[cindex++]=g;
	    color[cindex++]=b;
	    color[cindex++]=a;
	    num++;
	}
	//console.log("shell.draw:"+(cindex/4-num));
	return num;
};

shell.prototype.proceed = function() {
	this.time++;
	if (this.time >= this.life) {
	    this.active = false;
		this.time=0;
	} else {
		this.active = true;
	}
	return this.active;
};

function random_vector() {
    var random;
	random = Math.floor(Math.random() * 6) - 3;
	var vx=random/500;
	random = Math.floor(Math.random() * 20) - 5;
	var vy=-0.08+random/400;
	random = Math.floor(Math.random() * 6) - 3;
	var vz=random/500;
	var r=Math.sqrt(vx*vx+vy*vy+vz*vz);
	vx /= r;
	vy /= r;
	vz /= r;
    return {x: vx, y:vy, z:vz};
}

function set_position(position_buf, color_buf) {
	pindex=0;		// point
	cindex=0;		// color
	var t=false;
	var start;
	var end;
	var f;
	var leve, vlen, lsize, lvel, vel, size;
	var xcolor;
	lindex=Math.floor(time/time_shift);
	for(var i=0;i<num_points*2;i++) {
	    var theShell=theSet[i];
	    if(theShell!=null) {
			theShell.draw(position_buf, color_buf);
		    t=theShell.proceed();
		}
	}
}

function FireworksSet (n, cycle) {
	var life=cycle;
	var diff=life/num_points;
	var launcher_length=80;
	var shell_length=160;
	var launcher_start=0;
	var shell_start=launcher_length-diff;
	this.numFireworks = n;
	this.halfTime=cycle/2;
	this.half=n/2;
	this.set1=new Array();
	this.set2=new Array();
	this.life=cycle;
	for(i=0;i<this.half;i++) {
	    this.set1[i]=null;
	    this.set2[i]=null;
	}
}

FireworksSet.prototype.numFireworks=function () {
      return this.numFireworks;
};

FireworksSet.prototype.render=function(position,color) {
	//console.log("fireworks set render");
	pindex=0;
	cindex=0;
	for(i=0;i<this.set1.length;i++) {
	    f=this.set1[i];
	    if(f!=null) {
	    	f.draw(position, color);
	    	if(!f.proceed()) {
	    	    this.set1[i]=null;
	    	    //console.log("set1["+i+"] ends");
	    	}
	    }
	}
	for(i=0;i<this.set2.length;i++) {
	    f=this.set2[i];
	    if(f!=null) {
	    	f.draw(position, color);
	    	if(!f.proceed()) {
	    	    this.set2[i]=null;
	    	    //console.log("set2["+i+"] ends");
	    	}
	    }
	}
};

FireworksSet.prototype.addFireworks=function(index, time) {
    //console.log("Add Fireworks index="+index+", time="+time+", halfTime="+this.halfTime);
    var set=null;
    if(time<this.halfTime) {
        set=this.set1;
        console.log("create in set1");
    } else {
        set=this.set2;
        //time=time+this.half;
        console.log("create in set2");
    }
    for(i=0;i<set.length;i++) {
        if(set[i]==null) {
        	// shell(x, y, z, size, vel, start, end, life)
            
            lindex=index;
			level[lindex]=Math.floor(Math.random() * 3)+2;
	    	vlen=level[lindex]*0.02;
	    	lsize=level[lindex];
		    vel=0.01 * lsize;
		    start=time;
			end = start+launcher_length;
			var rvector=random_vector();
			var vx=rvector.x*vlen;
			var vy=rvector.y*vlen;
			var vz=rvector.z*vlen;
			f=new shell(lx[lindex], ly[lindex], lz[lindex], lsize, vel, start, end, life);
			f.launcher(lx[lindex], ly[lindex], lz[lindex], vx, vy, vz, start, end, life);
			f.setColors(0xAF, 0xAF, 0x40);
			f.setTime=0;
			set[i]=f;
            console.log("created shell at "+i+", lindex="+lindex+", x="+lx[lindex]+", y="+ly[lindex]+", z="+lz[lindex]);
            break;
        }
    }
}

