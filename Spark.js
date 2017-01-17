var rtail=0.8;
var gtail=0.65;
var btail=0.24;

var Spark=function (x, y, z, vx, vy, vz, gravity, life, start=0) {
	this.x = x;
	this.y = y;
	this.z = z;
	this.r = rtail;
	this.g = gtail;
	this.b = btail;
	this.vx = vx;
	this.vy = vy;
	this.vz = vz;
	this.life = life;
  this.start = start;
  //this.end = life;
  this.gravity=gravity;
  this.time = 0;
}

Spark.prototype.proceed = function () {
	if(this.time<this.life) {
		this.time++;
	}
	if(this.time>=this.life) {
		//console.log("@@@ Spark proceed:TRUE");
    return true;
	} else {
		//console.log("@@@ "+this.time+"/"+this.life);
	  return false;
	}
}

Spark.prototype.draw = function (graphics) {
   var t=this.time-this.start;
   if(t>=0 && this.time<this.life) {
     var pz=this.z+this.vz*t+this.gravity*t*t;
     //if(py>=groundY) {
    	 var px=this.x+this.vx*t;
    	 var py=this.y+this.vy*t;
			 //graphics.pos_buf1[graphics.pos_ind1++]=px;
    	 //graphics.pos_buf1[graphics.pos_ind1++]=py;
    	 //graphics.pos_buf1[graphics.pos_ind1++]=pz;
			 graphics.pos_buf2[graphics.pos_ind2++]=px;
    	 graphics.pos_buf2[graphics.pos_ind2++]=py;
    	 graphics.pos_buf2[graphics.pos_ind2++]=pz;
       var plife=this.life;
    	 var grad=(this.life-this.time)/plife;
       //console.log("grad="+grad);
    	 var r=this.r*grad;
    	 var g=this.g*grad;
    	 var b=this.b*grad;
       var a=1.0;
			 //r=g=b=1;
			 //graphics.col_buf1[graphics.col_ind1++]=r;
    	 //graphics.col_buf1[graphics.col_ind1++]=g;
    	 //graphics.col_buf1[graphics.col_ind1++]=b;
    	 //graphics.col_buf1[graphics.col_ind1++]=a;
			 graphics.col_buf2[graphics.col_ind2++]=r;
    	 graphics.col_buf2[graphics.col_ind2++]=g;
    	 graphics.col_buf2[graphics.col_ind2++]=b;
    	 graphics.col_buf2[graphics.col_ind2++]=a;
     //}
   }
   //console.log("time="+this.time+",  life="+this.life);
}

Spark.prototype.setLife=function(life) {
  this.life=life;
}

Spark.prototype.setColor=function(r, g, b) {
  this.r=r;
  this.g=g;
  this.b=b;
}
