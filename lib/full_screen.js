// script
var canvas = document.getElementById("night_sky");
var displayWidth  = canvas.clientWidth;
var displayHeight = canvas.clientHeight;
var mode=0;

function sizing() {
//    var canvas = document.getElementById("night_sky");
    var p=canvas.parentElement;
    p = screen;
    var w=p.width;
    var h=p.height;
    var x=Math.min(w,h);
    canvas.clientWidth=x;
    canvas.width=x;
    canvas.clientHeight=x;
    canvas.height=x;
//    console.log(canvas.width+", "+canvas.height);
//    setup_canvas(x, x);
};

function resize(canvas) {
  // Lookup the size the browser is displaying the canvas.
  displayWidth  = canvas.clientWidth;
  displayHeight = canvas.clientHeight;
  if(mode==1) {
    displayWidth = 1024;
    displayHeight = 900;
  }
/*
  // Check if the canvas is not the same size.
  if (canvas.width  != displayWidth ||
      canvas.height != displayHeight) {

    // Make the canvas the same size
    canvas.clientWidth = displayWidth;
    canvas.clientHeight = displayHeight;
  }
  */
  console.log(canvas.clientWidth+", "+canvas.clientHeight);
}

(function (){
    // ------------------------------------------------------------
    // Function to Display element in full screeen
    // ------------------------------------------------------------
    function ElementRequestFullscreen(element){
        var list = [
            "requestFullscreen",
            "webkitRequestFullScreen",
            "mozRequestFullScreen",
            "msRequestFullscreen"
        ];
        var i;
        var num = list.length;
        for(i=0;i < num;i++){
            if(element[list[i]]){
                element[list[i]]();
                return true;
            }
        }

        return false;
    };

	// ------------------------------------------------------------
	// Function to exit full screen
	// ------------------------------------------------------------
	function DocumentExitFullscreen(document_obj){
		var list = [
			"exitFullscreen",
			"webkitExitFullscreen",
			"mozCancelFullScreen",
			"msExitFullscreen"
		];
		var i;
		var num = list.length;
		for(i=0;i < num;i++){
			if(document_obj[list[i]]){
				document_obj[list[i]]();
//				sizing();
				break;
			}
		}

		//var p=document_obj.parentElement;
	    var w=800;//p.width;
	    var h=800;//p.height;
	    document_obj.clientWidth=w;
	    document_obj.width=w;
	    document_obj.clientHeight=h;
	    document_obj.height=h;
		  return false;
	};

	// ------------------------------------------------------------
	// Get Elements
	// ------------------------------------------------------------
	// Get element of id "button01_request"
	var button_request = document.getElementById("full_screen_button");

	// Get element of id "container01"
	var element_container = document.getElementById("night_sky");

	// ------------------------------------------------------------
	// add event listeners
	// ------------------------------------------------------------
	if(window.addEventListener){
		button_request.addEventListener("click",function (e){
			// Enter Full screen
      mode=1-mode;
      console.log("mode="+mode);
      ElementRequestFullscreen(element_container);
      resize(element_container);
		});

    document.addEventListener('keyup', (event) => {
      const keyName = event.key;
      console.log("keyName="+keyName);
    });


	};
/*
	$(document).keyup(function(e) {
	     if (e.keyCode == 27) { // escape key maps to keycode `27`
         console.log("keyNamea="+e.keyCode);
	    	 DocumentExitFullscreen(element_container);
	    }
	});
  */
})();
