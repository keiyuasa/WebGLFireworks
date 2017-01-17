
function Sphere() {
    this.px = new Array();
    this.py = new Array();
    this.pz = new Array();
    var theta, phy, delta, cdelta, sdelta, cphy, sphy;
    var ratio = 3;

    this.create = function(n, r) {
    	this.px = [];
    	this.py = [];
    	this.pz = [];
    	var numLayers=2*n+1;
    	var maxNum = 4*n;	// the number of stars on equator
    	var k = 0;
    	var i, i;
    	for (i=0;i<numLayers;i++) {
    		var th=Math.PI*i/(numLayers-1);
    		var s=Math.floor(Math.sin(Math.PI*i/(numLayers-1))*maxNum);
    		if(s==0) s=1;
    		k += s;
    	}
    	//console.log("gen sphere 1: num="+k);
    	k=0;
    	for (i=0;i<numLayers;i++) {
    		var phy=Math.PI*i/(numLayers-1);
            cphy = Math.cos(phy);
            sphy = Math.sin(phy);
            //s=Math.floor(sphy);
            l = Math.floor(sphy*maxNum);
            l = Math.floor(Math.sin(Math.PI*i/(numLayers-1))*maxNum);
    		if(l==0) {
            	this.px[k] = 0;
            	this.py[k] = 0;
            	this.pz[k] = r*cphy;
            	//console.log("sphere numLayers="+numLayers+" i="+i+", Z="+this.pz[k]);
            	k++;
            } else {
            	for (j=0;j<l;j++) {
                    theta = (2.0 * Math.PI * j) / l;
                    this.px[k] = r * sphy * Math.cos(theta);
                    this.py[k] = r * sphy * Math.sin(theta);
                    this.pz[k] = r * cphy ;
                    k++;            	
            	}
            }
    	}
        /*
		delta = Math.random() * Math.PI * 2;
		phy = Math.random() * Math.PI * 2;
		cdelta = Math.cos(delta);
		sdelta = Math.sin(delta);
		cphy = Math.cos(phy);
		sphy = Math.sin(phy);
		for (var i = 0; i < k; i++) {
			var x = this.px[i];
			var y = this.py[i] * cdelta - this.pz[i] * sdelta;
			var z = this.py[i] * sdelta + this.pz[i] * cdelta;
			this.px[i] = x * cphy - z * sphy;
			this.py[i] = y;
			this.pz[i] = (x * sphy + z * cphy ) ;
		}
		*/
    	//for(i=0;i<k;i++) {
    	//	console.log("x="+this.px[i]+" y="+this.py[i]+" z="+this.pz[i]);
    	//}
    	this.numStars = k;
    };
 };