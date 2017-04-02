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
        var nameLabel = game.add.text(game.width/2, -50, "Crystal Hunter", {font: '50px Arial', fill: '#ffffff'});
        nameLabel.anchor.setTo(.5,.5);
        var nameTween = game.add.tween(nameLabel).to({y: 90}, 1000).easing(Phaser.Easing.Bounce.Out).start();

        // Show the score at the center of the screen
        var scoreLabel = game.add.text(game.width/2, game.height/3, 'Score: ' + game.global.score, {font: '25px Arial', fill: '#ffffff'});
        scoreLabel.anchor.setTo(.5,.5);

        this.nickname = game.add.inputField(game.width/2, game.height/2, {
            width: 300,
            height: 30,
            font: '24px Arial',
            placeholder: 'Nickname',
            type: PhaserInput.InputType.text
            });
        this.nickname.anchor.setTo(.5,.5);
        this.nickname.focusOutOnEnter = true;

        this.startButton = game.add.button(game.width/2, game.height/1.8, 'startButton', this.start, this);
        this.startButton.scale.setTo(.1);
        this.startButton.anchor.setTo(.5,.5);
        this.startButton.width = 100;

        this.settingsButton = game.add.button(50, 50, 'settingsButton', this.settings, this);
        this.settingsButton.scale.setTo(.1);
        this.settingsButton.anchor.setTo(.5,.5);


        // Explain how to start the game
        var text = "Click button to start!";

        var startLabel = game.add.text(game.width/2, game.height-80, text, {font: '25px Arial', fill: '#ffffff'});
        startLabel.anchor.setTo(.5,.5);
        var startTween = game.add.tween(startLabel).to({angle: -2}, 500).to({angle: 2}, 1000).to({angle: 0}, 500).loop().start();

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
    }

};
