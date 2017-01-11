var CrystalHunter = CrystalHunter || {};

CrystalHunter.GameState = {

    init: function() {
        
        // Establish player constants
        this.ACCELERATION = 150;
        this.MAX_SPEED = 200;
        this.DRAG = 50;
        this.ROTATION_SPEED = 180;
        
        // Establish bullet constants
        this.BULLET_SPEED = 300;
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
        
        // Standard black fill BG for now
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
        // Drags the ship when not accelerating
        this.ship.body.drag.setTo(this.DRAG, this.DRAG); // x, y
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
        
        // --- ENEMIES
        
        // Basic enemy pool
        this.basicEnemy = this.game.add.group();
        this.basicEnemy.enableBody = true;
        this.game.physics.enable(this.basicEnemy, Phaser.Physics.ARCADE);
        this.basicEnemy.createMultiple(5, 'basic');
        this.basicEnemy.setAll('anchor.x', 0.5);
        this.basicEnemy.setAll('anchor.y', 0.5);
        
        // Bruiser enemy pool
        this.bruiserEnemy = this.game.add.group();
        this.bruiserEnemy.enableBody = true;
        this.game.physics.enable(this.bruiserEnemy, Phaser.Physics.ARCADE);
        this.bruiserEnemy.createMultiple(2, 'bruiser');
        this.bruiserEnemy.setAll('anchor.x', 0.5);
        this.bruiserEnemy.setAll('anchor.y', 0.5);
        
        // -- PLAYER CONTROLS
        
        // Establishes controls + space to fire
        this.cursors = this.input.keyboard.createCursorKeys();
        this.fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    },
    
    update: function() {
        
        // --- PLAYER MOVEMENT

        // Calculate acceleration
        if (this.cursors.up.isDown) {
            this.ship.body.acceleration.x = Math.cos(this.ship.rotation) * this.ACCELERATION;
            this.ship.body.acceleration.y = Math.sin(this.ship.rotation) * this.ACCELERATION;
        } else {
            this.ship.body.acceleration.setTo(0);
        }
        
        // Rotate ship
        if (this.cursors.left.isDown) {
            this.ship.body.angularVelocity = -this.ROTATION_SPEED;
        } else if (this.cursors.right.isDown) {
            this.ship.body.angularVelocity = this.ROTATION_SPEED;
        } else {
            this.ship.body.angularVelocity = 0;
        }
        
        // --- FIRE WEAPON
        
        // Fires with space bar
        if (this.fireButton.isDown) {
            this.weapon.fire();
        }
        
        // --- BASIC ENEMY SPAWNING
        
        // if (this.NEXT_ENEMY < this.time.now && this.basicEnemy.countDead() > 0) {
            // this.NEXT_ENEMY = this.time.now + this.ENEMY_DELAY;
            // this.enemy = this.basicEnemy.getFirstExists(false);
            // Spawn at random location from top
            // this.enemy.reset(this.rnd.integerInRange(20, 1480), 0);
            // this.enemy.body.collideWorldBounds = true;
        // }      
    }       
};