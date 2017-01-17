 // script
function color() {
      this.red=0xD8;
      this.green=0xD8;
      this.blue=0x30;
};

color.prototype=function(red, green, blue) {
	this.red=red;
    this.green=green;
    this.blue=blue;
};

color.prototype.create=function (red, green, blue) {
      this.red=red;
      this.green=green;
      this.blue=blue;
};

	var colors1=new Array();
      colors1[0]=new color();
      colors1[0].create(0xFF, 0x29, 0x21);
      colors1[1]=new color();
      colors1[1].create(0xF9, 0xFF, 0x54);
      colors1[2]=new color();
      colors1[2].create(0x20, 0xFF, 0x20);
      colors1[3]=new color();
      colors1[3].create(0x10, 0x20, 0xFF);
      colors1[4]=new color();
      colors1[4].create(0xFF, 0x20, 0xF0);
      colors1[4]=new color();
      colors1[4].create(0xFF, 0x20, 0xF0);
      colors1[5]=new color();
      colors1[5].create(0x33, 0xC2, 0xFF);
      colors1[6]=new color();
      colors1[6].create(0xFF, 0xC2, 0x33);
      colors1[7]=new color();
      colors1[7].create(0xCF, 0xCF, 0xCF);