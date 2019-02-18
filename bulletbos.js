function bulletbos(shipXPos, shipYPos) {
	this.x 		= shipXPos;
	this.y 		= shipYPos;
	this.width 	= 3;
	this.height = 2;
	this.randY 	= random (4) -2;
	this.bosBulSpeed = 3;
	
	this.move=function() {
		noStroke();
		fill(255,255);
		rect(this.x, this.y, 5, 5);
		
		this.x += this.bosBulSpeed;
		this.y += this.randY;
	}
	
	this.check=function(){
		if (this.y<0){
			return true;
		}
		else return false;
	}

}