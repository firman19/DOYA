function pesawat(){
	this.x		= 900;
	this.y 		= 300;
	this.width 	= 60	;
	this.height = 20;

	this.show=function(){
		image(ship_Img, this.x, this.y);
	}
}