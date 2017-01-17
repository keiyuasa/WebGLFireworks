//
// Ground Gear
//

var groundx=4.0;
var groundy=4.8;
var groundz=8.0;
var alfa=0.9;

var DrawingMethod=null;
//var num_points=12;

var pindex_ground=0;
var cindex_ground=0;
var pattern=1;
var patternLoop=2;

var ring_r=0.5;
var ring_g=0.5;
var ring_b=1.0;

var num_points = 12;

var graphicLib=null;
var textureImage = null;
var texture;
var img = null;
var count=0;
var uniLocation = new Array();

time_shift=1024;

var GroundGear=function (x, y, z, len, life, start=0) {
	this.x = x;
	this.y = y;
	this.z = z;
	this.len = len;
	this.life=time_shift;//life;
	this.time=0;
	this.alfa=0.9;
}

GroundGear.prototype.proceed = function () {
	this.time++;
	if(this.time>=this.life) {
		this.time=0;
		return true;
	}
	return false;
}

GroundGear.prototype.draw = function (graphics) {
	var rdiv=8;
	//console.log("drawing groundgear:"+this.time);
	//console.log("Ground draw:"+this.time);

	var tc=Math.floor(this.time/time_shift);
	var pos=tc%num_points;
	var len=this.len;
	var x0=this.x-len;
	var y0=this.y-len;
	var z0=this.z-len;
	var x1=this.x+len;
	var y1=this.y-len;
	var z1=this.z-len;
	var x2=this.x-len;
	var y2=this.y+len;
	var z2=this.z-len;
	var x3=this.x+len;
	var y3=this.y+len;
	var z3=this.z-len;
	rd=0.5;	gr=0.5;	bl=0.5;
	var alfa=1.0;
	rd=0.8;	gr=0.2;	bl=0.2;
	graphics.pos_bufg[graphics.pos_indg++]= x0;
	graphics.pos_bufg[graphics.pos_indg++]= y0;
	graphics.pos_bufg[graphics.pos_indg++]= z0;
	graphics.col_bufg[graphics.col_indg++]= rd;
	graphics.col_bufg[graphics.col_indg++]= gr;
	graphics.col_bufg[graphics.col_indg++]= bl;
	graphics.col_bufg[graphics.col_indg++]= alfa;
	rd=0.2;	gr=0.8;	bl=0.2;
	graphics.pos_bufg[graphics.pos_indg++]= x1;
	graphics.pos_bufg[graphics.pos_indg++]= y1;
	graphics.pos_bufg[graphics.pos_indg++]= z1;
	graphics.col_bufg[graphics.col_indg++]= rd;
	graphics.col_bufg[graphics.col_indg++]= gr;
	graphics.col_bufg[graphics.col_indg++]= bl;
	graphics.col_bufg[graphics.col_indg++]= alfa;
	rd=0.2;	gr=0.2;	bl=0.8;
	graphics.pos_bufg[graphics.pos_indg++]= x2;
	graphics.pos_bufg[graphics.pos_indg++]= y2;
	graphics.pos_bufg[graphics.pos_indg++]= z2;
	graphics.col_bufg[graphics.col_indg++]= rd;
	graphics.col_bufg[graphics.col_indg++]= gr;
	graphics.col_bufg[graphics.col_indg++]= bl;
	graphics.col_bufg[graphics.col_indg++]= alfa;
	rd=0.7;	gr=0.7;	bl=0.2;
	graphics.pos_bufg[graphics.pos_indg++]= x3;
	graphics.pos_bufg[graphics.pos_indg++]= y3;
	graphics.pos_bufg[graphics.pos_indg++]= z3;
	graphics.col_bufg[graphics.col_indg++]= rd;
	graphics.col_bufg[graphics.col_indg++]= gr;
	graphics.col_bufg[graphics.col_indg++]= bl;
	graphics.col_bufg[graphics.col_indg++]= alfa;
}

var GroundGear1=function (x, y, z, len, life, start=0) {
	this.x = x;
	this.y = y;
	this.z = z;
	this.len = len;
	this.life=time_shift;//life;
	this.time=0;
	this.alfa=0.9;
}

GroundGear1.prototype.proceed = function () {
	this.time++;
	if(this.time>=this.life) {
		this.time=0;
		return true;
	}
	return false;
}

GroundGear1.prototype.draw = function (graphics) {
	var len=this.len;
	var len1=-len*1.4;
	var len2=len*4.8;
	var cx=this.x;
	var cy=this.y;
	var cz=this.z-len;
	var alfa=0.8;
	var cr=1.0, cg=1.0, cb=1.0;

	var ax=[this.x-len, this.x+len, this.x+len, this.x-len];
	var ay=[this.y-len, this.y-len, this.y+len, this.y+len];
	var az=[this.z-len, this.z-len, this.z-len, this.z-len];
	var bx=[this.x    , this.x+len, this.x    , this.x-len];
	var by=[this.y-len, this.y    , this.y+len, this.y    ];
	var bz=[this.z-len, this.z-len, this.z-len, this.z-len];
	var aax=[this.x-len, this.x+len2, this.x+len, this.x-len2];
	var aay=[this.y-len2, this.y-len, this.y+len2, this.y+len];
	var aaz=[this.z-len1, this.z-len1, this.z-len1, this.z-len1];
	var abx=[this.x+len, this.x+len2, this.x-len, this.x-len2];
	var aby=[this.y-len2, this.y+len, this.y+len2, this.y-len];
	var abz=[this.z-len1, this.z-len1, this.z-len1, this.z-len1];
	var ar=[0.8, 0.2, 0.2, 0.7];
	var ag=[0.2, 0.8, 0.2, 0.7];
	var ab=[0.2, 0.2, 0.8, 0.2];
	var br=[0.5, 0.2, 0.45, 0.75];
	var bg=[0.5, 0.5, 0.45, 0.45];
	var bb=[0.2, 0.5, 0.5, 0.2];

	function fill_corner(i) {
		var j=(i+1)%4;
		graphics.pos_bufg[graphics.pos_indg++]= cx;
		graphics.pos_bufg[graphics.pos_indg++]= cy;
		graphics.pos_bufg[graphics.pos_indg++]= cz;
		graphics.col_bufg[graphics.col_indg++]= cr;
		graphics.col_bufg[graphics.col_indg++]= cg;
		graphics.col_bufg[graphics.col_indg++]= cb;
		graphics.col_bufg[graphics.col_indg++]= alfa;

		graphics.pos_bufg[graphics.pos_indg++]= ax[i];
		graphics.pos_bufg[graphics.pos_indg++]= ay[i];
		graphics.pos_bufg[graphics.pos_indg++]= az[i];
		graphics.col_bufg[graphics.col_indg++]= ar[i];
		graphics.col_bufg[graphics.col_indg++]= ag[i];
		graphics.col_bufg[graphics.col_indg++]= ab[i];
		graphics.col_bufg[graphics.col_indg++]= alfa;

		graphics.pos_bufg[graphics.pos_indg++]= bx[i];
		graphics.pos_bufg[graphics.pos_indg++]= by[i];
		graphics.pos_bufg[graphics.pos_indg++]= bz[i];
		graphics.col_bufg[graphics.col_indg++]= br[i];
		graphics.col_bufg[graphics.col_indg++]= bg[i];
		graphics.col_bufg[graphics.col_indg++]= bb[i];
		graphics.col_bufg[graphics.col_indg++]= alfa;

		graphics.pos_bufg[graphics.pos_indg++]= aax[i];
		graphics.pos_bufg[graphics.pos_indg++]= aay[i];
		graphics.pos_bufg[graphics.pos_indg++]= aaz[i];
		graphics.col_bufg[graphics.col_indg++]= 0;
		graphics.col_bufg[graphics.col_indg++]= 0;
		graphics.col_bufg[graphics.col_indg++]= 0;
		graphics.col_bufg[graphics.col_indg++]= alfa;

		graphics.pos_bufg[graphics.pos_indg++]= abx[i];
		graphics.pos_bufg[graphics.pos_indg++]= aby[i];
		graphics.pos_bufg[graphics.pos_indg++]= abz[i];
		graphics.col_bufg[graphics.col_indg++]= 0;
		graphics.col_bufg[graphics.col_indg++]= 0;
		graphics.col_bufg[graphics.col_indg++]= 0;
		graphics.col_bufg[graphics.col_indg++]= alfa;

		graphics.pos_bufg[graphics.pos_indg++]= bx[i];
		graphics.pos_bufg[graphics.pos_indg++]= by[i];
		graphics.pos_bufg[graphics.pos_indg++]= bz[i];
		graphics.col_bufg[graphics.col_indg++]= br[i];
		graphics.col_bufg[graphics.col_indg++]= bg[i];
		graphics.col_bufg[graphics.col_indg++]= bb[i];
		graphics.col_bufg[graphics.col_indg++]= alfa;

		graphics.pos_bufg[graphics.pos_indg++]= ax[j];
		graphics.pos_bufg[graphics.pos_indg++]= ay[j];
		graphics.pos_bufg[graphics.pos_indg++]= az[j];
		graphics.col_bufg[graphics.col_indg++]= ar[j];
		graphics.col_bufg[graphics.col_indg++]= ag[j];
		graphics.col_bufg[graphics.col_indg++]= ab[j];
		graphics.col_bufg[graphics.col_indg++]= alfa;

		graphics.pos_bufg[graphics.pos_indg++]= cx;
		graphics.pos_bufg[graphics.pos_indg++]= cy;
		graphics.pos_bufg[graphics.pos_indg++]= cz;
		graphics.col_bufg[graphics.col_indg++]= cr;
		graphics.col_bufg[graphics.col_indg++]= cg;
		graphics.col_bufg[graphics.col_indg++]= cb;
		graphics.col_bufg[graphics.col_indg++]= alfa;
	}

	for(var i=0;i<4;i++) {
		fill_corner(i);
	}
}

GroundGear1.prototype.draw0 = function (graphics) {
	var len=this.len;
	var len1=-len*1.4;
	var len2=len*4.8;
	var cx=this.x;
	var cy=this.y;
	var cz=this.z-len;
	var alfa=1.0;
	var rd=0.2, gr=0.2, bl=0.2;

	var ax=[this.x-len, this.x+len, this.x+len, this.x-len];
	var ay=[this.y-len, this.y-len, this.y+len, this.y+len];
	var az=[this.z-len, this.z-len, this.z-len, this.z-len];
	var aax=[this.x-len, this.x+len2, this.x+len, this.x-len2];
	var aay=[this.y-len2, this.y-len, this.y+len2, this.y+len];
	var aaz=[this.z-len1, this.z-len1, this.z-len1, this.z-len1];
	var abx=[this.x+len, this.x+len2, this.x-len, this.x-len2];
	var aby=[this.y-len2, this.y+len, this.y+len2, this.y-len];
	var abz=[this.z-len1, this.z-len1, this.z-len1, this.z-len1];
	var ar=[0.8, 0.2, 0.2, 0.7];
	var ag=[0.2, 0.8, 0.2, 0.7];
	var ab=[0.2, 0.2, 0.8, 0.2];

	function fill_corner(i) {
		var j=(i+1)%4;
		graphics.pos_bufg[graphics.pos_indg++]= ax[i];
		graphics.pos_bufg[graphics.pos_indg++]= ay[i];
		graphics.pos_bufg[graphics.pos_indg++]= az[i];
		graphics.col_bufg[graphics.col_indg++]= ar[i];
		graphics.col_bufg[graphics.col_indg++]= ag[i];
		graphics.col_bufg[graphics.col_indg++]= ab[i];
		graphics.col_bufg[graphics.col_indg++]= alfa;

		graphics.pos_bufg[graphics.pos_indg++]= aax[i];
		graphics.pos_bufg[graphics.pos_indg++]= aay[i];
		graphics.pos_bufg[graphics.pos_indg++]= aaz[i];
		graphics.col_bufg[graphics.col_indg++]= 0;
		graphics.col_bufg[graphics.col_indg++]= 0;
		graphics.col_bufg[graphics.col_indg++]= 0;
		graphics.col_bufg[graphics.col_indg++]= alfa;

		graphics.pos_bufg[graphics.pos_indg++]= cx;
		graphics.pos_bufg[graphics.pos_indg++]= cy;
		graphics.pos_bufg[graphics.pos_indg++]= cz;
		graphics.col_bufg[graphics.col_indg++]= rd;
		graphics.col_bufg[graphics.col_indg++]= gr;
		graphics.col_bufg[graphics.col_indg++]= bl;
		graphics.col_bufg[graphics.col_indg++]= alfa;

		graphics.pos_bufg[graphics.pos_indg++]= cx;
		graphics.pos_bufg[graphics.pos_indg++]= cy;
		graphics.pos_bufg[graphics.pos_indg++]= cz;
		graphics.col_bufg[graphics.col_indg++]= rd;
		graphics.col_bufg[graphics.col_indg++]= gr;
		graphics.col_bufg[graphics.col_indg++]= bl;
		graphics.col_bufg[graphics.col_indg++]= alfa;

		graphics.pos_bufg[graphics.pos_indg++]= aax[i];
		graphics.pos_bufg[graphics.pos_indg++]= aay[i];
		graphics.pos_bufg[graphics.pos_indg++]= aaz[i];
		graphics.col_bufg[graphics.col_indg++]= 0;
		graphics.col_bufg[graphics.col_indg++]= 0;
		graphics.col_bufg[graphics.col_indg++]= 0;
		graphics.col_bufg[graphics.col_indg++]= alfa;

		graphics.pos_bufg[graphics.pos_indg++]= abx[i];
		graphics.pos_bufg[graphics.pos_indg++]= aby[i];
		graphics.pos_bufg[graphics.pos_indg++]= abz[i];
		graphics.col_bufg[graphics.col_indg++]= 0;
		graphics.col_bufg[graphics.col_indg++]= 0;
		graphics.col_bufg[graphics.col_indg++]= 0;
		graphics.col_bufg[graphics.col_indg++]= alfa;

		graphics.pos_bufg[graphics.pos_indg++]= cx;
		graphics.pos_bufg[graphics.pos_indg++]= cy;
		graphics.pos_bufg[graphics.pos_indg++]= cz;
		graphics.col_bufg[graphics.col_indg++]= rd;
		graphics.col_bufg[graphics.col_indg++]= gr;
		graphics.col_bufg[graphics.col_indg++]= bl;
		graphics.col_bufg[graphics.col_indg++]= alfa;

		graphics.pos_bufg[graphics.pos_indg++]= ax[j];
		graphics.pos_bufg[graphics.pos_indg++]= ay[j];
		graphics.pos_bufg[graphics.pos_indg++]= az[j];
		graphics.col_bufg[graphics.col_indg++]= ar[j];
		graphics.col_bufg[graphics.col_indg++]= ag[j];
		graphics.col_bufg[graphics.col_indg++]= ab[j];
		graphics.col_bufg[graphics.col_indg++]= alfa;
	}

	for(var i=0;i<4;i++) {
		fill_corner(i);
	}
}
