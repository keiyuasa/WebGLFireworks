var Camera0 = function() {
  var rotation1=0;
  var rDiv1=8503;
  var rotation2=0;
  var rDiv2=1501;
  var rotation3 =0;
  var rDiv3=4108;
  var distance=75.0;
  var distanceAmplitude=21.0;
  var zval=65;
  var zvalAmplitude=10.0;
  var biasY=0;
  var biasX=0;
  var biasZ=0;
  var time=0;
  return {
    name: "Standard",
    getCameraInfo: function() {
      var angle1=Math.PI*2*rotation1/rDiv1;
      if((rotation1++) >= rDiv1)
        rotation1=0;
      var angle2=Math.PI*2*rotation2/rDiv2;
      if((rotation2++) >= rDiv2)
        rotation2=0;
      var angle3=Math.PI*2*rotation3/rDiv3;
      if((rotation3++) >= rDiv3)
        rotation3=0;
      var d=distance+distanceAmplitude*Math.cos(angle2);
      var x=d*Math.cos(angle1)+biasX;
      var y=d*Math.sin(angle1)+biasY;
      var z=zval+zvalAmplitude*Math.sin(angle3);
      x=d*Math.cos(angle1);
      y=20;
      z=d*Math.sin(angle1);
      return [[ x, y, z],[0, 0, 0], [0, 1, 0]];
    }
  }
};

var Camera1 = function() {
  var min=30;
  var max=200;
  var diff=1;
  var distance=max;
  return {
    name: "Go-in/Go-out",
    getCameraInfo: function() {
      var x = distance;
      distance += diff;
      if(distance<min) {
        diff=1;
      }
      if(distance>max) {
        diff=-0.2;
      }
      var y=0.1;
      var z=5;
      return [[ x, y, z],[0, 0, 0], [0, 1, 0]];
    }
  };
};

var Camera2 = function() {
  var thetaMin=0;
  var thetaMax=2*Math.PI;
  var theta=0;
  var thetaDiff=0.02;
  var r=70;
  return {
    name: "Spinning Around",
    getCameraInfo: function() {
      var t = theta;
      theta += thetaDiff;
      if(theta>thetaMax) {
        theta=thetaMin;
      }
      var x=r*Math.sin(t);
      var y=r*Math.cos(t);
      var z=r;
      return [[ x, y, z],[0, 0, 0], [0, 1, 0]];
    }
  };
};

var Camera3 = function() {
  var rotation1=0;
  var rDiv1=1024;
  var min=-32;
  var max=20;
  var speed=0.2;
  var diff=speed;
  var distance=min;
  return {
    name: "Tailspin - Looking up",
    getCameraInfo: function() {
      var angle1=Math.PI*2*rotation1/rDiv1;
      var y = distance;
      var x=0;//groundX;
      var z=0;//groundZ;
      var tx=0;
      var ty=100;
      var tz=0;
      distance += diff;
      if(distance<min) {
        diff=speed;
      }
      if(distance>max) {
        diff=-speed;
      }
      var angle1=(Math.PI*2*rotation1)/rDiv1;
      if((rotation1++) >= rDiv1) {
        rotation1=0;
      }
      var d=distance;
      var vx=Math.cos(angle1);
      var vz=Math.sin(angle1);
      return [[ x, y, z],[tx, ty, tz], [vx, 0, vz]];
    }
  };
};

var Camera4 = function() {
  var rotation1=0;
  var rDiv1=1024;
  var min=-10;
  var max=200;
  var speed=1;
  var diff=-speed;
  var distance= max;
  return {
    name: "Tailspin - Looking down",
    getCameraInfo: function() {
      var angle1=Math.PI*2*rotation1/rDiv1;
      var y = distance;
      var x=0;//groundX;
      var z=0;//groundZ;
      var tx=0;
      var ty=-100;
      var tz=0;
      distance += diff;
      if(distance<min) {
        diff=speed;
      }
      if(distance>max) {
        diff=-speed;
      }
      var angle1=(Math.PI*2*rotation1)/rDiv1;
      if((rotation1++) >= rDiv1) {
        rotation1=0;
      }
      var d=distance;
      var vx=Math.cos(angle1);
      var vz=Math.sin(angle1);
      return [[ x, y, z],[tx, ty, tz], [vx, 0, vz]];
    }
  };
};

var Camera5 = function() {
  var x0=0;
  var y0=100;
  var z0=-500;
  var zbase=200;
  var pendulumLength=100;
  var theta=0;
  var thetaDiff=0.02;
  var phy=0;
  var phyDiff=0.001;
  var angle0=0.4;
  var angleMin=-Math.PI*angle0;
  var angleMax=Math.PI*angle0;
  var speed=.01;
  var aSpeed=0.01;
  var diff=-speed;
  var angle= 0;
  return {
    name: "Pendulum",
    getCameraInfo: function() {
      var angle=Math.cos(theta);
      theta+=thetaDiff;
      if(theta>=(2*Math.PI)) theta=0;
      var y=y0-Math.cos(angle)*pendulumLength;
      var x=x0+Math.sin(angle)*pendulumLength;
      var angle1=Math.sin(phy);
      phy+=phyDiff;
      if(phy>=(2*Math.PI)) phy=0;
      var z=zbase+z0*Math.sin(phy);//groundZ;
      var tx=0;
      var ty=0;
      var tz=0;
      var vx=x0-x;
      var vy=y0-y;
      var vz=0;

      return [[ x, y, z],[tx, ty, tz], [vx, vy, vz]];
    }
  };
};
