// Globalize canvas and quatanian
var c;
var q = new qtnIV();
var qt = q.identity(q.create());
var prog_fireworks = null;
var loc_fireworks = null;
var stride_fireworks = null;
var prog_ground = null;
var loc_ground = null;
var stride_ground = null;
var mouseOn = false;
var mx;
var my;
var prg_fireworks = null;
var x=0;
var y=-2.0;
var z=0;
var vx=0.03;
var vy=-0.0;
var vz=0.052;
var pvx=0.003;
var pvy=0.01;
var pvz=0;
var vel=0.0005;
var life=200;
var llife=40;
var start=0;
var end=160;
var numTails=20;
var gx=0;
var gy=5;
var gz=0;
var gvx=0;
var gvy=-0.05;
var gvz=0;
var gNumTails=30;
var lgvy=-0.12;
var r=0.2;
var g=1.0;
var b=0.2;
var r2=0.2;
var g2=1.0;
var b2=0.0;
var lr=0.8;
var lg=1.0;
var lb=0.3;
var pointLife=200;
var groundX=0;
var groundY=0;
var groundZ=30;
var lgravity = 0.0003;
var randomRatio = 0.05;
var radDiffuse=5;
var starDiffuse=0.00023;
var gravity  = 0.000015;

function randomColor() {
  return {
    r: Math.random(),
    g: Math.random(),
    b: Math.random()
  }
}

function standardColor () {
  return {
    r: 0.9,
    g: 0.72,
    b: 0.4
  }
}

function LaunchPeony (start1) {
  var x=0;
  var y=0;
  var z=groundZ-2;
  var ratio=0.006;
  var zratio=0.3;
  var rnd=200;
  var th=Math.floor(Math.random()*rnd)*Math.PI*2/rnd;
  var fwsize=zratio*Math.random()+0.9;
  var vx=ratio*Math.cos(th);
  var vy=ratio*Math.sin(th);
  var vz=-0.4*fwsize;
  var gravity = 0.000002;
  var life=10;
  var start=start1;
  var end=start1+100;
  var num_points=globalNumPoints;
  var r=Math.random()*0.5+0.5;//globalR;
  var g=Math.random()*0.5+0.5;//globalG;
  var b=Math.random()*0.5+0.5;//globalB;
  var pgravity=globalPGravity;
  var randomRatio=globalRandomRatio;
  var diffuse=Math.floor(fwsize*5);//globalDiffuse;
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
  var r=Math.random()*0.6+0.4;
  var g=Math.random()*0.6+0.4;
  var b=Math.random()*0.6+0.4;
  var rad=5;
  var svel = 0.084;
  var p=new Shell (px, py, pz, gravity, life+pointLife, start, end, rad, svel, numTails, r, g, b);
  var c=new Combo(s, p);
  //c.time=start1;
  c.setTime(start1);
  return c;
}

function FireworksSet(n, life) {
  this.size=n/2;
  this.a=[];
  this.b=[];
  this.life=life;
  this.diff=life/2/this.size;

  for (var i=0;i<this.size;i++) {
    var x = LaunchPeony(i*this.diff);
    x.setLife(this.life);
    x.setTime(0);
    this.a[i]=x;
    x = LaunchPeony(i*this.diff);
    x.setLife(this.life);
    x.setTime(-life/2);
    this.b[i]=x;
  }
}

FireworksSet.prototype.proceed=function() {
  for (var i=0;i<this.size;i++) {
    if(this.a[i].proceed()) {
      var x = LaunchPeony(i*this.diff);
      x.setTime(0);
      this.a[i]=x;
    }
    if(this.b[i].proceed()) {
      var x = LaunchPeony(i*this.diff);
      x.setTime(0);
      this.b[i]=x;
    }
  }
}

FireworksSet.prototype.draw=function(graphics) {
  for (var i=0;i<this.size;i++) {
    this.a[i].draw(graphics);
  }
  for (var i=0;i<this.size;i++) {
    this.b[i].draw(graphics);
  }
}


var set=new FireworksSet(64, 600);
var ground = new GroundGear1(groundX, groundY, groundZ, 2, 200, 0);
var selectedCamera=0;
var cycleMax=1024;
var cycle=cycleMax;

function selectMoveAction() {
  var selector=document.getElementById("cameraSelector");
  selectedCamera=selector.selectedIndex;
  cycle = cycleMax;
}

onload = function(){
  c = document.getElementById('night_sky');
  c.width = 800;
  c.height = 800;
  c.addEventListener("mousedown", mouseDown);
  c.addEventListener("mouseup", mouseUp);

  // Register event
  c.addEventListener('mousemove', mouseMove, true);
	var gl = c.getContext('webgl') || c.getContext('experimental-webgl');
	var pointSizeRange = gl.getParameter(gl.ALIASED_POINT_SIZE_RANGE);
	// Creation of Vertex shader and fragrment shader
	var v_shader_fireworks = create_shader('vs');
	var f_shader_fireworks = create_shader('fs');

	prg_fireworks = create_program(v_shader_fireworks, f_shader_fireworks);

	loc_fireworks = new Array();
	loc_fireworks[0] = gl.getAttribLocation(prg_fireworks, 'position');
	loc_fireworks[1] = gl.getAttribLocation(prg_fireworks, 'color');
	loc_ground = new Array();
	loc_ground[0] = gl.getAttribLocation(prg_fireworks, 'position');
	loc_ground[1] = gl.getAttribLocation(prg_fireworks, 'color');

	stride_fireworks = new Array();
	stride_fireworks[0] = 3;
	stride_fireworks[1] = 4;
	stride_ground = new Array();
	stride_ground[0] = 3;
	stride_ground[1] = 4;
  var position1 = [];
	var color1 = [];
  var position2 = [];
	var color2 = [];
  var graphics = {
    pos_buf1: [],
    pos_ind1: 0,
    col_buf1: [],
    col_ind1: 0,
    pos_buf2: [],
    pos_ind2: 0,
    col_buf2: [],
    col_ind2: 0,
    pos_bufg: [],
    pos_indg: 0,
    col_bufg: [],
    col_indg: 0
  };

	var lPos1 = create_vbo(graphics.pos_buf1);
	var lCol1 = create_vbo(graphics.col_buf1);
	var lVBOList = [lPos1, lCol1];

	var uniLocation_fireworks = new Array();
	uniLocation_fireworks[0]  = gl.getUniformLocation(prg_fireworks, 'mvpMatrix');
	uniLocation_fireworks[1]  = gl.getUniformLocation(prg_fireworks, 'pointSize');
	var uniLocation_ground    = new Array();
	uniLocation_ground[0]     = gl.getUniformLocation(prg_fireworks, 'mvpMatrix');
	uniLocation_ground[1]     = gl.getUniformLocation(prg_fireworks, 'pointSize');

	var m = new matIV();
	var mMatrix   = m.identity(m.create());
	var vMatrix   = m.identity(m.create());
	var pMatrix   = m.identity(m.create());
	var tmpMatrix = m.identity(m.create());
	var mvpMatrix = m.identity(m.create());
	var qMatrix   = m.identity(m.create());

	gl.enable(gl.DEPTH_TEST);
	gl.depthFunc(gl.LEQUAL);

  var pointSize1 = 2;
  var pointSize2 = 2;
  var cameras = [Camera0];
  var cameraIndex=cameras.length-1;
  var myCamera;
  var selector=document.getElementById("cameraSelector");
  for(var i in cameras) {
    var j=parseInt(i, 10)+1;
    var camera=new cameras[i]();
    var name=j+". "+camera.name;
    var option = document.createElement('option');
    option.setAttribute('value', i);
    option.innerHTML = name;
    selector.appendChild(option);
  }

  var mouseOn = false;

  function mouseDown(e) {
      mouseOn=true;
      mx=e.clientX;
      my=e.clientY;
  }

  function mouseUp(e) {
      mouseOn=false;
  }

  // Mouse Event Handling
  function mouseMove(e){
      if(mouseOn) {
  		var cw = c.width;
  		var ch = c.height;
  		var wh = 1 / Math.sqrt(cw * cw + ch * ch);
  		var x = mx - e.clientX;
  		var y = my - e.clientY;
      console.log("mouse "+x+","+y);
  		var sq = Math.sqrt(x * x + y * y);
  		var r = sq * 2.0 * Math.PI * wh;
  		if(sq != 1){
  			sq = 1 / sq;
  			x *= sq / 4;
  			y *= sq / 4;
  		}
  		q.rotate(r, [x, y, 0.0], qt);
  	}
  }

	// Infinitive Loop
	(function(){
    if(cycle++ >= cycleMax) {
      cycle=0;
      myCamera=new cameras[cameraIndex]();
      var name=myCamera.name;
      var tag=document.getElementById('camera_name');
      tag.innerHTML=name;
      $("#camera_name").value=name;
    }
		gl.clearColor(0.0, 0.0, 0.0, 1.0);
		gl.clearDepth(1.0);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    draw(set);

    set.proceed();
    if(ground!=null) {
      ground.proceed();
    }

    var cam = myCamera.getCameraInfo();
		m.lookAt(cam[0], cam[1], cam[2], vMatrix);
		m.multiply(vMatrix, qMatrix, vMatrix);
		m.perspective(45, c.width / c.height, 0.01, 1000, pMatrix);
		m.multiply(pMatrix, vMatrix, tmpMatrix);

    var lPos1 = create_vbo(graphics.pos_buf1);
		var lCol1 = create_vbo(graphics.col_buf1);
		var lVBOList1 = [lPos1, lCol1];
    var lPos2 = create_vbo(graphics.pos_buf2);
		var lCol2 = create_vbo(graphics.col_buf2);
		var lVBOList2 = [lPos2, lCol2];

    set_attribute(lVBOList1, loc_fireworks, stride_fireworks);
  	m.identity(mMatrix);
  	m.rotate(mMatrix, Math.PI / 2, [1, 0, 0], mMatrix);
  	m.scale(mMatrix, [3.0, 3.0, 1.0], mMatrix);
  	m.multiply(tmpMatrix, mMatrix, mvpMatrix);
  	gl.uniformMatrix4fv(uniLocation_fireworks[0], false, mvpMatrix);
  	gl.uniform1f(uniLocation_fireworks[1], pointSize1);
    if(graphics.pos_buf1.length>0) {
    	gl.drawArrays(gl.POINTS, 0, graphics.pos_buf1.length / 3);
  	  gl.flush();
    }
  	set_attribute(lVBOList2, loc_fireworks, stride_fireworks);
  	m.identity(mMatrix);
  	m.rotate(mMatrix, Math.PI / 2, [1, 0, 0], mMatrix);
  	m.scale(mMatrix, [3.0, 3.0, 1.0], mMatrix);
  	m.multiply(tmpMatrix, mMatrix, mvpMatrix);
  	gl.uniformMatrix4fv(uniLocation_fireworks[0], false, mvpMatrix);
  	gl.uniform1f(uniLocation_fireworks[1], pointSize2);
    if(graphics.pos_buf2.length>0) {
    	gl.drawArrays(gl.POINTS, 0, graphics.pos_buf2.length / 3);
  		gl.flush();
    }

    if(graphics.pos_bufg.length>0) {
      h=create_vbo(graphics.pos_bufg);
  	  g=create_vbo(graphics.col_bufg);
      set_attribute([h,g],loc_ground,stride_ground);
  	  gl.uniformMatrix4fv(uniLocation_ground[0],!1,mvpMatrix);
  	  gl.uniform1f(uniLocation_ground[1],3);
  	  gl.drawArrays(gl.TRIANGLE_STRIP,0,graphics.pos_bufg.length/3);
  	  gl.flush();
    }
    setTimeout(arguments.callee, 1000 / 30);
	})();

	function create_shader(id){
		var shader;
    var scriptElement = document.getElementById(id);
		if(!scriptElement){return;}
		switch(scriptElement.type){
			case 'x-shader/x-vertex':
				shader = gl.createShader(gl.VERTEX_SHADER);
				break;
			case 'x-shader/x-fragment':
				shader = gl.createShader(gl.FRAGMENT_SHADER);
				break;
			default :
				return;
		}
		gl.shaderSource(shader, scriptElement.text);
		gl.compileShader(shader);
		if(gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
			return shader;
		} else {
			alert(gl.getShaderInfoLog(shader));
		}
	}

	function create_program(vs, fs){
		var program = gl.createProgram();
		gl.attachShader(program, vs);
		gl.attachShader(program, fs);
		gl.linkProgram(program);
		if(gl.getProgramParameter(program, gl.LINK_STATUS)){
			gl.useProgram(program);
			return program;
		} else {
			alert(gl.getProgramInfoLog(program));
		}
	}

	function create_vbo(data){
		var vbo = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
		gl.bindBuffer(gl.ARRAY_BUFFER, null);
		return vbo;
	}

	function set_attribute(vbo, attL, attS){
		for(var i in vbo){
			gl.bindBuffer(gl.ARRAY_BUFFER, vbo[i]);
			gl.enableVertexAttribArray(attL[i]);
			gl.vertexAttribPointer(attL[i], attS[i], gl.FLOAT, false, 0, 0);
		}
	}

  function draw(set) {
    graphics = {
      pos_buf1: [],
      pos_ind1: 0,
      col_buf1: [],
      col_ind1: 0,
      pos_buf2: [],
      pos_ind2: 0,
      col_buf2: [],
      col_ind2: 0,
      pos_bufg: [],
      pos_indg: 0,
      col_bufg: [],
      col_indg: 0
    };
    set.draw(graphics);
    ground.draw(graphics);
  }
};
