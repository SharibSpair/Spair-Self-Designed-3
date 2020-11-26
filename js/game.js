class Game{
    constructor(){

    }
    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function (data) {
            gameState = data.val();
        })

    }

    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }
    async start() {
            if (gameState === 0) {
                player = new Player();
                var playerCountRef = await database.ref('playerCount').once("value");
                if (playerCountRef.exists()) {
                    playerCount = playerCountRef.val();
                    player.getCount();
                }
                form = new Form()
                form.display();
            }


    player1 = createSprite(200,500);
    player1.addImage("player1",player_img);
    player1.scale = 0.9;
    
    player2 = createSprite(800,500);
    player2.addImage("player2", player_img);
    player2.scale = 0.9;
    players=[player1,player2];

    enemyKing = createSprite(width/2, 0, 100, 100);
    enemyKing.visible = false;

    nextlevel= createSprite(500,500,30,10);
    nextlevel.visible = false;


  }
    
    play(){
        
                form.hide();

                
                Player.getPlayerInfo();
                 image(back_img, 0, 0, width,height);
                 var x=100;
                 var y=200;
                 var index =0;
                 drawSprites();
                 for(var plr in allPlayers){
                    
                    
                     index = index+1;
                     x = 500-allPlayers[plr].distance;
                     y=500;
                     
                    players[index-1].x = x;
                    
                       
                     /*if(index === player.index){
                         
                         fill("black");
                         textSize(25);
                         text(allPlayers[plr].name ,x-25,y+25);

                         
                    */
                    
                     fill("white");
                     textSize(25);
                     text(allPlayers.player1.name + " : "+allPlayers.player1.score,50,50);
                     text(allPlayers.player2.name + " : "+allPlayers.player2.score,800,50);
                 
                 }
                
                
                 

                if (keyIsDown(RIGHT_ARROW) && player.index !== null) {
                    player.distance -= 10
                    player.update();
                }
                if (keyIsDown(LEFT_ARROW) && player.index !== null) {
                    player.distance += 10
                    player.update();
                }
            
                 if (frameCount % 20 === 0) {
                     enemy = createSprite(random(100, 1000), 0, 100, 100);
                     enemy.scale = 0.3
                     enemy.velocityY = level*3;
                     enemy.addImage(enemyImg);
                     enemy.lifetime = Math.round(height/enemy.velocityY);
                     enemyGroup.add(enemy);
                     
                 }

                 if(player.score === 2 && frameCount % 25 ===0){
                    enemyKing.visible = true;
                    enemyKing.velocityY = 0.5;
                    enemyKing.scale = 1;
                    enemyKing.addImage(enemykingImg);
                 }

                 if(keyDown("space")){
                     var bullet = createSprite( players[index -1].x, players[index -1].y,5,20);
                     bullet.velocityY = -6;
                     bullet.addImage(bullet_Img);
                     bullet.scale = 0.06;
                     bulletAudio.play();
                     bulletGroup.add(bullet);
                     bullet.lifetime = Math.round(height/6);
                 }
                 if (player.index !== null){
                    //fill code here, to destroy the objects.

       for(var i = 0; i< enemyGroup.length ; i++){

                      // for(var j = 0; j < bulletGroup.length; j++){
                           
           if(enemyGroup.get(i).isTouching(bulletGroup)){
                               
               enemyGroup.get(i).destroy();
               bulletGroup.destroyEach();
               player.score+=1;
               player.update();
                           
           }

//  }
                      
       }

   }
                 
                  if (player.index !== null) {
                     //fill code here, to destroy the objects.

                    for(var i = 0; i< enemyGroup.length ; i++){
                        if(enemyGroup.get(i).isTouching(players)){
                            enemyGroup.get(i).destroy();
                            player.score+=1;
                            player.update();
                        }
                    }

                  

                  }

                  if(bulletGroup.isTouching(enemyKing)){

                    bulletGroup.destroyEach();
                    enemyKing.scale = enemyKing.scale-0.3;
                            
                }
            
                if(enemyKing.scale < 0.9){
            
                    enemyKing.visible = false;
                    enemyGroup.destroyEach();
                    bulletGroup.destroyEach();
            
                    textSize(40);
                    text("Level  "+ level+ "  Completed" ,displayWidth/2-300,displayHeight/2-150);
                                
                    nextlevel.visible=true;
                                
                           
                    if(mousePressedOver(nextLevel)){
            
                    this.restart();
                    }
                }
                
      

    }

    end(){
       console.log("Game Ended");
    }
    
    
}