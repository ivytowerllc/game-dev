var CrystalHunter = CrystalHunter || {};

CrystalHunter.GameState = {

    init: function() {
        
        // Establish player constants
        this.MAX_SPEED = 300;
        
        // Establish bullet constants
        this.BULLET_SPEED = 600;
        this.FIRE_RATE = 200;
        
        // Establish enemy constants
        this.BASIC_SPEED = 100;
        this.NEXT_ENEMY = 0;
        this.ENEMY_DELAY = 1000;
        
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
        this.ship.body.maxVelocity.setTo(this.MAX_SPEED, this.MAX_SPEED); // x, y
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
        
    },
    
    update: function() {
        
        // --- PLAYER MOVEMENT
        
        this.ship.rotation = this.game.physics.arcade.angleToPointer(this.ship);
        this.weapon.rotation = this.game.physics.arcade.angleToPointer(this.weapon);
        this.game.physics.arcade.moveToPointer(this.ship, this.MAX_SPEED);
        
        // --- FIRE WEAPON
        
        // Fires with mouse click
        if (this.game.input.activePointer.isDown) {
            this.weapon.fire();
            
        }   
        
    }       
    
};