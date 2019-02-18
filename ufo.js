function ufo(){
    this.x      = 0;
    this.y      = random(height);
    this.speedX = 2;
    this.speedY = 1;
    this.offset = 1;
    this.width  = 50;
    this.height = 25;
    
    this.show = function(){
        animation(ufo_Img, this.x, this.y);
    }

    this.update = function(){
        this.show();
        this.offset = random (4) - 2;
        this.speedY += this.offset;
        this.speedY *= 0.7;
        this.x      += this.speedX;
        this.y      += this.speedY;
    }
    
    this.endufo = function(){
        if (this.x > width + 10) {
            return true;
        } else if (this.y < 0 || this.y >height) {
            return true;
        } else {
            return false;
        }
    }
}
