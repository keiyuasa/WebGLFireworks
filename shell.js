// GLOBALS

var globalR=0.8;  //0.5;
var globalG=0.8; //0.4;
var globalB=0.2; //0.9;
var globalRad=3;
var globalVel=0.004;
var globalTailLength=40;  // for Launchers
var globalNumPoints=40;  // for Shells
var globalPGravity=0.000007;
var globalRandomRatio=0.00002;
var globalDiffuse=2;

function Mixin(destination, source) {
  for (var k in source) {
    if (source.hasOwnProperty(k)) {
      destination[k] = source[k];
    }
  }
  return destination;
}

var Point=function (x, y, z, vx, vy, vz, gravity, life, start=0, pointLife=200) {
	this.x = x;
	this.y = y;
	this.z = z;
	this.r = rtail;
	this.g = gtail;
	this.b = btail;
	this.vx = vx;
	this.vy = vy;
	this.vz = vz;
  this.start = start;
  this.end = start+pointLife;
  this.life = this.end;
  this.gravity=gravity;
  this.time = 0;
}

Point.prototype.proceed = function () {
	this.time++;
	if(this.time>=this.life) {
		this.time=0;
    return true;
	}
  return false;
}

Point.prototype.draw = function (graphics) {
   var t=this.time-this.start;
   if(t>=0) {
     var pz=this.z+this.vz*t+this.gravity*t*t;
     if(pz>=groundZ) {
       var px=this.x+this.vx*t;
    	 var pt=this.t+this.vt*t;
    	 graphics.pos_buf1[graphics.pos_ind1++]=px;
    	 graphics.pos_buf1[graphics.pos_ind1++]=py;
    	 graphics.pos_buf1[graphics.pos_ind1++]=pz;
       var plife=this.end-this.start;
    	 var grad=(this.end-this.time)/plife;
    	 var r=this.r*grad;
    	 var g=this.g*grad;
    	 var b=this.b*grad;
       var a=1.0;
    	 graphics.col_buf1[graphics.col_ind1++]=r;
    	 graphics.col_buf1[graphics.col_ind1++]=g;
    	 graphics.col_buf1[graphics.col_ind1++]=b;
    	 graphics.col_buf1[graphics.col_ind1++]=a;
     }
   }
}

Point.prototype.draw1 = function (graphics, time) {
   var t=time-this.start;
   if(t>=0 && time<this.end) {
     var pz=this.z+this.vz*t+this.gravity*t*t;
     //if(py>=groundY) {
    	 var px=this.x+this.vx*t;
    	 var py=this.y+this.vy*t;
       graphics.pos_buf1[graphics.pos_ind1++]=px;
    	 graphics.pos_buf1[graphics.pos_ind1++]=py;
    	 graphics.pos_buf1[graphics.pos_ind1++]=pz;
       var plife=this.end-this.start;
    	 var grad=(this.end-this.time)/plife;
    	 var r=this.r*grad;
    	 var g=this.g*grad;
    	 var b=this.b*grad;
       var a=1.0;
    	 graphics.col_buf1[graphics.col_ind1++]=r;
    	 graphics.col_buf1[graphics.col_ind1++]=g;
    	 graphics.col_buf1[graphics.col_ind1++]=b;
    	 graphics.col_buf1[graphics.col_ind1++]=a;
    // }
   }
}

Point.prototype.setLife=function(life) {
  this.life=life;
}

Point.prototype.setTime=function(time) {
  this.time=time;
}

Point.prototype.setStart=function(time) {
  this.start=time;
}

Point.prototype.setEnd=function(time) {
  this.end=time;
}

function Point0 () {
  var num_points = 3;
  var px=0;
  var py=0;
  var pz=0;
  var pvx=0.0002;
  var py=-0.30;
  var pz=0.0;
  var pgravity = 0.000002;
  var plife=200;
  var pstart=0;
  var s=new Point (px, py, pz, pvx, pvy, pvz, pgravity, plife, 0, 200);
  return s;
}

var ShootingStar=function (x, y, z, vx, vy, vz, gravity, life, start, end, num_points, r, g, b, pgravity, randomRatio, diffuse, pointLife)
 {
	this.x = x;
	this.y = y;
	this.z = z;
	this.r = r;
	this.g = g;
	this.b = b;
	this.vx = vx;
	this.vy = vy;
	this.vz = vz;
  this.gravity = gravity;
  this.start = start;
  this.end = end;
	this.life = end+pointLife;
  this.numChildStars=num_points;
  var interval=Math.floor((this.end-this.start)/(num_points+1));
  this.stars = new Array(num_points);
  this.sphere = new Sphere();
  this.sphere.create(radDiffuse, diffuse);
  this.nsphere = this.sphere.numStars;
  for (var i=0;i<num_points;i++) {
    var t=i*interval;
    var cx=this.x+this.vx*t;
    var cy=this.y+this.vy*t;
    var cz=this.z+this.vz*t+gravity*t*t;
    var start = t+this.start;
    var end = start+pointLife;
    var life=pointLife;
    var j=Math.floor(Math.random() * this.nsphere);
    var cvx=this.sphere.px[j]*randomRatio;
    var cvy=this.sphere.py[j]*randomRatio;
    var cvz=this.sphere.pz[j]*randomRatio;
    this.stars[i]=new Point(cx, cy, cz, cvx, cvy, cvz, pgravity, life, start, pointLife)
    this.life=end;
  }
  this.time=0;
}

ShootingStar.prototype.proceed = function () {
  var b=false;
	this.time++;
	if(this.time>=this.life) {
		this.time=0;
	}
  for(var i=0;i<this.numChildStars;i++) {
    b=this.stars[i].proceed();
  }
  return b;
}

ShootingStar.prototype.draw = function (graphics) {
   var t=this.time-this.start;
   if(t>0 && this.time < this.end) {
     //console.log("ShootingStar.draw time-"+this.time+" life="+this.life+" end="+this.end);
     var pz=this.z+this.vz*t+this.gravity*t*t;
     //if(pz<groundZ) {
       //console.log("@"+this.start+" - "+this.time+" - "+this.end+" gravity="+this.gravity+" py="+py);
    	 var px=this.x+this.vx*t;
    	 var py=this.y+this.vy*t;
       graphics.pos_buf2[graphics.pos_ind2++]=px;
       graphics.pos_buf2[graphics.pos_ind2++]=py;
       graphics.pos_buf2[graphics.pos_ind2++]=pz;
       var plife=this.end-this.start;
       var grad=(this.end-this.time)/plife;
       var r=this.r*grad;
       var g=this.g*grad;
       var b=this.b*grad;
       var a=1.0;
       graphics.col_buf2[graphics.col_ind2++]=r;
       graphics.col_buf2[graphics.col_ind2++]=g;
       graphics.col_buf2[graphics.col_ind2++]=b;
       graphics.col_buf2[graphics.col_ind2++]=a;
     //}
  }
  for(i=0;i<this.numChildStars;i++) {
    this.stars[i].draw1(graphics, this.time);
  }
}

ShootingStar.prototype.setLife = function (life) {
  this.life=life;
  for(var i=0;i<this.numChildStars;i++) {
    this.stars[i].setLife(life);
	}
}

ShootingStar.prototype.setTime = function (time) {
  this.time=time;
  for(var i=0;i<this.numChildStars;i++) {
    this.stars[i].setTime(time);
	}
}

ShootingStar.prototype.setStart = function (time) {
  this.start=time;
  for(var i=0;i<this.numChildStars;i++) {
    this.stars[i].setStart(time);
	}
}

ShootingStar.prototype.setEnd = function (time) {
  this.end=time;
  for(var i=0;i<this.numChildStars;i++) {
    this.stars[i].setEnd(time);
	}
}


var ColorChanger = {
  addColor: function(r, g, b) {
    this.r2=r;
    this.g2=g;
    this.b2=b;
    this.midTime=(this.end+this.start)/2;
  },

  draw: function (graphics) {
    var t=this.time-this.start;
    if(t>0 && this.end>this.time) {
  	 var px=this.x+this.vx*t;
  	 var py=this.y+this.vy*t+gravity*t*t;
  	 var pz=this.z+this.vz*t;
     graphics.pos_buf1[graphics.pos_ind1++]=px;
     graphics.pos_buf1[graphics.pos_ind1++]=py;
     graphics.pos_buf1[graphics.pos_ind1++]=pz;
     var plife=this.end-this.start;
     var grad=(this.end-this.time)/plife;
     var r=(this.time<this.midTime?this.r:this.r2)*grad;
     var g=(this.time<this.midTime?this.g:this.g2)*grad;
     var b=(this.time<this.midTime?this.b:this.b2)*grad;
     var a=1.0;
     //console.log("("+r+","+g+","+b+")");
     graphics.col_buf1[graphics.col_ind1++]=r;
     graphics.col_buf1[graphics.col_ind1++]=g;
     graphics.col_buf1[graphics.col_ind1++]=b;
     graphics.col_buf1[graphics.col_ind1++]=a;
     for(i=0;i<this.numChildStars;i++) {
       this.stars[i].draw(position, color, numDraw);
     }
    }
  }
}

var Shell=function (x, y, z, gravity, life, start, end, rad, vel, num_points, r, g, b, pgravity, randomRatio=0, diffuse=0, pointLife=200) {
//  console.log("Shell: g="+gravity+", rad="+rad+", vel="+vel+", num_points="+num_points+", pgravity="+pgravity+", randomRatio="+randomRatio+", diffuse="+diffuse+", pointLife="+pointLife);
	this.x = x;
	this.y = y;
	this.z = z;
	this.r = r;
	this.g = g;
	this.b = b;
	this.vel = vel;
	this.life = life+pointLife;
  this.start = start;
  this.end = end;
	this.time = 0;
  this.sphere = new Sphere();
  this.sphere.create(rad, vel);
  this.numsphere=this.sphere.numStars;
  this.stars = new Array(this.numsphere);
  this.nsphere = this.sphere.numStars;
  for(var i=0;i<this.nsphere;i++) {
    var vx=vel*this.sphere.px[i];
    var vy=vel*this.sphere.py[i];
    var vz=vel*this.sphere.pz[i];
    var star=new ShootingStar (x, y, z, vx, vy, vz, gravity, life, start, end, num_points, r, g, b, pgravity, randomRatio, diffuse, pointLife);
    this.stars[i]=star;
    this.life=star.life;
  }
}

Shell.prototype.proceed = function () {
  for(var i=0;i<this.nsphere;i++) {
    b=this.stars[i].proceed();
	}
  this.time++;
  if(this.time>=this.life) {
    return true;
  }
  return false;
}

Shell.prototype.draw = function (graphics) {
  for(var i=0;i<this.nsphere;i++) {
    this.stars[i].draw(graphics);
	}
}

Shell.prototype.setLife = function (life) {
  this.life=life;
  for(var i=0;i<this.nsphere;i++) {
    this.stars[i].setLife(life);
	}
}

Shell.prototype.setTime = function (time) {
  this.time=time;
  for(var i=0;i<this.nsphere;i++) {
    this.stars[i].setTime(time);
	}
}

Shell.prototype.setStart = function (time) {
  this.start=time;
  for(var i=0;i<this.nsphere;i++) {
    this.stars[i].setStart(time);
	}
}

Shell.prototype.setEnd = function (time) {
  this.end=time;
  for(var i=0;i<this.nsphere;i++) {
    this.stars[i].setEnd(time);
	}
}

function setColor1(colstring) {
  var sr=colstring.substr(0, 2);
  var sg=colstring.substr(2, 2);
  var sb=colstring.substr(4, 2);
  var r=parseInt(sr, 16);
  var g=parseInt(sg, 16);
  var b=parseInt(sb, 16);
  globalR = r/256;
  globalG = g/256;
  globalB = b/256;
}

function setRad(rad) {
  globalRad=rad;
}

var PistilShell=function (x, y, z, vel, life, gravity, start, end, rad, vel, num_points, r, g, b, pgravity) {
	this.x = x;
	this.y = y;
	this.z = z;
	this.r = r;
	this.g = g;
	this.b = b;
	this.vel = vel;
	this.life = life;
	this.time = 0;
  this.shell1 = new Shell (x, y, z, vel, gravity, life, rad, vel, num_points, r, g, b, pgravity);
  var rad2=rad-1;
  var vel2=vel*0.8;
  this.shell2 = new Shell (x, y, z, vel2, gravity, life, rad2, vel2, 0, g, b, r, pgravity);
}

PistilShell.prototype.proceed = function () {
  var b=false;
  b=this.shell1.proceed();
  b=this.shell2.proceed();
  return b;
}

PistilShell.prototype.draw = function (graphics) {
  //num=
  this.shell1.draw(graphics);
  //return
  this.shell2.draw(graphics);
}

var RingShell=function (x, y, z, vel, gravity, life, rad, vel, pgravity) {
	this.x = x;
	this.y = y;
	this.z = z;
	this.r = 0.9;
	this.g = 0.6;
	this.b = 0.4;
	this.vel = vel;
	this.life = life;
	this.time = 0;
  this.sphere = new Ring();
  this.sphere.create(rad, vel);
  this.numsphere=this.sphere.numStars;
  this.stars = new Array(this.numsphere);
  this.nsphere = this.sphere.numStars;
  for(var i=0;i<this.nsphere;i++) {
    var vx=vel*this.sphere.px[i];
    var vy=vel*this.sphere.py[i];
    var vz=vel*this.sphere.pz[i];
    var star=new ShootingStar (x, y, z, vx, vy, vz, life, 0, life, 30, pgravity);
    this.stars[i]=star;
  }
}

RingShell.prototype.proceed = function () {
  for(var i=0;i<this.nsphere;i++) {
    this.stars[i].proceed();
	}
}

RingShell.prototype.draw = function (graphics) {
  for(var i=0;i<this.nsphere;i++) {
    //num=
    this.stars[i].draw(graphics);
	}
}

var Launcher=function (x, y, z, vx, vy, vz, vel, gravity, life, rad, vel, num_points, r, g, b, pgavity) {
  this.life2=life*2;

  //var ShootingStar=function (x, y, z, vx, vy, vz, gravity, life, start, end, num_points, r, g, b) {

  this.shooter=new ShootingStar(x, y, z, vx, vy, vz, gravity, this.life, 0, life, num_points, r, g, b, pgravity);
  var y0=y+vy*life+gravity*life*life;
  var vel=0.075;
  //  (x, y, z, vel, gravity, life, start, end, rad, vel, num_points, r, g, b)
  //this.body=new Shell (x, y0, z, vel, gravity, this.life2, life, this.life2, rad, vel, num_points, r, g, b)
}

Launcher.prototype.proceed = function () {
  return this.shooter.proceed();
}

Launcher.prototype.draw = function (graphics) {
  this.shooter.draw(graphics);
}

Launcher.prototype.setLife=function(life) {
  this.life=life;
  this.shooter.setLife(life);
}

Launcher.prototype.setTime=function(time) {
  this.time=time;
  this.shooter.setTime(time);
}

Launcher.prototype.setStart=function(time) {
  this.start=time;
  this.shooter.setStart(time);
}

Launcher.prototype.setEnd=function(time) {
  this.end=time;
  this.shooter.setEnd(time);
}

var Combo = function() {
  this.objects=new Array();
  var maxLife=0;
  for (var i=0;i<arguments.length;i++) {
    var obj=arguments[i];
    var life=obj.life+obj.start;
    if(life>maxLife)
      maxLife=life;
    this.objects[i]=obj;
  }
  for (var i=0;i<this.objects.length;i++) {
    this.objects[i].setLife(maxLife);
  }
  this.life=maxLife;
  this.setTime(0);
}

Combo.prototype.proceed = function () {
  var b=false;
  this.time++;
  for (var i=0;i<this.objects.length;i++) {
    b=this.objects[i].proceed();
  }
  return b;
}

Combo.prototype.draw = function (graphics) {
  for (var i=0;i<this.objects.length;i++) {
    this.objects[i].draw(graphics);
  }
}

Combo.prototype.setTime = function(time) {
  this.time=time;
  for (var i=0;i<this.objects.length;i++) {
    this.objects[i].setTime(time);
  }
}

Combo.prototype.setLife = function(time) {
  this.life=time;
  for (var i=0;i<this.objects.length;i++) {
    this.objects[i].setLife(time);
  }
}

Combo.prototype.setStart = function(time) {
  this.start=time;
  for (var i=0;i<this.objects.length;i++) {
    this.objects[i].setStart(time);
  }
}

Combo.prototype.setEnd = function(time) {
  this.end=time;
  for (var i=0;i<this.objects.length;i++) {
    this.objects[i].setEnd(time);
  }
}
