function bos(){
	this.x = 0;
	this.y = height/2;
	this.speedY = 2;
	this.offset = 2;
	this.width = 185;
	this.height = 200;

	this.show = function(){
		image(bos_Img, this.x, this.y);
	}

	this.update = function(){
		this.show();
		this.offset = random(4)-2;
		this.speedY += this.offset;
		this.speedY *= 0.7;
		
		if(this.y<0 || this.y>300){
			this.speedY *= -1;
		}
			this.y += this.speedY;
	}
}