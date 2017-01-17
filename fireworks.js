var srad=4;
var svel=0.05;

function Star0 () {
  randomRatio = 6.5;
  var num_points = 3;
  var sx=0;
  var sy=0;//groundY+2;
  var sz=0;
  var svx=0.02;
  var svy=-0.30;
  var svz=0.0;
  var slife=180;
  var pgravity = 0.000002;
  var starr=0.5;
  var starg=0.9;
  var starb=1.0;
  var s=new Star (sx, sy, sz, svx, svy, svz, gravity, slife, start, slife, num_points, starr, starg, starb, pgravity);
  return s;
}

function Star1 () {
  var x=0;
  var y=groundY+2;
  var z=0;
  var vx=0.02;
  var vy=0.3;
  var vz=0;
  var vx=0.06;
  var vy=-0.4;
  var vz=0.01;
  var gravity=0.0001;
  var life=200;
  var start=0;
  var end=0;
  var num_points=6;
  var r=0.3;
  var g=1.0;
  var b=0.2;
  var pgravity=0.00002;
  var s=new Star (x, y, z, vx, vy, vz, gravity, life, start, end, num_points, r, g, b, pgravity);
  return s;
}

function Pointer () {
  var x=0;
  var y=1;
  var z=0;
  var vx=0.006;
  var vy=0.004;
  var vz=0.01;
  var gravity=0.0001;
  var life=200;
  var p=new Point (x, y, z, vx, vy, vz, gravity, life, 0);
  return p;
}

function SparkObj () {
  var x=0;
  var y=1;
  var z=0;
  var vx=0.006;
  var vy=0.004;
  var vz=0.01;
  var gravity=0.0001;
  var sparkLife=120;
  var p=new Spark (x, y, z, vx, vy, vz, gravity, sparkLife, 0);
  return p;
}

function SparkObj2 () {
  var x=-2;
  var y=1;
  var z=0;
  var vx=-0.008;
  var vy=0.004;
  var vz=0.01;
  var r=0.3;
  var g=1.0;
  var b=0.8;
  var gravity=0.0001;
  var sparkLife=200;
  var p=new Spark (x, y, z, vx, vy, vz, gravity, sparkLife, 0);
  p.setColor(r, g, b);
  return p;
}

function ShootingStar0 () {
  var x=0;
  var y=0;
  var z=groundZ;
  var vx=0;
  var vy=0;
  var vz=-0.45;
  var gravity = 0.000002;
  var life=10;
  var start=0;
  var end=100;
  var num_points=globalNumPoints;
  var r=globalR;
  var g=globalG;
  var b=globalB;
  var pgravity=globalPGravity;
  var randomRatio=globalRandomRatio;
  var diffuse=globalDiffuse;
  var pointLife=40;
  var s=new ShootingStar(x, y, z, vx, vy, vz, gravity, life, start, end, num_points, r, g, b, pgravity, randomRatio, diffuse, pointLife);
  return s;
}

function ShootingStar1 () {
  var p=0;
  var y=0;
  var z=0;
  var vx=0.025;
  var vy=-0.6;
  var vz=0.15;
  var gravity = 0.000005;
  var life=300;
  var start=0;
  var end=120;
  var num_points=100;
  var r=1.0;
  var g=0.5;
  var b=0.2;
  var pgravity=0.0000001;
  var randomRatio=6;
  var diffuse=0.03;
  var pointLife=40;
  var s=new ShootingStar(x, y, z, vx, vy, vz, gravity, life, start, end, num_points, r, g, b, pgravity, randomRatio, diffuse, pointLife);
  return s;
}

function CircleShooter () {
  var shooters=new Array();
  randomRatio = 6.5;
  var num_points = 120;
  var sx=100;
  var sy=groundY;
  var sz=0;
  var svx=0.0;
  var svy=-0.13;
  var svz=0.0;
  var slife=150;
  var sc=new standardColor();

  var s0=new ShootingStar (sx, sy, sz, svx, svy, svz, gravity, slife, start, slife, num_points, sc.r, sc.g, sc.b);
  sx=-100;
  var s1=new ShootingStar (sx, sy, sz, svx, svy, svz, gravity, slife, start, slife, num_points, sc.r, sc.g, sc.b);
  return new Combo(s0, s1);
}

function SetOfFireworks() {
  var rnd=Math.random()*5;
  var th=Math.PI*rnd/500.0;
  var sth=Math.sin(th);
  var cth=Math.cos(th);
  rnd=Math.random()*1000;
  var phy=2*Math.PI*rnd/1000;
  var sph=Math.sin(phy);
  var cph=Math.cos(phy);
  lgravity = 0.0001;
  gravity  = 0.000015;
  pgravity  = 0.000005;
  gvy=cth;
  gvx=sth*sph;
  gvz=sth*cph;
  start = 100;
  end = start+500;
  life = 600;
  srad=4;
  svel=0.05;
  var t=start;
  x=gx+gvx*t;
  y=gy+lgvy*t+lgravity*t*t;
  z=gz+gvz*t;
  gravity = 0.000018;
  gravity = 0.000028;
  numTails=90;
  gNumTails=2;
  r=Math.random()*0.35+0.65;
  g=Math.random()*0.60+0.40;
  b=Math.random()*0.70+0.30;
  var obj0 = new Launcher (gx, gy, gz, gvx, lgvy, gvz, vel, lgravity, llife, srad, svel, gNumTails, lr, lg, lb, pgravity);
  var obj1 = new Shell (x, y, z, gravity, life, start, end, srad, svel, numTails, r, g, b, pgravity);
  return new Combo(obj0, obj1);
}

function RisingDragon() {
  var rnd=Math.random()*5;
  var th=Math.PI*rnd/500.0;
  var sth=Math.sin(th);
  var cth=Math.cos(th);
  rnd=Math.random()*1000;
  var phy=2*Math.PI*rnd/1000;
  var sph=Math.sin(phy);
  var cph=Math.cos(phy);
  lgravity = 0.0001;
  gravity  = 0.000015;
  gvy=cth;
  gvx=sth*sph;
  gvz=sth*cph;
  start = 100;
  end = start+500;
  life = 600;
  srad=4;
  svel=0.05;
  var t=start;
  x=gx+gvx*t;
  y=gy+lgvy*t+lgravity*t*t;
  z=gz+gvz*t;
  gravity = 0.000018;
  gravity = 0.000020;
  numTails=90;
  gNumTails=4;
  r=Math.random()*0.35+0.65;
  g=Math.random()*0.60+0.40;
  b=Math.random()*0.70+0.30;
  var obj0 = new Launcher (gx, gy, gz, gvx, lgvy, gvz, vel, lgravity, llife, srad, svel, gNumTails, lr, lg, lb);
  var numChildren=4;
  var children=new Array();
  for (var i=0;i<numChildren;i++) {
    var cx=x*i/(numChildren+1);
    var cy=y*i/(numChildren+1);
    var cz=z*i/(numChildren+1);
    var cstart=start*i/(numChildren+1);
    var cend = cstart+4;
    var rc=standardColor();
    numTails = 2;
    pointLife = 0;
    srad = 2;
    svel = 0.05;
    children[i]=(new Shell (cx, cy, cz, gravity, life+pointLife, cstart, cend, srad, svel, numTails, rc.r, rc.g, rc.b));
  }
  numTails=30;
  svel=0.08;
  srad=4;
  end = start+50;
  var obj1 = new Shell (x, y, z, gravity, life, start, end, srad, svel, numTails, r, g, b);
  return new Combo(obj0/*, children[0], children[1], children[2]*/, obj1);
}

function BrocadeCrown() {
  var x=0;
  var y=0;
  var z=-10;
  var gravity = 0.0006;
  var life=320;
  var start=0;
  var end=120;
  var rad=5;
  var vel=0.1;
  var num_points=24;
  var r=0.9;
  var g=0.72;
  var b=0.4;
  var pgravity=0.0001;//globalPGravity;
  var randomRatio=globalRandomRatio;
  var diffuse=globalDiffuse;
  var randomRatio=0.0003;
  var diffuse=0.0002;
  var s=new Shell (x, y, z, gravity, life, start, end, rad, vel, num_points, r, g, b, pgravity, randomRatio, diffuse);
  return s;
}

function PeonyShell() {
  var x=0;
  var y=0;
  var z=-10;
  var numTails = 20;
  var pointLife = 10;
  var svel = 0.084;
  var r=globalR;
  var g=globalG;
  var b=globalB;
  return new Shell (x, y, z, gravity, life+pointLife, start, end, srad, svel, numTails, r, g, b);
}

function ChrysanthemumShell() {
  var rc=randomColor();
  numTails = 20;
  pointLife = 80;
  life=start+pointLife+300;
  svel = 0.084;
  return new Shell (x, y, z, gravity, life, start, end, srad, svel, numTails, rc.r, rc.g, rc.b);
}

function SmallShell() {
  var rc=standardColor();
  numTails = 2;
  pointLife = 0;
  srad = 2;
  svel = 0.05;
  return new Shell (x, y, z, gravity, life+pointLife, start, end, srad, svel, numTails, rc.r, rc.g, rc.b);
}

function LaunchPeony () {
  var x=0;
  var y=0;
  var z=groundZ;
  var ratio=0.02;
  var rnd=100;
  var th=Math.floor(Math.random()*rnd)*Math.PI*2/rnd;
  var vx=ratio*Math.cos(th);
  var vy=ratio*Math.sin(th);
  var vz=-0.36;
  var gravity = 0.000002;
  var life=10;
  var start=0;
  var end=100;
  var num_points=globalNumPoints;
  var r=globalR;
  var g=globalG;
  var b=globalB;
  var pgravity=globalPGravity;
  var randomRatio=globalRandomRatio;
  var diffuse=globalDiffuse;
  var pointLife=40;
  var s=new ShootingStar(x, y, z, vx, vy, vz, gravity, life, start, end, num_points, r, g, b, pgravity, randomRatio, diffuse, pointLife);
  var ptime=end-start;
  var px=x+vx*ptime;
  var py=y+vy*ptime;
  var pz=z+vz*ptime+gravity*ptime*ptime;
  start=end;
  end=start+200;
  var numTails = 20;
  var pointLife = 10;
  var r=globalR;
  var g=globalG;
  var b=globalB;
  var rad=5;
  var svel = 0.084;
  var p=new Shell (px, py, pz, gravity, life+pointLife, start, end, rad, svel, numTails, r, g, b);
  return new Combo(s, p);
}

function LaunchBrocadeCrown () {
  var x=0;
  var y=0;
  var z=groundZ;
  var ratio=0.02;
  var rnd=100;
  var th=Math.floor(Math.random()*rnd)*Math.PI*2/rnd;
  var vx=ratio*Math.cos(th);
  var vy=ratio*Math.sin(th);
  var vz=-0.45;
  var gravity = 0.000001;
  var life=10;
  var start=0;
  var end=100;
  var num_points=globalNumPoints;
  var r=globalR;
  var g=globalG;
  var b=globalB;
  var pgravity=globalPGravity;
  var randomRatio=globalRandomRatio;
  var diffuse=globalDiffuse;
  var pointLife=40;
  var s=new ShootingStar(x, y, z, vx, vy, vz, gravity, life, start, end, num_points, r, g, b, pgravity, randomRatio, diffuse, pointLife);
  var ptime=end-start;
  var px=x+vx*ptime;
  var py=y+vy*ptime;
  var pz=z+vz*ptime+gravity*ptime*ptime;
  start=end;
  end=start+200;
  var gravity = 0.0006;
  var life=320;
  var rad=5;
  var vel=0.07;
  var num_points=24;
  var r=0.9;
  var g=0.72;
  var b=0.4;
  var pgravity=0.0001;//globalPGravity;
  var randomRatio=globalRandomRatio;
  var diffuse=globalDiffuse;
  var randomRatio=0.0003;
  var diffuse=0.0002;
  var p=new Shell (px, py, pz, gravity, life, start, end, rad, vel, num_points, r, g, b, pgravity, randomRatio, diffuse);
  return new Combo(s, p);
}

function LaunchChrysanthemum () {
  var x=0;
  var y=0;
  var z=groundZ;
  var ratio=0.02;
  var rnd=100;
  var th=Math.floor(Math.random()*rnd)*Math.PI*2/rnd;
  var vx=ratio*Math.cos(th);
  var vy=ratio*Math.sin(th);
  var vz=-0.3;
  var gravity = 0.000002;
  var life=10;
  var start=0;
  var end=100;
  var num_points=globalNumPoints;
  var r=globalR;
  var g=globalG;
  var b=globalB;
  var pgravity=globalPGravity;
  var randomRatio=globalRandomRatio;
  var diffuse=globalDiffuse;
  var pointLife=40;
  var s=new ShootingStar(x, y, z, vx, vy, vz, gravity, life, start, end, num_points, r, g, b, pgravity, randomRatio, diffuse, pointLife);
/*
  var ptime=end-start;
  var px=x+vx*ptime;
  var py=y+vy*ptime;
  var pz=z+vz*ptime+gravity*ptime*ptime;
  start=end;
  end=start+200;
  var gravity = 0.00006;
  var life=320;
  var rad=5;
  var vel=0.001;
  var num_points=globalNumPoints;
  var r=globalR;
  var g=globalG;
  var b=globalB;
  var pgravity=globalPGravity;
  var randomRatio=globalRandomRatio;
  var diffuse=globalDiffuse;
  */
  var ptime=end-start;
  var px=x+vx*ptime;
  var py=y+vy*ptime;
  var pz=z+vz*ptime+gravity*ptime*ptime;
  start=end;
  end=start+180;
  var numTails = 16;
  var pointLife = 10;
  var num_points=40;//globalNumPoints;
  var r=globalR;
  var g=globalG;
  var b=globalB;
  var rad=3;
  var vel = 0.07;
  var randomRatio=0.005;
  var diffuse=0.01;

  var p=new Shell (px, py, pz, gravity, life, start, end, rad, vel, num_points, r, g, b, pgravity, randomRatio, diffuse);
  return new Combo(s, p);
}

function LaunchPlum () {
  var x=0;
  var y=0;
  var z=groundZ;
  var ratio=0.02;
  var rnd=100;
  var th=Math.floor(Math.random()*rnd)*Math.PI*2/rnd;
  var vx=ratio*Math.cos(th);
  var vy=ratio*Math.sin(th);
  var vz=-0.4;
  var gravity = 0.000002;
  var life=10;
  var start=0;
  var end=100;
  var num_points=globalNumPoints;
  var r=globalR;
  var g=globalG;
  var b=globalB;
  var pgravity=globalPGravity;
  var randomRatio=globalRandomRatio;
  var diffuse=globalDiffuse;
  var pointLife=40;
  var s=new ShootingStar(x, y, z, vx, vy, vz, gravity, life, start, end, num_points, r, g, b, pgravity, randomRatio, diffuse, pointLife);
  var ptime=end-start;
  var px=x+vx*ptime;
  var py=y+vy*ptime;
  var pz=z+vz*ptime+gravity*ptime*ptime;
  start=end;
  end=start+200;
  var num_points=globalNumPoints;
  var r=globalR;
  var g=globalG;
  var b=globalB;
  var pgravity=globalPGravity;
  var randomRatio=globalRandomRatio;
  var diffuse=globalDiffuse;
  var rad=globalRad;
  var vel=0.09;
  var randomRatio=0.03;
  var diffuse=0.005;
  var p=new Shell (px, py, pz, gravity, life, start, end, rad, vel, num_points, r, g, b, pgravity, randomRatio, diffuse);
  return new Combo(s, p);
}

function LaunchPalm () {
  var x=0;
  var y=0;
  var z=groundZ;
  var ratio=0.02;
  var rnd=100;
  var th=Math.floor(Math.random()*rnd)*Math.PI*2/rnd;
  var vx=ratio*Math.cos(th);
  var vy=ratio*Math.sin(th);
  var vz=-0.4;
  var gravity = 0.000002;
  var life=10;
  var start=0;
  var end=100;
  var num_points=100;//globalNumPoints;
  var r=globalR;
  var g=globalG;
  var b=globalB;
  var pgravity=globalPGravity;
  var randomRatio=globalRandomRatio;
  var diffuse=globalDiffuse;
  var pointLife=40;
  var s=new ShootingStar(x, y, z, vx, vy, vz, gravity, life, start, end, num_points, r, g, b, pgravity, randomRatio, diffuse, pointLife);
  var ptime=end-start;
  var px=x+vx*ptime;
  var py=y+vy*ptime;
  var pz=z+vz*ptime+gravity*ptime*ptime;
  start=end;
  end=start+200;
  var num_points=globalNumPoints;
  var r=globalR;
  var g=globalG;
  var b=globalB;
  var pgravity=globalPGravity;
  var randomRatio=0.01; //globalRandomRatio;
  var diffuse=3; //globalDiffuse;
  var rad=3;//globalRad;
  var vel=0.06;
  var diffuse=0.02;
  var p=new Shell (px, py, pz, gravity, life, start, end, rad, vel, num_points, r, g, b, pgravity, randomRatio, diffuse);
  return new Combo(s, p);
}

function LaunchCustom () {
  var x=0;
  var y=0;
  var z=groundZ;
  var ratio=0.02;
  var rnd=100;
  var th=Math.floor(Math.random()*rnd)*Math.PI*2/rnd;
  var vx=ratio*Math.cos(th);
  var vy=ratio*Math.sin(th);
  var vz=-0.36;
  var gravity = 0.000005;
  var life=10;
  var start=0;
  var end=100;
  var num_points=globalTailLength;
  var r=globalR;
  var g=globalG;
  var b=globalB;
  var pgravity=globalPGravity;
  var randomRatio=globalRandomRatio;
  var diffuse=globalDiffuse;
  var pointLife=10;
  var s=new ShootingStar(x, y, z, vx, vy, vz, gravity, life, start, end, num_points, r, g, b, pgravity, randomRatio, diffuse, pointLife);
  var ptime=end-start;
  var px=x+vx*ptime;
  var py=y+vy*ptime;
  var pz=z+vz*ptime+gravity*ptime*ptime;

  start=end;
  end=start+200;
  var numTails = globalNumPoints;
  var pointLife = 10;
  var r=globalR;
  var g=globalG;
  var b=globalB;
  var rad=globalRad;
  var svel = 0.07;
  var randomRatio=globalRandomRatio;
  var diffuse=0.9;
  var pointLife=200;
  var p=new Shell (px, py, pz, gravity, life+pointLife, start, end, rad, svel, numTails, r, g, b, pgravity, randomRatio, diffuse, pointLife);
  return new Combo(s, p);
}
