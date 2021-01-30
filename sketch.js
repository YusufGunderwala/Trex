var trex , trexR , ground , groundimg , ground2 , score=0;
var high=0 , cloud ,cloudimg , cactus , c1,c2,c3,c4,c5,c6;
var  play=0, end=1, gamestate = play , cactusG , cloudG;
var trexc,gameover,restart,restImg,gameImg;
var die , jump , cp ; 

function preload(){
  
trexR=loadAnimation("trex1.png","trex3.png","trex4.png");
groundimg=loadImage("ground2.png");
cloudimg=loadImage("cloud.png");  
c1=loadImage("obstacle1.png");
c2=loadImage("obstacle2.png");
c3=loadImage("obstacle3.png");
c4=loadImage("obstacle4.png");
c5=loadImage("obstacle5.png");
c6=loadImage("obstacle6.png");
trexc=loadAnimation("trex_collided.png");
gameImg=loadImage("gameOver.png");
restImg=loadImage("restart.png");
die=loadSound("die.mp3");
jump=loadSound("jump.mp3");
cp=loadSound("checkPoint.mp3");
  
}



function setup(){
  
  createCanvas(600,200);
   
  trex=createSprite(50,150,20,20);
  trex.addAnimation("run",trexR);
  trex.scale=0.5;
  trex.addAnimation("end",trexc);
  
  ground=createSprite(300,150,600,5);
  ground.addImage(groundimg);
 
  
  ground2=createSprite(50,150,100,5);
  ground2.visible=false;
  
  cactusG=new Group();
  cloudG=new Group();
  
  trex.debug=false;
  trex.setCollider("rectangle",0,0,70,trex.height);
  
  gameover=createSprite(300,100,10,10);
  gameover.addImage(gameImg);
  gameover.scale=0.7;
  
  restart=createSprite(300,100,10,10);
  restart.addImage(restImg);
  restart.scale=0.5;

}

function draw (){
  
  background(0);
  
  
  text("Score:"+score,500,15);
  text("HighScore:"+high,350,15);
  
   if(high<score){
    high=score;
    
  }
  
  if(gamestate===play){
    
      trex.changeAnimation("run",trexR);
      ground.velocityX =-(3+ (score/300));
      score=score+Math.round(getFrameRate()/60);
      gameover.visible=false;
      restart.visible=false;
    
    if(score>0 && score%100===0){
      cp.play();
    }
    
    trex.changeAnimation("run",trexR);
    
      if(ground.x<0){
    ground.x = ground.width / 2;
  }
    
      
  if (keyDown("space") && trex.y>134){
    trex.velocityY=-10;
    jump.play();
  }
    
      trex.velocityY=trex.velocityY+0.4;
    
     spawnClouds();
     spawnCactus();
    
     if(trex.isTouching(cactusG)){
       gamestate=end;
       die.play();
     }
  }
  
  if(gamestate===end){
    
    trex.velocityY=0;
    ground.velocityX=0;
    cactusG.setVelocityXEach(0);
    cloudG.setVelocityXEach(0);
    cactusG.setLifetimeEach(-1);
    cloudG.setLifetimeEach(-1);
     gameover.visible=true;
      restart.visible=true;
    trex.changeAnimation("end",trexc);
    
    if(mousePressedOver(restart)){
      reset();
    }
    
  }

    trex.collide(ground2);
    
  drawSprites();
}

function reset(){
  
  gamestate=play;
  score=0;
  cactusG.destroyEach();
  cloudG.destroyEach();
}

function spawnClouds(){
  if(frameCount%80===10){
  
  cloud=createSprite(600,random(10,50),5,5);
  cloud.addImage(cloudimg);
  cloud.velocityX=-3;
  cloud.scale=0.5;
  cloud.lifetime=205;
  cloud.depth=trex.depth;
  trex.depth=trex.depth+1;
  cloudG.add(cloud);
    
  }
}

function spawnCactus(){
  
  if(frameCount%100===10){
    
    cactus=createSprite(600,145,5,5);
    cactus.velocityX=-(3+ (score/300));
    cactus.scale=0.5;
    cactus.lifetime=205;
    cactusG.add(cactus);
    
    var a=Math.round(random(1,6));
    switch(a){
        
        case 1: cactus.addImage(c1);
        break;
        
        case 2: cactus.addImage(c2);
        break;
        
        case 3: cactus.addImage(c3);
        break;
        
        case 4: cactus.addImage(c4);
        break;
        
        case 5: cactus.addImage(c5);
        break;
        
        case 6: cactus.addImage(c6);
        break;
        
        default: break;
    }

  }
  
}
