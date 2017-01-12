
//Copyright 2016, Amari Vaughn, All rights reserved.


var game=new Phaser.Game(window.innerWidth,window.innerHeight, Phaser.AUTO);
var sprite;
var sprite2;
var upKey;
var downKey;
var leftKey;
var rightKey;
var rate=25;
var space;
var emitter;
var bullets;
var nextFire;
var weapon;
var weapon2;
var fireButton;
var PhaserGame = function () {

    

    this.pad;

    this.stick1;
   

};


var GameState={
	///????
	init: function () {

        this.game.renderer.renderSession.roundPixels = true;
        this.physics.startSystem(Phaser.Physics.ARCADE);

    },
	// all images and files get loaded here
preload: function(){
	   //this.load.atlas('arcade', 'assets/virtualjoystick/skins/arcade-joystick.png', 'assets/virtualjoystick/skins/arcade-joystick.json');
        game.load.image('ship', 'assets/bgbattleship4.png');
        game.load.image('corona', 'assets/small.png');
         game.load.image('bullet', 'assets/bb.png');
          game.load.image('backdrop', 'assets/bg6.png');
},
// where created loads ar accesed
create: function(){
	game.world.setBounds(0, 0, 1920, 1200);

    game.add.sprite(0, 0, 'backdrop');

	 weapon = game.add.weapon(40, 'bullet');
	  weapon2 = game.add.weapon(40, 'bullet');

    //  The 'rgblaser.png' is a Sprite Sheet with 80 frames in it (each 4x4 px in size)
    //  The 3rd argument tells the Weapon Plugin to advance to the next frame each time
    //  a bullet is fired, when it hits 80 it'll wrap to zero again.
    //  You can also set this via this.weapon.bulletFrameCycle = true
     weapon2.setBulletFrames(0, 80, true);

    //  The bullet will be automatically killed when it leaves the world bounds
    weapon2.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;

    //  Because our bullet is drawn facing up, we need to offset its rotation:
    weapon2.bulletAngleOffset = 90;

    //  The speed at which the bullet is fired
    weapon2.bulletSpeed = 1000;
    weapon.setBulletFrames(0, 80, true);

    //  The bullet will be automatically killed when it leaves the world bounds
    weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;

    //  Because our bullet is drawn facing up, we need to offset its rotation:
    weapon.bulletAngleOffset = 90;

    //  The speed at which the bullet is fired
    weapon.bulletSpeed = 1000;
   
	sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'ship');
	sprite2 = game.add.sprite(0, 0, 'ship');
	 sprite.anchor.setTo(0.5);
	 sprite2.anchor.setTo(0.5);

	 //emitter = game.add.emitter(game.world.centerX, game.world.centerY, 400);

	// emitter.makeParticles('corona');
	 //emitter.anchor.setTo(0.5, 0.5);
	// sprite.addChild(emitter)
	/*upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);*/
   //space=game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
   weapon.trackSprite(sprite, 0, 0, true);
    weapon2.trackSprite(sprite2, 0, 0, true);
    fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    game.physics.enable(sprite, Phaser.Physics.ARCADE);
     game.physics.enable(sprite2, Phaser.Physics.ARCADE);
    game.camera.follow(sprite);
   //spite2.follow(sprite);
    //emitter.start(false, 5000, 100);
          
},
// updates collisions etc for the lifetime fo the game
update: function(){
	if (game.input.activePointer.isDown)
    {
       //game.physics.arcade.moveToPointer(bullet, 300);
    
	 sprite.rotation = game.physics.arcade.angleToPointer(sprite);
	 sprite2.rotation=game.physics.arcade.angleToPointer(sprite2);
	 weapon.rotation = game.physics.arcade.angleToPointer(weapon);
	 //game.physics.moveToObject(sprite2, sprite, 400);

      
 game.physics.arcade.moveToPointer(sprite, 500);}
  if (fireButton.isDown)
    {
        weapon.fire();
    }
   
 game.world.wrap(sprite, 0, true);
  weapon2.fire();

},
render: function() {

    game.debug.cameraInfo(game.camera, 500, 32);
    game.debug.spriteCoords(sprite, 32, 32);

}

 


};


// assign a game state

game.state.add('GameState', GameState);
//start the game
game.state.start('GameState');
