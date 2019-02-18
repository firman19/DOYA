function bonus(){
	this.x 		= 0;
	this.y 		= random(height);
	this.speedX = 1.5;
	this.speedY = 0;
	this.width 	= 20;
    this.height = 33;
	
	this.show=function(){
		animation(bonus_Img, this.x, this.y);
	}

	this.update = function(){
        this.show();
        //animation(bonus_Img, this.x, this.y);
        this.x += this.speedX;
        this.y += this.speedY;
    }
    
    this.endbonus = function(){
        if (this.x > width + 10) {
            return true;
        }else if (this.y < 0 || this.y >height) {
            return true;
        }else{
            return false;
        }
    }
}