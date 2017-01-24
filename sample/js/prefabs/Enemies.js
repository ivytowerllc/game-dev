var CrystalHunter = CrystalHunter || {};

// Enemy template with physics and standard variables
CrystalHunter.Enemy = function(game, x, y, image, speed, health) {
    
    this.game = game;
    this.isAggro = false;
    this.speed = speed;
    this.health = health;
    
    Phaser.Sprite.call(this, game, x, y, image);
    
    this.game.physics.arcade.enable(this);
    this.anchor.setTo(0.5);
    this.body.collideWorldBounds = true;
    this.minMovementDistanceX = 500;
    this.maxMovementDistanceY = 500;
    this.aggroRange = 300;
    
    // Create a timer
    this.moveTimer = this.game.time.create(false);
    this.moveTimer.start();
    
    // Time in which the enemies change direction
    this.recalcMovement = 0.5;
    this.minimumRecalc = 3;
    this.nextDirectionChange = 0;
    
};

CrystalHunter.Enemy.prototype = Object.create(Phaser.Sprite.prototype);
CrystalHunter.Enemy.prototype.constructor = CrystalHunter.Enemy;

// Random enemy movement around the level
CrystalHunter.Enemy.prototype.move = function() {
    
    var speed = this.speed;
    
    if (Math.round(this.moveTimer.seconds) > this.nextDirectionChange) {
        
        var randomMovementDistanceX = Math.round((Math.random() + 1) * this.minMovementDistanceX + this.minMovementDistanceX);
        var randomMovementDistanceY = Math.round(Math.random() * this.maxMovementDistanceY + this.minMovementDistanceX);
        var moveToX = this.x;
        var moveToY = this.y;
        var moveLeft = false;
        var moveUp = false;
        
        this.nextDirectionChange = (Math.random() * this.recalcMovement + this.minimumRecalc);
        
        if (this.moveTimer) {
            this.moveTimer.destroy();
            this.moveTimer.seconds = 0;
        }
        this.moveTimer = this.game.time.create(false);
        this.moveTimer.start();
        
        if (Math.random() < 0.5) {
            moveLeft = true;
        }
        if (Math.random() < 0.5) {
            moveUp = true;
        }
        
        if (moveLeft && !this.moveRightNextTick) {
            moveToX -= randomMovementDistanceX;
            if (moveToX < 0) {
                moveToX = this.body.width/2;
                this.moveRightNextTick = true;
            }
        } else {
            moveToX += randomMovementDistanceX;
            this.moveRightNextTick = false;
            if (moveToX > this.game.world.width) {
                moveToX = this.game.world.width - this.body.width/2;
            }
        }
            
        if (moveUp && !this.moveDownNextTick) {
            moveToY -= randomMovementDistanceY;
            if (moveToY < 0) {
                moveToY = this.body.height/2;
                this.moveDownNextTick = true;
            }
        } else {
            moveToY += randomMovementDistanceY;
            this.moveDownNextTick = false;
            if (moveToY > this.game.world.height) {
                moveToY = this.game.world.height - this.body.height/2;
            }
        }
        
        this.lastMoveToX = moveToX;
        this.lastMoveToY = moveToY;
        
        this.game.physics.arcade.moveToXY(this, moveToX, moveToY, speed);
        var angle = Math.atan2(moveToY - this.y, moveToX - this.x);
        this.rotation = angle;
        
    }
    
};

CrystalHunter.Enemy.prototype.update = function() {
    
    this.move();
    
};

// --- ENEMY BULLETS

CrystalHunter.EnemyFire = function(game, x, y) {
    
    Phaser.Sprite.call(this, game, x, y, image);
    
    this.anchor.setTo(0.5);
    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
    
};

CrystalHunter.EnemyFire.prototype = Object.create(Phaser.Sprite.prototype);
CrystalHunter.EnemyFire.prototype.constructor = CrystalHunter.EnemyFire;