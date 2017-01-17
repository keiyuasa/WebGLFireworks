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

var generatorFunctions = [
  LaunchPlum, LaunchPeony,
  LaunchChrysanthemum, LaunchBrocadeCrown,
];
var genIndex=0;
function setGenerators(selected) {
  switch (selected) {
    case "All":
      console.log("All");
      generatorFunctions = [
        LaunchPalm, LaunchPlum, LaunchPeony,
        LaunchChrysanthemum, LaunchBrocadeCrown,
      ];
      break;
    case "Palm":
        console.log("Palm");
        generatorFunctions = [LaunchPalm];
        break;
    case "Plum":
      console.log("Plum");
      generatorFunctions = [LaunchPlum];
      break;
    case "Peony":
      console.log("Peony");
      generatorFunctions = [LaunchPeony];
      break;
    case "Chrysanthemum":
      console.log("Chrysanthemum");
      generatorFunctions = [LaunchChrysanthemum];
      break;
    case "Brocade":
      console.log("Brocade");
      generatorFunctions = [LaunchBrocadeCrown];
      break;
    case "Custom":
      generatorFunctions = [LaunchCustom];
      break;
  }
  var genIndex=0;
}

setGenerators("Custom");

obj = generatorFunctions[genIndex]();
genIndex++;
if(genIndex==generatorFunctions.length) {
  genIndex=0;
}

var ground = new GroundGear(groundX, groundY, groundZ, 2, 200, 0);

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

onload = function(){
	// Get canvas element
	c = document.getElementById('night_sky');
	c.width = 800;
	c.height = 800;
	c.addEventListener("mousedown", mouseDown);
	c.addEventListener("mouseup", mouseUp);

	// Register event
	c.addEventListener('mousemove', mouseMove, true);

	// Get webgl Context
	var gl = c.getContext('webgl') || c.getContext('experimental-webgl');

	var pointSizeRange = gl.getParameter(gl.ALIASED_POINT_SIZE_RANGE);

	// Creation of Vertex shader and fragrment shader
	var v_shader_fireworks = create_shader('vs');
	var f_shader_fireworks = create_shader('fs');

	// create program object
	prg_fireworks = create_program(v_shader_fireworks, f_shader_fireworks);

	// attributeLocationを配列に取得
	loc_fireworks = new Array();
	loc_fireworks[0] = gl.getAttribLocation(prg_fireworks, 'position');
	loc_fireworks[1] = gl.getAttribLocation(prg_fireworks, 'color');
	loc_ground = new Array();
	loc_ground[0] = gl.getAttribLocation(prg_fireworks, 'position');
	loc_ground[1] = gl.getAttribLocation(prg_fireworks, 'color');

	// attributeの要素数を配列に格納
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

	// 線のVBO生成
	var lPos1 = create_vbo(graphics.pos_buf1);
	var lCol1 = create_vbo(graphics.col_buf1);
	var lVBOList = [lPos1, lCol1];

	// uniformLocationを配列に取得
	var uniLocation_fireworks = new Array();
	uniLocation_fireworks[0]  = gl.getUniformLocation(prg_fireworks, 'mvpMatrix');
	uniLocation_fireworks[1]  = gl.getUniformLocation(prg_fireworks, 'pointSize');
	var uniLocation_ground    = new Array();
	uniLocation_ground[0]     = gl.getUniformLocation(prg_fireworks, 'mvpMatrix');
	uniLocation_ground[1]     = gl.getUniformLocation(prg_fireworks, 'pointSize');

	// 各種行列の生成と初期化
	var m = new matIV();
	var mMatrix   = m.identity(m.create());
	var vMatrix   = m.identity(m.create());
	var pMatrix   = m.identity(m.create());
	var tmpMatrix = m.identity(m.create());
	var mvpMatrix = m.identity(m.create());
	var qMatrix   = m.identity(m.create());

	// 各種フラグを有効化する
	gl.enable(gl.DEPTH_TEST);
	gl.depthFunc(gl.LEQUAL);

  var rotation1 = 0;
  var rDiv1=8503;
  var rotation2 = 0;
  var rDiv2=1501;
  var rotation3 = 0;
  var rDiv3=4108;
  var c3=10;
  var r3=68.0;
  var distance=55.0;
  var distanceAmplitude=21.0;
  var distance2=3.0;
  var zval=65;
  var zvalAmplitude=10.0;
  var biasY = 0;//groundY;
  var biasX = 0;
  var biasZ = 0;
  var time=0;
  var pointSize1 = 2;
  var pointSize2 = 4;

	// Infinitive Loop
	(function(){
		gl.clearColor(0.0, 0.0, 0.0, 1.0);
		gl.clearDepth(1.0);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    draw();

    if(obj.proceed()) {
      // check if the generatorFunctions is changed dynamically
      //console.log("next shell");

      if(genIndex>generatorFunctions.length-1) {
        genIndex=generatorFunctions.length-1;
      }
      obj = generatorFunctions[genIndex]();

      genIndex++;
      if(genIndex==generatorFunctions.length) {
        genIndex=0;
      }
    }
    if(ground!=null) {
      ground.proceed();
    }

		// Apply quotanian to Matrix
		var qMatrix = m.identity(m.create());
		q.toMatIV(qt, qMatrix);
	  var angle1=Math.PI*2*rotation1/rDiv1;
    //console.log("rotation1="+rotation1);
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
	  var z=zval+zvalAmplitude*Math.sin(angle3);//distance2*Math.sin(angle2);
    x=d*Math.cos(angle1);
    //y=distance2*Math.cos(angle2)+20;
    y=20;
    z=d*Math.sin(angle1);
    //console.log("angle1="+angle1+" x="+x+" z="+z);
    var camPosition = [ x, y, z];
		m.lookAt(camPosition, [0, 0, 0], [0, 1, 0], vMatrix);
		m.multiply(vMatrix, qMatrix, vMatrix);
		m.perspective(45, c.width / c.height, 0.1, 100, pMatrix);
		m.multiply(pMatrix, vMatrix, tmpMatrix);


    var lPos1 = create_vbo(graphics.pos_buf1);
		var lCol1 = create_vbo(graphics.col_buf1);
		var lVBOList1 = [lPos1, lCol1];
    var lPos2 = create_vbo(graphics.pos_buf2);
		var lCol2 = create_vbo(graphics.col_buf2);
		var lVBOList2 = [lPos2, lCol2];
//    if(graphics.pos_buf1==0 && graphics.pos_buf2==0)
//      console.log("buf1:"+graphics.pos_buf1.length+" buf2:"+graphics.pos_buf2.length+" bufg:"+graphics.pos_bufg.length)
    //if(graphics.pos_buf1.length>0) {
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
    //}
    //if(graphics.pos_buf2.length>0) {
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
    //}
    if(graphics.pos_bufg.length>0) {
      h=create_vbo(graphics.pos_bufg);
  	  g=create_vbo(graphics.col_bufg);
      //console.log(uniLocation_ground);
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

  function draw() {
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
    obj.draw(graphics);
    ground.draw(graphics);
  }
};
