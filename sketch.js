
var trex_running_image , trexS
var groundimage
 var groundf,invisibleground
 var cloudimage,cloudf
 var obstacle1
 var obstacle2
 var obstacle3
 var obstacle4
 var obstacle5
 var obstacle6
 var obstacle
 var gamestate="play"
 var obstaclegroup
 var cloudgroup
 var gameoverimg
 var restartimg
 var gameoverS
 var restartS
 var trexdead
function preload(){
 trex_running_image = loadAnimation("trex1.png","trex2.png","trex3.png")
  groundimage=
loadImage("ground2.png")
  cloudimage=
    loadImage("cloud.png")
   obstacle1=
 loadImage("obstacle1.png") 
   obstacle2=
 loadImage("obstacle2.png") 
   obstacle3=
 loadImage("obstacle3.png") 
   obstacle4=
 loadImage("obstacle4.png") 
   obstacle5=
 loadImage("obstacle5.png") 
   obstacle6=
 loadImage("obstacle6.png") 
  gameoverimg=
    loadImage("gameOver.png")
  resetimg=
    loadImage("restart.png")
  trexdead=
    loadAnimation("trex_collided.png")
}

function setup(){
  createCanvas(600,200);
  trexS = createSprite(50,180,10,10)
  trexS.addAnimation("aaron",trex_running_image)
  trexS.addAnimation("aaronp",trexdead)
  trexS.scale = 0.5
  trexS.setCollider("circle",0,0,50);
  trexS.debug=false;
  groundf = createSprite(300,180,600,5)
  groundf.addImage("aaron",groundimage)
  invisibleground= createSprite(300,190,600,5)
  invisibleground.visible=false;
  obstaclegroup=createGroup()
  cloudgroup=createGroup()
  gameoverS = createSprite(300,100,10,10)
  gameoverS.addImage(gameoverimg)
  gameoverS.scale=3
  resetS = createSprite(300,130,10,10)
  resetS.addImage(resetimg)
  resetS.scale=0.5
}


function draw(){
  background("white");
  if (gamestate=="play"){
    trexS.changeAnimation("aaron",trex_running_image)
    gameoverS.visible=false;
    resetS.visible= false;
    groundf.velocityX=-4
   if  (groundf.x<0){
    groundf.x= 300;
   }
    populatecloud()
  populateobstacle()
    if(keyDown("space")){
   trexS.velocityY=-10
    }
    if (trexS.isTouching(obstaclegroup)){
        gamestate="end"
        }  
     
     
    trexS.velocityY=trexS.velocityY+1
      
  }
  if (gamestate=="end"){
    trexS.changeAnimation("aaronp",trexdead)
    gameoverS.visible=true;
    resetS.visible= true;
    if(mousePressedOver(resetS)){
       reset()
       
      }
      groundf.velocityX=0;
    obstaclegroup.setVelocityXEach(0)
    cloudgroup.setVelocityXEach(0)
    }
  
  
 
  
  
  trexS.collide(invisibleground) 
  drawSprites()
}
 function populatecloud(){
   if (frameCount%90==0)
     {
  cloudf= createSprite(550,30,10,10)
  cloudf.addImage("aaron",cloudimage)
   cloudf.velocityX=-5;
     cloudf.y=Math.round(random(10,100))
       cloudgroup.add(cloudf)
     }
}
function populateobstacle(){
  if (frameCount%90==0)
    {
 obstacle=createSprite(580,170,50,10) 
obstacle.velocityX=-6;
      obstacle.scale=0.5;
  var a=Math.round(random(1,6))
  switch(a)
    {
      case 1:obstacle.addImage("obstacle1",obstacle1)
        break 
        case 2:obstacle.addImage("aaron",obstacle2)
        break 
        case 3:obstacle.addImage("aaron",obstacle3)
        break 
        case 4:obstacle.addImage("aaron",obstacle4)
        break 
        case 5:obstacle.addImage("aaron",obstacle5)
        break 
        case 6:obstacle.addImage("aaron",obstacle6)
        break 
        
    }
        obstaclegroup.add(obstacle)
    }
    
}
  
  function reset(){
  gamestate="play" 
    obstaclegroup.destroyEach();
    cloudgroup.destroyEach();
    
  }