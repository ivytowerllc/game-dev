/** Copyright Ivy Tower, LLC **/
// --- PlayState

var playState = {

    healthBar: "",
    Weapon: {},
    weapons: [],
    droneWeapons: [],
    currentWeapon: 0,
    droneWeapon: 0,
    explosions: "",
    metal: "",
    metals: "",
    asteroids: "",
    collectedMetals: [],
    crystal: "",
    crystals: "",
    dust: "",
    dusts: "",
    enemies: "",
    enemiesAlive: 0,
    enemyBullet: "",
    enemyWeapon: "",
    scoreText: "",
    dustBurnt: 0,
    anomaly: "",
    anomalies: "",
    comets: "",
    drone: "",
    drones: "",
    tier: "",
    deadMenu: "",
    yes: "",
    no: "",
    player: "",
    players: "",

    // Player variables
    SHIP_SPEED: 600,
    MAX_HEALTH: 200,

    // Bullet damages (Tier 1)
    SHIP_BASIC_DAM: 10, // Diamond weapon
    SHIP_ROCKT_DAM: 20, // Ruby weapon
    SHIP_CRESC_DAM: 10, // Sunstone weapon w/o burn
    SHIP_ELECT_DAM: 10, // Topaz weapon
    SHIP_LIGHT_DAM: 30, // Topaz explode
    SHIP_LEECH_DAM: 1,  // Emerald weapon
    SHIP_BLAST_DAM: 1,  // Amethyst weapon
    SHIP_FREZE_DAM: 10, // Sapphire weapon
    SHIP_EXPLD_DAM: 10, // Obsidian weapon
    ENEM_BASIC_DAM: 10,
    ENEM_BRUIS_DAM: 30,
    ENEM_CAPTN_DAM: 15, // For each of 3 shots
    ENEM_GOVMT_DAM: 10,

    // Crystal weapons
    diamondTier: 0,
    rubyTier: 0,
    sunstoneTier: 0,
    topazTier: 0,
    emeraldTier: 0,
    sapphireTier: 0,
    amethystTier: 0,
    obsidianTier: 0,

    // Asteroids variables
    BIG_AST_HEALTH: 30,
    MED_AST_HEALTH: 20,
    SML_AST_HEALTH: 10,
    BIG_AST_SCALE: 0.75,
    MED_AST_SCALE: 0.5,
    SML_AST_SCALE: 0.25,
    BIG_AST_SPEED: 50,
    MED_AST_SPEED: 75,
    SML_AST_SPEED: 100,
    SML_AST_DMG: 5,
    MED_AST_DMG: 15,
    BIG_AST_DMG: 30,

    // Enemy variables
    BASIC_SPEED: 150,
    BASIC_HEALTH: 50,
    BRUISER_SPEED: 100,
    BRUISER_HEALTH: 300,
    CAPTAIN_SPEED: 230,
    CAPTAIN_HEALTH: 150,
    GOVT_SPEED: 150,
    GOVT_HEALTH: 50,
    ESCAPE_POD_SPEED: 400,
    ESCAPE_POD_HEALTH: 25,

    // Comet variables
    COMET_HEALTH: 100,
    COMET_SPEED: 250,

    transmuteFlag: false,
    anomalyKey: ['infinity', 'magnet', 'transmute', 'droneAnom', 'invisible', 'warp'],
    nickname: "",

    create: function() {

        /** DEBUG FPS **/
        game.time.advancedTiming = true;

        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;

        // --- GAME SETUP
        var i, govt, captain, bruiser, basic, ast, astKey;

        // Set world bounds
        this.game.world.setBounds(0, 0, 5000, 5000);

        // Simple starry background for now
        this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'bg');

        // Start music
        this.music = game.add.audio('battle');
        this.music.loop = true;
        this.music.play();

        // General Sound Effects
        this.metalSound = game.add.audio('metal');
        this.metalSound.volume = 2;
        this.deathSound = game.add.audio('death');
        this.deathSound.volume = 5;
        this.crystalSound = game.add.audio('crystalSound');
        this.crystalSound.volume = 2;
        this.iceSound = game.add.audio('ice');
        this.cannonSound = game.add.audio('cannon');
        this.damageSound = game.add.audio('damage');
        this.movementSound = game.add.audio('movement');
        this.leechSound = game.add.audio('leech');
        this.outTapSound = game.add.audio('outTap');
        this.inTapSound = game.add.audio('inTap');
        this.rocketSound = game.add.audio('rockets');
        this.burnSound = game.add.audio('burn');
        this.warpSound = game.add.audio('warp');


        // Ship Sound Effects
        this.diamondShot = game.add.audio('diamondShot');
        this.diamondShot.volume = 0.3;
        this.amethystShot = game.add.audio('amethystShot');
        this.topazShot = game.add.audio('topazShot');
        this.engineIdle = game.add.audio('engineIdle');
        this.captainShot = game.add.audio('captainShot');
        this.basicShot = game.add.audio('basicShot');
        this.bruiserShot = game.add.audio('bruiserShot');
        this.bloost = game.add.audio('bloost');

        this.bloost.allowMultiple = false;
        this.amethystShot.allowMultiple = false;
        this.movementSound.allowMultiple = false;
        this.engineIdle.allowMultiple = false;
        this.engineIdle.volume = 0.5;

        this.powerup = this.game.add.audio('powerup');
        this.powerup.volume = 10;

        // Add moon for reference point
        this.moon = game.add.sprite(game.world.centerX, game.world.centerY, 'moon');
        this.moon.anchor.setTo(0.5);
        this.moon.scale.setTo(2);

        // Create game groups
        this.asteroids = this.game.add.group();
        this.comets = this.game.add.group();
        this.metals = this.game.add.group();
        this.crystals = this.game.add.group();
        this.explosions = this.game.add.group();
        this.dusts = this.game.add.group();
        this.anomalies = this.game.add.group();
        this.players = this.game.add.group();

        // --- PLAYER SHIP

        // Adds player ship to the game
        this.player = new this.Player(this.game, this.game.world.randomX, this.game.world.randomY, 'ship', this.nickname);
        this.players.add(this.player);

        this.deadMenu = game.add.sprite(this.player.x, this.player.y, 'continue');
        this.deadMenu.anchor.setTo(.5);
        this.yes = game.add.button(this.deadMenu.width*.1, this.deadMenu.height*.4, 'greenButton', this.continue, this);
        this.no = game.add.button(this.deadMenu.width*.3, this.deadMenu.height*.4, 'redButton', this.quit, this);
        this.yes.anchor.setTo(.5);
        this.no.anchor.setTo(.5);
        this.deadMenu.addChild(this.yes);
        this.deadMenu.addChild(this.no);

        this.deadMenu.kill();

        // Camera follows ship
        this.game.camera.follow(this.player);

        // --- PLAYER BULLETS

        this.weapons.push(new this.Weapon.Ruby(this.game));
        this.rubyTier = 3;
        this.tier = this.rubyTier;

        this.droneWeapons.push(new this.Weapon.DroneWeapon(this.game));

        // --- ASTEROID SPAWNS

        for (i = 0; i < 10; i++) {
            astKey = ['bigBlueAst', 'bigRedAst', 'bigGreyAst', 'bigWhiteAst', 'bigBrownAst'][Math.floor(Math.random() * 5)];
            ast = new playState.Asteroid(this.game, this.game.world.randomX, this.game.world.randomY, astKey, this.BIG_AST_SCALE, this.BIG_AST_HEALTH, this.BIG_AST_SPEED);
            this.asteroids.add(ast);
        }

        // --- ENEMY SPAWNS

        // Add basic enemies
        this.enemies = this.game.add.group();
        this.enemies.enableBody = true;

        for (i = 0; i < 10; i++) {
            basic = new this.Enemy(this.game, this.game.world.randomX, this.game.world.randomY, 'basic', this.BASIC_SPEED, this.BASIC_HEALTH, this.player);
            this.enemies.add(basic);
            this.enemiesAlive++;
        }

        // Add bruiser class enemies
        for (i = 0; i < 5; i++) {
            bruiser = new this.Enemy(this.game, this.game.world.randomX, this.game.world.randomY, 'bruiser', this.BRUISER_SPEED, this.BRUISER_HEALTH, this.player);
            this.enemies.add(bruiser);
            this.enemiesAlive++;
        }
/**
        // Add captain class enemies
        for (i = 0; i < 1; i++) {
            captain = new this.Enemy(this.game, this.game.world.randomX, this.game.world.randomY, 'captain', this.CAPTAIN_SPEED, this.CAPTAIN_HEALTH, this.player);
            this.enemies.add(captain);
            this.enemiesAlive++;
        }
**/
        // Add government enemies
        for (i = 0; i < 10; i++) {
            govt = new this.Enemy(this.game, this.game.world.randomX, this.game.world.randomY, 'govt', this.GOVT_SPEED, this.GOVT_HEALTH, this.player);
            this.enemies.add(govt);
            this.enemiesAlive++;
        }

        this.enemyWeapon = this.add.group();
        this.enemyWeapon.enableBody = true;

        game.global.score = 0;

        // Spawn an anomaly after 15 seconds
        this.game.time.events.add(15000, function() {
            this.anomaly = new this.Anomaly(this.game, this.game.world.width / 2, this.game.world.height / 2, this.anomalyKey[Math.floor(Math.random() * 6)]);
            console.log('New anomaly at ' + this.anomaly.x + ', ' + this.anomaly.y);
            this.anomalies.add(this.anomaly);
            this.anomaly.spawn();
        }, this);

        // Spawn a comet after 15 seconds
        this.game.time.events.add(15000, this.newComet, this);

        if (!game.device.desktop){

            game.scale.forceOrientation(true);

            // Set the type of scaling to show all
            game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;

            // Set min/max height/width of the game
            game.scale.setMinMax(game.width/2, game.height/2, game.width*2, game.height*2);

            // Center the game on the screen
            game.scale.pageAlignHorizontally = true;
            game.scale.pageAlignVertically = true;

            game.scale.onOrientationChange.add(this.orientationChange, this);
            this.orientationChange();

            // Mobile controls
            this.pad = this.game.plugins.add(Phaser.VirtualJoystick);

            this.stick = this.pad.addStick(0, 0, 200, 'generic');
            this.stick.alignBottomLeft();
            this.stick.scale = 0.5;

            this.buttonA = this.pad.addButton(game.width*.9, game.height/2, 'generic', 'button1-up', 'button1-down');
            this.buttonA.scale = 0.5;
            this.buttonA.onDown.add(function () {

                this.weapons[this.currentWeapon].shoot(this.player);

            }, this);

            this.buttonB = this.pad.addButton(game.width*.9, game.height/1.5, 'generic', 'button2-up', 'button2-down');
            this.buttonB.scale = .3;
            this.buttonB.onDown.add(this.changeWeapon, this);

            this.buttonC = this.pad.addButton(game.width*.9, game.height/1.1, 'generic', 'button3-up', 'button3-down');
            this.buttonC.scale = .5;
            this.buttonC.onUp.add(this.stopBoost, this);

            this.scoreText = game.add.text(32, 32, 'SCORE: '
                + game.global.score
                + '   DUST: ' + this.player.dustCollected
                + '   WEAPON: ' + this.weapons[this.currentWeapon].name
                + '   TIER: ' + this.tier
                + '   HEALTH: ' + this.player.health, {
                fontSize: '20px',
                fill: "#FFF",
                font: 'Josefin Slab'
            });

            this.scoreText.fixedToCamera = true;

            console.log("MOBILE");

        } else {
            console.log("DESKTOP");

            this.scoreText = game.add.text(32, 32, 'SCORE: '
                + game.global.score
                + '   DUST: ' + this.player.dustCollected
                + '   WEAPON: ' + this.weapons[this.currentWeapon].name
                + '   TIER: ' + this.tier
                + '   HEALTH: ' + this.player.health, {
                fontSize: '32px',
                fill: "#FFF",
                font: 'Josefin Slab'
            });

            this.scoreText.fixedToCamera = true;

        }

    },

    update: function() {

        /** DEBUG FPS **/
        game.debug.text(game.time.fps || '--', 2, 14, "#00ff00");

        var changeKey, boost;

        switch (this.weapons[this.currentWeapon].name) {
            case 'DIAMOND':
                this.tier = this.diamondTier;
                break;
            case 'RUBY':
                this.tier = this.rubyTier;
                break;
            case 'SUNSTONE':
                this.tier = this.sunstoneTier;
                break;
            case 'TOPAZ':
                this.tier = this.topazTier;
                break;
            case 'EMERALD':
                this.tier = this.emeraldTier;
                break;
            case 'SAPPHIRE':
                this.tier = this.sapphireTier;
                break;
            case 'AMETHYST':
                this.tier = this.amethystTier;
                break;
            case 'OBSIDIAN':
                this.tier = this.obsidianTier;
                break;
        }

        if(!game.device.desktop) {

            this.buttonC.onDown.add(this.playerBoost, this);
            this.buttonC.repeatRate = 50;

        } else {



        }

        if (this.player.dustCollected > 205) {
            this.scoreText.setText('SCORE: ' + game.global.score
                + '   DUST: INFINITE'
                + '   WEAPON: ' + this.weapons[this.currentWeapon].name
                + '   TIER: ' + this.tier
                + '   HEALTH: ' + this.player.health);
        } else {
            this.scoreText.setText('SCORE: ' + game.global.score
                + '   DUST: ' + this.player.dustCollected
                + '   WEAPON: ' + this.weapons[this.currentWeapon].name
                + '   TIER: ' + this.tier
                + '   HEALTH: ' + this.player.health);
        }

        // --- OBJECT COLLISION

        this.enemies.forEachAlive(this.bulletCollision, this, this.weapons);
        this.asteroids.forEachAlive(this.bulletCollision, this, this.weapons);
        this.comets.forEachAlive(this.bulletCollision, this, this.weapons);

        this.enemies.forEachAlive(this.bulletCollision, this, this.explosions);
        this.asteroids.forEachAlive(this.bulletCollision, this, this.explosions);
        this.comets.forEachAlive(this.bulletCollision, this, this.explosions);

        this.physics.arcade.overlap(this.enemyWeapon, this.player, this.callDamage, null, this); // Comment this out to ignore enemy damage; useful for development

        if (this.drone.alive) {
            this.physics.arcade.overlap(this.enemyWeapon, this.drone, this.callDamage, null, this);
            this.physics.arcade.overlap(this.drone, this.metals, this.collectMaterial, null, this);

            this.enemies.forEachAlive(this.bulletCollision, this, this.droneWeapons);
            this.asteroids.forEachAlive(this.bulletCollision, this, this.droneWeapons);
            this.comets.forEachAlive(this.bulletCollision, this, this.droneWeapons);

            this.scoutMetals(this.drone, this.player, this.metals);

            this.drone.rotation = this.game.physics.arcade.angleToPointer(this.drone);

            if (this.game.input.activePointer.isDown) {
                this.droneWeapons[0].shoot(this.drone);
            }
        }

        if (this.player.alive) {
            this.physics.arcade.overlap(this.player, this.metals, this.collectMaterial, null, this);
            this.physics.arcade.overlap(this.player, this.crystals, this.collectMaterial, null, this);
            this.physics.arcade.overlap(this.player, this.dusts, this.collectMaterial, null, this);
            this.physics.arcade.overlap(this.player, this.anomalies, this.collectMaterial, null, this);
        }

        if (this.player.magnet) {
            this.metals.forEachAlive(function(sprite) {
                if (this.game.physics.arcade.distanceBetween(this.player, sprite) <= 200) {
                    game.physics.arcade.moveToObject(sprite, this.player, 100);
                    sprite.rotation = Math.atan2(this.player.y - sprite.y, this.player.x - sprite.x);
                }
            }, this);
        }

        this.game.physics.arcade.collide(this.asteroids, this.asteroids);
        this.game.physics.arcade.collide(this.asteroids, this.enemies);

        this.game.physics.arcade.collide(this.player, this.asteroids, function() {
            var damage;
            if (playState.player.dustCollected < 1) {
                damage = 20;
                playState.player.health -= damage;

                playState.scoreText.setText(
                    'SCORE: ' + game.global.score
                    + '   DUST: ' + playState.player.dustCollected
                    + '   WEAPON: ' + playState.weapons[playState.currentWeapon].name
                    + '   TIER: ' + playState.tier
                    + '   HEALTH: ' + playState.player.health);
            }

            if(playState.player.health < 1){
                playState.deathSound.play();
            }
        });

        if (this.player.health <= 0) {
            this.playerDie();
            this.deadMenu.revive();
            this.deadMenu.x = this.player.x;
            this.deadMenu.y = this.player.y;
        }

    },

    stopBoost: function(){
        this.bloost.stop();
    },


    playerBoost: function() {

        if(!game.device.desktop){
            console.log("MOBILE BOOST");

        } else {
            console.log("DESKTOP BOOST!");
        }


    },

    playerDie: function() {

        if (this.drone.alive) {
            this.drone.kill();
            this.deathSound.play();
        }

    },

    continue: function() {

        console.log('CONTINUE');
        this.inTapSound.play();
        this.deadMenu.kill();
        this.player.revive();
        this.player.health = 200;
        this.player.healthBar.revive();
        this.player.shield.revive();
        this.player.healthBar.scale.x = 1;
        this.player.x = this.game.world.randomX;
        this.player.y = this.game.world.randomY;
        this.player.dustCollected = 0;

        for (var i = 0; i < this.weapons.length; i++) {
            switch (this.weapons[i].name) {
                case 'DIAMOND':
                    this.tier = this.diamondTier;
                    break;
                case 'RUBY':
                    this.tier = this.rubyTier;
                    break;
                case 'SUNSTONE':
                    this.tier = this.sunstoneTier;
                    break;
                case 'TOPAZ':
                    this.tier = this.topazTier;
                    break;
                case 'EMERALD':
                    this.tier = this.emeraldTier;
                    break;
                case 'SAPPHIRE':
                    this.tier = this.sapphireTier;
                    break;
                case 'AMETHYST':
                    this.tier = this.amethystTier;
                    break;
                case 'OBSIDIAN':
                    this.tier = this.obsidianTier;
                    break;
            }
        }

    },

    quit: function() {

        game.state.start('menu');
        this.soundsOff();
        this.outTapSound.play();

    },

    soundsOff: function() {

        this.amethystShot.pause();
        this.music.pause();
        this.diamondShot.pause();
        this.engineIdle.pause();
        this.topazShot.pause();

    },

    scoutMetals: function (drone, ship, metalsprite) {

        if (this.game.physics.arcade.distanceBetween(drone, metalsprite) <= 200 && drone.alive && metalsprite.alive) {
            game.physics.arcade.moveToObject(drone, metalsprite, 275);
        } else {
            if (this.game.physics.arcade.distanceBetween(drone, ship) > 100) {
                game.physics.arcade.moveToObject(drone, ship, 900);
            }
        }

    },

    orientationChange: function() {

        // If the game is in portrait (which is horribly wrong) pause and display an error.
        // This should be removed before launch as a user's game can't pause in a multiplayer match
        if (game.scale.isPortrait) {
            game.paused = true;
        } else {
            // Resume the game
            game.paused = false;
            //this.rotateLabel.text = "";
        }

    },

    changeWeapon: function() {

        if (this.currentWeapon > this.weapons.length) {
            this.weapons[this.currentWeapon].reset();
        } else {
            this.weapons[this.currentWeapon].visible = false;
            this.weapons[this.currentWeapon].callAll('reset', null, 0, 0);
            this.weapons[this.currentWeapon].setAll('exists', false);
        }

        this.currentWeapon++;

        if (this.currentWeapon === this.weapons.length) {
            this.currentWeapon = 0;
        }

        this.weapons[this.currentWeapon].visible = true;

        this.scoreText.setText( 'SCORE: ' + game.global.score + '   DUST: ' + this.player.dustCollected + '   WEAPON: ' + this.weapons[this.currentWeapon].name + '   TIER: ' + this.tier+ '   HEALTH: ' + this.player.health);

    },

    bulletCollision: function(sprite, weapon) {

        if (this.weapons[this.currentWeapon].name == 'OBSIDIAN') {
            this.physics.arcade.collide(weapon, sprite, this.callDamage, null, this);
        } else {
            this.physics.arcade.overlap(weapon, sprite, this.callDamage, null, this);
        }

    },

    callDamage: function(sprite, weapon) {

        var bullet = weapon,
            damage;


        switch (weapon.key) {
            case 'diamondb':
                damage = this.SHIP_BASIC_DAM;
                this.damageSound.play();
                bullet.kill();
                break;
            case 'rubyb':
                damage = this.SHIP_ROCKT_DAM;
                this.damageSound.play();
                bullet.kill();
                break;
            case 'sunstoneb':
                damage = this.SHIP_CRESC_DAM;
                this.damageSound.play();
                if (sprite.burn == false) {
                    if (this.sunstoneTier < 3) {
                        this.game.time.events.repeat(1000, 2, this.callDamage, this, sprite, 'lessburn');
                    } else if (this.sunstoneTier == 3) {
                        this.game.time.events.repeat(1000, 2, this.callDamage, this, sprite, 'moreburn');
                    }
                    sprite.burn = true;
                    this.game.time.events.add(3000, this.ointment, this, sprite);
                }
                bullet.kill();
                break;
            case 'topazb':
                damage = this.SHIP_ELECT_DAM;
                this.damageSound.play();
                break;
            case 'topaze':
                damage = this.SHIP_LIGHT_DAM;
                this.damageSound.play();
                bullet.kill();
            case 'emeraldb':
                damage = this.SHIP_LEECH_DAM;
                if (this.player.health < 200) {
                    if (this.emeraldTier == 1) {
                        this.player.health += 1;
                    } else if (this.emeraldTier == 2) {
                        this.player.health += 5;
                    } else if (this.emeraldTier == 3) {
                        this.player.health += 10;
                    }
                }
                if (this.player.health > 200) {
                    this.player.health = 200;
                }
                bullet.kill();
                break;
            case 'amethystb':
                if (this.amethystTier < 3) {
                    damage = this.SHIP_BLAST_DAM;
                } else if (this.amethystTier == 3) {
                    damage = this.SHIP_BLAST_DAM * 1.5;
                }
                bullet.kill();
                break;
            case 'sapphireb':
                damage = this.SHIP_FREZE_DAM;
                this.damageSound.play();
                if (sprite.frozen == false && sprite.iceStack < 3) {
                    sprite.frozen = true;
                    sprite.iceStack++;
                    this.game.time.events.add(1500, this.defrost, this, sprite);
                }
                if (this.sapphireTier == 3 && Math.random() < 0.25) {
                    sprite.stopped = true;
                    this.game.time.events.add(1500, this.defrost, this, sprite);
                }
                bullet.kill();
                break;
            case 'obsidianb':
                damage = this.SHIP_EXPLD_DAM;
                this.damageSound.play();
                bullet.kill();
                break;
            case 'basicb':
                damage = this.ENEM_BASIC_DAM;
                this.damageSound.play();
                bullet.kill();
                break;
            case 'bruiserb':
                damage = this.ENEM_BRUIS_DAM;
                this.damageSound.play();
                bullet.kill();
                break;
            case 'captainb':
                damage = this.ENEM_CAPTN_DAM;
                this.damageSound.play();
                bullet.kill();
                break;
            case 'govtb':
                damage = this.ENEM_GOVMT_DAM;
                this.damageSound.play();
                bullet.kill();
                break;
        }

        if (weapon == 'lessburn') {
            damage = 3;
        } else if (weapon == 'moreburn') {
            damage = 5;
        }

        if (sprite.health <= 0 && sprite.alive) {

            if (sprite.key == 'ship') {
                this.deathSound.play();
            }

            sprite.kill();

            // Drone
            if (sprite.key == 'drone') {
                console.log('Drone is dead');
            }

            // Drops
            if (this.asteroids.children.indexOf(sprite) > -1) {
                sprite.spawnDrop();
                sprite.bust();
            } else if (this.enemies.children.indexOf(sprite) > -1) {
                sprite.dropLoot();
                this.enemiesAlive--;
            } else if (sprite.key == 'comet') {
                sprite.dropLoot();
            }

            // Scores (+ escape pod)
            if (sprite.key == 'basic') {
                game.global.score += 10;
            } else if (sprite.key == 'bruiser') {
                game.global.score += 20;
            } else if (sprite.key == 'govt') {
                game.global.score += 15;
            } else if (sprite.key == 'captain') {
                game.global.score += 30;
                sprite.escapePod();
            } else if (sprite.key == 'escape') {
                game.global.score += 50;
            }

        } else if (sprite.health > 0) {
            // Dust shield takes damage
            if (sprite.key == 'ship' && this.player.dustCollected > 0) {
                this.player.dustCollected -= damage;
                if (this.player.dustCollected < 0) {
                    this.player.dustCollected = 0;
                }
                // Player takes damage w/o shield
            } else if (sprite.key == 'ship' && this.player.dustCollected <= 0) {
                sprite.health -= damage;
                this.player.dustCollected = 0;
                // Non-player damage
            } else {
                sprite.health -= damage;
            }
        }

        this.scoreText.setText( 'SCORE: ' + game.global.score
            + '   DUST: ' + this.player.dustCollected
            + '   WEAPON: ' + this.weapons[this.currentWeapon].name
            + '   TIER: ' + this.tier
            + '   HEALTH: ' + this.player.health);

    },

    updateBar: function (spritebar, sprite) {

        // Updates healthBar of sprites
        if (sprite.health <= 0) {
            spritebar.kill();
        }

        if (spritebar.key == 'health') {
            if (sprite.key == 'ship') {
                spritebar.scale.x = sprite.health/this.MAX_HEALTH;
            } else if (sprite.key == 'basic' || sprite.key == 'govt') {
                spritebar.scale.x = sprite.health/this.BASIC_HEALTH;
            } else if (sprite.key == 'bruiser') {
                spritebar.scale.x = sprite.health/this.BRUISER_HEALTH;
            } else if (sprite.key == 'captain') {
                spritebar.scale.x = sprite.health/this.CAPTAIN_HEALTH;
            } else if (sprite.key == 'escape') {
                spritebar.scale.x = sprite.health/this.ESCAPE_POD_HEALTH;
            }
        } else if (spritebar.key == 'shield') {
            if (this.player.dustCollected < 200) {
                spritebar.scale.x = this.player.dustCollected/200;
            } else {
                spritebar.scale.x = 1;
            }
        }

        spritebar.centerX = sprite.centerX;
        spritebar.centerY = sprite.centerY + 30;

    },

    updateName: function(namelabel, sprite) {

        if (sprite.health <= 0) {
            namelabel.kill();
        }

        namelabel.centerX = sprite.centerX;
        namelabel.centerY = sprite.centerY - 20;

    },

    defrost: function(sprite) {

        // Returns sprite speeds to normal
        switch (sprite.key) {
            case 'basic':
            case 'govt':
                sprite.speed = this.BASIC_SPEED;
                break;
            case 'bruiser':
                sprite.speed = this.BRUISER_SPEED;
                break;
            case 'captain':
                sprite.speed = this.CAPTAIN_SPEED;
                break;
            case 'escape':
                sprite.speed = this.ESCAPE_POD_SPEED;
                break;
            case 'ship':
                sprite.speed = this.SHIP_SPEED;
                break;
        }

        // Wipes ice stack
        sprite.iceStack = 0;

    },

    ointment: function(sprite) {

        // Sprite no longer takes burn damage
        sprite.burn = false;

    },

    collectMaterial: function(ship, material) {

        var randomUpgrade;

        console.log(material.key);

        // Metal pickup
        if (this.metals.children.indexOf(material) > -1) {

            if (this.transmuteFlag) {

                console.log('STILL TRANSMUTING...');

                switch (material.key) {
                    case 'Li':
                        console.log('Changed to Aluminum');
                        material.key = 'Al';
                        material.value = 13;
                        break;
                    case 'Al':
                        console.log('Changed to Titanium');
                        material.key = 'Ti';
                        material.value = 22;
                        break;
                    case 'Ti':
                        console.log('Changed to Chromium');
                        material.key = 'Cr';
                        material.value = 24;
                        break;
                    case 'Cr':
                        console.log('Changed to Iron');
                        material.key = 'Fe';
                        material.value = 26;
                        break;
                    case 'Fe':
                        console.log('Changed to Cobalt');
                        material.key = 'Co';
                        material.value = 27;
                        break;
                    case 'Co':
                        console.log('Changed to Nickel');
                        material.key = 'Ni';
                        material.value = 28;
                        break;
                    case 'Ni':
                        console.log('Changed to Copper');
                        material.key = 'Cu';
                        material.value = 29;
                        break;
                    case 'Cu':
                        console.log('Changed to Zinc');
                        material.key = 'Zn';
                        material.value = 30;
                        break;
                    case 'Zn':
                        console.log('Changed to Palladium');
                        material.key = 'Pd';
                        material.value = 46;
                        break;
                    case 'Pd':
                        console.log('Changed to Silver');
                        material.key = 'Ag';
                        material.value = 47;
                        break;
                    case 'Ag':
                        console.log('Changed to Tin');
                        material.key = 'Sn';
                        material.value = 50;
                        break;
                    case 'Sn':
                        console.log('Changed to Neodymium');
                        material.key = 'Nd';
                        material.value = 60;
                        break;
                    case 'Nd':
                        console.log('Changed to Tungsten');
                        material.key = 'W';
                        material.value = 74;
                        break;
                    case 'W':
                        console.log('Changed to Platinum');
                        material.key = 'Pt';
                        material.value = 78;
                        break;
                    case 'Pt':
                        console.log('Changed to Gold');
                        material.key = 'Au';
                        material.value = 79;
                        break;
                    case 'Au':
                        console.log('Changed to Mercury');
                        material.key = 'Hg';
                        material.value = 80;
                        break;
                    case 'Hg':
                        material.value = 160;
                        break;
                }

                this.collectedMetals.push(material);
                console.log(material.key + material.value);

            } else {
                this.collectedMetals.push(material);
                game.global.metalMoney += material.value;
            }

            this.metalSound.play();

        }

        // Crystal pickup
        if (material.key == 'opal') {
            randomUpgrade = Math.ceil(Math.random() * 8);
            game.global.crystalsCollected[0]++;
        }

        if (material.key == 'diamond' || randomUpgrade == 1) {
            if (this.diamondTier == 0) {
                this.weapons.push(new this.Weapon.Diamond(this.game));
                this.diamondTier += 1;
            } else if (this.diamondTier < 3) {
                this.diamondTier += 1;
            }
            game.global.crystalsCollected[randomUpgrade]++;
            this.crystalSound.play();
        } else if (material.key == 'ruby' || randomUpgrade == 2) {
            if (this.rubyTier == 0) {
                this.weapons.push(new this.Weapon.Ruby(this.game));
                this.rubyTier += 1;
            } else if (this.rubyTier < 3) {
                this.rubyTier += 1;
            }
            game.global.crystalsCollected[randomUpgrade]++;
            this.crystalSound.play();
        } else if (material.key == 'sunstone' || randomUpgrade == 3) {
            if (this.sunstoneTier == 0) {
                this.weapons.push(new this.Weapon.Sunstone(this.game));
                this.sunstoneTier += 1;
            } else if (this.sunstoneTier < 3) {
                this.sunstoneTier += 1;
            }
            game.global.crystalsCollected[randomUpgrade]++;
            this.crystalSound.play();
        } else if (material.key == 'topaz' || randomUpgrade == 4) {
            if (this.topazTier == 0) {
                this.weapons.push(new this.Weapon.Topaz(this.game));
                this.topazTier += 1;
            } else if (this.topazTier < 3) {
                this.topazTier += 1;
            }
            game.global.crystalsCollected[randomUpgrade]++;
            this.crystalSound.play();
        } else if (material.key == 'emerald' || randomUpgrade == 5) {
            if (this.emeraldTier == 0) {
                this.weapons.push(new this.Weapon.Emerald(this.game));
                this.emeraldTier += 1;
            } else if (this.emeraldTier < 3) {
                this.emeraldTier += 1;
            }
            game.global.crystalsCollected[randomUpgrade]++;
            this.crystalSound.play();
        } else if (material.key == 'sapphire' || randomUpgrade == 6) {
            if (this.sapphireTier == 0) {
                this.weapons.push(new this.Weapon.Sapphire(this.game));
                this.sapphireTier += 1;
            } else if (this.sapphireTier < 3) {
                this.sapphireTier += 1;
            }
            game.global.crystalsCollected[randomUpgrade]++;
            this.crystalSound.play();
        } else if (material.key == 'amethyst' || randomUpgrade == 7) {
            if (this.amethystTier == 0) {
                this.weapons.push(new this.Weapon.Amethyst(this.game));
                this.amethystTier += 1;
            } else if (this.amethystTier < 3) {
                this.amethystTier += 1;
            }
            game.global.crystalsCollected[randomUpgrade]++;
            this.crystalSound.play();
        } else if (material.key == 'obsidian' || randomUpgrade == 8) {
            if (this.obsidianTier == 0) {
                this.weapons.push(new this.Weapon.Obsidian(this.game));
                this.obsidianTier += 1;
            } else if (this.obsidianTier < 3) {
                this.obsidianTier += 1;
            }
            game.global.crystalsCollected[randomUpgrade]++;
            this.crystalSound.play();
        }

        // Dust pickup
        if (this.player.dustCollected < 200) {
            if (material.key == 'smlDust') {
                this.player.dustCollected += 1;
                game.global.totalDustAccumulated++;
            } else if (material.key == 'medDust') {
                this.player.dustCollected += 3;
                game.global.totalDustAccumulated += 3;
            } else if (material.key == 'bigDust') {
                this.player.dustCollected += 6;
                game.global.totalDustAccumulated += 6;
            }
        }
        if (this.player.dustCollected > 200) {
            this.player.dustCollected = 200;
        }

        // Anomaly pickup
        switch (material.key) {
            case 'infinity':
                this.powerup.play();
                var savedDust = this.player.dustCollected;
                this.player.dustCollected = 9999;
                game.time.events.add(10000, function() {
                    this.player.dustCollected = savedDust;
                }, this);
                break;
            case 'magnet':
                this.powerup.play();
                this.player.magnet = true;
                this.game.time.events.add(15000, function() {
                    this.player.magnet = false;
                }, this);
                break;
            case 'transmute':
                this.powerup.play();
                this.transmuteFlag = true;
                this.game.time.events.add(15000, function() {
                    console.log('Finished Transmuting');
                    this.transmuteFlag = false;
                }, this);
                break;
            case 'drone':
                this.powerup.play();
                this.makeDrone(this.player);
                break;
            case 'invisible':
                this.powerup.play();
                if (!this.player.invis) {
                    this.player.invis = true;
                    this.player.alpha = 0.2;
                    this.game.time.events.add(10000, function() {
                        this.player.invis = false;
                        this.player.alpha = 1;
                    }, this);
                }
                break;
            case 'warp':
                this.warpSound.play();
                this.player.x = this.game.world.randomX;
                this.player.y = this.game.world.randomY;
                if (this.drone.alive) {
                    this.drone.x = this.player.x;
                    this.drone.y = this.player.y;
                }
                break;
        }

        this.scoreText.setText( 'SCORE: ' + game.global.score + '   DUST: ' + this.player.dustCollected + '   WEAPON: ' + this.weapons[this.currentWeapon].name + '   TIER: ' + this.tier+ '   HEALTH: ' + this.player.health);

        material.kill();

    },

    makeDrone: function(ship) {

        this.drone = new this.Drone(this.game, ship.centerX + 10, ship.y, 'drone', 400, 50, ship);
        this.drones = this.game.add.group();
        this.drones.add(this.drone);

    },

    // --- PLAYER

    // Player template with physics and standard variables
    Player: function(game, x, y, key, name) {

        this.game = game;
        this.health = playState.MAX_HEALTH;
        this.frozen = false;
        this.iceStack = 0;
        this.stopped = false;
        this.burn = false;
        this.magnet = false;
        this.invis = false;
        this.shootNow = 0;
        this.dustCollected = 0;

        this.angle = -90; // Points the ship up
        this.game.physics.enable(this, Phaser.Physics.ARCADE);

        Phaser.Sprite.call(this, game, x, y, key);

        this.game.physics.arcade.enable(this);
        this.anchor.setTo(0.5);
        this.body.collideWorldBounds = true;

        // Creates ship healthBar
        this.healthBar = playState.game.add.sprite(this.centerX, this.y + 10, 'health');
        this.playerName = this.game.add.text(this.centerX, this.y - 5, name, {font: '12px Josefin Slab', fill: '#FFFFFF'});

        // Creates ship shield
        this.shield = this.game.add.sprite(this.centerX, this.y + 10, 'shield');

    },

    // --- ASTEROIDS

    // Asteroid template with physics and standard variables
    Asteroid: function(game, x, y, key, scale, health, speed) {

        var randDirect = Math.random() < 0.5 ? 1 : -1;
        this.game = game;
        this.health = health;
        this.speed = speed;

        Phaser.Sprite.call(this, game, x, y, key);

        this.game.physics.arcade.enable(this);
        this.scale.setTo(scale);
        this.anchor.setTo(0.5);
        this.body.collideWorldBounds = true;
        this.body.velocity.setTo(this.speed * randDirect, this.speed * randDirect);
        this.body.bounce.set(0.5);

    },

    newAsteroids: function() {

        var i, astKey, ast;

        for (i = 0; i < 1; i++) {
            astKey = ['bigBlueAst', 'bigRedAst', 'bigGreyAst', 'bigWhiteAst', 'bigBrownAst'][Math.floor(Math.random() * 5)];
            ast = new playState.Asteroid(this.game, this.game.world.randomX, this.game.world.randomY, astKey, this.BIG_AST_SCALE, this.BIG_AST_HEALTH, this.BIG_AST_SPEED);
            this.asteroids.add(ast);
        }

    },

    // --- DUST

    // Dust template with physics and standard variables
    Dust: function (game, x, y, key) {

        this.game = game;
        var randoDirect = Math.random() < 0.5 ? 1 : -1;

        Phaser.Sprite.call(this, game, x, y, key);

        this.game.physics.arcade.enable(this);
        this.anchor.setTo(0.5);
        this.body.collideWorldBounds = true;
        this.body.velocity.setTo(5 * randoDirect, 5 * randoDirect);

    },

    // --- METALS

    // Metal template with physics and standard variables
    Metal: function(game, x, y, key) {

        this.game = game;
        var plusOrMinus = Math.random() < 0.5 ? -1 : 1;

        Phaser.Sprite.call(this, game, x, y, key);

        this.game.physics.arcade.enable(this);
        this.anchor.setTo(0.5);
        this.body.collideWorldBounds = true;
        this.body.velocity.setTo(5 * plusOrMinus, 5 * plusOrMinus);
        this.body.bounce.set(0.5);

        switch (this.key) {
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

    },

    // --- CRYSTALS

    // Crystal template with physics and standard variables
    Crystal: function(game, x, y, key) {

        this.game = game;
        var minusOrPlus = Math.random() < 0.5 ? 1 : -1;

        Phaser.Sprite.call(this, game, x, y, key);

        this.game.physics.arcade.enable(this);
        this.anchor.setTo(0.5);
        this.body.collideWorldBounds = true;
        this.body.velocity.setTo(5 * minusOrPlus, 5 * minusOrPlus);
        this.body.bounce.set(0.5);

    },

    // --- CRYSTAL WEAPONS

    // Basic constructor
    PlayerBullet: function(game, key) {

        this.game = game;

        Phaser.Sprite.call(this, game, 0, 0, key);

        this.anchor.setTo(0.5);
        this.checkWorldBounds = true;
        this.outOfBoundsKill = true;
        this.exists = false;

    },

    // --- ANOMALIES

    // Anomaly template with physics and standard variables
    Anomaly: function(game, x, y, key) {

        this.game = game;
        var plusOrMinus = Math.random() < 0.5 ? -1 : 1;

        this.lifespan = 10000;

        Phaser.Sprite.call(this, game, x, y, key);

        this.game.physics.arcade.enable(this);
        this.anchor.setTo(0.5);
        this.body.collideWorldBounds = true;
        this.body.velocity.setTo(5 * plusOrMinus, 5 * plusOrMinus);
        this.body.bounce.set(0.5);

    },

    // --- COMETS

    Comet: function(game, x, y, key, health) {

        this.game = game;
        this.health = health;

        Phaser.Sprite.call(this, game, x, y, key);

        this.game.physics.arcade.enable(this);
        this.anchor.setTo(0.5);
        this.body.outOfBoundsKill = true;

    },

    newComet: function() {

        var upDownLeftRight = Math.random(),
            comet;

        if (upDownLeftRight >= .75) {
            comet = new playState.Comet(this.game, 0, this.game.world.randomY, 'comet', this.COMET_HEALTH);
            console.log('A comet at ' + comet.x + ", " + comet.y);
            comet.body.velocity.setTo(75, this.COMET_SPEED);
            comet.scale.setTo(2);
            playState.comets.add(comet);

        } else if (upDownLeftRight >= .5) {
            comet = new playState.Comet(this.game, 5000, this.game.world.randomY, 'comet', this.COMET_HEALTH);
            console.log('A comet at ' + comet.x + ", " + comet.y);
            comet.body.velocity.setTo(-75, this.COMET_SPEED * -1);
            comet.scale.setTo(2);
            playState.comets.add(comet);

        } else if (upDownLeftRight >= .25) {
            comet = new playState.Comet(this.game, this.game.world.randomX, 0, 'comet', this.COMET_HEALTH);
            console.log('A comet at ' + comet.x + ", " + comet.y);
            comet.body.velocity.setTo(75, this.COMET_SPEED);
            comet.scale.setTo(2);
            playState.comets.add(comet);

        } else {
            comet = new playState.Comet(this.game, this.game.world.randomX, 5000, 'comet', this.COMET_HEALTH);
            console.log('A comet at ' + comet.x + ", " + comet.y);
            comet.body.velocity.setTo(-75, this.COMET_SPEED * -1);
            comet.scale.setTo(2);
            playState.comets.add(comet);
        }

        comet.spawn();

    },

    // --- ENEMIES

    // Enemy template with physics and standard variables
    Enemy: function(game, x, y, key, speed, health, player) {

        this.game = game;
        this.speed = speed;
        this.health = health;
        this.player = player;
        this.frozen = false;
        this.iceStack = 0;
        this.stopped = false;
        this.burn = false;
        this.aggroRange = 400;
        this.minDist = 100;
        this.shootNow = 0;

        Phaser.Sprite.call(this, game, x, y, key);

        this.game.physics.arcade.enable(this);
        this.anchor.setTo(0.5);
        this.body.collideWorldBounds = true;
        this.body.drag.setTo(50, 50);
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

        // Creates ship healthBar
        this.healthBar = playState.game.add.sprite(this.centerX, this.y + 10, 'health');

        /** this.healthBar = game.make.sprite(-10, -20, 'health');
         this.healthBar.anchor.setTo(0.5);
         this.addChild(this.healthBar); **/

    },

    EnemyBullet: function(game, x, y, key, player, speed, posVar) {

        this.game = game;

        Phaser.Sprite.call(this, game, x, y, key);

        this.game.physics.arcade.enable(this);
        this.anchor.setTo(0.5);
        this.checkWorldBounds = true;
        this.outOfBoundsKill = true;
        this.game.physics.arcade.moveToXY(this, player.x + posVar, player.y + posVar, speed);
        this.lifespan = 500;

    },

    Drone: function(game, x, y, key, speed, health, player) {

        this.game = game;
        this.speed = speed;
        this.health = health;
        this.player = player;
        this.burn = false;
        this.aggroRange = 400;
        this.minDist = 100;
        this.shootNow = 0;

        Phaser.Sprite.call(this, game, x, y, key);

        this.game.physics.arcade.enable(this);
        this.anchor.setTo(0.5);
        this.body.collideWorldBounds = true;
        this.body.drag.setTo(10, 10);
        this.scale.setTo(0.5);

    },

    DroneBullet: function(game, key) {

        this.game = game;

        Phaser.Sprite.call(this, game, 0, 0, key);

        this.anchor.setTo(0.5);
        this.checkWorldBounds = true;
        this.outOfBoundsKill = true;
        this.exists = false;

    },

};

playState.Dust.prototype = Object.create(Phaser.Sprite.prototype);
playState.Dust.prototype.constructor = playState.Dust;

playState.Metal.prototype = Object.create(Phaser.Sprite.prototype);
playState.Metal.prototype.constructor = playState.Metal;

playState.Crystal.prototype = Object.create(Phaser.Sprite.prototype);
playState.Crystal.prototype.constructor = playState.Crystal;

// --- PLAYER BEHAVIORS

playState.Player.prototype = Object.create(Phaser.Sprite.prototype);
playState.Player.prototype.constructor = playState.Player;

playState.Player.prototype.update = function() {



    playState.updateBar(this.healthBar, this);
    playState.updateBar(this.shield, this);

    // Update player name label
    playState.updateName(this.playerName, this);

    // --- PLAYER MOVEMENT
    if (!game.device.desktop) {

        if (playState.stick.isDown) {
            playState.physics.arcade.velocityFromRotation(playState.stick.rotation, playState.stick.force * playState.SHIP_SPEED, this.body.velocity);
            this.rotation = playState.stick.rotation;
            playState.movementSound.play();
            playState.engineIdle.pause();
        } else {
            this.body.drag.x = 1000;
            this.body.drag.y = 1000;
            if(!playState.engineIdle.isPlaying) {
                playState.engineIdle.play();
            }
        }


    } else {

        var boost = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),
        changeKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        changeKey.onDown.add(playState.changeWeapon, this);

        if (boost.isDown && this.dustCollected > 0) {

            playState.game.physics.arcade.moveToPointer(this, 1000);

            if (!playState.bloost.isPlaying) {
                playState.bloost.play();
            }

            playState.dustBurnt += 1;
            this.dustCollected -= 1;

            if (playState.dustBurnt >= 6) {

                playState.metal = new playState.Metal(playState.game, this.previousPosition.x, this.previousPosition.y, 'C');
                playState.metals.add(playState.metal);
                playState.dustBurnt = 0;
            }

            this.shield.scale.x -= .0025;

            if (this.dustCollected == 0) {

                this.shield.scale.x = 0;
            }

        } else {

            playState.bloost.pause();

            if (this.dustCollected > 205){

                this.SHIP_SPEED = 600;

            } else {

                this.SHIP_SPEED = 600 - (this.dustCollected / 2);

            }
        }

        if (playState.game.input.activePointer.isDown && this.alive) {

            if (playState.game.physics.arcade.distanceToPointer(this) > 100) {
                playState.game.physics.arcade.moveToPointer(this, 125);
            }
            playState.weapons[playState.currentWeapon].shoot(this);

            switch (playState.weapons[playState.currentWeapon].name) {
                case 'EMERALD':
                    if(!playState.leechSound.isPlaying){
                        playState.leechSound.play();
                    }
                    break;
                case 'AMETHYST':
                    if (!playState.amethystShot.isPlaying) {
                        playState.amethystShot.play();
                    }
            }
        } else {
            playState.amethystShot.pause();
            playState.leechSound.pause();
        }

        this.rotation = playState.game.physics.arcade.angleToPointer(this);

        if (playState.game.physics.arcade.distanceToPointer(this) > 100) {
            playState.game.physics.arcade.moveToPointer(this, 700);
            if(!playState.movementSound.isPlaying){
                //playState.movementSound.play();
            }
            playState.engineIdle.pause();
        } else {
            this.body.drag.x = 1000;
            this.body.drag.y = 1000;
            playState.movementSound.pause();


            if (!playState.engineIdle.isPlaying) {
                playState.engineIdle.play();
            }
        }
    }

    if (this.frozen) {
        if (playState.sapphireTier == 1) {
            this.speed = this.speed * 0.25;
            this.frozen = false;
        } else if (playState.sapphireTier > 1) {
            this.speed = this.speed * 0.50;
            this.frozen = false;
        }
    }

    if (this.stopped) {
        this.speed = 0;
        this.stopped = false;
    }

};

playState.Player.prototype.shoot = function() {

    /** PLAYER SHOOT **/

};

// --- ASTEROID BEHAVIORS

playState.Asteroid.prototype = Object.create(Phaser.Sprite.prototype);
playState.Asteroid.prototype.constructor = playState.Asteroid;

playState.Asteroid.prototype.spawnDrop = function() {

    var posVar = Math.ceil(Math.random() * 20),
        metalDropRate = Math.ceil(Math.random() * 100),
        metalDropAmt = Math.floor(Math.random() * 5),
        crystalDropRate = Math.ceil(Math.random() * 100),
        i, metalKey, crystalKey;

    if (this.health < 1) {

        // Metal drops
        if (metalDropRate < 5) {
            metalKey = 'Hg';
        } else if (metalDropRate < 10) {
            metalKey = 'Au';
        } else if (metalDropRate < 15) {
            metalKey = 'Pt';
        } else if (metalDropRate < 20) {
            metalKey = 'W';
        } else if (metalDropRate < 25) {
            metalKey = 'Nd';
        } else if (metalDropRate < 30) {
            metalKey = 'Sn';
        } else if (metalDropRate < 40) {
            metalKey = 'Ag';
        } else if (metalDropRate < 45) {
            metalKey = 'Pd';
        } else if (metalDropRate < 50) {
            metalKey = 'Zn';
        } else if (metalDropRate < 55) {
            metalKey = 'Cu';
        } else if (metalDropRate < 60) {
            metalKey = 'Ni';
        } else if (metalDropRate < 65) {
            metalKey = 'Co';
        } else if (metalDropRate < 70) {
            metalKey = 'Fe';
        } else if (metalDropRate < 75) {
            metalKey = 'Cr';
        } else if (metalDropRate < 80) {
            metalKey = 'Ti';
        } else if (metalDropRate < 85) {
            metalKey = 'Al';
        } else if (metalDropRate < 90) {
            metalKey = 'Li';
        }

        if (metalDropRate < 90) {
            for (i = 0; i < metalDropAmt; i++) {
                playState.metal = new playState.Metal(playState.game, this.x + (i * posVar), this.y + (i * posVar), metalKey);
                playState.metals.add(playState.metal);
            }
        }

        // Crystal drops
        if (crystalDropRate <= 100) {
            crystalKey = ['diamond', 'ruby', 'sunstone', 'topaz', 'emerald', 'sapphire', 'amethyst', 'obsidian', 'opal'][Math.floor(Math.random() * 9)];
            playState.crystal = new playState.Crystal(this.game, this.x + posVar, this.y + posVar, crystalKey);
            playState.crystals.add(playState.crystal);
        }

        // Dust drops
        switch (this.key) {
            case 'bigRedAst':
            case 'bigBlueAst':
            case 'bigWhiteAst':
            case 'bigGreyAst':
            case 'bigBrownAst':
                for (i = 0; i < 5; i++) {
                    playState.dust = new playState.Dust(this.game, this.x + posVar, this.y + posVar, 'bigDust');
                    playState.dusts.add(playState.dust);
                }
                break;
            case 'medRedAst':
            case 'medBlueAst':
            case 'medWhiteAst':
            case 'medGreyAst':
            case 'medBrownAst':
                for (i = 0; i < 3; i++) {
                    playState.dust = new playState.Dust(this.game, this.x + posVar, this.y + posVar, 'medDust');
                    playState.dusts.add(playState.dust);
                }
                break;
            case 'smlRedAst':
            case 'smlBlueAst':
            case 'smlWhiteAst':
            case 'smlGreyAst':
            case 'smlBrownAst':
                for (i = 0; i < 3; i++) {
                    playState.dust = new playState.Dust(this.game, this.x + posVar, this.y + posVar, 'smlDust');
                    playState.dusts.add(playState.dust);
                }
                break;
        }
    }

};

playState.Asteroid.prototype.bust = function() {

    var posVar = Math.ceil(Math.random() * 20),
        astKey, i, astScale, astHealth, astSpeed, ast;

    if (this.key == 'bigBlueAst') {
        astKey = 'medBlueAst';
        astScale = playState.MED_AST_SCALE;
        astHealth = playState.MED_AST_HEALTH;
        astSpeed = playState.MED_AST_SPEED;
    } else if (this.key == 'medBlueAst') {
        astKey = 'smlBlueAst';
        astScale = playState.SML_AST_SCALE;
        astHealth = playState.SML_AST_HEALTH;
        astSpeed = playState.SML_AST_SPEED;
    } else if (this.key == 'bigGreyAst') {
        astKey = 'medGreyAst';
        astScale = playState.MED_AST_SCALE;
        astHealth = playState.MED_AST_HEALTH;
        astSpeed = playState.MED_AST_SPEED;
    } else if (this.key == 'medGreyAst') {
        astKey = 'smlGreyAst';
        astScale = playState.SML_AST_SCALE;
        astHealth = playState.SML_AST_HEALTH;
        astSpeed = playState.SML_AST_SPEED;
    } else if (this.key == 'bigBrownAst') {
        astKey = 'medBrownAst';
        astScale = playState.MED_AST_SCALE;
        astHealth = playState.MED_AST_HEALTH;
        astSpeed = playState.MED_AST_SPEED;
    } else if (this.key == 'medBrownAst') {
        astKey = 'smlBrownAst';
        astScale = playState.SML_AST_SCALE;
        astHealth = playState.SML_AST_HEALTH;
        astSpeed = playState.SML_AST_SPEED;
    } else if (this.key == 'bigRedAst') {
        astKey = 'medRedAst';
        astScale = playState.MED_AST_SCALE;
        astHealth = playState.MED_AST_HEALTH;
        astSpeed = playState.MED_AST_SPEED;
    } else if (this.key == 'medRedAst') {
        astKey = 'smlRedAst';
        astScale = playState.SML_AST_SCALE;
        astHealth = playState.SML_AST_HEALTH;
        astSpeed = playState.SML_AST_SPEED;
    } else if (this.key == 'bigWhiteAst') {
        astKey = 'medWhiteAst';
        astScale = playState.MED_AST_SCALE;
        astHealth = playState.MED_AST_HEALTH;
        astSpeed = playState.MED_AST_SPEED;
    } else if (this.key == 'medWhiteAst') {
        astKey = 'smlWhiteAst';
        astScale = playState.SML_AST_SCALE;
        astHealth = playState.SML_AST_HEALTH;
        astSpeed = playState.SML_AST_SPEED;
    }

    for (i = 0; i < (Math.ceil(Math.random() * 3)); i++) {
        ast = new playState.Asteroid(playState.game, this.x + ((i + 1) * posVar), this.y + ((i + 1) * posVar), astKey, astScale, astHealth, astSpeed);
        playState.asteroids.add(ast);
    }

};

playState.Asteroid.prototype.update = function() {

    this.angle += 0.5;

};

// --- DRONE BEHAVIORS

playState.Drone.prototype = Object.create(Phaser.Sprite.prototype);
playState.Drone.prototype.constructor = playState.Drone;

playState.DroneBullet.prototype = Object.create(Phaser.Sprite.prototype);
playState.DroneBullet.prototype.constructor = playState.DroneBullet;

playState.DroneBullet.prototype.shoot = function(x, y, posVar, speed) {

    var targetX = this.game.input.activePointer.worldX + posVar,
        targetY = this.game.input.activePointer.worldY + posVar;

    this.reset(x, y);

    this.game.physics.arcade.moveToXY(this, targetX, targetY, speed);

};

playState.DroneBullet.prototype.update = function(){

    this.rotation = Math.atan2(this.body.velocity.y, this.body.velocity.x);

};

playState.Weapon.DroneWeapon = function(game) {

    var i;

    Phaser.Group.call(this, game, game.world, 'DRONE', false, true, Phaser.Physics.ARCADE);

    this.shootNow = 0;
    this.bulletSpeed = 1000;
    this.fireRate = 300;

    for (i = 0; i < 60; i++) {
        this.add(new playState.PlayerBullet(game, 'diamondb'), true);
    }

    return this;

};

playState.Weapon.DroneWeapon.prototype = Object.create(Phaser.Group.prototype);
playState.Weapon.DroneWeapon.prototype.constructor = playState.Weapon.DroneWeapon;

playState.Weapon.DroneWeapon.prototype.shoot = function(drone) {

    if (this.game.time.time < this.shootNow) {
        return;
    }

    this.getFirstExists(false).shoot(drone.x, drone.y, 0, this.bulletSpeed);
    this.lifespan = 500;
    playState.diamondShot.play();

    this.shootNow = this.game.time.time + this.fireRate;

};

// --- CRYSTAL WEAPONS

playState.PlayerBullet.prototype = Object.create(Phaser.Sprite.prototype);
playState.PlayerBullet.prototype.constructor = playState.PlayerBullet;

playState.PlayerBullet.prototype.shoot = function(x, y, posVar, speed) {

    var targetX = this.game.input.activePointer.worldX + posVar,
        targetY = this.game.input.activePointer.worldY + posVar,
        explode,
        angle = playState.player.angle;

    this.reset(x, y);

    if (playState.weapons[playState.currentWeapon].name == 'SUNSTONE' && playState.sunstoneTier == 1) {
        this.scale.setTo(0.75);
    }

    if (playState.weapons[playState.currentWeapon].name == 'AMETHYST' && playState.amethystTier > 1) {
        this.scale.setTo(1, 1.5);
    }

    if (playState.weapons[playState.currentWeapon].name == 'TOPAZ') {
        if (playState.topazTier == 1) {
            this.game.time.events.add(500, function() {
                this.kill();
                explode = this.game.add.sprite(this.x, this.y, 'topaze');
                explode.anchor.setTo(0.5);
                explode.scale.setTo(0.5);
                explode.lifespan = 50;
                playState.explosions.add(explode);
            }, this);
        } else if (playState.topazTier == 2) {
            this.game.time.events.add(1000, function() {
                this.kill();
                explode = this.game.add.sprite(this.x, this.y, 'topaze');
                explode.anchor.setTo(0.5);
                explode.scale.setTo(0.5);
                explode.lifespan = 50;
                playState.explosions.add(explode);
            }, this);
        } else if (playState.topazTier == 3) {
            this.game.time.events.add(1000, function() {
                this.kill();
                explode = this.game.add.sprite(this.x, this.y, 'topaze');
                explode.anchor.setTo(0.5);
                explode.lifespan = 50;
                playState.explosions.add(explode);
            }, this);
        }
    }

    if (playState.weapons[playState.currentWeapon].name == 'RUBY' && playState.rubyTier > 1) {
        playState.enemies.forEachAlive(function(sprite) {
            if (Phaser.Math.distance(sprite.x, sprite.y, x, y) <= 300) {
                playState.game.physics.arcade.moveToObject(this, sprite, 800);
            }
        }, this);
    } else if (playState.weapons[playState.currentWeapon].name == 'EMERALD') {
        playState.enemies.forEachAlive(function(sprite) {
            if (Phaser.Math.distance(sprite.x, sprite.y, x, y) <= 300) {
                playState.game.physics.arcade.moveToObject(this, sprite, 1200);
            }
        }, this);
    }

    if(!playState.game.device.desktop) {
        this.game.physics.arcade.velocityFromAngle(angle, speed, this.body.velocity);
    } else {
        this.game.physics.arcade.moveToXY(this, targetX, targetY, speed);
    }
};

playState.PlayerBullet.prototype.update = function() {

    this.rotation = Math.atan2(this.body.velocity.y, this.body.velocity.x);

    /** if (playState.weapons[playState.currentWeapon].name == 'RUBY' && playState.rubyTier > 1) {
        playState.enemies.forEachAlive(function(sprite) {
            if (Phaser.Math.distance(sprite.x, sprite.y, this.x, this.y) <= 300) {
                playState.game.physics.arcade.moveToObject(this, sprite, 300);
            }
        }, this);
    } **/

};

// Diamond weapon
playState.Weapon.Diamond = function(game) {

    var i;

    Phaser.Group.call(this, game, game.world, 'DIAMOND', false, true, Phaser.Physics.ARCADE);

    this.shootNow = 0;
    this.bulletSpeed = 1500;
    this.fireRate = 300;

    for (i = 0; i < 60; i++) {
        this.add(new playState.PlayerBullet(game, 'diamondb'), true);
    }

    return this;

};

playState.Weapon.Diamond.prototype = Object.create(Phaser.Group.prototype);
playState.Weapon.Diamond.prototype.constructor = playState.Weapon.Diamond;

playState.Weapon.Diamond.prototype.shoot = function(ship) {

    if (this.game.time.time < this.shootNow) {
        return;
    }

    playState.diamondShot.play();
    if (playState.diamondTier == 1) {
        this.getFirstExists(false).shoot(ship.x, ship.y, 0, this.bulletSpeed);

    } else if (playState.diamondTier == 2) {
        this.getFirstExists(false).shoot(ship.x, ship.y, 3, this.bulletSpeed);
        this.getFirstExists(false).shoot(ship.x, ship.y, -3, this.bulletSpeed);
    } else if (playState.diamondTier == 3) {
        this.getFirstExists(false).shoot(ship.x, ship.y, 0, this.bulletSpeed);
        this.getFirstExists(false).shoot(ship.x, ship.y, 5, this.bulletSpeed);
        this.getFirstExists(false).shoot(ship.x, ship.y, -5, this.bulletSpeed);
    }
    this.shootNow = this.game.time.time + this.fireRate;

};

// Ruby weapon
playState.Weapon.Ruby = function(game) {

    var i;

    Phaser.Group.call(this, game, game.world, 'RUBY', false, true, Phaser.Physics.ARCADE);

    this.shootNow = 0;
    this.bulletSpeed = 800;
    this.fireRate = 400;

    for (i = 0; i < 60; i++) {
        this.add(new playState.PlayerBullet(game, 'rubyb'), true);
    }

    return this;

};

playState.Weapon.Ruby.prototype = Object.create(Phaser.Group.prototype);
playState.Weapon.Ruby.prototype.constructor = playState.Weapon.Ruby;

playState.Weapon.Ruby.prototype.shoot = function(ship) {

    if (this.game.time.time < this.shootNow) {
        return;
    }

    playState.rocketSound.play();
    if (playState.rubyTier < 3) {
        this.getFirstExists(false).shoot(ship.x, ship.y, 0, this.bulletSpeed);

    } else {
        this.getFirstExists(false).shoot(ship.x, ship.y, 0, this.bulletSpeed);
        this.getFirstExists(false).shoot(ship.x, ship.y, 5, this.bulletSpeed);
        this.getFirstExists(false).shoot(ship.x, ship.y, -5, this.bulletSpeed);
    }
    this.shootNow = this.game.time.time + this.fireRate;

};

// Sunstone weapon
playState.Weapon.Sunstone = function(game) {

    var i;

    Phaser.Group.call(this, game, game.world, 'SUNSTONE', false, true, Phaser.Physics.ARCADE);

    this.shootNow = 0;
    this.bulletSpeed = 800;
    this.fireRate = 500;

    for (i = 0; i < 30; i++) {
        this.add(new playState.PlayerBullet(game, 'sunstoneb'), true);
    }

    return this;

};

playState.Weapon.Sunstone.prototype = Object.create(Phaser.Group.prototype);
playState.Weapon.Sunstone.prototype.constructor = playState.Weapon.Sunstone;

playState.Weapon.Sunstone.prototype.shoot = function(ship) {

    if (this.game.time.time < this.shootNow) {
        return;
    }
    playState.burnSound.play();

    this.getFirstExists(false).shoot(ship.x, ship.y, 0, this.bulletSpeed);



    this.shootNow = this.game.time.time + this.fireRate;

};

// Topaz weapon
playState.Weapon.Topaz = function(game) {

    var i;

    Phaser.Group.call(this, game, game.world, 'TOPAZ', false, true, Phaser.Physics.ARCADE);

    this.shootNow = 0;
    this.bulletSpeed = 1200;
    this.fireRate = 400;

    for (i = 0; i < 60; i++) {
        this.add(new playState.PlayerBullet(game, 'topazb'), true);
    }

    return this;

};

playState.Weapon.Topaz.prototype = Object.create(Phaser.Group.prototype);
playState.Weapon.Topaz.prototype.constructor = playState.Weapon.Topaz;

playState.Weapon.Topaz.prototype.shoot = function(ship) {

    if (this.game.time.time < this.shootNow) {
        return;
    }

    playState.topazShot.play();

    this.getFirstExists(false).shoot(ship.x, ship.y, 0, this.bulletSpeed);



    this.shootNow = this.game.time.time + this.fireRate;

};

// Amethyst weapon
playState.Weapon.Amethyst = function(game) {

    var i;

    Phaser.Group.call(this, game, game.world, 'AMETHYST', false, true, Phaser.Physics.ARCADE);

    this.shootNow = 0;
    this.bulletSpeed = 1200;
    this.fireRate = 10;

    for (i = 0; i < 200; i++) {
        this.add(new playState.PlayerBullet(game, 'amethystb'), true);
    }

    return this;

};

playState.Weapon.Amethyst.prototype = Object.create(Phaser.Group.prototype);
playState.Weapon.Amethyst.prototype.constructor = playState.Weapon.Amethyst;

playState.Weapon.Amethyst.prototype.shoot = function(ship) {

    if (this.game.time.time < this.shootNow) {
        return;
    }

    this.getFirstExists(false).shoot(ship.x, ship.y, 0, this.bulletSpeed);

    this.shootNow = this.game.time.time + this.fireRate;

};

// Emerald weapon
playState.Weapon.Emerald = function(game) {

    var i;

    Phaser.Group.call(this, game, game.world, 'EMERALD', false, true, Phaser.Physics.ARCADE);

    this.shootNow = 0;
    this.bulletSpeed = 1200;
    this.fireRate = 1;

    for (i = 0; i < 350; i++) {
        this.add(new playState.PlayerBullet(game, 'emeraldb'), true);
    }

    return this;

};

playState.Weapon.Emerald.prototype = Object.create(Phaser.Group.prototype);
playState.Weapon.Emerald.prototype.constructor = playState.Weapon.Emerald;

playState.Weapon.Emerald.prototype.shoot = function(ship) {

    if (this.game.time.time < this.shootNow) {
        return;
    }

    this.getFirstExists(false).shoot(ship.x, ship.y, 0, this.bulletSpeed);

    this.shootNow = this.game.time.time + this.fireRate;

};

// Sapphire weapon
playState.Weapon.Sapphire = function(game) {

    var i;
    Phaser.Group.call(this, game, game.world, 'SAPPHIRE', false, true, Phaser.Physics.ARCADE);

    this.shootNow = 0;
    this.bulletSpeed = 1500;
    this.fireRate = 200;

    for (i = 0; i < 60; i++) {
        this.add(new playState.PlayerBullet(game, 'sapphireb'), true);
    }

    return this;

};

playState.Weapon.Sapphire.prototype = Object.create(Phaser.Group.prototype);
playState.Weapon.Sapphire.prototype.constructor = playState.Weapon.Sapphire;

playState.Weapon.Sapphire.prototype.shoot = function (ship) {

    if (this.game.time.time < this.shootNow) {
        return;
    }
    playState.iceSound.play();

    this.getFirstExists(false).shoot(ship.x, ship.y, 0, this.bulletSpeed);



    this.shootNow = this.game.time.time + this.fireRate;

};

// Obsidian weapon
playState.Weapon.Obsidian = function(game) {

    var i;

    Phaser.Group.call(this, game, game.world, 'OBSIDIAN', false, true, Phaser.Physics.ARCADE);

    this.shootNow = 0;
    this.bulletSpeed = 1000;
    this.fireRate = 500;

    for (i = 0; i < 60; i++) {
        this.add(new playState.PlayerBullet(game, 'obsidianb'), true);
    }

    return this;

};

playState.Weapon.Obsidian.prototype = Object.create(Phaser.Group.prototype);
playState.Weapon.Obsidian.prototype.constructor = playState.Weapon.Obsidian;

playState.Weapon.Obsidian.prototype.shoot = function(ship) {

    if (this.game.time.time < this.shootNow) {
        return;
    }
    playState.cannonSound.play();

    if (playState.obsidianTier == 1) {
        this.getFirstExists(false).shoot(ship.x, ship.y, 0, this.bulletSpeed);
    } else if (playState.obsidianTier == 2) {
        this.getFirstExists(false).shoot(ship.x, ship.y, 3, this.bulletSpeed);
        this.getFirstExists(false).shoot(ship.x, ship.y, -3, this.bulletSpeed);
    } else if (playState.obsidianTier == 3) {
        this.getFirstExists(false).shoot(ship.x, ship.y, 0, this.bulletSpeed);
        this.getFirstExists(false).shoot(ship.x, ship.y, 5, this.bulletSpeed);
        this.getFirstExists(false).shoot(ship.x, ship.y, -5, this.bulletSpeed);
    }
    this.shootNow = this.game.time.time + this.fireRate;

};

// --- ANOMALY BEHAVIORS

playState.Anomaly.prototype = Object.create(Phaser.Sprite.prototype);
playState.Anomaly.prototype.constructor = playState.Anomaly;

playState.Anomaly.prototype.spawn = function() {

    game.time.events.add(15000, function() {

        playState.anomaly = new playState.Anomaly(this.game, this.game.world.randomX, this.game.world.randomY, playState.anomalyKey[Math.floor(Math.random() * 6)]);
        console.log('New anomaly at ' + playState.anomaly.x + ', ' + playState.anomaly.y);
        playState.anomalies.add(playState.anomaly);
        playState.anomaly.spawn();

    }, this);

};

// --- COMET BEHAVIORS

playState.Comet.prototype = Object.create(Phaser.Sprite.prototype);
playState.Comet.prototype.constructor = playState.Comet;

playState.Comet.prototype.dropLoot = function() {

    var drop = ['Nd', 'W', 'Pt', 'Au'][Math.floor(Math.random() * 4)],
        posVar = Math.ceil(Math.random() * 20),
        dropAmt = Math.floor(Math.random() * 20),
        i;

    for (i = 0; i < dropAmt; i++) {
        playState.metal = new playState.Metal(this.game, this.x + (i * posVar), this.y + (i * posVar), drop);
        playState.metals.add(playState.metal);
    }

};

playState.Comet.prototype.spawn = function() {

    game.time.events.add(20000, playState.newComet, this);

};

// --- ENEMY BEHAVIORS

playState.Enemy.prototype = Object.create(Phaser.Sprite.prototype);
playState.Enemy.prototype.constructor = playState.Enemy;

playState.EnemyBullet.prototype = Object.create(Phaser.Sprite.prototype);
playState.EnemyBullet.prototype.constructor = playState.EnemyBullet;

// Random enemy movement around the level
playState.Enemy.prototype.move = function() {

    if (Math.round(this.moveTimer.ms) > this.nextTurn) {

        var randomDist = Math.round((Math.random() + 1) * this.minMove),
            moveX = this.x,
            moveY = this.y,
            moveLeft = false,
            moveUp = false;

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
                moveX = 30 + this.body.width / 2;
                this.moveRightNext = true;
            }
        } else {
            moveX += randomDist;
            this.moveRightNext = false;
            if (moveX > (this.game.world.width - 30)) {
                moveX = (this.game.world.width - 30) - this.body.width / 2;
            }
        }

        if (moveUp && !this.moveDownNext) {
            moveY -= randomDist;
            if (moveY < 30) {
                moveY = 30 + this.body.height / 2;
                this.moveDownNext = true;
            }
        } else {
            moveY += randomDist;
            this.moveDownNext = false;
            if (moveY > (this.game.world.height - 30)) {
                moveY = (this.game.world.height - 30) - this.body.height / 2;
            }
        }

        this.game.physics.arcade.moveToXY(this, moveX, moveY, this.speed);
        this.rotation = Math.atan2(moveY - this.y, moveX - this.x);

    }

};

playState.Enemy.prototype.update = function() {

    playState.updateBar(this.healthBar, this);

    if (this.key !== 'escape' && this.game.physics.arcade.distanceBetween(this.player, this) <= this.aggroRange && this.player.alive && this.alive && !this.player.invis) {
        if (this.game.physics.arcade.distanceBetween(this.player, this) >= this.minDist) {
            this.game.physics.arcade.moveToXY(this, this.player.x, this.player.y, this.speed);
        } else {
            this.body.velocity.setTo(0);
        }

        this.rotation = Math.atan2(this.player.y - this.y, this.player.x - this.x);
        this.shoot();
    } else {
        this.move();
    }

    if (this.frozen) {
        if (playState.sapphireTier == 1) {
            this.speed = this.speed * 0.25;
            this.frozen = false;
        } else if (playState.sapphireTier > 1) {
            this.speed = this.speed * 0.50;
            this.frozen = false;
        }
    }

    if (this.stopped) {
        this.speed = 0;
        this.stopped = false;
    }

};

playState.Enemy.prototype.shoot = function() {

    var timeNow;

    switch (this.key) {
        case 'basic':
            timeNow = this.shootTimer.ms;
            if (this.shootNow < timeNow) {
                playState.enemyBullet = new playState.EnemyBullet(this.game, this.x, this.y, 'basicb', this.player, 450, null);
                playState.enemyWeapon.add(playState.enemyBullet);
                playState.basicShot.play();
                this.shootNow = timeNow + 500;
            }
            break;
        case 'bruiser':
            timeNow = this.shootTimer.ms;
            if (this.shootNow < timeNow) {
                playState.enemyBullet = new playState.EnemyBullet(this.game, this.x, this.y, 'bruiserb', this.player, 300, null);
                playState.enemyWeapon.add(playState.enemyBullet);
                playState.bruiserShot.play();
                this.shootNow = timeNow + 2000;
            }
            break;
        case 'captain':
            timeNow = this.shootTimer.ms;
            if (this.shootNow < timeNow) {
                playState.enemyBullet = new playState.EnemyBullet(this.game, this.x, this.y, 'captainb', this.player, 600, null);
                playState.enemyWeapon.add(playState.enemyBullet);
                playState.enemyBullet = new playState.EnemyBullet(this.game, this.x, this.y, 'captainb', this.player, 600, 15);
                playState.enemyWeapon.add(playState.enemyBullet);
                playState.enemyBullet = new playState.EnemyBullet(this.game, this.x, this.y, 'captainb', this.player, 600, -15);
                playState.enemyWeapon.add(playState.enemyBullet);
                playState.captainShot.play();
                this.shootNow = timeNow + 1000;
            }
            break;
        case 'govt':
            timeNow = this.shootTimer.ms;
            if (this.shootNow < timeNow) {
                playState.enemyBullet = new playState.EnemyBullet(this.game, this.x, this.y, 'govtb', this.player, 450, null);
                playState.enemyWeapon.add(playState.enemyBullet);
                playState.diamondShot.play();
                this.shootNow = timeNow + 250;
            }
            break;
    }

};

playState.Enemy.prototype.escapePod = function() {

    var escapePod = new playState.Enemy(this.game, this.x, this.y, 'escape', playState.ESCAPE_POD_SPEED, playState.ESCAPE_POD_HEALTH);
    playState.enemies.add(escapePod);

};

playState.Enemy.prototype.dropLoot = function() {

    var enemyDrop = Math.floor(Math.random() * 4),
        posVar = Math.ceil(Math.random() * 20),
        dropAmt = Math.floor(Math.random() * 5),
        basicDrop = ['Li', 'Al', 'Ti', 'Cr'][enemyDrop],
        bruiserDrop = ['Fe', 'Co', 'Ni', 'Cu'][enemyDrop],
        govtDrop = ['Zn', 'Pd', 'Ag', 'Sn'][enemyDrop],
        captainDrop = ['Nd', 'W', 'Pt', 'Au'][enemyDrop],
        escapeDrop = ['Au', 'Hg'][Math.floor(Math.random() * 2)],
        drop, i;

    if (this.key == 'basic') {
        drop = basicDrop;
    } else if (this.key == 'bruiser') {
        drop = bruiserDrop;
    } else if (this.key == 'govt') {
        drop = govtDrop;
    } else if (this.key == 'captain') {
        drop = captainDrop;
    } else if (this.key == 'escape') {
        drop = escapeDrop;
    }

    for (i = 0; i < dropAmt; i++) {
        playState.metal = new playState.Metal(this.game, this.x + (i * posVar), this.y + (i * posVar), drop);
        playState.metals.add(playState.metal);
    }

};
