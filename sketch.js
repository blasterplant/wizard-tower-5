
var edges
var canvas;
var backgroundImage;
var knightImgL, knightImgR, towerImg, platformImg, fireballImg, fireball2Img
var wizardImg, wizard
var knight, tower
var platform1
var ground 
var platformGroup, fireballGroup, fireball2Group
var magicdoorImg;
var magicdoor;
var magicdoorGroup;
var level = 1
var gamestate = "play"

function preload() {
wizardImg = loadImage("evil_wizard.png")
knightImgL = loadImage("knight.png");
knightImgR = loadImage("knight2.png")
towerImg = loadImage("tower.jpg");
platformImg = loadImage("platform.png");
fireballImg = loadImage("fireball.png");
fireball2Img = loadImage("fireball2.png")
magicdoorImg=loadImage('magicdoor.png');
} 



function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
tower = createSprite(windowWidth/2,windowHeight/2,50,50)
tower.addImage(towerImg);
tower.scale = 1.4
tower.velocityY=1;
knight = createSprite(windowWidth/2,windowHeight/2 ,50,50)
knight.addImage(knightImgR)
knight.addImage(knightImgL)
knight.scale = 0.5
platform1 = createSprite(windowWidth/2,windowHeight/2 + 50,250,20)
platform1.addImage(platformImg)
platform1.setCollider("rectangle",0,0,300,50)
platform1.lifetime = 600
platform1.debug=false;
knight.debug=false;
knight.setCollider("rectangle",0,0,200,350)
ground = createSprite(windowWidth/2,windowHeight - 5, windowWidth,5);
wizard = createSprite(windowWidth - 100,windowHeight/2)
wizard.addImage(wizardImg);
wizard.debug = false
wizard.setCollider("rectangle",0,30,50,100)
wizard.scale = 2
ground.visible = false
wizard.visible = false
platformGroup = new Group()
magicdoorGroup=new Group();
fireballGroup = new Group()
fireball2Group = new Group()
edges = createEdgeSprites()
wizard.velocityY = 2
}


function draw() {
 background("black");
//console.log(mouseX,mouseY)
if(gamestate == "play"){
if(keyIsDown(LEFT_ARROW)){
knight.position.x -=5
//console.log("hello")
knight.addImage(knightImgL)
}


if(keyIsDown(RIGHT_ARROW)){
  knight.position.x+=5
  knight.addImage(knightImgR)
}
//gravity
knight.velocityY+=0.4

if(keyDown("space"))
{
  console.log("space")
  knight.velocityY=-14
}

if(keyWentDown(UP_ARROW)){
  knight.velocityY=-5
}

//pawnFireballs();
if(level == 1){
  knight.collide(platform1)
  knight.collide(platformGroup)

//reset the tower
if(tower.y>windowHeight/1.5){
  tower.y=windowHeight/2
}

spawnPlatforms();
spawnFireballs();
spawnDoors();

if(knight.isTouching(magicdoorGroup) || keyDown("r")){
level = 2
} 
}
if(level == 2){
  background("blue")
  tower.destroy()
  platformGroup.destroyEach()
  magicdoorGroup.destroyEach()
  platform1.destroy()
  fireballGroup.destroyEach()

  

  wizard.bounceOff(edges[3])
  wizard.bounceOff(edges[2])


  ground.visible = true
  wizard.visible = true
  knight.collide(ground)
  spawnFireballs();

}
if(knight.isTouching(fireballGroup )|| knight.isTouching(fireball2Group) || knight.y > windowHeight  ){
  gamestate = "over"
}
}
if(gamestate == "over"){
  tower.destroy();
  ground.destroy();
  wizard.velocityY = 0;
  knight.velocityY = 0;
  fireballGroup.setVelocityYEach(0);
  fireball2Group.setVelocityXEach(0);
  platformGroup.destroyEach()
  magicdoorGroup.destroyEach()
  platform1.destroy()
  fireballGroup.destroyEach()
  background("black")
  textSize(30)
  text("GAME OVER",windowWidth/2,windowHeight/2);
}
drawSprites()
}

function spawnPlatforms(){
  var platform
  
  if(frameCount%240 == 0){
    var rand = Math.round(random(1,3))
    console.log(rand)
    if(rand == 1){
      platform = createSprite(200,windowHeight-windowHeight+10,200,20)
    }
    else if(rand == 2){
      platform = createSprite(windowWidth/2,windowHeight-windowHeight+10,200,20)
    }
    else{
      platform = createSprite(windowWidth-200,windowHeight-windowHeight+10,200,20)

    }
    
    platform.velocityY = 1
    platform.addImage(platformImg);
    platform.debug = false;
    platform.scale = 0.9
    platform.setCollider("rectangle",0,0,200,100)
    platform.lifetime = 750
    platformGroup.add(platform);

  }
}

function spawnDoors(){
  if(frameCount%800==0){
    var rand = Math.round(random(1,3))
    console.log(rand)
    if(rand == 1){
      magicdoor = createSprite(200,windowHeight-windowHeight-20,200,20)
    }
    else if(rand == 2){
      magicdoor = createSprite(windowWidth/2,windowHeight-windowHeight-20,200,20)
    }
    else{
      magicdoor = createSprite(windowWidth-200,windowHeight-windowHeight-20,200,20)

    }
    magicdoor.addImage(magicdoorImg);
    magicdoor.velocityY=1;
    magicdoor.scale=0.7;
    magicdoor.lifetime=750;
    knight.depth=magicdoor.depth+1;
    magicdoor.debug = true
    magicdoor.setCollider("rectangle",0,50,300,200)
    magicdoorGroup.add(magicdoor)
    
    
  }

}
function spawnFireballs(){
  var fireball

  if(frameCount%400 == 0 && level == 1){
    fireball = createSprite(Math.round(random(200,windowWidth-250)),windowHeight-windowHeight+10);
    fireball.addImage(fireballImg);
    fireball.scale = 0.5
    fireball.velocityY = 15
    fireballGroup.add(fireball)
  }
  if(frameCount%100 == 0 && level == 2){
    fireball = createSprite(wizard.x,wizard.y);
    fireball.addImage(fireball2Img);
    fireball.scale = 0.5
    fireball.velocityX = -18
    fireball2Group.add(fireball)
  }

}
