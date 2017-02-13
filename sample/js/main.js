/** Copyright Ivy Tower, LLC **/

var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'gameWindow');

var healthbar;
var asteroids;
var metal;
var metals;
var collectedMetals = [];
var crystal;
var crystals;
var dust;
var dusts;
var enemies;
var enemyBullet;
var enemyWeapon;
var score = 0;
var scoreText;
var dustBurnt = 0;

// Bullet damages
var SHIP_BASIC_DAM = 10; // Standard weapon
var ENEM_BASIC_DAM = 10;
var ENEM_BRUIS_DAM = 30;
var ENEM_CAPTN_DAM = 20; // For each of 3 shots
var ENEM_GOVMT_DAM = 10;

// Asteroids variables
var BIG_AST_HEALTH = 30;
var MED_AST_HEALTH = 20;
var SML_AST_HEALTH = 10;
var BIG_AST_SCALE = 0.75;
var MED_AST_SCALE = 0.5;
var SML_AST_SCALE = 0.25;

// Escape pod variables
var ESCAPE_POD_SPEED = 400;
var ESCAPE_POD_HEALTH = 25;

// Dust variables
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
        this.CAPTAIN_HEALTH = 150;
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
        this.game.load.image('Li', 'assets/star.png');
        this.game.load.image('C', 'assets/star.png');
        this.game.load.image('Al', 'assets/star.png');
        this.game.load.image('Ti', 'assets/star.png');
        this.game.load.image('Cr', 'assets/star.png');
        this.game.load.image('Fe', 'assets/star.png');
        this.game.load.image('Co', 'assets/star.png');
        this.game.load.image('Ni', 'assets/star.png');
        this.game.load.image('Cu', 'assets/star.png');
        this.game.load.image('Zn', 'assets/star.png');
        this.game.load.image('Pd', 'assets/star.png');
        this.game.load.image('Ag', 'assets/star.png');
        this.game.load.image('Sn', 'assets/star.png');
        this.game.load.image('Nd', 'assets/star.png');
        this.game.load.image('W', 'assets/star.png');
        this.game.load.image('Pt', 'assets/star.png');
        this.game.load.image('Au', 'assets/star.png');
        this.game.load.image('Hg', 'assets/star.png');
        this.game.load.image('smlDust', 'assets/smldust.png');
        this.game.load.image('medDust', 'assets/meddust.png');
        this.game.load.image('bigDust', 'assets/bigdust.png');
        this.game.load.image('health','assets/bar.png');
        this.game.load.image('shield','assets/bar2.png');
        
    },

    create: function() {

        // --- GAME SETUP

        // Set world bounds
        this.game.world.setBounds(0, 0, 5000, 5000);


        // Simple starry background for now
        this.background = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'bg');

        // Add moon for reference point
        this.moon = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'moon');
        this.moon.anchor.setTo(0.5);
        // this.moon.scale.setTo(0.5);

        // --- PLAYER SHIP

        // Adds player ship in center
        this.ship = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'ship');
        this.ship.anchor.setTo(0.5);
        this.ship.angle = -90; // Points the ship up
        this.game.physics.enable(this.ship, Phaser.Physics.ARCADE);
        this.ship.health = this.SHIP_HEALTH;

        // Creates ship health bar
        healthbar = this.game.add.sprite(this.ship.centerX, this.ship.y + 10, 'health');

         //creates ship shield
        shield = this.game.add.sprite(this.ship.centerX,this.ship.y-10,'shield');
        shield.scale.y=0.5;
        shield.scale.x=0.0;

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
        this.weapon.trackSprite(this.ship, 0, 0, true);

        // --- ASTEROID SPAWNS

        asteroids = this.game.add.group();
        
        for (var i = 0; i < 50; i++) {
            var randDirect = Math.random() < 0.5 ? 1 : -1;
            var astKey = ['bigBlueAst', 'bigRedAst', 'bigGreyAst', 'bigWhiteAst', 'bigBrownAst'][Math.floor(Math.random() * 5)];
            var ast = new Asteroid(this.game, this.game.world.randomX, this.game.world.randomY, astKey, BIG_AST_SCALE, BIG_AST_HEALTH);
            ast.body.bounce.set(0.8);
            ast.body.velocity.setTo(randDirect * 50, randDirect * 50);
            asteroids.add(ast);
        }
        
        crystals = this.game.add.group();
        metals = this.game.add.group();
        dusts = this.game.add.group();

        // --- ENEMY SPAWNS

        // Add basic enemies
        enemies = this.game.add.group();
        enemies.enableBody = true;
        for (var i = 0; i < 10; i++) {
            var basic = new Enemy(this.game, this.game.world.randomX, this.game.world.randomY, 'basic', this.BASIC_SPEED, this.BASIC_HEALTH, this.ship);
            enemies.add(basic);
        }

        // Add bruiser class enemies
        for (var i = 0; i < 5; i++) {
            var bruiser = new Enemy(this.game, this.game.world.randomX, this.game.world.randomY, 'bruiser', this.BRUISER_SPEED, this.BRUISER_HEALTH, this.ship);
            enemies.add(bruiser);
        }

        // Add captain class enemies
        for (var m = 0; m < 1; m++) {
            var captain = new Enemy(this.game, this.game.world.randomX, this.game.world.randomY, 'captain', this.CAPTAIN_SPEED, this.CAPTAIN_HEALTH, this.ship);
            enemies.add(captain);
        }
        
        // Add government enemies
        for (var i = 0; i < 20; i++) {
            var govt = new Enemy(this.game, this.game.world.randomX, this.game.world.randomY, 'govt', this.GOVT_SPEED, this.GOVT_HEALTH, this.ship);
            enemies.add(govt);
        }

        enemyWeapon = this.add.group();
        enemyWeapon.enableBody = true;
        
        // --- SCORE
        
        scoreText = game.add.text(32, 32, 'SCORE: ' + score + '   DUST: ' + DUST_COLLECTED, { fontSize: '32px', fill: "#FFF" });
        scoreText.fixedToCamera = true;

    },

    update: function() {
        
        // scoreText.alignTo(this.game.camera.view, Phaser.LEFT_TOP);
        
        // Update health bar
        updatebar(healthbar, this.ship);
        updatebar(shield,this.ship);

        // --- PLAYER MOVEMENT

        this.ship.rotation = this.game.physics.arcade.angleToPointer(this.ship);
        this.weapon.rotation = this.game.physics.arcade.angleToPointer(this.weapon);

        if (this.game.physics.arcade.distanceToPointer(this.ship) > 50) {
            this.game.physics.arcade.moveToPointer(this.ship, this.SHIP_SPEED);
        } else {
            this.ship.body.velocity.setTo(0);
        }

        // --- FIRE WEAPON

        // Fires with mouse click
        if (this.game.input.activePointer.isDown && this.ship.alive == true) {
            if (this.game.physics.arcade.distanceToPointer(this.ship) > 50) {
                this.game.physics.arcade.moveToPointer(this.ship, 125);
            }
            this.weapon.fire();
        }
        
        // --- PLAYER BOOST
        
        var boost = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        if (boost.isDown && DUST_COLLECTED > 0) {

            dustBurnt += 1;
            DUST_COLLECTED -= 1;
            shield.scale.x-=.001
            if(DUST_COLLECTED == 0) shield.scale.x = 0;
            if(dustBurnt > 10){
                metal = new Metal(this.game, this.ship.previousPosition.x, this.ship.previousPosition.y, 'C');
                metals.add(metal);
                dustBurnt = 0;
            }

            scoreText.setText( 'SCORE: ' + score + '   DUST: ' + DUST_COLLECTED);
            this.SHIP_SPEED = 600;
        } else {
            this.SHIP_SPEED = 300 - (DUST_COLLECTED / 2);
        }
        
        // --- OBJECT COLLISION

        enemies.forEachAlive(bulletCollision, this, this.weapon);
        asteroids.forEachAlive(bulletCollision, this, this.weapon);
        this.physics.arcade.overlap(enemyWeapon, this.ship, callDamage, null, this);
        
        if (this.ship.alive == true) {
            this.physics.arcade.overlap(this.ship, crystals, collectCrystal, null, this);
            this.physics.arcade.overlap(this.ship, metals, collectMetal, null, this);
            this.physics.arcade.overlap(this.ship, dusts, collectDust, null, this);
        }

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
        
        if (sprite.key == 'basic') {
            sprite.dropLoot();
            score += 10;
        } else if (sprite.key == 'bruiser') {
            sprite.dropLoot();
            score += 20;
        } else if (sprite.key == 'govt') {
            sprite.dropLoot();
            score += 15;
        } else if (sprite.key == 'captain') {
            sprite.dropLoot();
            score += 30;
        } else if (sprite.key == 'escape') {
            sprite.dropLoot();
            score += 50;
        }
        
        scoreText.setText( 'SCORE: ' + score + '   DUST: ' + DUST_COLLECTED);
        
        if (asteroids.children.indexOf(sprite) > -1) {
            sprite.spawnDrop();
            sprite.bust();
        }
        if (sprite.key == 'captain') {
            sprite.escapePod();
        }
        
    } else {
    	//the sprite is not dead
        if (sprite.key == 'ship' && DUST_COLLECTED >0) {
        	//the sprite is the player// the object hit is the player// the player has shield
              shield.scale.x -= damage/1000+.0001;
              DUST_COLLECTED -= damage;
              if (DUST_COLLECTED < 0) {
                  DUST_COLLECTED = 0;
                  shield.scale.x = 0;
              }
              scoreText.setText( 'SCORE: ' + score + '   DUST: ' + DUST_COLLECTED);
            
        }else if(sprite.key == 'ship' && DUST_COLLECTED <=0){
        	 // the sprite is the player //the object hit is the player// the player is out of shield
                healthbar.scale.x -= damage/200;
                sprite.health -= damage;
                DUST_COLLECTED=0;
                scoreText.setText( 'SCORE: ' + score + '   DUST: ' + DUST_COLLECTED);
        } else {
        	//the sprite is an enemy//the object hit is an enemy
            sprite.health -= damage;

            /**if(sprite.key == 'basic' || 'govt'){
                sprite.healthbar.scale.x -= damage/50;

            } else if(sprite.key == 'bruiser'){
                sprite.healthbar.scale.x -= damage/300;

            } else if(sprite.key == 'captain'){
                sprite.healthbar.scale.x -= damage/150;

            } else if(sprite.key == 'escape'){
                sprite.healthbar.scale.x -= damage/25;

            }**/

        }
    }
};

var updatebar = function (spritebar, sprite) {

   //updates the health-bar sprite  of sprites
     if(sprite.health<=0){
     	//sprite.kill();
     	spritebar.kill();
     }
   
    spritebar.centerX = sprite.centerX;
    spritebar.centerY = sprite.centerY + 30;

};

var collectCrystal = function(ship, crystal) {

    if (crystal.key == 'diamond') {
        console.log(crystal.key);
        
    } else if (crystal.key == 'ruby') {
        console.log(crystal.key);
        
    } else if (crystal.key == 'sunstone') {
        console.log(crystal.key);
        
    } else if (crystal.key == 'topaz') {
        console.log(crystal.key);
        
    } else if (crystal.key == 'emerald') {
        console.log(crystal.key);
        
    } else if (crystal.key == 'sapphire') {
        console.log(crystal.key);
        
    } else if (crystal.key == 'amethyst') {
        console.log(crystal.key);
        
    } else if (crystal.key == 'obsidian') {
        console.log(crystal.key);
        
    } else if (crystal.key == 'opal') {
        console.log(crystal.key);
        
    }
    
    crystal.kill();

};

var collectMetal = function(ship, metal) {

    collectedMetals.push(metal);
    metal.kill();

};

var collectDust = function(ship, dust) {

     if (DUST_COLLECTED < 200) {
        
        if (dust.key == 'smlDust') {
            DUST_COLLECTED += 1;
            shield.scale.x += .001
        } else if (dust.key == 'medDust') {
            DUST_COLLECTED += 3;
            shield.scale.x += .003
        } else if (dust.key == 'bigDust') { 
            DUST_COLLECTED += 6;
            shield.scale.x += .006;
        }
        
        if (DUST_COLLECTED > 200) {
            DUST_COLLECTED = 200;
        }
        
        scoreText.setText( 'SCORE: ' + score + '   DUST: ' + DUST_COLLECTED);
    }
    
    dust.kill();

};

// --- ASTEROIDS

// Asteroid template with physics and standard variables
var Asteroid = function(game, x, y, type, scale, health) {

    this.game = game;
    this.health = health;

    Phaser.Sprite.call(this, game, x, y, type);

    this.game.physics.arcade.enable(this);
    this.anchor.setTo(0.5);
    this.body.collideWorldBounds = true;
    this.scale.setTo(scale);


};

Asteroid.prototype = Object.create(Phaser.Sprite.prototype);
Asteroid.prototype.constructor = Asteroid;

Asteroid.prototype.spawnDrop = function() {

    var posVar = Math.ceil(Math.random() * 20);
    var metalDropRate = Math.ceil(Math.random() * 100);
    var metalDropAmt = Math.floor(Math.random() * 5);
    var crystalDropRate = Math.ceil(Math.random() * 100);
    
    if (this.health < 1) {
        
        // Metal drops
        if (metalDropRate < 5) {
            
            for (var h = 0; h < metalDropAmt; h++) {
                metal = new Metal(this.game, this.x + (h * posVar), this.y + (h * posVar), 'Hg');
                metals.add(metal);
            }
            
        } else if (metalDropRate < 10) {
            
            for (var k = 0; k < metalDropAmt; k++) {
                metal = new Metal(this.game, this.x + (k * posVar), this.y + (k * posVar), 'Au');
                metals.add(metal);
            }
            
        } else if (metalDropRate < 15) {

            for (var l = 0; l < metalDropAmt; l++) {
                metal = new Metal(this.game, this.x + (l * posVar), this.y + (l * posVar), 'Pt');
                metals.add(metal);
            }
            
        } else if (metalDropRate < 20) {

            for (var m = 0; m < metalDropAmt; m++) {
                metal = new Metal(this.game, this.x + (m * posVar), this.y + (m * posVar), 'W');
                metals.add(metal);
            }
            
        } else if (metalDropRate < 25) {

            for (var n = 0; n < metalDropAmt; n++) {
                metal = new Metal(this.game, this.x + (n * posVar), this.y + (n * posVar), 'Nd');
                metals.add(metal);
            }
            
        } else if (metalDropRate < 30) {

            for (var o = 0; o < metalDropAmt; o++) {
                metal = new Metal(this.game, this.x + (o * posVar), this.y + (o * posVar), 'Sn');
                metals.add(metal);
            }
            
        } else if (metalDropRate < 40) {

            for (var p = 0; p < metalDropAmt; p++) {
                metal = new Metal(this.game, this.x + (p * posVar), this.y + (p * posVar), 'Ag');
                metals.add(metal);
            }
            
        } else if (metalDropRate < 45) {

            for (var i = 0; i < metalDropAmt; i++) {
                metal = new Metal(this.game, this.x + (i * posVar), this.y + (i * posVar), 'Pd');
                metals.add(metal);
            }
            
        } else if (metalDropRate < 50) {

            for (var q = 0; q < metalDropAmt; q++) {
                metal = new Metal(this.game, this.x + (q * posVar), this.y + (q * posVar), 'Zn');
                metals.add(metal);
            }
            
        } else if (metalDropRate < 55) {

            for (var r = 0; r < metalDropAmt; r++) {
                metal = new Metal(this.game, this.x + (r * posVar), this.y + (r * posVar), 'Cu');
                metals.add(metal);
            }
            
        } else if (metalDropRate < 60) {

            for (var i = 0; i < metalDropAmt; i++) {
                metal = new Metal(this.game, this.x + (i * posVar), this.y + (i * posVar), 'Ni');
                metals.add(metal);
            }
            
        } else if (metalDropRate < 65) {

            for (var i = 0; i < metalDropAmt; i++) {
                metal = new Metal(this.game, this.x + (i * posVar), this.y + (i * posVar), 'Co');
                metals.add(metal);
            }
            
        } else if (metalDropRate < 70) {

            for (var i = 0; i < metalDropAmt; i++) {
                metal = new Metal(this.game, this.x + (i * posVar), this.y + (i * posVar), 'Fe');
                metals.add(metal);
            }
            
        } else if (metalDropRate < 75) {

            for (var i = 0; i < metalDropAmt; i++) {
                metal = new Metal(this.game, this.x + (i * posVar), this.y + (i * posVar), 'Cr');
                metals.add(metal);
            }
            
        } else if (metalDropRate < 80) {

            for (var i = 0; i < metalDropAmt; i++) {
                metal = new Metal(this.game, this.x + (i * posVar), this.y + (i * posVar), 'Ti');
                metals.add(metal);
            }
            
        } else if (metalDropRate < 85) {

            for (var i = 0; i < metalDropAmt; i++) {
                metal = new Metal(this.game, this.x + (i * posVar), this.y + (i * posVar), 'Al');
                metals.add(metal);
            }
            
        } else if (metalDropRate < 90) {

            for (var i = 0; i < metalDropAmt; i++) {
                metal = new Metal(this.game, this.x + (i * posVar), this.y + (i * posVar), 'Li');
                metals.add(metal);
            }

        }

        // Crystal drops
        if (crystalDropRate <= 9) {
            var crystalKey = ['diamond', 'ruby', 'sunstone', 'topaz', 'emerald', 'sapphire', 'amethyst', 'obsidian', 'opal'][Math.floor(Math.random() * 9)];
            crystal = new Crystal(this.game, this.x + posVar, this.y + posVar, crystalKey);
            crystals.add(crystal);
        }
        
        // Dust drops
        switch (this.key) {
            case 'bigRedAst':
            case 'bigBlueAst':
            case 'bigWhiteAst':
            case 'bigGreyAst':
            case 'bigBrownAst':
                for (var z = 0; z < 5; z++) {
                    dust = new Dust(this.game, this.x + z + posVar, this.y + z + posVar, 'bigDust');
                    dusts.add(dust);
                }
                break;
            case 'medRedAst':
            case 'medBlueAst':
            case 'medWhiteAst':
            case 'medGreyAst':
            case 'medBrownAst':
                for (var zy = 0; zy < 3; zy++) {
                    dust = new Dust(this.game, this.x + posVar, this.y + posVar, 'medDust');
                    dusts.add(dust);
                }
                break;
            case 'smlRedAst':
            case 'smlBlueAst':
            case 'smlWhiteAst':
            case 'smlGreyAst':
            case 'smlBrownAst':
                for (var zyx = 0; zyx < 3; zyx++) {
                    dust = new Dust(this.game, this.x + posVar, this.y + posVar, 'smlDust');
                    dusts.add(dust);
                }
                break;
        }
    }
};

Asteroid.prototype.bust = function() {
    
    var posVar = Math.ceil(Math.random() * 20);
    var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
    
    if (this.key == 'bigBlueAst') {
        for (var a = 0; a < (Math.ceil(Math.random() * 3)); a++) {
            var medAst = new Asteroid(this.game, this.x + ((a + 1) * posVar), this.y + ((a + 1) * posVar), 'medBlueAst', MED_AST_SCALE, MED_AST_HEALTH);
            medAst.body.velocity.setTo(75 * plusOrMinus, 75 * plusOrMinus);
            medAst.body.bounce.set(0.5);
            asteroids.add(medAst);
        }
    } else if (this.key == 'medBlueAst') {
        for (var b = 0; b < (Math.ceil(Math.random() * 3)); b++) {
            var smlAst = new Asteroid(this.game, this.x + ((b + 1) * posVar), this.y + ((b + 1) * posVar), 'smlBlueAst', SML_AST_SCALE, SML_AST_HEALTH);
            smlAst.body.velocity.setTo(75 * plusOrMinus, 75 * plusOrMinus);
            smlAst.body.bounce.set(0.5);
            asteroids.add(smlAst);
        }
    } else if (this.key == 'bigGreyAst') {
        for (var a = 0; a < (Math.ceil(Math.random() * 3)); a++) {
            var medAst = new Asteroid(this.game, this.x + ((a + 1) * posVar), this.y + ((a + 1) * posVar), 'medGreyAst', MED_AST_SCALE, MED_AST_HEALTH);
            medAst.body.velocity.setTo(75 * plusOrMinus, 75 * plusOrMinus);
            medAst.body.bounce.set(0.5);
            asteroids.add(medAst);
        }
    } else if (this.key == 'medGreyAst') {
        for (var b = 0; b < (Math.ceil(Math.random() * 3)); b++) {
            var smlAst = new Asteroid(this.game, this.x + ((b + 1) * posVar), this.y + ((b + 1) * posVar), 'smlGreyAst', SML_AST_SCALE, SML_AST_HEALTH);
            smlAst.body.velocity.setTo(75 * plusOrMinus, 75 * plusOrMinus);
            smlAst.body.bounce.set(0.5);
            asteroids.add(smlAst);
        }
    } else if (this.key == 'bigBrownAst') {
        for (var a = 0; a < (Math.ceil(Math.random() * 3)); a++) {
            var medAst = new Asteroid(this.game, this.x + ((a + 1) * posVar), this.y + ((a + 1) * posVar), 'medBrownAst', MED_AST_SCALE, MED_AST_HEALTH);
            medAst.body.velocity.setTo(75 * plusOrMinus, 75 * plusOrMinus);
            medAst.body.bounce.set(0.5);
            asteroids.add(medAst);
        }
    } else if (this.key == 'medBrownAst') {
        for (var b = 0; b < (Math.ceil(Math.random() * 3)); b++) {
            var smlAst = new Asteroid(this.game, this.x + ((b + 1) * posVar), this.y + ((b + 1) * posVar), 'smlBrownAst', SML_AST_SCALE, SML_AST_HEALTH);
            smlAst.body.velocity.setTo(75 * plusOrMinus, 75 * plusOrMinus);
            smlAst.body.bounce.set(0.5);
            asteroids.add(smlAst);
        }
    } else if (this.key == 'bigRedAst') {
        for (var a = 0; a < (Math.ceil(Math.random() * 3)); a++) {
            var medAst = new Asteroid(this.game, this.x + ((a + 1) * posVar), this.y + ((a + 1) * posVar), 'medRedAst', MED_AST_SCALE, MED_AST_HEALTH);
            medAst.body.velocity.setTo(75 * plusOrMinus, 75 * plusOrMinus);
            medAst.body.bounce.set(0.5);
            asteroids.add(medAst);
        }
    } else if (this.key == 'medRedAst') {
        for (var b = 0; b < (Math.ceil(Math.random() * 3)); b++) {
            var smlAst = new Asteroid(this.game, this.x + ((b + 1) * posVar), this.y + ((b + 1) * posVar), 'smlRedAst', SML_AST_SCALE, SML_AST_HEALTH);
            smlAst.body.velocity.setTo(75 * plusOrMinus, 75 * plusOrMinus);
            smlAst.body.bounce.set(0.5);
            asteroids.add(smlAst);
        }
    } else if (this.key == 'bigWhiteAst') {
        for (var a = 0; a < (Math.ceil(Math.random() * 3)); a++) {
            var medAst = new Asteroid(this.game, this.x + ((a + 1) * posVar), this.y + ((a + 1) * posVar), 'medWhiteAst', MED_AST_SCALE, MED_AST_HEALTH);
            medAst.body.velocity.setTo(75 * plusOrMinus, 75 * plusOrMinus);
            medAst.body.bounce.set(0.5);
            asteroids.add(medAst);
        }
    } else if (this.key == 'medWhiteAst') {
        for (var b = 0; b < (Math.ceil(Math.random() * 3)); b++) {
            var smlAst = new Asteroid(this.game, this.x + ((b + 1) * posVar), this.y + ((b + 1) * posVar), 'smlWhiteAst', SML_AST_SCALE, SML_AST_HEALTH);
            smlAst.body.velocity.setTo(75 * plusOrMinus, 75 * plusOrMinus);
            smlAst.body.bounce.set(0.5);
            asteroids.add(smlAst);
        }
    }
};

Asteroid.prototype.update = function(){

    this.angle += 0.5;

};

// --- DUST

// Dust template with physics and standard variables
var Dust = function (game, x, y, type) {
    
    this.game = game;
    var randoDirect = Math.random() < 0.5 ? 1 : -1;

    Phaser.Sprite.call(this, game, x, y, type);

    this.game.physics.arcade.enable(this);
    this.anchor.setTo(0.5);
    this.body.collideWorldBounds = true;
    this.body.velocity.setTo(5 * randoDirect, 5 * randoDirect);
    
};

Dust.prototype = Object.create(Phaser.Sprite.prototype);
Dust.prototype.constructor = Dust;

// --- CRYSTALS

// Crystal template with physics and standard variables
var Crystal = function(game, x, y, type) {

    this.game = game;
    var minusOrPlus = Math.random() < 0.5 ? 1 : -1;

    Phaser.Sprite.call(this, game, x, y, type);

    this.game.physics.arcade.enable(this);
    this.anchor.setTo(0.5);
    this.body.collideWorldBounds = true;
    this.body.velocity.setTo(5 * minusOrPlus, 5 * minusOrPlus);
    this.body.bounce.set(0.5);

};

Crystal.prototype = Object.create(Phaser.Sprite.prototype);
Crystal.prototype.constructor = Crystal;

// --- METALS

// Metal template with physics and standard variables
var Metal = function(game, x, y, type) {

    this.game = game;
    var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
    var value;

    Phaser.Sprite.call(this, game, x, y, type);

    this.game.physics.arcade.enable(this);
    this.anchor.setTo(0.5);
    this.body.collideWorldBounds = true;
    this.body.velocity.setTo(5 * plusOrMinus, 5 * plusOrMinus);
    this.body.bounce.set(0.5);

    switch(this.key){
        case 'Li':
            this.value = 3;
            break;
        case 'C':
            this.value = 6;
            break;
        case 'Al':
            this.value = 13;
            break;
        case 'Ti':
            this.value = 22;
            break;
        case 'Cr':
            this.value = 24;
            break;
        case 'Fe':
            this.value = 26;
            break;
        case 'Co':
            this.value = 27;
            break;
        case 'Ni':
            this.value = 28;
            break;
        case 'Cu':
            this.value = 29;
            break;
        case 'Zn':
            this.value = 30;
            break;
        case 'Pd':
            this.value = 46;
            break;
        case 'Ag':
            this.value = 47;
            break;
        case 'Sn':
            this.value = 50;
            break;
        case 'Nd':
            this.value = 60;
            break;
        case 'W':
            this.value = 74;
            break;
        case 'Pt':
            this.value = 78;
            break;
        case 'Au':
            this.value = 79;
            break;
        case 'Hg':
            this.value = 80;
            break;
    }

};

Metal.prototype = Object.create(Phaser.Sprite.prototype);
Metal.prototype.constructor = Metal;

// --- ANOMALIES

// Anomaly template with physics and standard variables
var Anomaly = function(game, x, y, type){

    this.game = game;
    var plusOrMinus = Math.random() < 0.5 ? -1 : 1;

    Phaser.Sprite.call(this, game, x, y, type);

    this.game.physics.arcade.enable(this);
    this.anchor.setTo(0.5);
    this.body.collideWorldBounds = true;
    this.body.velocity.setTo(5 * plusOrMinus, 5 * plusOrMinus);
    this.body.bounce.set(0.5);
};

Anomaly.prototype = Object.create(Phaser.Sprite.prototype);
Anomaly.prototype.constructor = Anomaly;

Anomaly.prototype.effect = function(){

    switch(this.key){

        
    }
};

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
    this.minMove = 600;
    
    // Create a timer
    this.moveTimer = this.game.time.create(false);
    this.moveTimer.start();
    
    this.shootTimer = this.game.time.create(false);
    this.shootTimer.start();
    
    // Time in which the enemies change direction
    this.recalcMovement = 500;
    this.minimumRecalc = 3000;
    this.nextTurn = 0;

    this.healthbar = game.make.sprite(-10, -20, 'health');
    this.healthbar.anchor.setTo(0.5);
    this.addChild(this.healthbar);

    /**if(this.key == 'basic' || 'govt'){
        this.healthbar.scale.x = 50;

    } else if(this.key == 'bruiser'){
        this.healthbar.scale.x = 300;

    } else if(this.key == 'captain'){
        this.healthbar.scale.x = 150;

    } else if(this.key == 'escape'){
        this.healthbar.scale.x = 25;

    }**/
    
};

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

// Random enemy movement around the level
Enemy.prototype.move = function() {
    
    if (Math.round(this.moveTimer.ms) > this.nextTurn) {
        
        var randomDist = Math.round((Math.random() + 1) * this.minMove);
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
            moveX -= randomDist;
            if (moveX < 30) {
                moveX = 30 + this.body.width/2;
                this.moveRightNext = true;
            }
        } else {
            moveX += randomDist;
            this.moveRightNext = false;
            if (moveX > (this.game.world.width - 30)) {
                moveX = (this.game.world.width - 30) - this.body.width/2;
            }
        }
            
        if (moveUp && !this.moveDownNext) {
            moveY -= randomDist;
            if (moveY < 30) {
                moveY = 30 + this.body.height/2;
                this.moveDownNext = true;
            }
        } else {
            moveY += randomDist;
            this.moveDownNext = false;
            if (moveY > (this.game.world.height - 30)) {
                moveY = (this.game.world.height - 30) - this.body.height/2;
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
                this.shootNow = timeNow + 500;
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
                this.shootNow = timeNow + 250;
            }
            break;
    }
    
};

Enemy.prototype.escapePod = function() {
    
    var escapePod = new Enemy(this.game, this.x, this.y, 'escape', ESCAPE_POD_SPEED, ESCAPE_POD_HEALTH);
    enemies.add(escapePod);
    
};

Enemy.prototype.dropLoot = function(){

    var enemyDrop = Math.ceil(Math.random() * 4);
    var posVar = Math.ceil(Math.random() * 20);
    var dropAmt = Math.floor(Math.random() * 5);

    switch(this.key){

        case 'basic':
            switch(enemyDrop){
                case 1:
                    for (var i = 0; i < dropAmt; i++) {
                        metal = new Metal(this.game, this.x + (i * posVar), this.y + (i * posVar), 'Li');
                        metals.add(metal);
                    }
                    break;

                case 2:
                    for (var i = 0; i < dropAmt; i++) {
                        metal = new Metal(this.game, this.x + (i * posVar), this.y + (i * posVar), 'Al');
                        metals.add(metal);
                    }
                    break;

                case 3:
                    for (var i = 0; i < dropAmt; i++) {
                        metal = new Metal(this.game, this.x + (i * posVar), this.y + (i * posVar), 'Ti');
                        metals.add(metal);
                    }
                    break;

                case 4:
                    for (var i = 0; i < dropAmt; i++) {
                        metal = new Metal(this.game, this.x + (i * posVar), this.y + (i * posVar), 'Cr');
                        metals.add(metal);
                    }
                    break;

            }
            break;

        case 'bruiser':
            switch(enemyDrop){
                case 1:
                    for (var i = 0; i < dropAmt; i++) {
                        metal = new Metal(this.game, this.x + (i * posVar), this.y + (i * posVar), 'Fe');
                        metals.add(metal);
                    }
                    break;

                case 2:
                    for (var i = 0; i < dropAmt; i++) {
                        metal = new Metal(this.game, this.x + (i * posVar), this.y + (i * posVar), 'Co');
                        metals.add(metal);
                    }
                    break;

                case 3:
                    for (var i = 0; i < dropAmt; i++) {
                        metal = new Metal(this.game, this.x + (i * posVar), this.y + (i * posVar), 'Ni');
                        metals.add(metal);
                    }
                    break;

                case 4:
                    for (var i = 0; i < dropAmt; i++) {
                        metal = new Metal(this.game, this.x + (i * posVar), this.y + (i * posVar), 'Cu');
                        metals.add(metal);
                    }
                    break;

            }
            break;

        case 'govt':
            switch(enemyDrop){
                case 1:
                    for (var i = 0; i < dropAmt; i++) {
                        metal = new Metal(this.game, this.x + (i * posVar), this.y + (i * posVar), 'Zn');
                        metals.add(metal);
                    }
                    break;

                case 2:
                    for (var i = 0; i < dropAmt; i++) {
                        metal = new Metal(this.game, this.x + (i * posVar), this.y + (i * posVar), 'Pd');
                        metals.add(metal);
                    }
                    break;

                case 3:
                    for (var i = 0; i < dropAmt; i++) {
                        metal = new Metal(this.game, this.x + (i * posVar), this.y + (i * posVar), 'Ag');
                        metals.add(metal);
                    }
                    break;

                case 4:
                    for (var i = 0; i < dropAmt; i++) {
                        metal = new Metal(this.game, this.x + (i * posVar), this.y + (i * posVar), 'Sn');
                        metals.add(metal);
                    }
                    break;

            }
            break;

        case 'captain':
            switch(enemyDrop){
                case 1:
                    for (var i = 0; i < dropAmt; i++) {
                        metal = new Metal(this.game, this.x + (i * posVar), this.y + (i * posVar), 'Nd');
                        metals.add(metal);
                    }
                    break;

                case 2:
                    for (var i = 0; i < dropAmt; i++) {
                        metal = new Metal(this.game, this.x + (i * posVar), this.y + (i * posVar), 'W');
                        metals.add(metal);
                    }
                    break;

                case 3:
                    for (var i = 0; i < dropAmt; i++) {
                        metal = new Metal(this.game, this.x + (i * posVar), this.y + (i * posVar), 'Pt');
                        metals.add(metal);
                    }
                    break;

                case 4:
                    for (var i = 0; i < dropAmt; i++) {
                        metal = new Metal(this.game, this.x + (i * posVar), this.y + (i * posVar), 'Au');
                        metals.add(metal);
                    }
                    break;

            }
            break;

        case 'escape':
            switch(enemyDrop){
                case 1:
                case 2:
                    for (var i = 0; i < dropAmt; i++) {
                        metal = new Metal(this.game, this.x + (i * posVar), this.y + (i * posVar), 'Au');
                        metals.add(metal);
                    }
                    break;

                case 3:
                case 4:
                    for (var i = 0; i < dropAmt; i++) {
                        metal = new Metal(this.game, this.x + (i * posVar), this.y + (i * posVar), 'Hg');
                        metals.add(metal);
                    }
                    break;

            }
            break;
    }

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
