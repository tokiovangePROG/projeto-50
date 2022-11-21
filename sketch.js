var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zoombie, zoombieImg, zoombieGroup;
var lifes, lifeCount = 3;
var bullet, bulletImg, bulletGroup, bulletSound;
var score = 0;
var life3,life2,lif1,life1Img,life2Img,life3Img;


function preload(){
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  bgImg = loadImage("assets/bg.jpeg")

  zoombieImg = loadImage("assets/zombie.png");

  life3Img = loadAnimation("./assets/heart_3.png","assets/heart_3.png");
  life2Img = loadAnimation("./assets/heart_2.png","assets/heart_2.png");
  life1Img = loadAnimation("./assets/heart_1.png","assets/heart_1.png");

  bulletImg = loadImage("assets/bala.png");

  bulletSound = loadSound("assets/somDeTiro.mp3");
}

function setup() {  
  createCanvas(windowWidth,windowHeight);

  //adicione a imagem de fundo
  bg = createSprite(windowWidth/2,windowHeight/2,windowWidth,windowHeight);
bg.addImage(bgImg);
bg.scale = 1.6;

life3 = createSprite(windowWidth-200,windowHeight/100+30,20,20);
life3.addAnimation("3vidas",life3Img);
life3.scale = 0.5;

life2 = createSprite(windowWidth-150,windowHeight/100+30,20,20);
life2.addAnimation("3vidas",life2Img);
life2.scale = 0.5;

life1 = createSprite(windowWidth-100,windowHeight/100+30,20,20);
life1.addAnimation("3vidas",life1Img);
life1.scale = 0.5;

//crie o sprite do jogador
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.4;
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)


  zoombieGroup = createGroup();
  bulletGroup = createGroup();
}

function draw() {
  background("black");
 /* stroke("blue")
  text("score:"+score,20,30);*/
  //mova o jogador para cima e para baixo e torne o jogo compatível com dispositivos móveis usando touches (toques)
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}

bg.depth = bg.depth - 20;
//libere as balas e mude a imagem do atirador para a posição de tiro quando a tecla espaço for pressionada
if(keyWentDown("space")){
  bulletSound.play();
  bulletSpawn();
  player.addImage(shooter_shooting)
 
}

//o jogador volta à imagem original quando pararmos de pressionar a tecla espaço
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}

if(frameCount%140 === 0){
 zoombiesSpawn();
}
if(zoombieGroup.isTouching(player)){
 lifeCount -= 1;
 zoombieGroup.destroyEach();
}
if(zoombieGroup.isTouching(bulletGroup)){
  zoombieGroup.destroyEach();
  score = 100;
}

if(lifeCount === 2){
  life3.visible = false;
}

if(lifeCount === 1){
  life3.visible = false;
  life2.visible = false;
}

drawSprites();

console.log(lifeCount)
}
function zoombiesSpawn(){
  zoombie = createSprite(windowWidth+40,random(windowHeight/2,windowHeight-50),100,100);
  zoombie.addImage(zoombieImg);
  zoombie.velocityX = -2;
  zoombie.velocityX = zoombie.velocityX - 2;
  zoombie.scale = 0.2;
  zoombie.lifeTime = 500;
  zoombieGroup.add(zoombie);
}

function bulletSpawn(){
  bullet = createSprite(player.x+92,player.y-32,50,20);
  bullet.velocityX = 20;
  bullet.addImage(bulletImg);
  bullet.scale = 0.05;
  bullet.rotation = 45;
  bulletGroup.add(bullet);
}