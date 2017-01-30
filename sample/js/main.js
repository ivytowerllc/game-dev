var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO);

var basicPool;
var bruisePool;
var capnPool;
var captain;
var bruiser;
var basic;
var astPool;
var asteroids;

// --- GAMESTATE

var GameState = {

    init: function() {
        
        // Establish player constants
        this.MAX_SPEED = 300;
        
        // Establish bullet constants
        this.BULLET_SPEED = 600;
        this.FIRE_RATE = 200;
        
        // Establish enemy constants
        this.AGGRO_RANGE = 200;
        this.BASIC_SPEED = 150;
        this.BASIC_HEALTH = 10;
        this.BASIC_BULLSP = 300;
        this.BASIC_BULLRT = 300;
        this.BRUISER_SPEED = 100;
        this.BRUISER_HEALTH = 30;
        this.CAPTAIN_SPEED = 300;
        this.ESCAPE_POD_SPEED = 350;
         this.BIG_AST_SPEED = 10;
        this.MED_AST_SPEED = 20;
        this.SML_AST_SPEED = 30;
        this.BIG_AST_HEALTH = 30;
        this.MED_AST_HEALTH = 20;
        this.SML_AST_HEALTH = 10;
        
        // Initiate physics
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        
    },

    preload: function() {
        
        // Load assets
        this.game.load.image('bg', 'assets/background.png');
        this.game.load.image('ship', 'assets/ship.png');
        this.game.load.image('bullet', 'assets/bullet.png');
        this.game.load.image('basic', 'assets/basicen.png');
        this.game.load.image('basicb', 'assets/basicbull.png');
        this.game.load.image('bruiser', 'assets/bruisen.png');
        this.game.load.image('bruiserb', 'assets/bruisbull.png');
        this.game.load.image('captain', 'assets/capten.png');
        this.game.load.image('captainb', 'assets/captbull.png');
        this.game.load.image('moon', 'assets/moon.png');
        this.game.load.image('bigRedAst', 'assets/bigredast.png');
        this.game.load.image('medRedAst', 'assets/medredast.png');
        this.game.load.image('smlRedAst', 'assets/smlredast.png');
        this.game.load.image('bigGreyAst', 'assets/biggredast.png');
        this.game.load.image('medGreyAst', 'assets/medgreyast.png');
        this.game.load.image('smlGreyAst', 'assets/smlgreyast.png');
        this.game.load.image('bigBrownAst', 'assets/bigbrownast.png');
        this.game.load.image('medBrownAst', 'assets/medbrownast.png');
        this.game.load.image('smlBrownAst', 'assets/smlbrownast.png');
        this.game.load.image('bigBlueAst', 'assets/bigblueast.png');
        this.game.load.image('medBlueAst', 'assets/medblueast.png');
        this.game.load.image('smlBlueAst', 'assets/smlblueast.png');
        this.game.load.image('bigWhiteAst', 'assets/bigwhiteast.png');
        this.game.load.image('medWhiteAst', 'assets/medwhiteast.png');
        this.game.load.image('smlWhiteAst', 'assets/smlwhiteast.png');
    },
    
    create: function() {
        
        // --- GAME SETUP
        
        // Set world bounds
        this.game.world.setBounds(0, 0, 1500, 1500);
        
        // Simple starry background for now
        this.game.add.sprite(0, 0, 'bg');
        
        // Add moon for reference point
        this.moon = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'moon');
        this.moon.anchor.setTo(0.5);
        this.moon.scale.setTo(0.5);
        
        // --- PLAYER SHIP
        
        // Adds player ship in center
        this.ship = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'ship');
        this.ship.anchor.setTo(0.5);
        this.ship.angle = -90; // Points the ship up
        this.game.physics.enable(this.ship, Phaser.Physics.ARCADE);
        // Collide with world boundaries
        this.ship.body.collideWorldBounds = true;
        // Camera follows ship
        this.game.camera.follow(this.ship);
        
        // --- PLAYER BULLETS
        
        // Adds bullets from a pool of 30 and applies constants
        this.weapon = this.game.add.weapon(30, 'bullet');
        this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        this.weapon.bulletSpeed = this.BULLET_SPEED;
        this.weapon.fireRate = this.FIRE_RATE;
        // Bullets come from the ship's tip
        this.weapon.trackSprite(this.ship, 19, 0, true);

        // --- ASTEROID SPAWNS

        asteroids = this.game.add.group();
        for( var i=0; i<8; i++){
        var ast =new Asteroid(this.game, this.game.world.randomX, this.game.world.randomY, 'bigBlueAst', this.BASIC_SPEED, this.BASIC_HEALTH)
         ast.body.bounce.set(0.8);
          ast.scale.setTo(0.75);
        //ast.body.gravity.set(0, 18);
        ast.body.velocity.setTo(50,50);
        asteroids.add(ast);

         }
        
        // --- ENEMY SPAWNS
        
        // Add basic enemies
        basicPool = this.game.add.group();
        for (var i = 0; i < 5; i++) {
            basic = new Enemy(this.game, this.game.world.randomX, this.game.world.randomY, 'basic', this.BASIC_SPEED, this.BASIC_HEALTH);
            basicPool.add(basic);
            
        }
        
        // Add bruiser class enemies
        bruisePool = this.game.add.group();
        for (var i = 0; i < 2; i++) {
            bruiser = new Enemy(this.game, this.game.world.randomX, this.game.world.randomY, 'bruiser', this.BRUISER_SPEED, this.BRUISER_HEALTH);
            bruisePool.add(bruiser);
            
        }
        
        // Add captain class enemies
        capnPool = this.game.add.group();
        for(var m =0; m < 1; m++) {
            captain = new Enemy(this.game, this.game.world.randomX, this.game.world.randomY, 'captain', this.CAPTAIN_SPEED, this.CAPTAIN_HEALTH);
            capnPool.add(captain);
        }
        //this.game.add.existing(captain);
        
        this.enemyFire = this.add.group();
        this.enemyFire.enableBody = true;
        
    },
    
    update: function() {
        
        // --- PLAYER MOVEMENT
        
        this.ship.rotation = this.game.physics.arcade.angleToPointer(this.ship);
        this.weapon.rotation = this.game.physics.arcade.angleToPointer(this.weapon);
        
        if (this.game.physics.arcade.distanceToPointer(this.ship) > 50) {
            this.game.physics.arcade.moveToPointer(this.ship, this.MAX_SPEED);
        } else {
            this.ship.body.velocity.setTo(0);
        }
        
        // --- FIRE WEAPON
        
        // Fires with mouse click
        if (this.game.input.activePointer.isDown) {
            this.weapon.fire();
        }   

        bruisePool.forEachAlive(aggro, this, this.ship, this.AGGRO_RANGE);
        basicPool.forEachAlive(aggro, this, this.ship, this.AGGRO_RANGE);
        capnPool.forEachAlive(aggro, this, this.ship, this.AGGRO_RANGE);
        asteroids.forEachAlive(bulletcollision, this,this.weapon);
        
    }

};

// Determines aggro
var aggro = function(sprite, ship, distance) {
    
    if (Math.abs(sprite.x - ship.x) <= distance && Math.abs(sprite.y - ship.y) <= distance) {
        this.game.physics.arcade.moveToObject(sprite, ship, 100);
        var angle = Math.atan2(ship.y - sprite.y, ship.x - sprite.x);
        sprite.rotation = angle;
    }
    
};
var bulletcollision=function(sprite,weapon){
    
    this.physics.arcade.overlap(weapon.bullets,sprite,checkOverlap, null, this);


}
var checkOverlap=function(sprite){

    if(sprite.health<=0){

 sprite.kill();

  }else{

    sprite.health--;
  }

//game.camera.follow(invis);

//hitcount-=0;

}


// --- ASTEROIDS

// Asteroid template with physics and standard variables
var Asteroid = function(game, x, y, image, speed, health) {

    this.game = game;
    this.speed = speed;
    this.health = health;


    Phaser.Sprite.call(this, game, x, y, image);

    this.game.physics.arcade.enable(this);
    this.anchor.setTo(0.5);
    this.body.collideWorldBounds = true;

    

}
Asteroid.prototype = Object.create(Phaser.Sprite.prototype);
Asteroid.prototype.constructor = Asteroid;

// --- ENEMIES

// Enemy template with physics and standard variables
var Enemy = function(game, x, y, image, speed, health) {
    
    this.game = game;
    this.speed = speed;
    this.health = health;
    
    Phaser.Sprite.call(this, game, x, y, image);
    
    this.game.physics.arcade.enable(this);
    this.anchor.setTo(0.5);
    this.body.collideWorldBounds = true;
    this.minMovementDistanceX = 500;
    this.maxMovementDistanceY = 500;
    
    // Create a timer
    this.moveTimer = this.game.time.create(false);
    this.moveTimer.start();
    
    // Time in which the enemies change direction
    this.recalcMovement = 0.5;
    this.minimumRecalc = 3;
    this.nextDirectionChange = 0;
    
};

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

// Random enemy movement around the level
Enemy.prototype.move = function() {
    
    var speed = this.speed;
    
    if (Math.round(this.moveTimer.seconds) > this.nextDirectionChange) {
        
        var randomMovementDistanceX = Math.round((Math.random() + 1) * this.minMovementDistanceX + this.minMovementDistanceX);
        var randomMovementDistanceY = Math.round(Math.random() * this.maxMovementDistanceY + this.minMovementDistanceX);
        var moveToX = this.x;
        var moveToY = this.y;
        var moveLeft = false;
        var moveUp = false;
        
        this.nextDirectionChange = (Math.random() * this.recalcMovement + this.minimumRecalc);
        
        if (this.moveTimer) {
            this.moveTimer.destroy();
            this.moveTimer.seconds = 0;
        }
        this.moveTimer = this.game.time.create(false);
        this.moveTimer.start();
        
        if (Math.random() < 0.5) {
            moveLeft = true;
        }
        if (Math.random() < 0.5) {
            moveUp = true;
        }
        
        if (moveLeft && !this.moveRightNextTick) {
            moveToX -= randomMovementDistanceX;
            if (moveToX < 0) {
                moveToX = this.body.width/2;
                this.moveRightNextTick = true;
            }
        } else {
            moveToX += randomMovementDistanceX;
            this.moveRightNextTick = false;
            if (moveToX > this.game.world.width) {
                moveToX = this.game.world.width - this.body.width/2;
            }
        }
            
        if (moveUp && !this.moveDownNextTick) {
            moveToY -= randomMovementDistanceY;
            if (moveToY < 0) {
                moveToY = this.body.height/2;
                this.moveDownNextTick = true;
            }
        } else {
            moveToY += randomMovementDistanceY;
            this.moveDownNextTick = false;
            if (moveToY > this.game.world.height) {
                moveToY = this.game.world.height - this.body.height/2;
            }
        }
        
        this.lastMoveToX = moveToX;
        this.lastMoveToY = moveToY;
        
        this.game.physics.arcade.moveToXY(this, moveToX, moveToY, speed);
        var angle = Math.atan2(moveToY - this.y, moveToX - this.x);
        this.rotation = angle;
        
    }
    
};

Enemy.prototype.update = function() {
    
    this.move();
    
};

// --- INITIATE GAME

game.state.add('GameState', GameState);
game.state.start('GameState');
