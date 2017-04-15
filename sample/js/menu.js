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
        var nameLabel = game.add.text(game.width/2, -50, "Crystal Hunter", {font: '50px Josefin Slab', fill: '#ffffff'});
        nameLabel.anchor.setTo(.5,.5);
        /** Name Tween **/ game.add.tween(nameLabel).to({y: 90}, 1000).easing(Phaser.Easing.Bounce.Out).start();

        // Show the score at the center of the screen
        var scoreLabel = game.add.text(game.width/2, game.height/3, 'Score: ' + game.global.score, {font: '25px Josefin Slab', fill: '#ffffff'});
        scoreLabel.anchor.setTo(.5,.5);

        this.nickname = game.add.inputField(game.width/2, game.height/2, {
            font: '24px Josefin Slab',
            placeholder: 'Nickname',
            placeholderColor: '#FFF',
            type: PhaserInput.InputType.text
            });
        this.nickname.anchor.setTo(.5,.5);
        this.nickname.focusOutOnEnter = true;

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
    }

};
