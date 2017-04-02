var bootState = {

    preload: function(){
        game.load.image("progressBar","assets/progressBar.png");
    },

    create: function(){

        game.stage.backgroundColor = '#481676';
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // If the device loading the game is a mobile device
        if(!game.device.desktop){
            // Set the type of scaling to show all
            game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

            // Set min/max height/width of the game
            game.scale.setMinMax(game.width/2, game.height/2, game.width*2, game.height*2);

            // Center the game on the screen
            game.scale.pageAlignHorizontally = true;
            game.scale.pageAlignVertically = true;

            // Add purple background to the page to hide potential white borders
            document.body.style.backgroundColor = '#481676';
        }

        game.state.start("load");
    }
};