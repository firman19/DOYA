function bullet(shipXPos, shipYPos) {
	this.x 		= shipXPos;
	this.y 		= shipYPos;
	this.width 	= 2;
	this.height = 2;
	this.speedBul = 10;
	
	this.move=function() {
		noStroke();
		fill(255,255,0);
		rect(this.x, this.y, 3, 3);
		
		this.x -= this.speedBul;
	}
	
	this.check=function(){
		if (this.x<0){
			return true;
		}
		else return false;
	}
}