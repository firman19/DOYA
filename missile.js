function missile(shipXPos, shipYPos){
	this.x 		= shipXPos;
	this.y 		= shipYPos;
	this.width 	= 50;
	this.height = 50;
	
	this.show=function() {
		image(missile_Img, this.x, this.y);
	}
	
	this.move=function() {
		this.show();
		this.x += -5;
	}
	
	this.check=function() {
		if (this.x<0){
			return true;
		}
		else return false;
	}
}