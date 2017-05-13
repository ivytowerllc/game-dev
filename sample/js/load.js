var loadState = {

    preload: function(){

        // Add loading text
        var loadingLabel = game.add.text(game.width/2, 150, "loading...", {font: '30px Josefin Slab', fill: '#ffffff'});
        loadingLabel.anchor.setTo(0.5,0.5);

        // Display progress bar
        var progressBar = game.add.sprite(game.width/2, 200, 'progressBar');
        progressBar.anchor.setTo(.5,.5);
        game.load.setPreloadSprite(progressBar);

        // Load all the assets
        game.load.image('bg', 'assets/background.png');
        game.load.image('ship', 'assets/ship.png');
        game.load.image('basic', 'assets/basicen.png');
        game.load.image('basicb', 'assets/basicbull.png');
        game.load.image('bruiser', 'assets/bruisen.png');
        game.load.image('bruiserb', 'assets/bruisbull.png');
        game.load.image('captain', 'assets/capten.png');
        game.load.image('captainb', 'assets/captbull.png');
        game.load.image('escape', 'assets/escape.png');
        game.load.image('govt', 'assets/govten.png');
        game.load.image('govtb', 'assets/govtbull.png');
        game.load.image('moon', 'assets/moon.png');
        game.load.image('bigRedAst', 'assets/bigredast.png');
        game.load.image('medRedAst', 'assets/medredast.png');
        game.load.image('smlRedAst', 'assets/smlredast.png');
        game.load.image('bigGreyAst', 'assets/biggreyast.png');
        game.load.image('medGreyAst', 'assets/medgreyast.png');
        game.load.image('smlGreyAst', 'assets/smlgreyast.png');
        game.load.image('bigBrownAst', 'assets/bigbrownast.png');
        game.load.image('medBrownAst', 'assets/medbrownast.png');
        game.load.image('smlBrownAst', 'assets/smlbrownast.png');
        game.load.image('bigBlueAst', 'assets/bigblueast.png');
        game.load.image('medBlueAst', 'assets/medblueast.png');
        game.load.image('smlBlueAst', 'assets/smlblueast.png');
        game.load.image('bigWhiteAst', 'assets/bigwhiteast.png');
        game.load.image('medWhiteAst', 'assets/medwhiteast.png');
        game.load.image('smlWhiteAst', 'assets/smlwhiteast.png');
        game.load.image('diamond', 'assets/diamond.png');
        game.load.image('diamondb', 'assets/diambull.png');
        game.load.image('ruby', 'assets/diamond.png');
        game.load.image('rubyb', 'assets/rubybull.png');
        game.load.image('sunstone', 'assets/diamond.png');
        game.load.image('sunstoneb', 'assets/sunsbull.png');
        game.load.image('topaz', 'assets/diamond.png');
        game.load.image('emerald', 'assets/diamond.png');
        game.load.image('emeraldb', 'assets/emebull.png');
        game.load.image('sapphire', 'assets/diamond.png');
        game.load.image('sapphireb', 'assets/sappbull.png');
        game.load.image('amethyst', 'assets/diamond.png');
        game.load.image('amethystb', 'assets/amebull.png');
        game.load.image('obsidian', 'assets/diamond.png');
        game.load.image('obsidianb', 'assets/basicbull.png');
        game.load.image('opal', 'assets/diamond.png');
        game.load.image('Li', 'assets/star.png');
        game.load.image('C', 'assets/star.png');
        game.load.image('Al', 'assets/star.png');
        game.load.image('Ti', 'assets/star.png');
        game.load.image('Cr', 'assets/star.png');
        game.load.image('Fe', 'assets/star.png');
        game.load.image('Co', 'assets/star.png');
        game.load.image('Ni', 'assets/star.png');
        game.load.image('Cu', 'assets/star.png');
        game.load.image('Zn', 'assets/star.png');
        game.load.image('Pd', 'assets/star.png');
        game.load.image('Ag', 'assets/star.png');
        game.load.image('Sn', 'assets/star.png');
        game.load.image('Nd', 'assets/star.png');
        game.load.image('W', 'assets/star.png');
        game.load.image('Pt', 'assets/star.png');
        game.load.image('Au', 'assets/star.png');
        game.load.image('Hg', 'assets/star.png');
        game.load.image('smlDust', 'assets/smldust.png');
        game.load.image('medDust', 'assets/meddust.png');
        game.load.image('bigDust', 'assets/bigdust.png');
        game.load.image('health','assets/bar.png');
        game.load.image('shield','assets/bar2.png');
        game.load.image('droneAnom','assets/anomaly.png');
        game.load.image('magnet','assets/anomaly.png');
        game.load.image('blackhole','assets/anomaly.png');
        game.load.image('transmute','assets/anomaly.png');
        game.load.image('infinity','assets/anomaly.png');
        game.load.image('invisible','assets/anomaly.png');
        game.load.image('bomb','assets/anomaly.png');
        game.load.image('warp','assets/anomaly.png');
        game.load.image('comet','assets/comet.png');
        game.load.image('blueButton', 'assets/blueButton.png');
        game.load.image('greenButton', 'assets/greenButton.png');
        game.load.image('redButton', 'assets/redButton.png');
        game.load.image('purpleButton', 'assets/purpleButton.png');
        game.load.image('pinkButton', 'assets/pinkButton.png');
        game.load.image('skyButton', 'assets/skyButton.png');
        game.load.image('yellowButton', 'assets/yellowButton.png');
        game.load.image('tealButton', 'assets/tealButton.png');
        game.load.image('limeButton', 'assets/limeButton.png');
        game.load.image('joyHead', 'assets/joyhead.png');
        game.load.image('joyStick', 'assets/joystick.png');
        game.load.image('drone', 'assets/drone.png');
        game.load.image('continue', 'assets/continue.png');

        // Background music
        game.load.audio('earthMoon', 'assets/earthMoon.wav');
        game.load.audio('asteroidMenu', 'assets/asteroidMenu.wav');
        game.load.audio('pluto', 'assets/pluto.wav');
        game.load.audio('jupiter', 'assets/jupiter.wav');
        game.load.audio('mars', 'assets/mars.wav');
        game.load.audio('eris', 'assets/eris.wav');
        game.load.audio('death', 'assets/death.wav');
        game.load.audio('money', 'assets/money.wav');
        game.load.audio('diamondShot', 'assets/diamond.wav');
        game.load.audio('engineIdle', 'assets/engineIdle.wav');
        game.load.audio('bruiserShot', 'assets/bruiserShot.wav');
        game.load.audio('captainShot', 'assets/captainShot.wav');
        game.load.audio('basicShot', 'assets/basicShot.wav');
        game.load.audio('dust', 'assets/dust.wav');
        game.load.audio('bruiserShot', 'assets/bruiserShot.wav');
        game.load.audio('amethystShot', 'assets/amethyst.wav');
        game.load.audio('crystalSound', 'assets/crystal.wav');
        game.load.audio('topazShot', 'assets/topaz.wav');
        game.load.audio('bloost', 'assets/bloost.wav');
        game.load.audio('metal', 'assets/metal.wav');
        game.load.audio('powerup', 'assets/powerup.wav');
        game.load.audio('menu', 'assets/menuMusic.wav');
    },

    create: function(){

        // Go to the menu state
        game.state.start("menu");
    }

};
