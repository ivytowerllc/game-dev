var settingsState = {

    create: function() {

        // Add background image
        this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'bg');

        // Display the name of the game
        var nameLabel = game.add.text(game.width/2, -50, "Settings", {font: '50px Arial', fill: '#ffffff'});
        nameLabel.anchor.setTo(.5,.5);
        var nameTween = game.add.tween(nameLabel).to({y: 90}, 1000).easing(Phaser.Easing.Bounce.Out).start();

        // Background music
        this.music = game.add.audio('asteroidMenu');
        this.music.loop = true;
        this.music.play();

        this.menuButton = game.add.button(50, 50, 'menuButton', this.menu, this);
        this.menuButton.scale.setTo(.1);
        this.menuButton.anchor.setTo(.5,.5);

    },

    menu: function(){

        this.music.stop();
        game.state.start('menu');

    },

};