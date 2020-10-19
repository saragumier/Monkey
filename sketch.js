
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var ground;
var survivalTime;

function preload(){
  
  
  monkey_running =       loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400,400);
  
  monkey = createSprite(80,315,10,10);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1;
  console.log(monkey.y);
  
  ground = createSprite(400,350,900,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  
  obstacleGroup = new Group();
  FoodGroup = new Group();
  
  survivalTime = 0;

  
}


function draw() {
background("white");
  

  if(ground.x < 0){
    ground.x = ground.width/2;
  }
  
  if(keyDown("space") && monkey.y >= 170){
    monkey.velocityY = -10;
  }
  
  monkey.velocityY = monkey.velocityY + 1;  
  monkey.collide(ground); 
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate());
  text("Survival Time: " + survivalTime,100,50);
  
  var temp = survivalTime;
  
  if(obstacleGroup.isTouching(monkey)){
    ground.velocityX = 0;
    monkey.velocityY = 0;
    FoodGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setLifetimeEach(-2);
    obstacleGroup.setLifetimeEach(-2);
    FoodGroup.destroyEach(0);
    obstacleGroup.destroyEach(0);
    
    survivalTime = temp;
  }
  
  
  obstacle();
  food();
drawSprites();  
}

function food(){
  if(frameCount%80 === 0){
    banana = createSprite(400,Math.round(random(120,200)),10,10);
    banana.addImage(bananaImage);
    banana.velocityX = -5;
    banana.scale = 0.1;
    FoodGroup.add(banana);
  }
}

function obstacle(){
  if(frameCount%300 === 0){
   var obstacle = createSprite(400,315,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -5;
    obstacle.scale = 0.2;
    obstacleGroup.add(obstacle);
  }
}




