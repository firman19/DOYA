function aircraft(){
	this.x = shipXPos;
	this.y = shipYPos;
	this.width = 80;
	this.height = 40;
	this.show=function(){
		image(shipImg, this.x, this.y);
	}
	

}