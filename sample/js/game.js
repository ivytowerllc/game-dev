var game = new Phaser.Game(window.innerWidth, window.innerHeight);

// Define global variables
game.global = {

    score: 0,
    crystalsCollected: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    totalDustAccumulated: 0,
    metalMoney: 0

};

// Add all the states
game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('settings', settingsState);
game.state.add('play', playState);
game.state.add('credits', creditState);
game.state.add('store', storeState);
game.state.add('help', helpState);
game.state.add('gameMode', gameModeState);

// Start boot state
game.state.start('boot');
