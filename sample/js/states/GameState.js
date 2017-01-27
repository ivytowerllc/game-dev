var CrystalHunter = CrystalHunter || {};

CrystalHunter.GameState = {

    init: function() {
        
        // Establish player constants
        this.MAX_SPEED = 300;
        
        // Establish bullet constants
        this.BULLET_SPEED = 600;
        this.FIRE_RATE = 200;
        
        // Establish enemy constants
        this.BASIC_SPEED = 150;
        this.BASIC_HEALTH = 10;
        this.BRUISER_SPEED = 100;
        this.BRUISER_HEALTH = 30;
        this.CAPTAIN_SPEED = 300;
        this.CAPTAIN_HEALTH = 100;
        
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
        
        // --- ENEMY SPAWNS
        
        // Add basic enemies
        var basicPool = this.game.add.group();
        for (var i = 0; i < 5; i++) {
            var basic = new CrystalHunter.Enemy(this.game, this.game.world.randomX, this.game.world.randomY, 'basic', this.BASIC_SPEED, this.BASIC_HEALTH);
            basicPool.add(basic);
        }
        
        // Add bruiser class enemies
        var bruisePool = this.game.add.group();
        for (var i = 0; i < 2; i++) {
            var bruiser = new CrystalHunter.Enemy(this.game, this.game.world.randomX, this.game.world.randomY, 'bruiser', this.BRUISER_SPEED, this.BRUISER_HEALTH);
            bruisePool.add(bruiser);
        }
        
        // Add captain class
        var captain = new CrystalHunter.Enemy(this.game, this.game.world.randomX, this.game.world.randomY, 'captain', this.CAPTAIN_SPEED, this.CAPTAIN_HEALTH);
        this.game.add.existing(captain);
        
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
        // gets every sprite in the group
         bruisePool.forEachAlive(aggro, this, this.ship, 200);
        basicPool.forEachAlive(aggro, this, this.ship, 200);
        
    }
    
};
//checks for aggro range and sets aggro property to true(you made one i assumed thats what it was for)
var aggro=function(sprite, ship, distance){

        if(Math.abs(sprite.x-ship.x)<=distance && Math.abs(sprite.y-ship.y)<=distance){

       this.game.physics.arcade.moveToObject(sprite,ship,100);

        var angle = Math.atan2(ship.y - sprite.y, ship.x - sprite.x);// angle of enemy to player ship
        sprite.rotation = angle;
       // sprite.weapon.fire();
       sprite.aggro=true;
   }else{


   }
       //ga
    }
