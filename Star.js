
var Star=function (x, y, z, vx, vy, vz, gravity, life, start, end, num_points, r, g, b, pgravity) {
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
  this.end = end+pointLife;
	this.life = life;
  this.num_sparks=num_points;
	this.spark_index=0;
  this.interval=Math.floor((this.end-this.start)/(num_points+1));
	console.log("interval="+this.interval);
  this.sparks = new Array(num_points);
	this.spark_index=0;
  this.sphere = new Sphere();
  this.sphere.create(radDiffuse, starDiffuse);
  this.nsphere = this.sphere.numStars;
	/*
  for (var i=0;i<num_points;i++) {
    var t=i*interval;
    var cx=this.x+this.vx*t;
    var cy=this.y+this.vy*t+gravity*t*t;
    var cz=this.z+this.vz*t;
    var start = t+this.start;
    var end = start+pointLife;
    var life=this.life;
    var j=Math.floor(Math.random() * this.nsphere);
    var cvx=this.sphere.px[j]*randomRatio;
    var cvy=this.sphere.py[j]*randomRatio;
    var cvz=this.sphere.pz[j]*randomRatio;
    this.stars[i]=new Point(cx, cy, cz, cvx, cvy, cvz, pgravity, life, start)
    this.life=end;
    console.log("ShootingStar start:"+start+" life="+this.life);
  }
	*/
  this.time=0;
}

Star.prototype.proceed = function () {
  var b=false;
	var t=this.time;
	this.time++;
	if(this.time<this.life) {
		this.time++;
	} else {
		b=true;
	}
  for(var i=0;i<this.numChildStars;i++) {
		//console.log("Proceed: "+i);
		if(this.stars[i]!=null)
    	b &= this.stars[i].proceed();
  }
	if((this.time%this.interval)==0) {
		var py=this.y+this.vy*t+this.gravity*t*t;
		var px=this.x+this.vx*t;
		var pz=this.z+this.vz*t;
		var life=200;
		//console.log("Gen Spark: px="+px+" py="+py+" pz="+pz);
		this.sparks[this.spark_index++]=new Spark (px, py, pz, 0, 0, 0, this.gravity, life, 0);
	}
	for(var i=0;i<this.num_sparks;i++) {
		if(this.sparks[i]!=null) {
			var v=this.sparks[i].proceed();
			//console.log("### v="+v);
			b &= v
		}
	}
	//console.log("@@ this.time="+this.time+" b="+b);
  //console.log("@"+this.start+" - "+this.time+" - "+this.end+" B="+b+" life="+this.life);
  return b;
}

Star.prototype.draw = function (graphics) {
   var t=this.time-this.start;
   if(t>0 && this.time < this.end) {
     var py=this.y+this.vy*t+this.gravity*t*t;
     //if(py<4) {
    	 var px=this.x+this.vx*t;
    	 var pz=this.z+this.vz*t;
       graphics.pos_buf2[graphics.pos_ind2++]=px;
       graphics.pos_buf2[graphics.pos_ind2++]=py;
       graphics.pos_buf2[graphics.pos_ind2++]=pz;
       var plife=this.end-this.start;
       var grad=(this.end-this.time)/plife;
       var r=this.r*grad;
       var g=this.g*grad;
       var b=this.b*grad;
       var a=1.0;
			 r=g=b=1;
			 console.log("STAR  x="+px+", y="+py+" z="+pz+"  r="+r+" g="+g+" b="+b);
       graphics.col_buf2[graphics.col_ind2++]=r;
       graphics.col_buf2[graphics.col_ind2++]=g;
       graphics.col_buf2[graphics.col_ind2++]=b;
       graphics.col_buf2[graphics.col_ind2++]=a;
     //}
  }
	//console.log("Draw num="+this.spark_index);
  for(i=0;i<this.spark_index;i++) {
		if(this.sparks[i]!=null)
    	this.sparks[i].draw(graphics);
  }
}

Star.prototype.setLife = function (life) {
  this.life=life;
  for(var i=0;i<this.num_sparks;i++) {
    this.stars[i].setLife(life);
	}
}
