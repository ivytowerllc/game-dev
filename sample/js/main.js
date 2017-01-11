var CrystalHunter = CrystalHunter || {};

// Initiate Phaser
CrystalHunter.game = new Phaser.Game(800, 800, Phaser.AUTO);

CrystalHunter.game.state.add('GameState', CrystalHunter.GameState);
CrystalHunter.game.state.start('GameState');    