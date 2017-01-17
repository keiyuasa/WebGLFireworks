function Ring() {
	this.px = new Array();
	this.py = new Array();
	this.pz = new Array();
	var phy, cphy, sphy;

	this.create = function(n, r) {
		var row = 2 * n;
		var i;
		for (i = 0; i < row; i++) {
			phy = 2 * Math.PI * i / (row);
			cphy = Math.cos(phy);
			sphy = Math.sin(phy);
			this.px[i] = r * sphy;
			this.py[i] = r * cphy;
			this.pz[i] = 0;
		}
		;
		this.numStars = row;
		delta = Math.random() * Math.PI * 2;
		phy = Math.random() * Math.PI * 2;
		cdelta = Math.cos(delta);
		sdelta = Math.sin(delta);
		cphy = Math.cos(phy);
		sphy = Math.sin(phy);
		for (var i = 0; i < row; i++) {
			var x = this.px[i];
			var y = this.py[i] * cdelta - this.pz[i] * sdelta;
			var z = this.py[i] * sdelta + this.pz[i] * cdelta;
			this.px[i] = x * cphy - z * sphy;
			this.py[i] = y;
			this.pz[i] = x * sphy + z * cphy;
		};
	};
};

function Sphere() {
    this.px = new Array();
    this.py = new Array();
    this.pz = new Array();
    var theta, phy, delta, cdelta, sdelta, cphy, sphy;
    var ratio = 3;

    this.create = function(n, r) {
        var row = 2 * n - 1;
        var k = 0;
        var i, l;

        for (i = 1; i < row; i++) {
            k += n * r * Math.sin((Math.PI * i) / (row + 1));
        }
        for (i = 1, k = 0; i <= row; i++) {
            phy = Math.PI * i / (row + 1);
            cphy = Math.cos(phy);
            sphy = Math.sin(phy);
            l = Math.floor(n * ratio * Math.sin((Math.PI * i) / (row + 1)));
            for (var j = 0; j < l; j++) {
                theta = 2.0 * Math.PI * j / l;
                this.px[k] = r * sphy * Math.cos(theta) * n;
                this.py[k] = r * sphy * Math.sin(theta) * n;
                this.pz[k] = r * cphy * n * Math.PI;
                k++;
            };
        };
        this.numStars = k;
/*
        // random rotation
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
            this.pz[i] = x * sphy + z * cphy;
        }
				*/
    };
};
