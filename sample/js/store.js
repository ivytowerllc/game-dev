/**
 * Created by mcmillan on 4/14/17.
 */
var storeState = {

    create : function() {

        this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'bg');

        this.music = game.add.audio('asteroidMenu');
        this.music.loop = true;
        this.music.play();

        // Display the name of the game
        var nameLabel = game.add.text(game.width/2, -50, "Store", {font: '50px Josefin Slab', fill: '#ffffff'});
        nameLabel.anchor.setTo(.5,.5);
        game.add.tween(nameLabel).to({y: 90}, 1000).easing(Phaser.Easing.Bounce.Out).start();

        this.menuButton = game.add.button(50, 50, 'redButton', this.menu, this);
        this.menuButton.anchor.setTo(.5,.5);
    },

    menu: function(){

        this.music.stop();
        game.state.start('menu');

    }
};
