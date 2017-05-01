var menuState = {

    create: function(){

        // Add background image
        this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'bg');

        // Add Phaser input plugin
        this.game.add.plugin(PhaserInput.Plugin);

        // Background music
        this.music = game.add.audio('asteroidMenu');
        this.music.loop = true;
        this.music.play();

        // Display the name of the game
        var nameLabel = game.add.text(game.width/2, -50, "Crystal Hunter ALPHA TEST", {font: '50px Josefin Slab', fill: '#ffffff'});
        nameLabel.anchor.setTo(.5,.5);
        /** Name Tween **/ game.add.tween(nameLabel).to({y: 90}, 1000).easing(Phaser.Easing.Bounce.Out).start();

        var hints = [
            "Tip: After collecting a new crystal, press ENTER to switch to a new weapon type!",
            "Tip: Collect multiple crystals of the same type to upgrade your weapon!",
            "Tip: Collect anomalies to get temporary buffs!",
            "Tip: Destroy asteroids and collect dust to grow larger!",
            "Tip: Collected dust can be used as a shield against attacks!",
            "Tip: After collecting dust, hold SPACEBAR to boost!",
            "Tip: Destroy asteroids to collect metals, crystals, and asteroid dust!",
            "Tip: Destroy enemies to increase your score!"
        ];



        // Hints
        var hintLabel = game.add.text(game.width/2, game.height*.75, hints[(Math.floor(Math.random()*8))], {font: '25px Josefin Slab', fill:'#ffffff'});
        hintLabel.anchor.setTo(.5,.5);

        var mediaLabel = game.add.text(game.width/2, game.height*.95, "Like the game? Let us know on twitter! @IvyTowerLLC", {font: '20px Josefin Slab', fill:'#ffffff'});
        mediaLabel.anchor.setTo(.5,.5);

        // Show the score at the center of the screen
        var scoreLabel = game.add.text(game.width/2, game.height/1.7 + 50, 'Score: ' + game.global.score, {font: '25px Josefin Slab', fill: '#ffffff'});
        scoreLabel.anchor.setTo(.5,.5);

        var crystalsLabel = game.add.text(game.width/2, game.height/4.2, 'Crystals Collected: ' +
            game.global.crystalsCollected, {font: '25px Josefin Slab', fill: '#ffffff'});
        crystalsLabel.anchor.setTo(.5,.5);

        var dustLabel = game.add.text(game.width/2, game.height/2.2-50, 'Dust Collected: ' + game.global.totalDustAccumulated + " kg", {font: '25px Josefin Slab', fill: '#ffffff'});
        dustLabel.anchor.setTo(.5,.5);

        var moneyLabel = game.add.text(game.width/2, game.height/2.2-100, 'Value of Metals Collected: $' + game.global.metalMoney, {font: '25px Josefin Slab', fill: '#ffffff'});
        moneyLabel.anchor.setTo(.5,.5);

        var nicknameLabel = game.add.text(game.width/2, game.height/2.2, 'Enter your name or sign in!', {font: '25px Josefin Slab', fill: '#ffffff'});
        nicknameLabel.anchor.setTo(.5,.5);

        this.nickname = game.add.inputField(game.width/2 - 80, game.height/2, {
            font: '20px Josefin Slab',
            placeholder: 'Nickname',
            placeholderColor: '#FFFFFF',
            type: PhaserInput.InputType.text
            });
        this.nickname.focusOutOnEnter = true;
        this.nickname.height = 25;
        this.nickname.width = 250;
        this.nickname.startFocus();

        var playerName = this.nickname.value;

        this.guestStartButton = game.add.button(game.width/2.2, game.height/1.7, 'blueButton', this.start, this);
        this.guestStartButton.anchor.setTo(.5,.5);

        this.loginStartButton = game.add.button(game.width/1.85, game.height/1.7, 'limeButton', this.start, this);
        this.loginStartButton.anchor.setTo(.5,.5);

        this.settingsButton = game.add.button(50, 50, 'greenButton', this.settings, this);
        this.settingsButton.anchor.setTo(.5,.5);

        this.storeButton = game.add.button(50, game.height/2, 'purpleButton', this.store, this);
        this.storeButton.anchor.setTo(.5,.5);

        this.gameModeButton = game.add.button(game.width*.95, game.height/2, 'skyButton',  this.gameMode, this);
        this.gameModeButton.anchor.setTo(.5,.5);

        this.helpButton = game.add.button(game.width*.95, 50, 'pinkButton', this.help, this);
        this.helpButton.anchor.setTo(.5,.5);

        this.removeAdsButton = game.add.button(game.width*.95, game.height*.95, 'tealButton', this.removeAds, this);

        // Create a new Phaser keyboard variable; the up arrow key
        // When pressed, call 'start'
        //var upKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        //upKey.onDown.add(this.start, this);

        // Touch to start if the device is mobile
        //if(!game.device.desktop){
          //  game.input.onDown.add(this.start, this);
        //}

    },

    update: function(){
        this.nickname.update();
    },

    start: function(){

        this.music.stop();
        game.state.start('play');
        playState.nickname = this.nickname.value;

    },

    settings: function(){
        this.music.stop();
        game.state.start('settings');
    },

    store: function(){
        this.music.stop();
        game.state.start('store');
    },

    help: function(){
        this.music.stop();
        game.state.start('help');
    },

    gameMode: function(){
        this.music.stop();
        game.state.start('gameMode');
    },

    removeAds: function(){
        console.log("Remove ads");
    }

};
