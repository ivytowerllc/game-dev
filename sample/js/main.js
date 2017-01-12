var CrystalHunter = CrystalHunter || {};

// Initiate Phaser
CrystalHunter.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO);

CrystalHunter.game.state.add('GameState', CrystalHunter.GameState);
CrystalHunter.game.state.start('GameState');    
