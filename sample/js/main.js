/** Copyright Ivy Tower, LLC **/

var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO);

var asteroids;
var metal;
var metals;
var crystal;
var crystals;
var enemies;
var enemyBullet;
var enemyWeapon;
var score = 0;
var scoreText;
var dusts;
var dust;
var collectedMetals = [];

// Bullet damages
var SHIP_BASIC_DAM = 10; // Standard weapon
var ENEM_BASIC_DAM = 5;
var ENEM_BRUIS_DAM = 20;
var ENEM_CAPTN_DAM = 5; // For each of 3 shots
var ENEM_GOVMT_DAM = 5;

// Asteroids variables
var BIG_AST_HEALTH = 30;
var MED_AST_HEALTH = 20;
var SML_AST_HEALTH = 10;

// Escape pod variables
var ESCAPE_POD_SPEED = 300;
var ESCAPE_POD_HEALTH = 10;
var DUST_COLLECTED = 0;

// --- GAMESTATE

var GameState = {

    init: function() {

        // Establish player constants
        this.SHIP_SPEED = 300;
        this.SHIP_HEALTH = 200;

        // Establish bullet constants
        this.BULLET_SPEED = 600;
        this.FIRE_RATE = 150;

        // Establish enemy constants
        this.BASIC_SPEED = 150;
        this.BASIC_HEALTH = 50;
        this.BRUISER_SPEED = 100;
        this.BRUISER_HEALTH = 300;
        this.CAPTAIN_SPEED = 230;
        this.CAPTAIN_HEALTH = 100;
        this.GOVT_SPEED = 150;
        this.GOVT_HEALTH = 50;

        // Establish pick-up constants
        this.ANOMALY_SPEED = 1;

        // Initiate physics
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.weapons = [];
        this.currentWeapon = 0;

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
        this.game.load.image('escape', 'assets/escape.png');
        this.game.load.image('govt', 'assets/govten.png');
        this.game.load.image('govtb', 'assets/govtbull.png');
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
        this.game.load.image('ruby', 'assets/diamond.png');
        this.game.load.image('sunstone', 'assets/diamond.png');
        this.game.load.image('topaz', 'assets/diamond.png');
        this.game.load.image('emerald', 'assets/diamond.png');
        this.game.load.image('sapphire', 'assets/diamond.png');
        this.game.load.image('amethyst', 'assets/diamond.png');
        this.game.load.image('obsidian', 'assets/diamond.png');
        this.game.load.image('opal', 'assets/diamond.png');
        this.game.load.image('star', 'assets/star.png');
        this.game.load.image('smlDust', 'assets/smldust.png');
        this.game.load.image('medDust', 'assets/meddust.png');
        this.game.load.image('bigDust', 'assets/bigdust.png');
    },

    create: function() {

        // --- GAME SETUP

        // Set world bounds
        this.game.world.setBounds(0, 0, 5000, 5000);

        // Simple starry background for now
        var bg = this.game.add.sprite(0, 0, 'bg');
        bg.x = 0;
        bg.y = 0;
        bg.height = this.game.world.height;
        bg.width = this.game.world.width;

        // Set score
      

        // Add moon for reference point
        this.moon = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'moon');
        this.moon.anchor.setTo(0.5);
        //this.moon.scale.setTo(0.5);

        // --- PLAYER SHIP

        // Adds player ship in center
        this.ship = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'ship');
        this.ship.anchor.setTo(0.5);
        this.ship.angle = -90; // Points the ship up
        this.game.physics.enable(this.ship, Phaser.Physics.ARCADE);
        this.ship.health = this.SHIP_HEALTH; //The ship's health
        // Collide with world boundaries
        this.ship.body.collideWorldBounds = true;
        // Camera follows ship
        this.game.camera.follow(this.ship);

        // --- PLAYER BULLETS
          
        // Adds bullets from a pool of 30 and applies constants
        this.weapon = this.game.add.weapon(30, 'bullet');
        this.weapon.bulletKillType = Phaser.Weapon.KILL_CAMERA_BOUNDS;
        this.weapon.bulletSpeed = this.BULLET_SPEED;
        this.weapon.fireRate = this.FIRE_RATE;
        // Bullets come from the ship's tip
        this.weapon.trackSprite(this.ship, 19, 0, true);

        // --- ASTEROID SPAWNS

        asteroids = this.game.add.group();
        for (var i = 0; i < 50; i++) {
            var whichShade = (Math.ceil(Math.random() * 5));
            var randDirect = Math.random() < 0.5 ? 1 : -1;
            switch (whichShade) {
                case 1:
                var ast = new Asteroid(this.game, this.game.world.randomX, this.game.world.randomY, 'bigBlueAst', BIG_AST_HEALTH)
                    ast.body.bounce.set(0.8);
                    ast.scale.setTo(0.75);
                    ast.body.velocity.setTo(randDirect * 50, randDirect * 50);
                    asteroids.add(ast);
                    break;
                case 2:
                    ast = new Asteroid(this.game, this.game.world.randomX, this.game.world.randomY, 'bigRedAst', BIG_AST_HEALTH)
                    ast.body.bounce.set(0.8);
                    ast.scale.setTo(0.75);
                    ast.body.velocity.setTo(randDirect * 50, randDirect * 50);
                    asteroids.add(ast);
                    break;
                case 3:
                    ast = new Asteroid(this.game, this.game.world.randomX, this.game.world.randomY, 'bigGreyAst', BIG_AST_HEALTH)
                    ast.body.bounce.set(0.8);
                    ast.scale.setTo(0.75);
                    ast.body.velocity.setTo(randDirect * 50, randDirect * 50);
                    asteroids.add(ast);
                    break;
                case 4:
                    ast = new Asteroid(this.game, this.game.world.randomX, this.game.world.randomY, 'bigGreyAst', BIG_AST_HEALTH)
                    ast.body.bounce.set(0.8);
                    ast.scale.setTo(0.75);
                    ast.body.velocity.setTo(randDirect * 50, randDirect * 50);
                    asteroids.add(ast);
                    break;
                case 5:
                    ast = new Asteroid(this.game, this.game.world.randomX, this.game.world.randomY, 'bigBrownAst', BIG_AST_HEALTH)
                    ast.body.bounce.set(0.8);
                    ast.scale.setTo(0.75);
                    ast.body.velocity.setTo(randDirect * 50, randDirect * 50);
                    asteroids.add(ast);
                    break;
            }
        }
        
        crystals = this.game.add.group();
        metals = this.game.add.group();
        dusts = this.game.add.group();

        // --- ENEMY SPAWNS

        // Add basic enemies
        enemies = this.game.add.group();
        enemies.enableBody = true;
        for (var i = 0; i < 10; i++) {
            basic = new Enemy(this.game, this.game.world.randomX, this.game.world.randomY, 'basic', this.BASIC_SPEED, this.BASIC_HEALTH, this.ship);
            enemies.add(basic);
        }

        // Add bruiser class enemies
        for (var i = 0; i < 5; i++) {
            bruiser = new Enemy(this.game, this.game.world.randomX, this.game.world.randomY, 'bruiser', this.BRUISER_SPEED, this.BRUISER_HEALTH, this.ship);
            enemies.add(bruiser);
        }

        // Add captain class enemies
        for (var m = 0; m < 1; m++) {
            captain = new Enemy(this.game, this.game.world.randomX, this.game.world.randomY, 'captain', this.CAPTAIN_SPEED, this.CAPTAIN_HEALTH, this.ship);
            enemies.add(captain);
        }
        
        // Add government enemies
        for (var i = 0; i < 20; i++) {
            var govt = new Enemy(this.game, this.game.world.randomX, this.game.world.randomY, 'govt', this.GOVT_SPEED, this.GOVT_HEALTH, this.ship);
            enemies.add(govt);
        }

        enemyWeapon = this.add.group();
        scoreText = game.add.text(0, 0, 'SCORE: ' + score + '   Dust: '+DUST_COLLECTED, { fontSize: '32px', fill: "#FFF" });
          scoreText.fixedToCamera = true;
        enemyWeapon.enableBody = true;

    },

    update: function() {

        //scoreText.alignTo(this.game.camera.view, Phaser.LEFT_TOP);

        // --- PLAYER MOVEMENT
        //scoreText = game.add.text(0, 0, 'SCORE: 0'+'   H-FUEL:'+DUST_COLLECTED, { fontSize: '32px', fill: "#FFF" });
          
        this.ship.rotation = this.game.physics.arcade.angleToPointer(this.ship);
        this.weapon.rotation = this.game.physics.arcade.angleToPointer(this.weapon);

        if (this.game.physics.arcade.distanceToPointer(this.ship) > 50) {
            this.game.physics.arcade.moveToPointer(this.ship, this.SHIP_SPEED);
        } else {
            this.ship.body.velocity.setTo(0);
        }

        // --- FIRE WEAPON

        // Fires with mouse click
        if (this.game.input.activePointer.isDown) {
            if (this.game.physics.arcade.distanceToPointer(this.ship) > 25) {
                this.game.physics.arcade.moveToPointer(this.ship, 125);
            }
            this.weapon.fire();
        }

        enemies.forEachAlive(bulletCollision, this, this.weapon);
        asteroids.forEachAlive(bulletCollision, this, this.weapon);
        this.physics.arcade.overlap(enemyWeapon, this.ship, callDamage, null, this);

        if (this.ship.alive == true) {
            this.physics.arcade.overlap(this.ship, crystals, collectCrystal, null, this);
            this.physics.arcade.overlap(this.ship, metals, collectMetal, null, this);
            this.physics.arcade.overlap(this.ship, dusts, collectDust, null, this);
        }
        var key=game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        if(key.isDown && DUST_COLLECTED > 0){
              DUST_COLLECTED-=1;
              scoreText.setText('SCORE: ' + score + '   Dust: '+DUST_COLLECTED);
        	this.SHIP_SPEED=600;

        }else{this.SHIP_SPEED=300;}

        this.game.physics.arcade.collide(asteroids, asteroids);
    }

};

var bulletCollision = function(sprite, weapon) {

    this.physics.arcade.overlap(weapon.bullets, sprite, callDamage, null, this);

};

var callDamage = function(sprite, weapon) {
    
    var bullet = weapon;
    bullet.kill();
    
    var damage;
    switch (weapon.key) {
        case 'bullet':
            damage = SHIP_BASIC_DAM;
            break;
        case 'basicb':
            damage = ENEM_BASIC_DAM;
            break;
        case 'bruiserb':
            damage = ENEM_BRUIS_DAM;
            break;
        case 'captainb':
            damage = ENEM_CAPTN_DAM;
            break;
        case 'govtb':
            damage = ENEM_GOVMT_DAM;
            break;
    }

    if (sprite.health <= 0) {
        sprite.kill();
        if(sprite.key == 'basic'){
        score += 10;
    } else if(sprite.key == 'bruiser'){
        score += 20;
    } else if(sprite.key == 'govt'){
        score += 15;
    } else if(sprite.key == 'captain'){
        score += 30;
    } else if(sprite.key == 'escape'){
        score += 50;
    }
        
    scoreText.setText('SCORE: ' + score + '   DUST: ' + DUST_COLLECTED);
        
        if (asteroids.children.indexOf(sprite) > -1) {
            sprite.spawnDrop();
            sprite.bust();
        }
        if (sprite.key == 'captain') {
            sprite.escapePod();
        }
    } else {
        if(sprite.key == 'ship' && DUST_COLLECTED > 0){
                DUST_COLLECTED -= damage;
                scoreText.setText('SCORE: ' + score + '   DUST: ' + DUST_COLLECTED);
            
        } else {
            sprite.health -= damage;
        }
    }
};

var collectCrystal = function(ship, crystal){
    
    if(crystal.key == 'diamond'){
        console.log(crystal.key);
        
    } else if(crystal.key == 'ruby'){
        console.log(crystal.key);
        
    } else if(crystal.key == 'sunstone'){
        console.log(crystal.key);
        
    } else if(crystal.key == 'topaz'){
        console.log(crystal.key);
        
    } else if(crystal.key == 'emerald'){
        console.log(crystal.key);
        
    } else if(crystal.key == 'sapphire'){
        console.log(crystal.key);
        
    } else if(crystal.key == 'amethyst'){
        console.log(crystal.key);
        
    } else if(crystal.key == 'obsidian'){
        console.log(crystal.key);
        
    } else if(crystal.key == 'opal'){
        console.log(crystal.key);
        
    }
    crystal.kill();

};

var collectMetal = function(ship, metal){
    
    collectedMetals.push(metal);
    metal.kill();

};

var collectDust = function(ship, dust){
    
	if(DUST_COLLECTED<300){
        
        if(dust.key == 'smlDust') {
            DUST_COLLECTED+=5;
        } else if(dust.key == "medDust"){
            DUST_COLLECTED += 10;
        }else if(dust.key == "bigDust"){ 
            DUST_COLLECTED += 20;
        }
        
        scoreText.setText('SCORE: ' + score + '   H-FUEL:'+DUST_COLLECTED);
        
    }
    
    dust.kill();

};


// --- ASTEROIDS

// Asteroid template with physics and standard variables
var Asteroid = function(game, x, y, image, health) {

    this.game = game;
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
    if(this.health < 1){

        if(metalDropRate < 10) {

            for (var h = 0; h < metalDropAmt; h++) {
                metal = new Metal(this.game, this.x + (h*Math.ceil(Math.random() * 20)), this.y + (h*Math.ceil(Math.random() * 20)), 'star');
                plusOrMinus = Math.random() < 0.5 ? -1 : 1;
                metal.body.velocity.setTo(5 * plusOrMinus,5 * plusOrMinus);
                metal.body.bounce.set(0.5);
                metals.add(metal);
            }
        } else if(metalDropRate < 15) {

            for (var k = 0; k < metalDropAmt; k++) {
                metal = new Metal(this.game, this.x + (k*Math.ceil(Math.random() * 20)), this.y + (k*Math.ceil(Math.random() * 20)), 'star');
                plusOrMinus = Math.random() < 0.5 ? -1 : 1;
                metal.body.velocity.setTo(5 * plusOrMinus,5 * plusOrMinus);
                metal.body.bounce.set(0.5);
                metals.add(metal);
            }
        } else if(metalDropRate < 20) {

            for (var l = 0; l < metalDropAmt; l++) {
                metal = new Metal(this.game, this.x + (l*Math.ceil(Math.random() * 20)), this.y + (l*Math.ceil(Math.random() * 20)), 'star');
                plusOrMinus = Math.random() < 0.5 ? -1 : 1;
                metal.body.velocity.setTo(5 * plusOrMinus,5 * plusOrMinus);
                metal.body.bounce.set(0.5);
                metals.add(metal);
            }
        } else if(metalDropRate < 25) {

            for (var m = 0; m < metalDropAmt; m++) {
                metal = new Metal(this.game, this.x + (m*Math.ceil(Math.random() * 20)), this.y + (m*Math.ceil(Math.random() * 20)), 'star');
                plusOrMinus = Math.random() < 0.5 ? -1 : 1;
                metal.body.velocity.setTo(5 * plusOrMinus,5 * plusOrMinus);
                metal.body.bounce.set(0.5);
                metals.add(metal);
            }
        } else if(metalDropRate < 30) {

            for (var n = 0; n < metalDropAmt; n++) {
                metal = new Metal(this.game, this.x + (n*Math.ceil(Math.random() * 20)), this.y + (n*Math.ceil(Math.random() * 20)), 'star');
                plusOrMinus = Math.random() < 0.5 ? -1 : 1;
                metal.body.velocity.setTo(5 * plusOrMinus,5 * plusOrMinus);
                metal.body.bounce.set(0.5);
                metals.add(metal);
            }
        } else if(metalDropRate < 40) {

            for (var o = 0; o < metalDropAmt; o++) {
                metal = new Metal(this.game, this.x + (o*Math.ceil(Math.random() * 20)), this.y + (o*Math.ceil(Math.random() * 20)), 'star');
                plusOrMinus = Math.random() < 0.5 ? -1 : 1;
                metal.body.velocity.setTo(5 * plusOrMinus,5 * plusOrMinus);
                metal.body.bounce.set(0.5);
                metals.add(metal);
            }
        } else if(metalDropRate < 45) {

            for (var p = 0; p < metalDropAmt; p++) {
                metal = new Metal(this.game, this.x + (p*Math.ceil(Math.random() * 20)), this.y + (p*Math.ceil(Math.random() * 20)), 'star');
                plusOrMinus = Math.random() < 0.5 ? -1 : 1;
                metal.body.velocity.setTo(5 * plusOrMinus,5 * plusOrMinus);
                metal.body.bounce.set(0.5);
                metals.add(metal);
            }
        } else if(metalDropRate < 50) {

            for (var i = 0; i < metalDropAmt; i++) {
                metal = new Metal(this.game, this.x + (i*Math.ceil(Math.random() * 20)), this.y + (i*Math.ceil(Math.random() * 20)), 'star');
                plusOrMinus = Math.random() < 0.5 ? -1 : 1;
                metal.body.velocity.setTo(5 * plusOrMinus,5 * plusOrMinus);
                metal.body.bounce.set(0.5);
                metals.add(metal);
            }
        } else if(metalDropRate < 55) {

            for (var q = 0; q < metalDropAmt; q++) {
                metal = new Metal(this.game, this.x + (q*Math.ceil(Math.random() * 20)), this.y + (q*Math.ceil(Math.random() * 20)), 'star');
                plusOrMinus = Math.random() < 0.5 ? -1 : 1;
                metal.body.velocity.setTo(5 * plusOrMinus,5 * plusOrMinus);
                metal.body.bounce.set(0.5);
                metals.add(metal);
            }
        } else if(metalDropRate < 60) {

            for (var r = 0; r < metalDropAmt; r++) {
                metal = new Metal(this.game, this.x + (r*Math.ceil(Math.random() * 20)), this.y + (r*Math.ceil(Math.random() * 20)), 'star');
                plusOrMinus = Math.random() < 0.5 ? -1 : 1;
                metal.body.velocity.setTo(5 * plusOrMinus,5 * plusOrMinus);
                metal.body.bounce.set(0.5);
                metals.add(metal);
            }
        } else if(metalDropRate < 65) {

            for (var i = 0; i < metalDropAmt; i++) {
                metal = new Metal(this.game, this.x + (i*Math.ceil(Math.random() * 20)), this.y + (i*Math.ceil(Math.random() * 20)), 'star');
                plusOrMinus = Math.random() < 0.5 ? -1 : 1;
                metal.body.velocity.setTo(5 * plusOrMinus,5 * plusOrMinus);
                metal.body.bounce.set(0.5);
                metals.add(metal);
            }
        } else if(metalDropRate < 70) {

            for (var i = 0; i < metalDropAmt; i++) {
                metal = new Metal(this.game, this.x + (i*Math.ceil(Math.random() * 20)), this.y + (i*Math.ceil(Math.random() * 20)), 'star');
                plusOrMinus = Math.random() < 0.5 ? -1 : 1;
                metal.body.velocity.setTo(5 * plusOrMinus,5 * plusOrMinus);
                metal.body.bounce.set(0.5);
                metals.add(metal);
            }
        } else if(metalDropRate < 75) {

            for (var i = 0; i < metalDropAmt; i++) {
                metal = new Metal(this.game, this.x + (i*Math.ceil(Math.random() * 20)), this.y + (i*Math.ceil(Math.random() * 20)), 'star');
                plusOrMinus = Math.random() < 0.5 ? -1 : 1;
                metal.body.velocity.setTo(5 * plusOrMinus,5 * plusOrMinus);
                metal.body.bounce.set(0.5);
                metals.add(metal);
            }
        } else if(metalDropRate < 80) {

            for (var i = 0; i < metalDropAmt; i++) {
                metal = new Metal(this.game, this.x + (i*Math.ceil(Math.random() * 20)), this.y + (i*Math.ceil(Math.random() * 20)), 'star');
                plusOrMinus = Math.random() < 0.5 ? -1 : 1;
                metal.body.velocity.setTo(5 * plusOrMinus,5 * plusOrMinus);
                metal.body.bounce.set(0.5);
                metals.add(metal);
            }
        } else if(metalDropRate < 85) {

            for (var i = 0; i < metalDropAmt; i++) {
                metal = new Metal(this.game, this.x + (i*Math.ceil(Math.random() * 20)), this.y + (i*Math.ceil(Math.random() * 20)), 'star');
                plusOrMinus = Math.random() < 0.5 ? -1 : 1;
                metal.body.velocity.setTo(5 * plusOrMinus,5 * plusOrMinus);
                metal.body.bounce.set(0.5);
                metals.add(metal);
            }
        } else if(metalDropRate < 90) {

            for (var i = 0; i < metalDropAmt; i++) {
                metal = new Metal(this.game, this.x + ((i+1)*Math.ceil(Math.random() * 20)), this.y + ((i+1)*Math.ceil(Math.random() * 20)), 'star');
                plusOrMinus = Math.random() < 0.5 ? -1 : 1;
                metal.body.velocity.setTo(5 * plusOrMinus,5 * plusOrMinus);
                metal.body.bounce.set(0.5);
                metals.add(metal);
            }
        }

        if(crystalDropRate <= 9){
            for (var j = 0; j < crystalDropAmt; j++){
                switch(whichCrystal){
                    case 1:
                        crystal = new Crystal(this.game, this.x + ((j+1)*Math.ceil(Math.random() * 20)), this.y + ((j+1)*Math.ceil(Math.random() * 20)), 'diamond');
                        break;
                    case 2:
                        crystal = new Crystal(this.game, this.x + ((j+1)*Math.ceil(Math.random() * 20)), this.y + ((j+1)*Math.ceil(Math.random() * 20)), 'diamond');
                        break;
                    case 3:
                        crystal = new Crystal(this.game, this.x + ((j+1)*Math.ceil(Math.random() * 20)), this.y + ((j+1)*Math.ceil(Math.random() * 20)), 'diamond');
                        break;
                    case 4:
                        crystal = new Crystal(this.game, this.x + ((j+1)*Math.ceil(Math.random() * 20)), this.y + ((j+1)*Math.ceil(Math.random() * 20)), 'diamond');
                        break;
                    case 5:
                        crystal = new Crystal(this.game, this.x + ((j+1)*Math.ceil(Math.random() * 20)), this.y + ((j+1)*Math.ceil(Math.random() * 20)), 'diamond');
                        break;
                    case 6:
                        crystal = new Crystal(this.game, this.x + ((j+1)*Math.ceil(Math.random() * 20)), this.y + ((j+1)*Math.ceil(Math.random() * 20)), 'diamond');
                        break;
                    case 7:
                        crystal = new Crystal(this.game, this.x + ((j+1)*Math.ceil(Math.random() * 20)), this.y + ((j+1)*Math.ceil(Math.random() * 20)), 'diamond');
                        break;
                    case 8:
                        crystal = new Crystal(this.game, this.x + ((j+1)*Math.ceil(Math.random() * 20)), this.y + ((j+1)*Math.ceil(Math.random() * 20)), 'diamond');
                        break;
                    case 9:
                        crystal = new Crystal(this.game, this.x + ((j+1)*Math.ceil(Math.random() * 20)), this.y + ((j+1)*Math.ceil(Math.random() * 20)), 'diamond');
                        break;
                }
                var minusOrPlus = Math.random() < 0.5 ? 1 : -1;
                crystal.body.velocity.setTo(5 * minusOrPlus, 5 * minusOrPlus);
                crystal.body.bounce.set(0.5);
                crystals.add(crystal);
            }
        }

        if(this.key == 'bigRedAst' || 'bigBlueAst' || 'bigWhiteAst' || 'bigGreyAst' || 'bigBrownAst'){
            var randoDirect;
            for (var z = 0; z < 5; z++){
                dust = new Dust(this.game, this.x + z + (Math.ceil(Math.random() * 20)), this.y + z + (Math.ceil(Math.random() * 20)), 'bigDust');
                randoDirect = Math.random() < 0.5 ? 1 : -1;
                dust.body.velocity.setTo(5 * randoDirect, 5 * randoDirect);
                dusts.add(dust);
            }

        } else if(this.key == 'medRedAst' || 'medBlueAst' || 'medWhiteAst' || 'medGreyAst' || 'medBrownAst'){
            for (var zy = 0; zy < 3; zy++){
                dust = new Dust(this.game, this.x + (Math.ceil(Math.random() * 20)), this.y + (Math.ceil(Math.random() * 20)), 'medDust');
                randoDirect = Math.random() < 0.5 ? 1 : -1;
                dust.body.velocity.setTo(5 * randoDirect, 5 * randoDirect);
                dust.scale.setTo(0.75);
                dusts.add(dust);
            }

        } else if(this.key == 'smlRedAst' || 'smlBlueAst' || 'smlWhiteAst' || 'smlGreyAst' || 'smlBrownAst') {
            for (var zyx = 0; zyx < 1; zyx++) {
                dust = new Dust(this.game, this.x + (Math.ceil(Math.random() * 20)), this.y + (Math.ceil(Math.random() * 20)), 'smlDust');
                randoDirect = Math.random() < 0.5 ? 1 : -1;
                dust.body.velocity.setTo(5 * randoDirect, 5 * randoDirect);
                dust.scale.setTo(0.5);
                dusts.add(dust);
            }

        }
    }
};

Asteroid.prototype.bust = function(){
    if(this.key == 'bigBlueAst') {
        for (var a = 0; a < (Math.ceil(Math.random() * 3)); a++) {
            var medAst = new Asteroid(this.game, this.x + ((a + 1) * Math.ceil(Math.random() * 20)), this.y + ((a + 1) * Math.ceil(Math.random() * 20)), 'medBlueAst', MED_AST_HEALTH);
            plusOrMinus = Math.random() < 0.5 ? -1 : 1;
            medAst.body.velocity.setTo(75 * plusOrMinus, 75 * plusOrMinus);
            medAst.body.bounce.set(0.5);
            medAst.scale.setTo(0.5);
            asteroids.add(medAst);
        }
    } else if(this.key == 'medBlueAst'){
        for(var b = 0; b < (Math.ceil(Math.random() * 3)); b++){
            var smlAst = new Asteroid(this.game, this.x + ((b+1)*Math.ceil(Math.random() * 20)), this.y + ((b+1)*Math.ceil(Math.random() * 20)), 'smlBlueAst', SML_AST_HEALTH);
            plusOrMinus = Math.random() < 0.5 ? -1 : 1;
            smlAst.body.velocity.setTo(75 * plusOrMinus,75 * plusOrMinus);
            smlAst.body.bounce.set(0.5);
            smlAst.scale.setTo(0.25);
            asteroids.add(smlAst);
        }
    } else if(this.key == 'bigGreyAst') {
        for (var a = 0; a < (Math.ceil(Math.random() * 3)); a++) {
            var medAst = new Asteroid(this.game, this.x + ((a + 1) * Math.ceil(Math.random() * 20)), this.y + ((a + 1) * Math.ceil(Math.random() * 20)), 'medGreyAst', MED_AST_HEALTH);
            plusOrMinus = Math.random() < 0.5 ? -1 : 1;
            medAst.body.velocity.setTo(75 * plusOrMinus, 75 * plusOrMinus);
            medAst.body.bounce.set(0.5);
            medAst.scale.setTo(0.5);
            asteroids.add(medAst);
        }
    } else if(this.key == 'medGreyAst'){
        for(var b = 0; b < (Math.ceil(Math.random() * 3)); b++){
            var smlAst = new Asteroid(this.game, this.x + ((b+1)*Math.ceil(Math.random() * 20)), this.y + ((b+1)*Math.ceil(Math.random() * 20)), 'smlGreyAst', SML_AST_HEALTH);
            plusOrMinus = Math.random() < 0.5 ? -1 : 1;
            smlAst.body.velocity.setTo(75 * plusOrMinus,75 * plusOrMinus);
            smlAst.body.bounce.set(0.5);
            smlAst.scale.setTo(0.25);
            asteroids.add(smlAst);
        }
    } else if(this.key == 'bigBrownAst') {
        for (var a = 0; a < (Math.ceil(Math.random() * 3)); a++) {
            var medAst = new Asteroid(this.game, this.x + ((a + 1) * Math.ceil(Math.random() * 20)), this.y + ((a + 1) * Math.ceil(Math.random() * 20)), 'medBrownAst', MED_AST_HEALTH);
            plusOrMinus = Math.random() < 0.5 ? -1 : 1;
            medAst.body.velocity.setTo(75 * plusOrMinus, 75 * plusOrMinus);
            medAst.body.bounce.set(0.5);
            medAst.scale.setTo(0.5);
            asteroids.add(medAst);
        }
    } else if(this.key == 'medBrownAst'){
        for(var b = 0; b < (Math.ceil(Math.random() * 3)); b++){
            var smlAst = new Asteroid(this.game, this.x + ((b+1)*Math.ceil(Math.random() * 20)), this.y + ((b+1)*Math.ceil(Math.random() * 20)), 'smlBrownAst', SML_AST_HEALTH);
            plusOrMinus = Math.random() < 0.5 ? -1 : 1;
            smlAst.body.velocity.setTo(75 * plusOrMinus,75 * plusOrMinus);
            smlAst.body.bounce.set(0.5);
            smlAst.scale.setTo(0.25);
            asteroids.add(smlAst);
        }
    } else if(this.key == 'bigRedAst') {
        for (var a = 0; a < (Math.ceil(Math.random() * 3)); a++) {
            var medAst = new Asteroid(this.game, this.x + ((a + 1) * Math.ceil(Math.random() * 20)), this.y + ((a + 1) * Math.ceil(Math.random() * 20)), 'medRedAst', MED_AST_HEALTH);
            plusOrMinus = Math.random() < 0.5 ? -1 : 1;
            medAst.body.velocity.setTo(75 * plusOrMinus, 75 * plusOrMinus);
            medAst.body.bounce.set(0.5);
            medAst.scale.setTo(0.5);
            asteroids.add(medAst);
        }
    } else if(this.key == 'medRedAst'){
        for(var b = 0; b < (Math.ceil(Math.random() * 3)); b++){
            var smlAst = new Asteroid(this.game, this.x + ((b+1)*Math.ceil(Math.random() * 20)), this.y + ((b+1)*Math.ceil(Math.random() * 20)), 'smlRedAst', SML_AST_HEALTH);
            plusOrMinus = Math.random() < 0.5 ? -1 : 1;
            smlAst.body.velocity.setTo(75 * plusOrMinus,75 * plusOrMinus);
            smlAst.body.bounce.set(0.5);
            smlAst.scale.setTo(0.25);
            asteroids.add(smlAst);
        }
    } else if(this.key == 'bigWhiteAst') {
        for (var a = 0; a < (Math.ceil(Math.random() * 3)); a++) {
            var medAst = new Asteroid(this.game, this.x + ((a + 1) * Math.ceil(Math.random() * 20)), this.y + ((a + 1) * Math.ceil(Math.random() * 20)), 'medWhiteAst', MED_AST_HEALTH);
            plusOrMinus = Math.random() < 0.5 ? -1 : 1;
            medAst.body.velocity.setTo(75 * plusOrMinus, 75 * plusOrMinus);
            medAst.body.bounce.set(0.5);
            medAst.scale.setTo(0.5);
            asteroids.add(medAst);
        }
    } else if(this.key == 'medWhiteAst'){
        for(var b = 0; b < (Math.ceil(Math.random() * 3)); b++){
            var smlAst = new Asteroid(this.game, this.x + ((b+1)*Math.ceil(Math.random() * 20)), this.y + ((b+1)*Math.ceil(Math.random() * 20)), 'smlWhiteAst', SML_AST_HEALTH);
            plusOrMinus = Math.random() < 0.5 ? -1 : 1;
            smlAst.body.velocity.setTo(75 * plusOrMinus,75 * plusOrMinus);
            smlAst.body.bounce.set(0.5);
            smlAst.scale.setTo(0.25);
            asteroids.add(smlAst);
        }
    }
        }

Asteroid.prototype.update = function(){

    this.angle += 0.5;

};

// --- DUST

// Dust template with physics and standard variables
var Dust = function(game, x, y, image){
     this.game = game;

     Phaser.Sprite.call(this, game, x, y, image);

     this.game.physics.arcade.enable(this);
     this.anchor.setTo(0.5);
     this.body.collideWorldBounds = true;
};

Dust.prototype = Object.create(Phaser.Sprite.prototype);
Dust.prototype.constructor = Dust;

// --- CRYSTALS

// Crystal template with physics and standard variables
var Crystal = function(game, x, y, image) {

    this.game = game;

    Phaser.Sprite.call(this, game, x, y, image);

    this.game.physics.arcade.enable(this);
    this.anchor.setTo(0.5);
    this.body.collideWorldBounds = true;

};

Crystal.prototype = Object.create(Phaser.Sprite.prototype);
Crystal.prototype.constructor = Crystal;


// --- METALS

// Metal template with physics and standard variables
var Metal = function(game, x, y, image) {

    this.game = game;

    Phaser.Sprite.call(this, game, x, y, image);

    this.game.physics.arcade.enable(this);
    this.anchor.setTo(0.5);
    this.body.collideWorldBounds = true;

};

Metal.prototype = Object.create(Phaser.Sprite.prototype);
Metal.prototype.constructor = Metal;

// --- ENEMIES

// Enemy template with physics and standard variables
var Enemy = function(game, x, y, type, speed, health, player) {
    
    this.game = game;
    this.speed = speed;
    this.health = health;
    this.player = player;
    this.aggroRange = 250;
    this.minDist = 100;
    this.shootNow = 0;
    
    Phaser.Sprite.call(this, game, x, y, type);
    
    this.game.physics.arcade.enable(this);
    this.anchor.setTo(0.5);
    this.body.collideWorldBounds = true;
    this.body.drag.setTo(10, 10);
    this.minDistX = 350;
    this.maxDistY = 350;
    
    // Create a timer
    this.moveTimer = this.game.time.create(false);
    this.moveTimer.start();
    
    this.shootTimer = this.game.time.create(false);
    this.shootTimer.start();
    
    // Time in which the enemies change direction
    this.recalcMovement = 0.5;
    this.minimumRecalc = 3000;
    this.nextTurn = 0;
    
};

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

// Random enemy movement around the level
Enemy.prototype.move = function() {
    
    if (Math.round(this.moveTimer.ms) > this.nextTurn) {
        
        var randomDistX = Math.round((Math.random() + 1) * this.minDistX + this.minDistX);
        var randomDistY = Math.round(Math.random() * this.maxDistY + this.minDistX);
        var moveX = this.x;
        var moveY = this.y;
        var moveLeft = false;
        var moveUp = false;
        
        this.nextTurn = (Math.random() * this.recalcMovement + this.minimumRecalc);
        
        if (this.moveTimer) {
            this.moveTimer.destroy();
            this.moveTimer.ms = 0;
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
    
    if (this.key !== 'escape') {
        var distance = this.game.physics.arcade.distanceBetween(this.player, this);
        if (distance <= this.aggroRange && this.player.alive == true && this.alive == true) {
            if (distance >= this.minDist) {
                this.game.physics.arcade.moveToXY(this, this.player.x, this.player.y, this.speed);
            } else {
                this.body.velocity.setTo(0);
            }
            var angle = Math.atan2(this.player.y - this.y, this.player.x - this.x);
            this.rotation = angle;
            this.shoot();
        } else {
            this.move();
        }
    }
    
    if (this.key == 'escape') {
        this.move();
    }
    
};

Enemy.prototype.shoot = function() {
    
    switch (this.key) {
        case 'basic':
            var timeNow = this.shootTimer.ms;
            if (this.shootNow < timeNow) {
                enemyBullet = new EnemyBullet(this.game, this.x, this.y, 'basicb', this.player, 450, null);
                enemyWeapon.add(enemyBullet);
                this.shootNow = timeNow + 1000;
            }
            break;
        case 'bruiser':
            var timeNow = this.shootTimer.ms;
            if (this.shootNow < timeNow) {
                enemyBullet = new EnemyBullet(this.game, this.x, this.y, 'bruiserb', this.player, 300, null);
                enemyWeapon.add(enemyBullet);
                this.shootNow = timeNow + 2000;
            }
            break;
        case 'captain':
            var timeNow = this.shootTimer.ms;
            if (this.shootNow < timeNow) {
                enemyBullet = new EnemyBullet(this.game, this.x, this.y, 'captainb', this.player, 600, null);
                enemyWeapon.add(enemyBullet);
                enemyBullet = new EnemyBullet(this.game, this.x, this.y, 'captainb', this.player, 600, 15);
                enemyWeapon.add(enemyBullet);
                enemyBullet = new EnemyBullet(this.game, this.x, this.y, 'captainb', this.player, 600, -15);
                enemyWeapon.add(enemyBullet);
                this.shootNow = timeNow + 1000;
            }
            break;
        case 'govt':
            var timeNow = this.shootTimer.ms;
            if (this.shootNow < timeNow) {
                enemyBullet = new EnemyBullet(this.game, this.x, this.y, 'govtb', this.player, 450, null);
                enemyWeapon.add(enemyBullet);
                this.shootNow = timeNow + 500;
            }
            break;
    }
    
};

Enemy.prototype.escapePod = function() {
    
    var escapePod = new Enemy(this.game, this.x, this.y, 'escape', ESCAPE_POD_SPEED, ESCAPE_POD_HEALTH);
    enemies.add(escapePod);
    
};

var EnemyBullet = function(game, x, y, type, player, speed, posVar) {

    this.game = game;

    Phaser.Sprite.call(this, game, x, y, type);

    this.game.physics.arcade.enable(this);
    this.anchor.setTo(0.5);
    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
    this.game.physics.arcade.moveToXY(this, player.x + posVar, player.y + posVar, speed);

};

EnemyBullet.prototype = Object.create(Phaser.Sprite.prototype);
EnemyBullet.prototype.constructor = EnemyBullet;

// --- INITIATE GAME

game.state.add('GameState', GameState);
game.state.start('GameState');

