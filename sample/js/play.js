/** Copyright Ivy Tower, LLC **/
/** MOVE VARIABLES TO LOCAL SCOPE; CONDENSE REUSED PATHS **/

// --- PlayState

var playState = {

    healthBar: "",
    Weapon: {},
    weapons: [],
    droneWeapons: [],
    currentWeapon: 0,
    droneWeapon: 0,
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
    SHIP_CRESC_DAM: 10, // sunStone weapon w/o burn
    SHIP_ELECT_DAM: 20, // Topaz weapon
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

// Dust variables
    dustCollected: 0,

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
        var a,b,c,d,e, govt, captain, bruiser, basic, ast, astKey;

        // Set world bounds
        this.game.world.setBounds(0, 0, 5000, 5000);

        // Simple starry background for now
        this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'bg');

        // Start music
        var jupiter = this.game.add.audio('jupiter');
        var eris = this.game.add.audio('eris');
        var moon = this.game.add.audio('earthMoon');
        var mars = this.game.add.audio('mars');
        var pluto = this.game.add.audio('pluto');
        var musics = [jupiter, eris, moon, mars, pluto];
        this.music = musics[Math.floor(Math.random()*5)];
        this.music.loop = true;
        this.music.play();

        // General Sound Effects
        this.metalSound = game.add.audio('metal');
        this.metalSound.volume = 10;
        this.deathSound = game.add.audio('death');
        this.deathSound.volume = 5;
        this.crystalSound = game.add.audio('crystalSound');
        this.crystalSound.volume = 5;

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
        this.engineIdle.allowMultiple = false;

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
        this.dusts = this.game.add.group();
        this.anomalies = this.game.add.group();
        this.players = this.game.add.group();

        // --- PLAYER SHIP

        // Adds player ship to the game
        this.player = new this.Player(this.game, this.game.world.randomX, this.game.world.randomY, 'ship', this.nickname);
        this.players.add(this.player);

        /**this.ship.angle = -90; // Points the ship up
        this.game.physics.enable(this.ship, Phaser.Physics.ARCADE);
        this.ship.health = this.MAX_HEALTH;**/

        this.deadMenu = game.add.sprite(this.player.x, this.player.y, 'continue');
        this.deadMenu.anchor.setTo(.5);
        this.yes = game.add.button(this.deadMenu.width*.1, this.deadMenu.height*.4, 'greenButton', this.continue, this);
        this.no = game.add.button(this.deadMenu.width*.3, this.deadMenu.height*.4, 'redButton', this.quit, this);
        this.yes.anchor.setTo(.5);
        this.no.anchor.setTo(.5);
        this.deadMenu.addChild(this.yes);
        this.deadMenu.addChild(this.no);

        this.deadMenu.kill();
        /** Creates ship healthBar
        this.healthBar = this.game.add.sprite(this.ship.centerX, this.ship.y + 10, 'health');
        this.playerName = this.game.add.text(this.ship.centerX, this.ship.y - 5, this.nickname, {font: '12px Josefin Slab', fill: '#FFFFFF'});

        // Creates ship shield
        this.shield = this.game.add.sprite(this.ship.centerX, this.ship.y - 10, 'shield');
        this.shield.scale.y = 0.5;
        this.shield.scale.x = 0.0;**/

        // Creates joystick for ship controls
        //this.joyStick = this.game.add.sprite(this.game.world.height*.9, this.game.world.width*.1, 'joyStick');
        //his.joyHead = this.game.add.sprite(this.game.world.height*.9, this.game.world.width*.1, 'joyHead');
        //this.joyStick.anchor.setTo(.5,.5);
        //this.joyHead.anchor.setTo(.5,.5);
        //this.game.input.pointer1 = game.input.addPointer();

        //this.joyControls = new Phaser.Pointer(this.game, this.game.input.pointer1 , Phaser.PointerMode.CONTACT);


        // Camera follows ship
        this.game.camera.follow(this.player);

        // --- PLAYER BULLETS

        this.weapons.push(new this.Weapon.Diamond(this.game));
        this.diamondTier = 3;
        this.tier = this.diamondTier;

        this.droneWeapons.push(new this.Weapon.DroneWeapon(this.game));



        // Create player

        // --- ASTEROID SPAWNS


        for (a = 0; a < 5; a++) {
            astKey = ['bigBlueAst', 'bigRedAst', 'bigGreyAst', 'bigWhiteAst', 'bigBrownAst'][Math.floor(Math.random() * 5)];
            ast = new playState.Asteroid(this.game, this.game.world.randomX, this.game.world.randomY, astKey, this.BIG_AST_SCALE, this.BIG_AST_HEALTH, this.BIG_AST_SPEED);
            ast.body.bounce.set(0.8);
            this.asteroids.add(ast);
        }

        // --- ENEMY SPAWNS

        this.enemiesAlive = 0;

        // Add basic enemies
        this.enemies = this.game.add.group();
        this.enemies.enableBody = true;

        for (b = 0; b < 10; b++) {
            basic = new this.Enemy(this.game, this.game.world.randomX, this.game.world.randomY, 'basic', this.BASIC_SPEED, this.BASIC_HEALTH, this.player);
            this.enemies.add(basic);
            this.enemiesAlive++;
        }

        // Add bruiser class enemies
        for (c = 0; c < 5; c++) {
            bruiser = new this.Enemy(this.game, this.game.world.randomX, this.game.world.randomY, 'bruiser', this.BRUISER_SPEED, this.BRUISER_HEALTH, this.player);
            this.enemies.add(bruiser);
            this.enemiesAlive++;
        }

        // Add captain class enemies
        /**for (d = 0; d < 1; d++) {
            captain = new this.Enemy(this.game, this.game.world.randomX, this.game.world.randomY, 'captain', this.CAPTAIN_SPEED, this.CAPTAIN_HEALTH, this.player);
            this.enemies.add(captain);
            this.enemiesAlive++;
        }**/

        // Add government enemies
        for (e = 0; e < 10; e++) {
            govt = new this.Enemy(this.game, this.game.world.randomX, this.game.world.randomY, 'govt', this.GOVT_SPEED, this.GOVT_HEALTH, this.player);
            this.enemies.add(govt);
            this.enemiesAlive++;
        }

        this.enemyWeapon = this.add.group();
        this.enemyWeapon.enableBody = true;

        // --- SCORE
        game.global.score = 0;

        this.scoreText = game.add.text(32, 32, 'SCORE: '
            + game.global.score
            + '   DUST: ' + this.dustCollected
            + '   WEAPON: ' + this.weapons[this.currentWeapon].name
            + '   TIER: ' + this.tier
            + '   HEALTH: ' + this.player.health, {
            fontSize: '32px',
            fill: "#FFF",
            font: 'Josefin Slab'
        });

        this.scoreText.fixedToCamera = true;

        // Spawn an anomaly after 15 seconds
        this.game.time.events.add(15000, function(){
            this.anomaly = new this.Anomaly(this.game, this.game.world.width/2, this.game.world.height/2, 'droneAnom');//this.anomalyKey[Math.floor(Math.random() * 6)]);
            console.log('New anomaly at ' + this.anomaly.x + ", " + this.anomaly.y);
            this.anomalies.add(this.anomaly);
            this.anomaly.spawn();
        }, this);

        // Spawn a comet after 15 seconds
        this.game.time.events.add(15000, this.newComet, this);

        if (!game.device.desktop){

            // Set the type of scaling to show all
            game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;

            // Set min/max height/width of the game
            game.scale.setMinMax(game.width/2, game.height/2, game.width*2, game.height*2);

            // Center the game on the screen
            game.scale.pageAlignHorizontally = true;
            game.scale.pageAlignVertically = true;

            this.rotateLabel = game.add.text(game.widows/2, game.height/2, '',
                {font: '30px Josefin Slab', fill: '#fff', backgroundColor: '#000'});
            this.rotateLabel.anchor.setTo(.5,.5);

            game.scale.onOrientationChange.add(this.orientationChange, this);


            this.orientationChange();
        }

        // Go full screen on mobile devices
        if (!game.device.desktop){
            this.moveJoystick = this.game.add.sprite(100, 150, 'blueButton');
            this.shootButton = this.game.add.button(500, 150, 'redButton', this.mobileShoot, this);
            this.changeWeapButton = this.game.add.button(500, 200, 'greenButton', this.changeWeapon, this);
            this.moveJoystickfixedToCamera = true;
            this.shootButtonfixedToCamera = true;
            this.changeWeapButtonfixedToCamera = true;

        }

    },

    update: function() {

        /** DEBUG FPS **/
        game.debug.text(game.time.fps || '--', 2, 14, "#00ff00");

        var changeKey, boost;
        switch(this.weapons[this.currentWeapon].name){

            case "DIAMOND":
                this.tier = this.diamondTier;
                break;

            case "RUBY":
                this.tier = this.rubyTier;
                break;

            case "SUNSTONE":
                this.tier = this.sunstoneTier;
                break;

            case "TOPAZ":
                this.tier = this.topazTier;
                break;

            case "EMERALD":
                this.tier = this.emeraldTier;
                break;

            case "AMETHYST":
                this.tier = this.amethystTier;
                break;

            case "OBSIDIAN":
                this.tier = this.obsidianTier;
                break;

            case "SAPPHIRE":
                this.tier = this.sapphireTier;
                break;

        }

        /** Update health bar
        this.updateBar(this.healthBar, this.ship);
        this.updateBar(this.shield, this.ship);

        // Update player name label
        this.updateName(this.playerName, this.ship);

        // --- PLAYER MOVEMENT
        if (!game.device.desktop){

        } else {

            this.ship.rotation = this.game.physics.arcade.angleToPointer(this.ship);

            if (this.game.physics.arcade.distanceToPointer(this.ship) > 100) {

                this.game.physics.arcade.moveToPointer(this.ship, this.SHIP_SPEED);
                this.engineIdle.pause();

            } else {

                this.ship.body.drag.x = 700;
                this.ship.body.drag.y = 700;

                if(!this.engineIdle.isPlaying){
                    this.engineIdle.play();
                }
            }
        }**/



        // --- FIRE WEAPON

        // Fires with mouse click
        /**if (this.game.input.activePointer.isDown && this.ship.alive) {
            if (this.game.physics.arcade.distanceToPointer(this.ship) > 50) {
                this.game.physics.arcade.moveToPointer(this.ship, 125);
            }
            this.weapons[this.currentWeapon].shoot(this.ship);

            switch(this.weapons[this.currentWeapon].name){

                case "DIAMOND":

                    break;

                case "RUBY":
                    break;

                case "SUNSTONE":
                    break;

                case "TOPAZ":
                    break;

                case "EMERALD":
                    break;

                case "AMETHYST":
                    if(!this.amethystShot.isPlaying){

                        this.amethystShot.play();
                    }
                    break;

                case "OBSIDIAN":
                    break;

                case "SAPPHIRE":
                    break;

            }
        } else {
            this.amethystShot.pause();
        } **/


        changeKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        changeKey.onDown.add(this.changeWeapon, this);

        // --- PLAYER BOOST

        boost = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        if (boost.isDown && this.dustCollected > 0) {

            if(!this.bloost.isPlaying){
                this.bloost.play();
            }

            this.dustBurnt += 1;
            this.dustCollected -= 1;

            if (this.dustBurnt >= 6) {

                this.metal = new this.Metal(this.game, this.player.previousPosition.x, this.player.previousPosition.y, 'C');
                this.metals.add(this.metal);
                this.dustBurnt = 0;

            }

            this.player.shield.scale.x -= .0025;

            if (this.dustCollected == 0) {

                this.player.shield.scale.x = 0;

            }

            this.SHIP_SPEED = 900;

        } else {

            this.bloost.pause();

            if (this.dustCollected > 205){

                this.SHIP_SPEED = 600;

            } else {

                this.SHIP_SPEED = 600 - (this.dustCollected / 2);

            }
        }

        if(this.dustCollected > 205){

            this.scoreText.setText('SCORE: ' + game.global.score
                + '   DUST: INFINITE'
                + '   WEAPON: ' + this.weapons[this.currentWeapon].name
                + '   TIER: ' + this.tier
                + '   HEALTH: ' + this.player.health);

        } else {

            this.scoreText.setText('SCORE: ' + game.global.score
                + '   DUST: ' + this.dustCollected
                + '   WEAPON: ' + this.weapons[this.currentWeapon].name
                + '   TIER: ' + this.tier
                + '   HEALTH: ' + this.player.health);

        }
        // --- OBJECT COLLISION

        this.enemies.forEachAlive(this.bulletCollision, this, this.weapons);
        this.asteroids.forEachAlive(this.bulletCollision, this, this.weapons);
        this.comets.forEachAlive(this.bulletCollision, this, this.weapons);

        this.physics.arcade.overlap(this.enemyWeapon, this.player, this.callDamage, null, this); // Comment this out to ignore enemy damage; useful for development

        if(this.drone.alive){
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

        this.game.physics.arcade.collide( this.asteroids,  this.asteroids );
        this.game.physics.arcade.collide(this.asteroids, this.enemies);

        this.game.physics.arcade.collide(this.player, this.asteroids, function(){

            var damage;

            if(playState.dustCollected < 1){

                damage = 20;
                playState.player.healthBar.scale.x -= damage/this.MAX_HEALTH;
                playState.player.health -= damage;

                playState.scoreText.setText(
                    'SCORE: ' + game.global.score
                    + '   DUST: ' + playState.dustCollected
                    + '   WEAPON: ' + playState.weapons[playState.currentWeapon].name
                    + '   TIER: ' + playState.tier
                    + '   HEALTH: ' + playState.player.health);

            }
        });

        if(this.player.health <= 0){

            this.playerDie();
            this.deadMenu.revive();
            this.deadMenu.x = this.player.x;
            this.deadMenu.y = this.player.y;

        }
    },

    mobileShoot: function () {
        this.weapons[this.currentWeapon].shoot(this.player)
    },

    playerDie: function(){

        if(this.drone.alive){
            this.drone.kill();
        }

    },

    continue: function(){
        console.log("CONTINUE");
        this.deadMenu.kill();
        this.player.revive();
        this.player.health = 200;
        this.player.healthBar.revive();
        this.player.shield.revive();
        this.player.healthBar.scale.x = 1;
        this.player.x = this.game.world.randomX;
        this.player.y = this.game.world.randomY;
        this.dustCollected = 0;

        for(var i = 0; i < this.weapons.length; i++){

            switch(this.weapons[i].name){

                case "DIAMOND":
                    this.diamondTier = 1;
                    break;

                case "RUBY":
                    this.rubyTier = 1;
                    break;

                case "SUNSTONE":
                    this.sunstoneTier = 1;
                    break;

                case "TOPAZ":
                    this.topazTier = 1;
                    break;

                case "EMERALD":
                    this.emeraldTier = 1;
                    break;

                case "AMETHYST":
                    this.amethystTier = 1;
                    break;

                case "OBSIDIAN":
                    this.obsidianTier = 1;
                    break;

                case "SAPPHIRE":
                    this.sapphireTier = 1;
                    break;

            }

        }
    },

    quit: function(){
        game.state.start('menu');
        this.soundsOff();
    },

    soundsOff: function(){
        this.amethystShot.pause();
        this.music.pause();
        this.diamondShot.pause();
        this.engineIdle.pause();
        this.topazShot.pause();
    },

    scoutMetals: function (drone, ship, metalsprite) {

        if (this.game.physics.arcade.distanceBetween(drone, metalsprite) < 200 && drone.alive && metalsprite.alive) {

            game.physics.arcade.moveToObject(drone, metalsprite, 275);

        }else{
            if (this.game.physics.arcade.distanceBetween(drone, ship) > 100)
            //game.physics.arcade.moveToObject(drone, ship, 250);
                game.physics.arcade.moveToObject(drone, ship, 900);
        }
    },

    orientationChange: function(){

        // If the game is in portrait (which is horribly wrong) pause and display an error.
        // This should be removed before launch as a user's game can't pause in a multiplayer match
        if (game.scale.isPortrait){
            game.paused = true;

        } else {

            // Resume the game
            game.paused = false;
            this.rotateLabel.text = "";

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

        this.scoreText.setText( 'SCORE: ' + game.global.score + '   DUST: ' + this.dustCollected + '   WEAPON: ' + this.weapons[this.currentWeapon].name + '   TIER: ' + this.tier+ '   HEALTH: ' + this.player.health);

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
                bullet.kill();
                break;
            case 'rubyb':
                damage = this.SHIP_ROCKT_DAM;
                bullet.kill();
                break;
            case 'sunstoneb':
                damage = this.SHIP_CRESC_DAM;
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
                bullet.kill();
                break;
            case 'emeraldb':
                damage = this.SHIP_LEECH_DAM;
                if(this.player.health < 200){
                    this.leechHealth;
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
                if (!sprite.frozen && sprite.iceStack < 3) {
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
                bullet.kill();
                break;
            case 'basicb':
                damage = this.ENEM_BASIC_DAM;
                bullet.kill();
                break;
            case 'bruiserb':
                damage = this.ENEM_BRUIS_DAM;
                bullet.kill();
                break;
            case 'captainb':
                damage = this.ENEM_CAPTN_DAM;
                bullet.kill();
                break;
            case 'govtb':
                damage = this.ENEM_GOVMT_DAM;
                bullet.kill();
                break;
        }

        if (weapon == 'lessburn') {
            damage = 3;
        } else if (weapon == 'moreburn') {
            damage = 5;
        }

        if (sprite.health <= 0 && sprite.alive) {


            if(sprite.key == "ship"){
                this.deathSound.play();
            }
            sprite.kill();

            if(sprite.key == "drone"){
                console.log("Drone is dead");
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
            if (sprite.key == 'ship' && this.dustCollected > 0) {
                this.player.shield.scale.x -= damage * .0025;
                this.dustCollected -= damage;
                if (this.dustCollected < 0) {
                    this.dustCollected = 0;
                    this.player.shield.scale.x = 0;
                }
                // Player takes damage w/o shield
            } else if (sprite.key == 'ship' && this.dustCollected <= 0) {
                this.player.healthBar.scale.x -= damage/this.MAX_HEALTH;
                sprite.health -= damage;
                this.dustCollected = 0;
                // Non-player damage
            } else if (sprite.key == 'basic') {
                sprite.healthBar.scale.x -= damage/this.BASIC_HEALTH;
                sprite.health -= damage;
            } else if (sprite.key == 'bruiser') {
                sprite.healthBar.scale.x -= damage/this.BRUISER_HEALTH;
                sprite.health -= damage;
            } else if (sprite.key == 'captain') {
                sprite.healthBar.scale.x -= damage/this.CAPTAIN_HEALTH;
                sprite.health -= damage;
            } else if (sprite.key == 'escape') {
                sprite.healthBar.scale.x -= damage/this.ESCAPE_POD_HEALTH;
                sprite.health -= damage;
            } else if (sprite.key == 'govt') {
                sprite.healthBar.scale.x -= damage/this.GOVT_HEALTH;
                sprite.health -= damage;
                // Asteroids and comets
            } else {
                sprite.health -= damage;
            }
        }

        this.scoreText.setText( 'SCORE: ' + game.global.score
            + '   DUST: ' + this.dustCollected
            + '   WEAPON: ' + this.weapons[this.currentWeapon].name
            + '   TIER: ' + this.tier
            + '   HEALTH: ' + this.player.health);

    },

    leechHealth: function(){
        this.player.health += 10;
        this.healthbar.scale.x += .1;
    },

    updateBar: function (spritebar, sprite) {

        // Updates healthBar of sprites
        if (sprite.health <= 0 ) {
            spritebar.kill();
        }

        spritebar.centerX = sprite.centerX;
        spritebar.centerY = sprite.centerY + 30;

    },

    updateName: function (namelabel, sprite) {

        // Updates healthBar of sprites
        if (sprite.health <= 0 ) {
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
                sprite.speed = 150;
                break;
            case 'bruiser':
                sprite.speed = 100;
                break;
            case 'captain':
                sprite.speed = 230;
                break;
            case 'escape':
                sprite.speed = 400;
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

            if(this.transmuteFlag){

                console.log("STILL TRANSMUTING");
                switch(material.key){

                    case 'Li':
                        console.log("Changed to Aluminum");
                        material.key = "Al";
                        material.type = "Al";
                        material.value = 13;

                        break;

                    case 'Al':
                        console.log("Changed to Titanium");
                        material.key = "Ti";
                        material.type = "Ti";
                        material.value = 22;

                        break;
                    case 'Ti':
                        console.log("Changed to Chromium");
                        material.key = "Cr";
                        material.type = "Cr";
                        material.value = 24;

                        break;
                    case 'Cr':
                        console.log("Changed to Iron");
                        material.key = "Fe";
                        material.type = "Fe";
                        material.value = 26;

                        break;
                    case 'Fe':
                        console.log("Changed to Cobalt");
                        material.key = "Co";
                        material.type = "Co";
                        material.value = 27;

                        break;
                    case 'Co':
                        console.log("Changed to Nickel");
                        material.key = "Ni";
                        material.type = "Ni";
                        material.value = 28;

                        break;
                    case 'Ni':
                        console.log("Changed to Copper");
                        material.key = "Cu";
                        material.type = "Cu";
                        material.value = 29;
                        break;

                    case 'Cu':
                        console.log("Changed to Zinc");
                        material.key = "Zn";
                        material.type = "Zn";
                        material.value = 30;

                        break;
                    case 'Zn':
                        console.log("Changed to Palladium");
                        material.key = "Pd";
                        material.type = "Pd";
                        material.value = 46;

                        break;
                    case 'Pd':
                        console.log("Changed to Silver");
                        material.key = "Ag";
                        material.type = "Ag";
                        material.value = 47;

                        break;
                    case 'Ag':
                        console.log("Changed to Tin");
                        material.key = "Sn";
                        material.type = "Sn";
                        material.value = 50;

                        break;
                    case 'Sn':
                        console.log("Changed to Neodymium");
                        material.key = "Nd";
                        material.type = "Nd";
                        material.value = 60;

                        break;
                    case 'Nd':
                        console.log("Changed to Tungsten");
                        material.key = "W";
                        material.type = "W";
                        material.value = 74;

                        break;
                    case 'W':
                        console.log("Changed to Platinum");
                        material.key = "Pt";
                        material.type = "Pt";
                        material.value = 78;

                        break;
                    case 'Pt':
                        console.log("Changed to Gold");
                        material.key = "Au";
                        material.type = "Au";
                        material.value = 79;

                        break;
                    case 'Au':
                        console.log("Changed to Mercury");
                        material.key = "Hg";
                        material.type = "Hg";
                        material.value = 80;

                        break;
                    case 'Hg':
                        material.value = 160;
                        break;
                }
                this.collectedMetals.push(material);
                console.log(material.key + material.type + material.value);

            } else{
                this.collectedMetals.push(material);
                game.global.metalMoney += material.value;
            }


            this.physics.arcade.overlap(ship, this.metals.children.indexOf(material), this.metalSound.play(), null, this);
        }

        // Crystal pickup
        if (material.key == 'opal') {
            this.crystalSound.play();
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
                this.weapons.push(new this.Weapon.sunStone(this.game));
                this.sunstoneTier += 1;
            } else if (this.sunstoneTier < 3) {
                this.sunstoneTier += 1;
            }
            game.global.crystalsCollected[randomUpgrade]++;
            this.crystalSound.play();
        } else if (material.key == 'topaz' || randomUpgrade == 4) {
            if (this.topazTier == 0) {
                // this.weapons.push(new this.Weapon.Topaz(this.game));
                this.topazTier += 1;
            } else if (this.topazTier < 3) {
                this.topazTier += 1;
            }
            game.global.crystalsCollected[randomUpgrade]++;
            this.crystalSound.play();
        } else if (material.key == 'emerald' || randomUpgrade == 5) {
            if (this.emeraldTier == 0) {
                // this.weapons.push(new this.Weapon.Emerald(this.game));
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
        if (this.dustCollected < 200) {
            if (material.key == 'smlDust') {
                this.dustCollected += 1;
                this.player.shield.scale.x += .0025;
                game.global.totalDustAccumulated++;
            } else if (material.key == 'medDust') {
                this.dustCollected += 3;
                this.player.shield.scale.x += .0075;
                game.global.totalDustAccumulated += 3;
            } else if (material.key == 'bigDust') {
                this.dustCollected += 6;
                this.player.shield.scale.x += .015;
                game.global.totalDustAccumulated += 6;
            }
        }
        if (this.dustCollected > 200) {
            this.dustCollected = 200;
        }

        // Anomaly pickup
        switch (material.key) {

            case 'infinity':
                this.powerup.play();
                var savedDust = this.dustCollected;
                this.dustCollected = 9999;
                game.time.events.add(10000, function(){
                    this.dustCollected = savedDust;
                }, this);
                break;

            case 'magnet':
                this.powerup.play();
                this.game.time.events.repeat(1000, 15, this.magnetEffect, this);
                break;

            case 'transmute':
                this.powerup.play();
                this.transmuteFlag = true;
                this.game.time.events.add(15000, function(){
                    console.log("Finished Transmuting");
                    this.transmuteFlag = false;
                }, this);
                break;

            case 'droneAnom':
                this.powerup.play();
                this.makeDrone(this.player);
                break;

            case 'invisible':
                this.powerup.play();
                this.enemies.forEachAlive(this.invis,this,this.player);
                break;

            case 'warp':
                this.powerup.play();
                this.player.x = this.game.world.randomX;
                this.player.y = this.game.world.randomY;

                if(this.drone.alive){
                    this.drone.x = this.player.x;
                    this.drone.y = this.player.y;
                }

                break;
        }

        this.scoreText.setText( 'SCORE: ' + game.global.score + '   DUST: ' + this.dustCollected + '   WEAPON: ' + this.weapons[this.currentWeapon].name + '   TIER: ' + this.tier+ '   HEALTH: ' + this.player.health);

        material.kill();
    },

    // --- PLAYER

// Player template with physics and standard variables
    Player: function(game, x, y, type, name) {

        this.game = game;
        this.health = playState.MAX_HEALTH;
        this.frozen = false;
        this.iceStack = 0;
        this.stopped = false;
        this.burn = false;
        this.shootNow = 0;

        this.angle = -90; // Points the ship up
        this.game.physics.enable(this, Phaser.Physics.ARCADE);

        Phaser.Sprite.call(this, game, x, y, type);

        this.game.physics.arcade.enable(this);
        this.anchor.setTo(0.5);
        this.body.collideWorldBounds = true;

        // Creates ship healthBar
        this.healthBar = playState.game.add.sprite(this.centerX, this.y + 10, 'health');
        this.playerName = this.game.add.text(this.centerX, this.y - 5, name, {font: '12px Josefin Slab', fill: '#FFFFFF'});

        // Creates ship shield
        this.shield = this.game.add.sprite(this.centerX, this.y - 10, 'shield');
        this.shield.scale.y = 0.5;
        this.shield.scale.x = 0.0;

        /** Create a timer
        this.moveTimer = this.game.time.create(false);
        this.moveTimer.start();

        this.shootTimer = this.game.time.create(false);
        this.shootTimer.start();

        this.healthBar = game.make.sprite(-10, -20, 'health');
        this.healthBar.anchor.setTo(0.5);
        this.addChild(this.healthBar); **/



    },

    magnetEffect: function(){

        this.metals.forEachAlive(this.magnet,this,this.player,200);

    },

    makeDrone: function(ship) {

        this.drone = new this.Drone(this.game, ship.centerX+10, ship.y, 'drone', 400, 50, ship);
        this.drones = this.game.add.group();
        this.drones.add(this.drone);

    },

    invis: function(sprite,player){

        // so that enemies cannot see or aggro to the player
        sprite.aggroRange=0;
        // actually make ship invisible if not already

        player.alpha=0.2;

        //turn off effect after 10 seconds
        game.time.events.add(10000, this.negInvis, this,sprite,player);

    },

    negInvis: function(sprite,player){

        //turn off invisiblity setting aggro range of all enemies back to 400 and making ship visible again
        sprite.aggroRange = 400;

        //ship is not already visible
        player.alpha = 1;

    },

    magnet: function(sprite, ship, distance){

        if(Math.abs(sprite.x-ship.x)<=distance && Math.abs(sprite.y-ship.y)<=distance){

            this.game.physics.arcade.moveToObject(sprite,ship,50);

            sprite.rotation = Math.atan2(ship.y - sprite.y, ship.x - sprite.x);

        }

    },

    // --- ASTEROIDS

    // Asteroid template with physics and standard variables
    Asteroid: function(game, x, y, type, scale, health, speed) {

        var randDirect = Math.random() < 0.5 ? 1 : -1;
        this.game = game;
        this.health = health;
        this.speed = speed;

        Phaser.Sprite.call(this, game, x, y, type);

        this.game.physics.arcade.enable(this);
        this.anchor.setTo(0.5);
        this.body.collideWorldBounds = true;
        this.scale.setTo(scale);
        this.body.velocity.setTo(this.speed * randDirect, this.speed * randDirect);

    },

    newAsteroids: function(){
        var o, astKey, ast;
        for (o = 0; o < 1; o++) {
            astKey = ['bigBlueAst', 'bigRedAst', 'bigGreyAst', 'bigWhiteAst', 'bigBrownAst'][Math.floor(Math.random() * 5)];
            ast = new playState.Asteroid(this.game, this.game.world.randomX, this.game.world.randomY, astKey, this.BIG_AST_SCALE, this.BIG_AST_HEALTH, this.BIG_AST_SPEED);
            ast.body.bounce.set(0.8);
            this.asteroids.add(ast);
        }
    },

    // --- DUST

// Dust template with physics and standard variables
    Dust: function (game, x, y, type) {

        this.game = game;
        var randoDirect = Math.random() < 0.5 ? 1 : -1;

        Phaser.Sprite.call(this, game, x, y, type);

        this.game.physics.arcade.enable(this);
        this.anchor.setTo(0.5);
        this.body.collideWorldBounds = true;
        this.body.velocity.setTo(5 * randoDirect, 5 * randoDirect);

    },

    // --- METALS

// Metal template with physics and standard variables
    Metal: function(game, x, y, type) {

        this.game = game;
        var plusOrMinus = Math.random() < 0.5 ? -1 : 1;

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

    },

    // --- CRYSTALS

// Crystal template with physics and standard variables
    Crystal: function(game, x, y, type) {

        this.game = game;
        var minusOrPlus = Math.random() < 0.5 ? 1 : -1;

        Phaser.Sprite.call(this, game, x, y, type);

        this.game.physics.arcade.enable(this);
        this.anchor.setTo(0.5);
        this.body.collideWorldBounds = true;
        this.body.velocity.setTo(5 * minusOrPlus, 5 * minusOrPlus);
        this.body.bounce.set(0.5);

    },

    DroneBullet: function(game, type) {

        this.game = game;

        Phaser.Sprite.call(this, game, 0, 0, type);

        this.anchor.setTo(0.5);
        this.checkWorldBounds = true;
        this.outOfBoundsKill = true;
        this.exists = false;

        this.lifespan = 500;

    },


    // --- CRYSTAL WEAPONS

// Basic constructor
    PlayerBullet: function(game, type) {

        this.game = game;

        Phaser.Sprite.call(this, game, 0, 0, type);

        this.anchor.setTo(0.5);
        this.checkWorldBounds = true;
        this.outOfBoundsKill = true;
        this.exists = false;

    },

    // --- ANOMALIES

// Anomaly template with physics and standard variables
    Anomaly: function(game, x, y, type) {

        this.game = game;
        var plusOrMinus = Math.random() < 0.5 ? -1 : 1;

        this.lifespan = 10000;

        Phaser.Sprite.call(this, game, x, y, type);

        this.game.physics.arcade.enable(this);
        this.anchor.setTo(0.5);
        this.body.collideWorldBounds = true;
        this.body.velocity.setTo(5 * plusOrMinus, 5 * plusOrMinus);
        this.body.bounce.set(0.5);

    },

    // --- COMETS

    Comet: function(game, x, y, type, health) {

        this.game = game;
        this.health = health;

        Phaser.Sprite.call(this, game, x, y, type);

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
    Enemy: function(game, x, y, type, speed, health, player) {

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

        Phaser.Sprite.call(this, game, x, y, type);

        this.game.physics.arcade.enable(this);
        this.anchor.setTo(0.5);
        this.body.collideWorldBounds = true;
        this.body.drag.setTo(500, 500);
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

        this.healthBar = game.make.sprite(-10, -20, 'health');
        this.healthBar.anchor.setTo(0.5);
        this.addChild(this.healthBar);

    },

    EnemyBullet: function(game, x, y, type, player, speed, posVar) {

        this.game = game;

        Phaser.Sprite.call(this, game, x, y, type);

        this.game.physics.arcade.enable(this);
        this.anchor.setTo(0.5);
        this.checkWorldBounds = true;
        this.outOfBoundsKill = true;
        this.game.physics.arcade.moveToXY(this, player.x + posVar, player.y + posVar, speed);
        this.lifespan = 750;

    },

    Drone: function(game, x, y, type, speed, health, player) {

        this.game = game;
        this.speed = speed;
        this.health = health;
        this.player = player;
        this.burn = false;
        this.aggroRange = 400;
        this.minDist = 100;
        this.shootNow = 0;

        Phaser.Sprite.call(this, game, x, y, type);

        this.game.physics.arcade.enable(this);
        this.anchor.setTo(0.5);
        this.body.collideWorldBounds = true;
        this.body.drag.setTo(500, 500);
        this.scale.setTo(0.5);

    }

};

playState.Player.prototype = Object.create(Phaser.Sprite.prototype);
playState.Player.prototype.constructor = playState.Player;

playState.Player.prototype.update = function() {

    if (playState.game.input.activePointer.isDown && this.alive) {
        if (playState.game.physics.arcade.distanceToPointer(this) > 50) {
            playState.game.physics.arcade.moveToPointer(this, 125);
        }
        playState.weapons[playState.currentWeapon].shoot(this);

        switch(playState.weapons[playState.currentWeapon].name){

            case "DIAMOND":

                break;

            case "RUBY":
                break;

            case "SUNSTONE":
                break;

            case "TOPAZ":
                break;

            case "EMERALD":
                break;

            case "AMETHYST":
                if(!playState.amethystShot.isPlaying){

                    playState.amethystShot.play();
                }
                break;

            case "OBSIDIAN":
                break;

            case "SAPPHIRE":
                break;

        }
    } else {
        playState.amethystShot.pause();
    }

    playState.updateBar(this.healthBar, this);
    playState.updateBar(this.shield, this);

    // Update player name label
    playState.updateName(this.playerName, this);

    // --- PLAYER MOVEMENT
    if (!game.device.desktop){

    } else {

        this.rotation = playState.game.physics.arcade.angleToPointer(this);

        if (playState.game.physics.arcade.distanceToPointer(this) > 100) {

            playState.game.physics.arcade.moveToPointer(this, playState.SHIP_SPEED);
            playState.engineIdle.pause();

        } else {

            this.body.drag.x = 1000;
            this.body.drag.y = 1000;

            if(!playState.engineIdle.isPlaying){
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

playState.Asteroid.prototype = Object.create(Phaser.Sprite.prototype);
playState.Asteroid.prototype.constructor = playState.Asteroid;

playState.Asteroid.prototype.spawnDrop = function() {

    var posVar = Math.ceil(Math.random() * 20),
        metalDropRate = Math.ceil(Math.random() * 100),
        metalDropAmt = Math.floor(Math.random() * 5),
        crystalDropRate = Math.ceil(Math.random() * 100),
        a, b, c, d, e, f, g, h, i, k, l, m, n, o, p, q, r, z, zy, zyx, crystalKey;

    if (this.health < 1) {

        // Metal drops
        if (metalDropRate < 5) {

            for (h = 0; h < metalDropAmt; h++) {
                playState.metal = new playState.Metal(playState.game, this.x + (h * posVar), this.y + (h * posVar), 'Hg');
                playState.metals.add(playState.metal);
            }

        } else if (metalDropRate < 10) {

            for (k = 0; k < metalDropAmt; k++) {
                playState.metal = new playState.Metal(playState.game, this.x + (k * posVar), this.y + (k * posVar), 'Au');
                playState.metals.add(playState.metal);
            }

        } else if (metalDropRate < 15) {

            for (l = 0; l < metalDropAmt; l++) {
                playState.metal = new playState.Metal(playState.game, this.x + (l * posVar), this.y + (l * posVar), 'Pt');
                playState.metals.add(playState.metal);
            }

        } else if (metalDropRate < 20) {

            for (m = 0; m < metalDropAmt; m++) {
                playState.metal = new playState.Metal(playState.game, this.x + (m * posVar), this.y + (m * posVar), 'W');
                playState.metals.add(playState.metal);
            }

        } else if (metalDropRate < 25) {

            for (n = 0; n < metalDropAmt; n++) {
                playState.metal = new playState.Metal(playState.game, this.x + (n * posVar), this.y + (n * posVar), 'Nd');
                playState.metals.add(playState.metal);
            }

        } else if (metalDropRate < 30) {

            for (o = 0; o < metalDropAmt; o++) {
                playState.metal = new playState.Metal(playState.game, this.x + (o * posVar), this.y + (o * posVar), 'Sn');
                playState.metals.add(playState.metal);
            }

        } else if (metalDropRate < 40) {

            for (p = 0; p < metalDropAmt; p++) {
                playState.metal = new playState.Metal(playState.game, this.x + (p * posVar), this.y + (p * posVar), 'Ag');
                playState.metals.add(playState.metal);
            }

        } else if (metalDropRate < 45) {

            for (i = 0; i < metalDropAmt; i++) {
                playState.metal = new playState.Metal(playState.game, this.x + (i * posVar), this.y + (i * posVar), 'Pd');
                playState.metals.add(playState.metal);
            }

        } else if (metalDropRate < 50) {

            for (q = 0; q < metalDropAmt; q++) {
                playState.metal = new playState.Metal(playState.game, this.x + (q * posVar), this.y + (q * posVar), 'Zn');
                playState.metals.add(playState.metal);
            }

        } else if (metalDropRate < 55) {

            for (r = 0; r < metalDropAmt; r++) {
                playState.metal = new playState.Metal(playState.game, this.x + (r * posVar), this.y + (r * posVar), 'Cu');
                playState.metals.add(playState.metal);
            }

        } else if (metalDropRate < 60) {

            for (a = 0; a < metalDropAmt; a++) {
                playState.metal = new playState.Metal(playState.game, this.x + (a * posVar), this.y + (a * posVar), 'Ni');
                playState.metals.add(playState.metal);
            }

        } else if (metalDropRate < 65) {

            for (b = 0; b < metalDropAmt; b++) {
                playState.metal = new playState.Metal(playState.game, this.x + (b * posVar), this.y + (b * posVar), 'Co');
                playState.metals.add(playState.metal);
            }

        } else if (metalDropRate < 70) {

            for (c = 0; c < metalDropAmt; c++) {
                playState.metal = new playState.Metal(playState.game, this.x + (c * posVar), this.y + (c * posVar), 'Fe');
                playState.metals.add(playState.metal);
            }

        } else if (metalDropRate < 75) {

            for (d = 0; d < metalDropAmt; d++) {
                playState.metal = new playState.Metal(playState.game, this.x + (d * posVar), this.y + (d * posVar), 'Cr');
                playState.metals.add(playState.metal);
            }

        } else if (metalDropRate < 80) {

            for (e = 0; e < metalDropAmt; e++) {
                playState.metal = new playState.Metal(playState.game, this.x + (e * posVar), this.y + (e * posVar), 'Ti');
                playState.metals.add(playState.metal);
            }

        } else if (metalDropRate < 85) {

            for (f = 0; f < metalDropAmt; f++) {
                playState.metal = new playState.Metal(playState.game, this.x + (f * posVar), this.y + (f * posVar), 'Al');
                playState.metals.add(playState.metal);
            }

        } else if (metalDropRate < 90) {

            for (g = 0; g < metalDropAmt; g++) {
                playState.metal = new playState.Metal(playState.game, this.x + (g * posVar), this.y + (g * posVar), 'Li');
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
                playState.newAsteroids();
                for (z = 0; z < 5; z++) {
                    playState.dust = new playState.Dust(this.game, this.x + z + posVar, this.y + z + posVar, 'bigDust');
                    playState.dusts.add(playState.dust);
                }
                break;
            case 'medRedAst':
            case 'medBlueAst':
            case 'medWhiteAst':
            case 'medGreyAst':
            case 'medBrownAst':
                for (zy = 0; zy < 3; zy++) {
                    playState.dust = new playState.Dust(this.game, this.x + posVar, this.y + posVar, 'medDust');
                    playState.dusts.add(playState.dust);
                }
                break;
            case 'smlRedAst':
            case 'smlBlueAst':
            case 'smlWhiteAst':
            case 'smlGreyAst':
            case 'smlBrownAst':
                for (zyx = 0; zyx < 3; zyx++) {
                    playState.dust = new playState.Dust(this.game, this.x + posVar, this.y + posVar, 'smlDust');
                    playState.dusts.add(playState.dust);
                }
                //this.destroy(false, false);
                break;
        }
    }
};

playState.Asteroid.prototype.bust = function() {

    var posVar = Math.ceil(Math.random() * 20),
        a, b, c, d, e, f, g, h, i, j,
        medAst, smlAst;

    if (this.key == 'bigBlueAst') {
        for (a = 0; a < (Math.ceil(Math.random() * 3)); a++) {
            medAst = new playState.Asteroid(playState.game, this.x + ((a + 1) * posVar), this.y + ((a + 1) * posVar), 'medBlueAst', playState.MED_AST_SCALE, playState.MED_AST_HEALTH, playState.MED_AST_SPEED);
            medAst.body.bounce.set(0.5);
            playState.asteroids.add(medAst);
        }
    } else if (this.key == 'medBlueAst') {
        for (b = 0; b < (Math.ceil(Math.random() * 3)); b++) {
            smlAst = new playState.Asteroid(playState.game, this.x + ((b + 1) * posVar), this.y + ((b + 1) * posVar), 'smlBlueAst', playState.SML_AST_SCALE, playState.SML_AST_HEALTH, playState.SML_AST_SPEED);
            smlAst.body.bounce.set(0.5);
            playState.asteroids.add(smlAst);
        }
    } else if (this.key == 'bigGreyAst') {
        for (c = 0; c < (Math.ceil(Math.random() * 3)); c++) {
            medAst = new playState.Asteroid(playState.game, this.x + ((c + 1) * posVar), this.y + ((c + 1) * posVar), 'medGreyAst', playState.MED_AST_SCALE, playState.MED_AST_HEALTH, playState.MED_AST_SPEED);
            medAst.body.bounce.set(0.5);
            playState.asteroids.add(medAst);
        }
    } else if (this.key == 'medGreyAst') {
        for (d = 0; d < (Math.ceil(Math.random() * 3)); d++) {
            smlAst = new playState.Asteroid(playState.game, this.x + ((d + 1) * posVar), this.y + ((d + 1) * posVar), 'smlGreyAst', playState.SML_AST_SCALE, playState.SML_AST_HEALTH, playState.SML_AST_SPEED);
            smlAst.body.bounce.set(0.5);
            playState.asteroids.add(smlAst);
        }
    } else if (this.key == 'bigBrownAst') {
        for (e = 0; e < (Math.ceil(Math.random() * 3)); e++) {
            medAst = new playState.Asteroid(playState.game, this.x + ((e + 1) * posVar), this.y + ((e + 1) * posVar), 'medBrownAst', playState.MED_AST_SCALE, playState.MED_AST_HEALTH, playState.MED_AST_SPEED);
            medAst.body.bounce.set(0.5);
            playState.asteroids.add(medAst);
        }
    } else if (this.key == 'medBrownAst') {
        for (f = 0; f < (Math.ceil(Math.random() * 3)); f++) {
            smlAst = new playState.Asteroid(playState.game, this.x + ((f + 1) * posVar), this.y + ((f + 1) * posVar), 'smlBrownAst', playState.SML_AST_SCALE, playState.SML_AST_HEALTH, playState.SML_AST_SPEED);
            smlAst.body.bounce.set(0.5);
            playState.asteroids.add(smlAst);
        }
    } else if (this.key == 'bigRedAst') {
        for (g = 0; g < (Math.ceil(Math.random() * 3)); g++) {
            medAst = new playState.Asteroid(playState.game, this.x + ((g + 1) * posVar), this.y + ((g + 1) * posVar), 'medRedAst', playState.MED_AST_SCALE, playState.MED_AST_HEALTH, playState.MED_AST_SPEED);
            medAst.body.bounce.set(0.5);
            playState.asteroids.add(medAst);
        }
    } else if (this.key == 'medRedAst') {
        for (h = 0; h < (Math.ceil(Math.random() * 3)); h++) {
            smlAst = new playState.Asteroid(playState.game, this.x + ((h + 1) * posVar), this.y + ((h + 1) * posVar), 'smlRedAst', playState.SML_AST_SCALE, playState.SML_AST_HEALTH, playState.SML_AST_SPEED);
            smlAst.body.bounce.set(0.5);
            playState.asteroids.add(smlAst);
        }
    } else if (this.key == 'bigWhiteAst') {
        for (i = 0; i < (Math.ceil(Math.random() * 3)); i++) {
            medAst = new playState.Asteroid(playState.game, this.x + ((i + 1) * posVar), this.y + ((i + 1) * posVar), 'medWhiteAst', playState.MED_AST_SCALE, playState.MED_AST_HEALTH, playState.MED_AST_SPEED);
            medAst.body.bounce.set(0.5);
            playState.asteroids.add(medAst);
        }
    } else if (this.key == 'medWhiteAst') {
        for (j = 0; j < (Math.ceil(Math.random() * 3)); j++) {
            smlAst = new playState.Asteroid(playState.game, this.x + ((j + 1) * posVar), this.y + ((j + 1) * posVar), 'smlWhiteAst', playState.SML_AST_SCALE, playState.SML_AST_HEALTH, playState.SML_AST_SPEED);
            smlAst.body.bounce.set(0.5);
            playState.asteroids.add(smlAst);
        }
    }

};

playState.Asteroid.prototype.update = function() {

    this.angle += 0.5;

};

playState.Dust.prototype = Object.create(Phaser.Sprite.prototype);
playState.Dust.prototype.constructor = playState.Dust;

playState.Metal.prototype = Object.create(Phaser.Sprite.prototype);
playState.Metal.prototype.constructor = playState.Metal;

playState.Crystal.prototype = Object.create(Phaser.Sprite.prototype);
playState.Crystal.prototype.constructor = playState.Crystal;


playState.PlayerBullet.prototype = Object.create(Phaser.Sprite.prototype);
playState.PlayerBullet.prototype.constructor = playState.PlayerBullet;

playState.DroneBullet.prototype = Object.create(Phaser.Sprite.prototype);
playState.DroneBullet.prototype.constructor = playState.DroneBullet;

playState.PlayerBullet.prototype.shoot = function(x, y, posVar, speed) {

    this.reset(x, y);

    if (playState.weapons[playState.currentWeapon].name == 'SUNSTONE' && playState.sunstoneTier == 1) {
        this.scale.setTo(0.75);
    }

    if (playState.weapons[playState.currentWeapon].name == 'AMETHYST' && playState.amethystTier > 1) {
        this.scale.setTo(1, 2);
    }

    //var pos = game.input.activePointer.position;

    x = this.game.input.activePointer.worldX + posVar;
    y = this.game.input.activePointer.worldY + posVar;

    this.game.physics.arcade.moveToXY(this, x, y, speed);

    if ((playState.weapons[playState.currentWeapon].name == 'RUBY' && playState.rubyTier > 1) || playState.weapons[playState.currentWeapon].name == 'EMERALD') {
        playState.enemies.forEachAlive(function(sprite) {

            if (Phaser.Math.distance(sprite.x, sprite.y, x, y) <= 300) {
                playState.game.physics.arcade.moveToObject(this, sprite, 180);
            }

        }, this);
    }

};

playState.DroneBullet.prototype.shoot = function(x, y, posVar, speed) {

    this.reset(x, y);

    x = this.game.input.activePointer.worldX + posVar;
    y = this.game.input.activePointer.worldY + posVar;

    this.game.physics.arcade.moveToXY(this, x, y, speed);

};

playState.DroneBullet.prototype.update = function(){

    this.rotation = Math.atan2(this.body.velocity.y, this.body.velocity.x);

};

playState.PlayerBullet.prototype.update = function() {

    this.rotation = Math.atan2(this.body.velocity.y, this.body.velocity.x);

    if (playState.weapons[playState.currentWeapon].name == 'RUBY' && playState.rubyTier > 1) {

        playState.enemies.forEachAlive(function (sprite) {

            if (Phaser.Math.distance(sprite.x, sprite.y, this.x, this.y) <= 300) {
                playState.game.physics.arcade.moveToObject(this, sprite, 300);
            }

        }, this);
    }


};

// Drone Weapon
playState.Weapon.DroneWeapon = function(game) {

    var i;
    Phaser.Group.call(this, game, game.world, 'DIAMOND', false, true, Phaser.Physics.ARCADE);

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
    playState.diamondShot.play();

    this.shootNow = this.game.time.time + this.fireRate;

};

// Diamond weapon
playState.Weapon.Diamond = function(game) {

    var i;
    Phaser.Group.call(this, game, game.world, 'DIAMOND', false, true, Phaser.Physics.ARCADE);

    this.game = game;
    this.shootNow = 0;
    this.bulletSpeed = 1000;
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

    if (playState.diamondTier == 1) {
        this.getFirstExists(false).shoot(ship.x, ship.y, 0, this.bulletSpeed);
        playState.diamondShot.play();

    } else if (playState.diamondTier == 2) {
        this.getFirstExists(false).shoot(ship.x, ship.y, 3, this.bulletSpeed);
        this.getFirstExists(false).shoot(ship.x, ship.y, -3, this.bulletSpeed);
        playState.diamondShot.play();
    } else if (playState.diamondTier == 3) {
        this.getFirstExists(false).shoot(ship.x, ship.y, 0, this.bulletSpeed);
        this.getFirstExists(false).shoot(ship.x, ship.y, 5, this.bulletSpeed);
        this.getFirstExists(false).shoot(ship.x, ship.y, -5, this.bulletSpeed);
        playState.diamondShot.play();
    }
    this.shootNow = this.game.time.time + this.fireRate;

};

// Ruby weapon
playState.Weapon.Ruby = function(game) {

    var i;
    Phaser.Group.call(this, game, game.world, 'RUBY', false, true, Phaser.Physics.ARCADE);

    this.shootNow = 0;
    this.bulletSpeed = 500;
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

    if (playState.rubyTier < 3) {
        this.getFirstExists(false).shoot(ship.x, ship.y, 0, this.bulletSpeed);
    } else if (playState.rubyTier == 3) {
        this.getFirstExists(false).shoot(ship.x, ship.y, 0, this.bulletSpeed);
        this.getFirstExists(false).shoot(ship.x, ship.y, 5, this.bulletSpeed);
        this.getFirstExists(false).shoot(ship.x, ship.y, -5, this.bulletSpeed);
    }
    this.shootNow = this.game.time.time + this.fireRate;

};

// sunStone weapon
playState.Weapon.sunStone = function(game) {

    var i;
    Phaser.Group.call(this, game, game.world, 'SUNSTONE', false, true, Phaser.Physics.ARCADE);

    this.shootNow = 0;
    this.bulletSpeed = 700;
    this.fireRate = 500;

    for (i = 0; i < 30; i++) {
        this.add(new playState.PlayerBullet(game, 'sunstoneb'), true);
    }

    return this;

};

playState.Weapon.sunStone.prototype = Object.create(Phaser.Group.prototype);
playState.Weapon.sunStone.prototype.constructor = playState.Weapon.sunStone;

playState.Weapon.sunStone.prototype.shoot = function(ship) {

    if (this.game.time.time < this.shootNow) {
        return;
    }

    if (playState.sunstoneTier == 1) {
        this.getFirstExists(false).shoot(ship.x, ship.y, 0, this.bulletSpeed);
    } else if (playState.sunstoneTier > 1) {
        this.getFirstExists(false).shoot(ship.x, ship.y, 0, this.bulletSpeed);
    }
    this.shootNow = this.game.time.time + this.fireRate;

};

// Topaz weapon
playState.Weapon.Topaz = function(game) {

    var i;
    Phaser.Group.call(this, game, game.world, 'TOPAZ', false, true, Phaser.Physics.ARCADE);

    this.shootNow = 0;
    this.bulletSpeed = 1500;
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

    this.getFirstExists(false).shoot(ship.x, ship.y, 0, this.bulletSpeed);

    this.shootNow = this.game.time.time + this.fireRate;

};

// Amethyst weapon
playState.Weapon.Amethyst = function(game) {

    var i;
    Phaser.Group.call(this, game, game.world, 'AMETHYST', false, true, Phaser.Physics.ARCADE);

    this.shootNow = 0;
    this.bulletSpeed = 1000;
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
    this.bulletSpeed = 1000;
    this.fireRate = 5;

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
    this.bulletSpeed = 700;
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

    this.getFirstExists(false).shoot(ship.x, ship.y, 0, this.bulletSpeed);

    this.shootNow = this.game.time.time + this.fireRate;

};

// obsidian weapon
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

playState.Anomaly.prototype = Object.create(Phaser.Sprite.prototype);
playState.Anomaly.prototype.constructor = playState.Anomaly;



playState.Anomaly.prototype.spawn = function() {

    game.time.events.add(15000, function(){

        playState.anomaly = new playState.Anomaly(this.game, this.game.world.randomX, this.game.world.randomY, playState.anomalyKey[Math.floor(Math.random() * 6)]);
        console.log('New anomaly at ' + playState.anomaly.x + ", " + playState.anomaly.y);
        playState.anomalies.add(playState.anomaly);
        playState.anomaly.spawn();}, this);

};

playState.Comet.prototype = Object.create(Phaser.Sprite.prototype);
playState.Comet.prototype.constructor = playState.Comet;

playState.Comet.prototype.dropLoot = function() {

    var drop = Math.ceil(Math.random() * 4),
        posVar = Math.ceil(Math.random() * 20),
        dropAmt = Math.floor(Math.random() * 20),
        a, b, c, d;

    switch (drop) {
        case 1:
            for (a = 0; a < dropAmt; a++) {
                playState.metal = new playState.Metal(this.game, this.x + (a * posVar), this.y + (a * posVar), 'Nd');
                playState.metals.add(playState.metal);
            }
            break;
        case 2:
            for (b = 0; b < dropAmt; b++) {
                playState.metal = new playState.Metal(this.game, this.x + (b * posVar), this.y + (b * posVar), 'W');
                playState.metals.add(playState.metal);
            }
            break;
        case 3:
            for (c = 0; c < dropAmt; c++) {
                playState.metal = new playState.Metal(this.game, this.x + (c * posVar), this.y + (c * posVar), 'Pt');
                playState.metals.add(playState.metal);
            }
            break;
        case 4:
            for (d = 0; d < dropAmt; d++) {
                playState.metal = new playState.Metal(this.game, this.x + (d * posVar), this.y + (d * posVar), 'Au');
                playState.metals.add(playState.metal);
            }
            break;
    }

};

playState.Comet.prototype.spawn = function() {

    game.time.events.add(20000, playState.newComet, this);

};

playState.Enemy.prototype = Object.create(Phaser.Sprite.prototype);
playState.Enemy.prototype.constructor = playState.Enemy;

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
        this.rotation = Math.atan2(moveY - this.y, moveX - this.x);

    }

};

playState.Enemy.prototype.update = function() {

    var distance = this.game.physics.arcade.distanceBetween(this.player, this);

    if (this.key !== 'escape') {
        if (distance <= this.aggroRange && this.player.alive && this.alive) {
            if (distance >= this.minDist) {
                this.game.physics.arcade.moveToXY(this, this.player.x, this.player.y, this.speed);
            } else {
                this.body.drag.x = 700;
                this.body.drag.y = 700;


            }

            this.rotation = Math.atan2(this.player.y - this.y, this.player.x - this.x);
            this.shoot();
        } else {
            this.move();
        }
    }

    if (this.key == 'escape') {
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

    var escapePod = new playState.Enemy(playState.game, this.x, this.y, 'escape', playState.ESCAPE_POD_SPEED, playState.ESCAPE_POD_HEALTH);
    playState.enemies.add(escapePod);

};

playState.Enemy.prototype.dropLoot = function(){

    var enemyDrop = Math.ceil(Math.random() * 4),
        posVar = Math.ceil(Math.random() * 20),
        dropAmt = Math.floor(Math.random() * 5),
        a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r;

    switch (this.key) {
        case 'basic':
            switch (enemyDrop) {
                case 1:
                    for (a = 0; a < dropAmt; a++) {
                        playState.metal = new playState.Metal(this.game, this.x + (a * posVar), this.y + (a * posVar), 'Li');
                        playState.metals.add(playState.metal);
                    }
                    break;
                case 2:
                    for (b = 0; b < dropAmt; b++) {
                        playState.metal = new playState.Metal(this.game, this.x + (b * posVar), this.y + (b * posVar), 'Al');
                        playState.metals.add(playState.metal);
                    }
                    break;
                case 3:
                    for (c = 0; c < dropAmt; c++) {
                        playState.metal = new playState.Metal(this.game, this.x + (c * posVar), this.y + (c * posVar), 'Ti');
                        playState.metals.add(playState.metal);
                    }
                    break;
                case 4:
                    for (d = 0; d < dropAmt; d++) {
                        playState.metal = new playState.Metal(this.game, this.x + (d * posVar), this.y + (d * posVar), 'Cr');
                        playState.metals.add(playState.metal);
                    }
                    break;
            }
            break;
        case 'bruiser':
            switch (enemyDrop) {
                case 1:
                    for (e = 0; e < dropAmt; e++) {
                        playState.metal = new playState.Metal(this.game, this.x + (e * posVar), this.y + (e * posVar), 'Fe');
                        playState.metals.add(playState.metal);
                    }
                    break;
                case 2:
                    for (f = 0; f < dropAmt; f++) {
                        playState.metal = new playState.Metal(this.game, this.x + (f * posVar), this.y + (f * posVar), 'Co');
                        playState.metals.add(playState.metal);
                    }
                    break;
                case 3:
                    for (g = 0; g < dropAmt; g++) {
                        playState.metal = new playState.Metal(this.game, this.x + (g * posVar), this.y + (g * posVar), 'Ni');
                        playState.metals.add(playState.metal);
                    }
                    break;
                case 4:
                    for (h = 0; h < dropAmt; h++) {
                        playState.metal = new playState.Metal(this.game, this.x + (h * posVar), this.y + (h * posVar), 'Cu');
                        playState.metals.add(playState.metal);
                    }
                    break;
            }
            break;
        case 'govt':
            switch (enemyDrop) {
                case 1:
                    for (i = 0; i < dropAmt; i++) {
                        playState.metal = new playState.Metal(this.game, this.x + (i * posVar), this.y + (i * posVar), 'Zn');
                        playState.metals.add(playState.metal);
                    }
                    break;
                case 2:
                    for (j = 0; j < dropAmt; j++) {
                        playState.metal = new playState.Metal(this.game, this.x + (j * posVar), this.y + (j * posVar), 'Pd');
                        playState.metals.add(playState.metal);
                    }
                    break;
                case 3:
                    for (k = 0; k < dropAmt; k++) {
                        playState.metal = new playState.Metal(this.game, this.x + (k * posVar), this.y + (k * posVar), 'Ag');
                        playState.metals.add(playState.metal);
                    }
                    break;
                case 4:
                    for (l = 0; l < dropAmt; l++) {
                        playState.metal = new playState.Metal(this.game, this.x + (l * posVar), this.y + (l * posVar), 'Sn');
                        playState.metals.add(playState.metal);
                    }
                    break;
            }
            break;
        case 'captain':
            switch (enemyDrop) {
                case 1:
                    for (m = 0; m < dropAmt; m++) {
                        playState.metal = new playState.Metal(this.game, this.x + (m * posVar), this.y + (m * posVar), 'Nd');
                        playState.metals.add(playState.metal);
                    }
                    break;
                case 2:
                    for (n = 0; n < dropAmt; n++) {
                        playState.metal = new playState.Metal(this.game, this.x + (n * posVar), this.y + (n * posVar), 'W');
                        playState.metals.add(playState.metal);
                    }
                    break;
                case 3:
                    for (o = 0; o < dropAmt; o++) {
                        playState.metal = new playState.Metal(this.game, this.x + (o * posVar), this.y + (o * posVar), 'Pt');
                        playState.metals.add(playState.metal);
                    }
                    break;
                case 4:
                    for (p = 0; p < dropAmt; p++) {
                        playState.metal = new playState.Metal(this.game, this.x + (p * posVar), this.y + (p * posVar), 'Au');
                        playState.metals.add(playState.metal);
                    }
                    break;
            }
            break;
        case 'escape':
            switch (enemyDrop) {
                case 1:
                case 2:
                    for (q = 0; q < dropAmt; q++) {
                        playState.metal = new playState.Metal(this.game, this.x + (q * posVar), this.y + (q * posVar), 'Au');
                        playState.metals.add(playState.metal);
                    }
                    break;
                case 3:
                case 4:
                    for (r = 0; r < dropAmt; r++) {
                        playState.metal = new playState.Metal(this.game, this.x + (r * posVar), this.y + (r * posVar), 'Hg');
                        playState.metals.add(playState.metal);
                    }
                    break;
            }
            break;
    }

};

playState.EnemyBullet.prototype = Object.create(Phaser.Sprite.prototype);
playState.EnemyBullet.prototype.constructor = playState.EnemyBullet;

playState.Drone.prototype = Object.create(Phaser.Sprite.prototype);
playState.Drone.prototype.constructor = playState.Drone;
