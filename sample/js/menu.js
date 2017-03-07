var menuState = {

    create: function(){

        // Add background image
        game.add.image(0,0, 'bg');

        // Background music
        this.music = game.add.audio('asteroidMenu');
        this.music.loop = true;
        this.music.play();

        // Display the name of the game
        var nameLabel = game.add.text(game.width/2, -50, "Crystal Hunter", {font: '50px Arial', fill: '#ffffff'});
        nameLabel.anchor.setTo(.5,.5);
        var nameTween = game.add.tween(nameLabel).to({y: 90}, 1000).easing(Phaser.Easing.Bounce.Out).start();

        // Show the score at the center of the screen
        var scoreLabel = game.add.text(game.width/2, game.height/2, 'Score: ' + game.global.score, {font: '25px Arial', fill: '#ffffff'});
        scoreLabel.anchor.setTo(.5,.5);

        // Explain how to start the game
        var text;

        if(game.device.desktop){

            text = 'Press the spacebar to start'

        } else {

            text = 'Touch the screen to start'
        }

        var startLabel = game.add.text(game.width/2, game.height-80, text, {font: '25px Arial', fill: '#ffffff'});
        startLabel.anchor.setTo(.5,.5);
        var startTween = game.add.tween(startLabel).to({angle: -2}, 500).to({angle: 2}, 1000).to({angle: 0}, 500).loop().start();

        // Create a new Phaser keyboard variable; the up arrow key
        // When pressed, call 'start'
        var upKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        upKey.onDown.add(this.start, this);

        // Touch to start if the device is mobile
        if(!game.device.desktop){
            game.input.onDown.add(this.start, this);
        }

    },

    start: function(){

        this.music.stop();
        game.state.start('play');

    }

};