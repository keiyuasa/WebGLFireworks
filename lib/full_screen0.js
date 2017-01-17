// script
function sizing() {
    var canvas = document.getElementById("night_sky");
    var p=canvas.parentElement;
    var w=p.clientWidth;
    var h=p.clientHeight;
    canvas.clientWidth=w;
    canvas.width=w;
    canvas.clientHeight=h;
    canvas.height=h;
    console.log("w="+w+", h="+h);
};

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
        sizing();
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
				break;
			}
		}
		sizing();
		return false;
	};

	// ------------------------------------------------------------
	// Get Elements
	// ------------------------------------------------------------
	// Get element of id "full_screen_toggle_buton"
	var button_request = document.getElementById("full_screen_button");

	//button_request = document.getElementsByClassName("full_screen_button");

	// Get element of id "button01_exit"
	//var button_exit = document.getElementById("button01_exit");

	// Get element of id "container01"
	var element_container = document.getElementById("night_sky");

	// ------------------------------------------------------------
	// add event listeners
	// ------------------------------------------------------------
	if(window.addEventListener){

		button_request.addEventListener("click",function (e){

			// Enter Full screen
			ElementRequestFullscreen(element_container);
		});
	};
})();
