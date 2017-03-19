var game = new Phaser.Game(window.innerWidth, window.innerHeight);

// Define global variables
game.global = {

    score: 0

};

// Add all the states
game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('settings', settingsState);
game.state.add('play', playState);

// Start boot state
game.state.start('boot');
