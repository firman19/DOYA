var bulletBossCount = 0;
//images variable
var ship_Img, missile_Img, ufo_Img, bonus_Img, bos_Img, title_Img, objective_Img, rules_Img, gameover_Img, finish_Img, background_Img,judul_Img;
var widthcanvas = 1000;
var heightcanvas = 500;
//array variable
var bullet_arr = [], missile_arr = [], ufo_arr = [], bonus_arr = [], bos_arr = [],bulletbos_arr = [];
var score = 10;
var lives = 5;
var peluru = 0;
var boss;
//music variable
var electric, gun, missile_mus, bruh_snd, triple_snd, click_snd, alert_snd, sad_snd, inception_snd, evil_snd, choir_snd;
var ship;
var displayObject;
var displayRule;
//boolean
var gameover = false, gamefinish = false, gamepause = false, gamestart = false, ufospawn = true, bonusspawn = true, bosspawn = false;

function preload() {
    //loading images
    title_Img       = loadImage("gambar/t.png");
    judul_Img       = loadAnimation("gambar/judul_1.png","gambar/judul_2.png");
    background_Img  = loadImage("gambar/background_2.jpg")
    objective_Img   = loadImage("gambar/objective.png");
    rules_Img       = loadImage("gambar/hotkeys.png");
    gameover_Img    = loadImage("gambar/gameover.png");
    finish_Img      = loadImage("gambar/finish.png");
	ship_Img        = loadImage("gambar/ship.png");
    missile_Img     = loadImage("gambar/missile.png");
	ufo_Img         = loadAnimation("gambar/ufo_1.png", "gambar/ufo_3.png");
    bonus_Img       = loadAnimation("gambar/1.png", "gambar/7.png");
    bos_Img         = loadImage("gambar/bos_11.png");
    //loading music
    electric        = loadSound("music/electric.mp3");
	gun             = loadSound("music/gun.mp3");
	missile_mus     = loadSound("music/missile.mp3");
    bom             = loadSound("music/bomb.mp3");
    click_snd       = loadSound("music/click.mp3");
    alert_snd       = loadSound("music/alert.mp3");
    sad_snd         = loadSound("music/sad.mp3");
    inception_snd   = loadSound("music/inception.mp3");
    choir_snd       = loadSound("music/choir.mp3");
    evil_snd        = loadSound("music/evil.mp3");
}

function setup() {
    createCanvas(widthcanvas,heightcanvas);
    ship = new pesawat();
    electric.loop();
}

function draw() {  
    if (!gamefinish){
        background(title_Img);
        animation(judul_Img,530,432);
    }

    if (displayObject){
        background(objective_Img, 0, 0);
    }
    
    if (displayRule){
        background(rules_Img, 0, 0);
    }


    if (!gameover && !gamefinish && gamestart) {
        if (!gamepause) {
            draw2();
        } else {
            textSize(25);
            background(0);
            fill(255);
            text("GAME IS PAUSED", 450,200);
            text("PRESS P to resume", 450,240);
        }
    }

    if (gameover) {
        inception_snd.stop();
        electric.stop();
        alert_snd.stop();
        evil_snd.stop();
        background(gameover_Img);
    }

    if (bosspawn && !gameover) {
        handlebos();
    }

    if (gamefinish) {
        inception_snd.stop();
        alert_snd.stop();
        evil_snd.stop();    
        bosspawn= false;
        background(finish_Img);
        textSize(10);
        fill(255);
        text("Copyright : Adi, Bagus, Farel, Febri - President University", 0,498);
        text("All Right Reserved", 900,498);
    }

    if (keyWentDown('P')){
        if (gamepause==true){
            gamepause=false;
        }else {
            gamepause=true;
        }
    }
}

function keyPressed (){
    if (keyCode == 13){
        if (displayRule){
            gamestart = true;
        }

        if (displayObject) {
            displayRule = true;
        } else {
            displayObject = true;
        }
    }
}

function draw2() {

    background(background_Img);

    speedX = 0;
    speedY = 0;

    if ((keyDown('D') || keyDown(RIGHT_ARROW)) && ship.x<widthcanvas-80) {
        speedX = 5;
    }

    if ((keyDown('A') || keyDown(LEFT_ARROW)) && ship.x>0) {
        speedX = -5;
    }

    if ((keyDown('W') || keyDown(UP_ARROW)) && ship.y>1) {
        speedY = -5;
    }

    if ((keyDown('S') || keyDown(DOWN_ARROW)) && ship.y<heightcanvas-41){
        speedY = 5;
    }

    if (keyDown(' ')) {
        if (frameCount % 5 == 0) {
           gun.play();
           bullet_arr.push(new bullet(ship.x+40, ship.y));
           bullet_arr.push(new bullet(ship.x+40, ship.y+36));
        }
    }

    if(keyDown('F')) {
        if (missile_arr.length<1) {
           missile_mus.play();
           missile_arr.push(new missile(ship.x+16, ship.y+25));
        }
    }
        for (var i=missile_arr.length-1; i>=0; i--) {
            missile_arr[i].move();
            if (missile_arr[i].check()) {
                missile_arr.splice(i,1);
            }
        }

    ship.x += speedX;
    ship.y += speedY;
    ship.show();
  
    for (var i=bullet_arr.length-1; i>=0; i--) {
        bullet_arr[i].move();
        if (bullet_arr[i].check()) {
            bullet_arr.splice(i,1);
        }
    }

    handleufo();
    handlebonus();
    handlebos();
    drawscore();
    drawlives();

}

function handleufo(){
    if (frameCount % 15 == 0 && ufospawn) {
        ufo_arr.push(new ufo());
    }

    for (var j = ufo_arr.length -1; j >= 0; j--) {
        ufo_arr[j].update();
            if (ufo_arr[j].endufo()){
                ufo_arr.splice (j, 1);
            }

            if (collides(ufo_arr[j],ship)){
                lives--;
                ufo_arr.splice (j, 1);   
                bom.play();
                    if(lives==1){
                        alert_snd.loop();
                    }
            }

            if(lives!=1){
                alert_snd.stop();
            }   
    }

    for (var j = ufo_arr.length - 1; j >= 0; j--){
        for (var i = bullet_arr.length-1; i>=0; i--){
            if (collides(bullet_arr[i],ufo_arr[j])){
                ufo_arr.splice (j, 1);
                bullet_arr.splice (i, 1);
                    if (score <=0     && !bosspawn){
                        evil_snd.play();
                        boss = new bos();
                        inception_snd.play();
                        bosspawn=true;
                    } else {
                        score--;
                    } 
            }
        }
    }

    for (var j = ufo_arr.length - 1; j >= 0; j--){
        for (var i = missile_arr.length - 1; i>=0; i--){
            if (collides(missile_arr[i],ufo_arr[j])){
                ufo_arr.splice (j, 1);
                score--;
            }
        }
    }
}

function handlebos(){  
    if (bosspawn){
        textSize(30);
        fill (255);
        text("KING HP  ",10, 490);
        fill (0, 255, 0);
        rect (140, 480, 500 - ((peluru/500) * 500), 20);
            if (boss){
                boss.update();
            }
            if (frameCount % 50 == 0){
                bulletBossCount = 1;
            }
       
        if (bulletBossCount >= 0) {
            bulletbos_arr.push(new bulletbos(boss.x+190, boss.y+60));
            bulletbos_arr.push(new bulletbos(boss.x+245, boss.y+111));
            bulletBossCount--;
        }

        for (var i = bulletbos_arr.length-1; i>=0; i--){
            bulletbos_arr[i].move();
                if (collides(bulletbos_arr[i],ship)){
                    lives--;
                    bulletbos_arr.splice (i, 1);
                    bom.play();
                    if(lives==1){
                        alert_snd.loop();
                    }
                }
                if(lives!=1){
                    alert_snd.stop();
                }
                
        }
        
        if (collides(ship, boss)){
            bom.play();
            gameover = true;
            sad_snd.play();
        }

        for (var i = bullet_arr.length-1; i >=0 ; i--){
            if (collides(boss, bullet_arr[i])){
                peluru++;
                bullet_arr.splice(i, 1);
            }
        }

        for (var i = missile_arr.length-1; i >=0 ; i--){
            if (collides(boss, missile_arr[i])){
                peluru+= 20;
                missile_arr.splice(i, 1);
            }
        }

        if (peluru>=500){
            inception_snd.stop();
            boss = "";
            choir_snd.play();
            gamefinish = true; 
            gameStart = false;
            peluru = 0;
        }
    }
}

function handlebonus(){
    if (bonus_arr.length<2 && bonusspawn){
        bonus_arr.push(new bonus());
    }
    
    for (var j = bonus_arr.length -1; j >= 0; j--){
        bonus_arr[j].update();
            if (bonus_arr[j].endbonus()){
                bonus_arr.splice (j, 1);
            }
            if (collides(bonus_arr[j],ship)){
                lives++;
                bonus_arr.splice (j, 1);   
                click_snd.play();
            }
    }

    for (var j = bonus_arr.length - 1; j >= 0; j--){
        for (var i = bullet_arr.length-1; i>=0; i--){
            if( lives>0)    {
                if (collides(bullet_arr[i],bonus_arr[j])){
                    bonus_arr.splice (j, 1);
                    bullet_arr.splice (i, 1);
                        if (!bosspawn){
                            score+=10;
                        }   
                }
            } 
        }
    }
}

function drawscore(){ 
    if (score<=0 && bosspawn){
        score=0;
        ufospawn = false;
        electric.stop();
    }else{
    textSize(30);
    fill (255);
    text("UFO You Must Destroy : " + score, 10, 480);
    } 
}

function drawlives(){
    textSize(30);
    fill(255);
    text("LIVES: "+ lives, 10, 30);
        if(lives<=0){
            sad_snd.play();
            inception_snd.stop();
            gameover=true;
        }
}

function collides(a, b) {
    if (typeof b != 'undefined' && typeof a != 'undefined'){
          return a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.width &&
            a.y + a.width > b.y;
        }else{
            return false;
        }
}