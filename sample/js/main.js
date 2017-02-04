var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO);

var enemies;
var asteroids;
var enemyWeapon;
var metalPool;
var crystalPool;
var metal;
var crystal;

// --- GAMESTATE

var GameState = {

    init: function() {

        // Establish player constants
        this.MAX_SPEED = 300;

        // Establish bullet constants
        this.BULLET_SPEED = 600;
        this.FIRE_RATE = 200;
        this.BASIC_BULLET_DAM = 10;

        // Establish enemy constants
        this.BASIC_SPEED = 150;
        this.BASIC_HEALTH = 10;
        this.BRUISER_SPEED = 100;
        this.BRUISER_HEALTH = 30;
        this.CAPTAIN_SPEED = 270;
        this.CAPTAIN_HEALTH = 50;
        this.ESCAPE_POD_SPEED = 350;

        // Establish asteroid constants
        this.BIG_AST_SPEED = 10;
        this.MED_AST_SPEED = 20;
        this.SML_AST_SPEED = 30;
        this.BIG_AST_HEALTH = 30;
        this.MED_AST_HEALTH = 20;
        this.SML_AST_HEALTH = 10;

        // Establish pick-up constants
        this.METAL_SPEED = 2;
        this.CRYSTAL_SPEED = 3;
        this.ANOMALY_SPEED = 1;

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
        this.game.load.image('bigGreyAst', 'assets/biggreyast.png');
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
        this.game.load.image('diamond', 'assets/diamond.png');
        this.game.load.image('star', 'assets/star.png');
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
        for (var i = 0; i < 8; i++) {
            var ast = new Asteroid(this.game, this.game.world.randomX, this.game.world.randomY, 'bigBlueAst', this.BASIC_SPEED, this.BIG_AST_HEALTH)
            ast.body.bounce.set(0.8);
            ast.scale.setTo(0.75);
            ast.body.velocity.setTo(50 ,50);
            asteroids.add(ast);
        }

        // --- ENEMY SPAWNS

        // Add basic enemies
        enemies = this.game.add.group();
        enemies.enableBody = true;
        for (var i = 0; i < 5; i++) {
            basic = new Enemy(this.game, this.game.world.randomX, this.game.world.randomY, 'basic', this.BASIC_SPEED, this.BASIC_HEALTH, this.ship);
            enemies.add(basic);
        }

        // Add bruiser class enemies
        for (var i = 0; i < 2; i++) {
            bruiser = new Enemy(this.game, this.game.world.randomX, this.game.world.randomY, 'bruiser', this.BRUISER_SPEED, this.BRUISER_HEALTH, this.ship);
            enemies.add(bruiser);
        }

        // Add captain class enemies
        for (var m = 0; m < 1; m++) {
            captain = new Enemy(this.game, this.game.world.randomX, this.game.world.randomY, 'captain', this.CAPTAIN_SPEED, this.CAPTAIN_HEALTH, this.ship);
            enemies.add(captain);
        }

        enemyWeapon = this.add.group();
        enemyWeapon.enableBody = true;

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

        enemies.forEachAlive(bulletCollision, this, this.weapon);
        asteroids.forEachAlive(bulletCollision, this, this.weapon);

        this.game.physics.arcade.collide(asteroids, asteroids);
    }

};

var bulletCollision = function(sprite, weapon) {

    this.physics.arcade.overlap(weapon.bullets, sprite, callDamage, null, this);

};

var callDamage = function(sprite, weapon) {
    
    var bullet = weapon;
    bullet.kill();

    if (sprite.health <= 0) {
        sprite.kill();
        console.log(sprite.key);
        if (asteroids.children.indexOf(sprite) > -1) {
            sprite.spawnDrop();   
        }
    } else {
        sprite.health -= this.BASIC_BULLET_DAM;
    }

//game.camera.follow(invis);

//hitcount-=0;

};


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

};

Asteroid.prototype = Object.create(Phaser.Sprite.prototype);
Asteroid.prototype.constructor = Asteroid;

Asteroid.prototype.spawnDrop = function(){

    var metalDropRate = Math.ceil(Math.random() * 100);
    var metalDropAmt = Math.floor(Math.random() * 5);
    var crystalDropRate = Math.ceil(Math.random() * 100);
    var crystalDropAmt = 1;
    var whichCrystal = Math.ceil(Math.random() * 9);
    var plusOrMinus;
    crystalPool = this.game.add.group();
    metalPool = this.game.add.group();
    if(this.health < 1){

        if(metalDropRate < 10) {

            for (var h = 0; h < metalDropAmt; h++) {
                metal = new Metal(this.game, this.x + (h*Math.ceil(Math.random() * 20)), this.y + (h*Math.ceil(Math.random() * 20)), 'star', this.METAL_SPEED);
                plusOrMinus = Math.random() < 0.5 ? -1 : 1;
                metal.body.velocity.setTo(5 * plusOrMinus,5 * plusOrMinus);
                metal.body.bounce.set(0.5);
                metalPool.add(metal);
            }
        } else if(metalDropRate < 15) {

            for (var k = 0; k < metalDropAmt; k++) {
                metal = new Metal(this.game, this.x + (k*Math.ceil(Math.random() * 20)), this.y + (k*Math.ceil(Math.random() * 20)), 'star', this.METAL_SPEED);
                plusOrMinus = Math.random() < 0.5 ? -1 : 1;
                metal.body.velocity.setTo(5 * plusOrMinus,5 * plusOrMinus);
                metal.body.bounce.set(0.5);
                metalPool.add(metal);
            }
        } else if(metalDropRate < 20) {

            for (var l = 0; l < metalDropAmt; l++) {
                metal = new Metal(this.game, this.x + (l*Math.ceil(Math.random() * 20)), this.y + (l*Math.ceil(Math.random() * 20)), 'star', this.METAL_SPEED);
                plusOrMinus = Math.random() < 0.5 ? -1 : 1;
                metal.body.velocity.setTo(5 * plusOrMinus,5 * plusOrMinus);
                metal.body.bounce.set(0.5);
                metalPool.add(metal);
            }
        } else if(metalDropRate < 25) {

            for (var m = 0; m < metalDropAmt; m++) {
                metal = new Metal(this.game, this.x + (m*Math.ceil(Math.random() * 20)), this.y + (m*Math.ceil(Math.random() * 20)), 'star', this.METAL_SPEED);
                plusOrMinus = Math.random() < 0.5 ? -1 : 1;
                metal.body.velocity.setTo(5 * plusOrMinus,5 * plusOrMinus);
                metal.body.bounce.set(0.5);
                metalPool.add(metal);
            }
        } else if(metalDropRate < 30) {

            for (var n = 0; n < metalDropAmt; n++) {
                metal = new Metal(this.game, this.x + (n*Math.ceil(Math.random() * 20)), this.y + (n*Math.ceil(Math.random() * 20)), 'star', this.METAL_SPEED);
                plusOrMinus = Math.random() < 0.5 ? -1 : 1;
                metal.body.velocity.setTo(5 * plusOrMinus,5 * plusOrMinus);
                metal.body.bounce.set(0.5);
                metalPool.add(metal);
            }
        } else if(metalDropRate < 40) {

            for (var o = 0; o < metalDropAmt; o++) {
                metal = new Metal(this.game, this.x + (o*Math.ceil(Math.random() * 20)), this.y + (o*Math.ceil(Math.random() * 20)), 'star', this.METAL_SPEED);
                plusOrMinus = Math.random() < 0.5 ? -1 : 1;
                metal.body.velocity.setTo(5 * plusOrMinus,5 * plusOrMinus);
                metal.body.bounce.set(0.5);
                metalPool.add(metal);
            }
        } else if(metalDropRate < 45) {

            for (var p = 0; p < metalDropAmt; p++) {
                metal = new Metal(this.game, this.x + (p*Math.ceil(Math.random() * 20)), this.y + (p*Math.ceil(Math.random() * 20)), 'star', this.METAL_SPEED);
                plusOrMinus = Math.random() < 0.5 ? -1 : 1;
                metal.body.velocity.setTo(5 * plusOrMinus,5 * plusOrMinus);
                metal.body.bounce.set(0.5);
                metalPool.add(metal);
            }
        } else if(metalDropRate < 50) {

            for (var i = 0; i < metalDropAmt; i++) {
                metal = new Metal(this.game, this.x + (i*Math.ceil(Math.random() * 20)), this.y + (i*Math.ceil(Math.random() * 20)), 'star', this.METAL_SPEED);
                plusOrMinus = Math.random() < 0.5 ? -1 : 1;
                metal.body.velocity.setTo(5 * plusOrMinus,5 * plusOrMinus);
                metal.body.bounce.set(0.5);
                metalPool.add(metal);
            }
        } else if(metalDropRate < 55) {

            for (var q = 0; q < metalDropAmt; q++) {
                metal = new Metal(this.game, this.x + (q*Math.ceil(Math.random() * 20)), this.y + (q*Math.ceil(Math.random() * 20)), 'star', this.METAL_SPEED);
                plusOrMinus = Math.random() < 0.5 ? -1 : 1;
                metal.body.velocity.setTo(5 * plusOrMinus,5 * plusOrMinus);
                metal.body.bounce.set(0.5);
                metalPool.add(metal);
            }
        } else if(metalDropRate < 60) {

            for (var r = 0; r < metalDropAmt; r++) {
                metal = new Metal(this.game, this.x + (r*Math.ceil(Math.random() * 20)), this.y + (r*Math.ceil(Math.random() * 20)), 'star', this.METAL_SPEED);
                plusOrMinus = Math.random() < 0.5 ? -1 : 1;
                metal.body.velocity.setTo(5 * plusOrMinus,5 * plusOrMinus);
                metal.body.bounce.set(0.5);
                metalPool.add(metal);
            }
        } else if(metalDropRate < 65) {

            for (var i = 0; i < metalDropAmt; i++) {
                metal = new Metal(this.game, this.x + (i*Math.ceil(Math.random() * 20)), this.y + (i*Math.ceil(Math.random() * 20)), 'star', this.METAL_SPEED);
                plusOrMinus = Math.random() < 0.5 ? -1 : 1;
                metal.body.velocity.setTo(5 * plusOrMinus,5 * plusOrMinus);
                metal.body.bounce.set(0.5);
                metalPool.add(metal);
            }
        } else if(metalDropRate < 70) {

            for (var i = 0; i < metalDropAmt; i++) {
                metal = new Metal(this.game, this.x + (i*Math.ceil(Math.random() * 20)), this.y + (i*Math.ceil(Math.random() * 20)), 'star', this.METAL_SPEED);
                plusOrMinus = Math.random() < 0.5 ? -1 : 1;
                metal.body.velocity.setTo(5 * plusOrMinus,5 * plusOrMinus);
                metal.body.bounce.set(0.5);
                metalPool.add(metal);
            }
        } else if(metalDropRate < 75) {

            for (var i = 0; i < metalDropAmt; i++) {
                metal = new Metal(this.game, this.x + (i*Math.ceil(Math.random() * 20)), this.y + (i*Math.ceil(Math.random() * 20)), 'star', this.METAL_SPEED);
                plusOrMinus = Math.random() < 0.5 ? -1 : 1;
                metal.body.velocity.setTo(5 * plusOrMinus,5 * plusOrMinus);
                metal.body.bounce.set(0.5);
                metalPool.add(metal);
            }
        } else if(metalDropRate < 80) {

            for (var i = 0; i < metalDropAmt; i++) {
                metal = new Metal(this.game, this.x + (i*Math.ceil(Math.random() * 20)), this.y + (i*Math.ceil(Math.random() * 20)), 'star', this.METAL_SPEED);
                plusOrMinus = Math.random() < 0.5 ? -1 : 1;
                metal.body.velocity.setTo(5 * plusOrMinus,5 * plusOrMinus);
                metal.body.bounce.set(0.5);
                metalPool.add(metal);
            }
        } else if(metalDropRate < 85) {

            for (var i = 0; i < metalDropAmt; i++) {
                metal = new Metal(this.game, this.x + (i*Math.ceil(Math.random() * 20)), this.y + (i*Math.ceil(Math.random() * 20)), 'star', this.METAL_SPEED);
                plusOrMinus = Math.random() < 0.5 ? -1 : 1;
                metal.body.velocity.setTo(5 * plusOrMinus,5 * plusOrMinus);
                metal.body.bounce.set(0.5);
                metalPool.add(metal);
            }
        } else if(metalDropRate < 90) {

            for (var i = 0; i < metalDropAmt; i++) {
                metal = new Metal(this.game, this.x + ((i+1)*Math.ceil(Math.random() * 20)), this.y + ((i+1)*Math.ceil(Math.random() * 20)), 'star', this.METAL_SPEED);
                plusOrMinus = Math.random() < 0.5 ? -1 : 1;
                metal.body.velocity.setTo(5 * plusOrMinus,5 * plusOrMinus);
                metal.body.bounce.set(0.5);
                metalPool.add(metal);
            }
        }

        if(crystalDropRate <= 100){
            for (var j = 0; j < crystalDropAmt; j++){
                switch(whichCrystal){
                    case 1:
                        crystal = new Crystal(this.game, this.x + ((j+1)*Math.ceil(Math.random() * 20)), this.y + ((j+1)*Math.ceil(Math.random() * 20)), 'diamond', this.CRYSTAL_SPEED);
                        break;
                    case 2:
                        crystal = new Crystal(this.game, this.x + ((j+1)*Math.ceil(Math.random() * 20)), this.y + ((j+1)*Math.ceil(Math.random() * 20)), 'diamond', this.CRYSTAL_SPEED);
                        break;
                    case 3:
                        crystal = new Crystal(this.game, this.x + ((j+1)*Math.ceil(Math.random() * 20)), this.y + ((j+1)*Math.ceil(Math.random() * 20)), 'diamond', this.CRYSTAL_SPEED);
                        break;
                    case 4:
                        crystal = new Crystal(this.game, this.x + ((j+1)*Math.ceil(Math.random() * 20)), this.y + ((j+1)*Math.ceil(Math.random() * 20)), 'diamond', this.CRYSTAL_SPEED);
                        break;
                    case 5:
                        crystal = new Crystal(this.game, this.x + ((j+1)*Math.ceil(Math.random() * 20)), this.y + ((j+1)*Math.ceil(Math.random() * 20)), 'diamond', this.CRYSTAL_SPEED);
                        break;
                    case 6:
                        crystal = new Crystal(this.game, this.x + ((j+1)*Math.ceil(Math.random() * 20)), this.y + ((j+1)*Math.ceil(Math.random() * 20)), 'diamond', this.CRYSTAL_SPEED);
                        break;
                    case 7:
                        crystal = new Crystal(this.game, this.x + ((j+1)*Math.ceil(Math.random() * 20)), this.y + ((j+1)*Math.ceil(Math.random() * 20)), 'diamond', this.CRYSTAL_SPEED);
                        break;
                    case 8:
                        crystal = new Crystal(this.game, this.x + ((j+1)*Math.ceil(Math.random() * 20)), this.y + ((j+1)*Math.ceil(Math.random() * 20)), 'diamond', this.CRYSTAL_SPEED);
                        break;
                    case 9:
                        crystal = new Crystal(this.game, this.x + ((j+1)*Math.ceil(Math.random() * 20)), this.y + ((j+1)*Math.ceil(Math.random() * 20)), 'diamond', this.CRYSTAL_SPEED);
                        break;
                }
                var minusOrPlus = Math.random() < 0.5 ? 1 : -1;
                crystal.body.velocity.setTo(5 * minusOrPlus, 5 * minusOrPlus);
                crystal.body.bounce.set(0.5);
                crystalPool.add(crystal);
            }
        }



    }
};

Asteroid.prototype.update = function(){

    this.angle += 0.5;

};

// --- CRYSTALS

// Crystal template with physics and standard variables
var Crystal = function(game, x, y, image, speed) {

    this.game = game;
    this.speed = speed;

    Phaser.Sprite.call(this, game, x, y, image);

    this.game.physics.arcade.enable(this);
    this.anchor.setTo(0.5);
    this.body.collideWorldBounds = true;

};

Crystal.prototype = Object.create(Phaser.Sprite.prototype);
Crystal.prototype.constructor = Crystal;

// --- METALS

// Metal template with physics and standard variables
var Metal = function(game, x, y, image, speed) {

    this.game = game;
    this.speed = speed;

    Phaser.Sprite.call(this, game, x, y, image);

    this.game.physics.arcade.enable(this);
    this.anchor.setTo(0.5);
    this.body.collideWorldBounds = true;

};

Metal.prototype = Object.create(Phaser.Sprite.prototype);
Metal.prototype.constructor = Metal;

// --- ENEMIES

// Enemy template with physics and standard variables
var Enemy = function(game, x, y, image, speed, health, player) {
    
    this.game = game;
    this.speed = speed;
    this.health = health;
    this.player = player;
    this.aggroRange = 200;
    this.minDist = 100;
    
    Phaser.Sprite.call(this, game, x, y, image);
    
    this.game.physics.arcade.enable(this);
    this.anchor.setTo(0.5);
    this.body.collideWorldBounds = true;
    this.minDistX = 350;
    this.maxDistY = 350;
    
    // Create a timer
    this.moveTimer = this.game.time.create(false);
    this.moveTimer.start();
    
    // Time in which the enemies change direction
    this.recalcMovement = 0.5;
    this.minimumRecalc = 3;
    this.nextTurn = 0;
    
};

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

// Random enemy movement around the level
Enemy.prototype.move = function() {
    
    if (Math.round(this.moveTimer.seconds) > this.nextTurn) {
        
        var randomDistX = Math.round((Math.random() + 1) * this.minDistX + this.minDistX);
        var randomDistY = Math.round(Math.random() * this.maxDistY + this.minDistX);
        var moveX = this.x;
        var moveY = this.y;
        var moveLeft = false;
        var moveUp = false;
        
        this.nextTurn = (Math.random() * this.recalcMovement + this.minimumRecalc);
        
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
        
        if (moveLeft && !this.moveRightNext) {
            moveX -= randomDistX;
            if (moveX < 0) {
                moveX = this.body.width/2;
                this.moveRightNext = true;
            }
        } else {
            moveX += randomDistX;
            this.moveRightNext = false;
            if (moveX > this.game.world.width) {
                moveX = this.game.world.width - this.body.width/2;
            }
        }
            
        if (moveUp && !this.moveDownNext) {
            moveY -= randomDistY;
            if (moveY < 0) {
                moveY = this.body.height/2;
                this.moveDownNext = true;
            }
        } else {
            moveY += randomDistY;
            this.moveDownNext = false;
            if (moveY > this.game.world.height) {
                moveY = this.game.world.height - this.body.height/2;
            }
        }
        
        this.game.physics.arcade.moveToXY(this, moveX, moveY, this.speed);
        var angle = Math.atan2(moveY - this.y, moveX - this.x);
        this.rotation = angle;
        
    }
    
};

Enemy.prototype.update = function() {
    
    var distance = this.game.physics.arcade.distanceBetween(this.player, this);
    
    if (distance <= this.aggroRange) {
        if (distance >= this.minDist) {
            this.game.physics.arcade.moveToXY(this, this.player.x, this.player.y, this.speed);
        } else {
            this.body.velocity.setTo(0);
        }
        var angle = Math.atan2(this.player.y - this.y, this.player.x - this.x);
        this.rotation = angle;
        
    } else {
        this.move();
    }
    
};

// --- INITIATE GAME

game.state.add('GameState', GameState);
game.state.start('GameState');
