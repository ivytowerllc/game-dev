/**
 * Created by mcmillan on 4/14/17.
 */
var gameModeState = {

    create : function() {

        this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'bg');

        this.music = game.add.audio('eris');
        this.music.loop = true;
        this.music.play();

        // Display the name of the game
        var nameLabel = game.add.text(game.width/2, -50, "Select A Game Mode", {font: '50px Josefin Slab', fill: '#ffffff'});
        nameLabel.anchor.setTo(.5,.5);
        game.add.tween(nameLabel).to({y: 90}, 1000).easing(Phaser.Easing.Bounce.Out).start();

        this.menuButton = game.add.button(50, 50, 'redButton', this.menu, this);
        this.menuButton.anchor.setTo(.5,.5);

        this.singleBattleButton = game.add.button(game.width * (1/3), game.height * (2/3), 'greenButton', this.singleBattle, this);
        this.singleBattleButton.anchor.setTo(.5,.5);

        this.singleHaulButton = game.add.button(game.width * (1/3), game.height * .5, 'purpleButton', this.singleHaul, this);
        this.singleHaulButton.anchor.setTo(.5,.5);

        this.teamBattleButton = game.add.button(game.width * (2/3), game.height * (2/3), 'pinkButton', this.teamBattle, this);
        this.teamBattleButton.anchor.setTo(.5,.5);

        this.teamHaulButton = game.add.button(game.width * (2/3), game.height * .5, 'yellowButton', this.teamHaul, this);
        this.teamHaulButton.anchor.setTo(.5,.5);
    },

    menu: function(){

        this.music.stop();
        game.state.start('menu');

    },

    singleBattle: function(){

        this.music.stop();
        game.state.start('menu');

    },

    singleHaul: function(){

        this.music.stop();
        game.state.start('menu');

    },

    teamBattle: function(){

        this.music.stop();
        game.state.start('menu');

    },

    teamHaul: function(){

        this.music.stop();
        game.state.start('menu');

    }
};