window.onload = function() {

    "use strict";
    
    var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    var wallTop;
    var wallBot;
    var wallLeft;
    var wallRight;
    
    var cursors;
    var player;
    var left;
    var right;
    
    var bullet;
    var bullets;
    var bulletTime = 0;
    
    var bat;
    var totalBats = 0;
    
    var timer = 0;
    
    function preload() 
    {
        game.load.image('floor', 'assets/Floor.png' );
        game.load.image('wallTop', 'assets/wall_bound_top.png');
        game.load.image('wallBot', 'assets/wall_bound_bot.png');
        game.load.image('wallLeft', 'assets/wall_bound_left.png');
        game.load.image('wallRight', 'assets/wall_bound_right.png');
        game.load.spritesheet('player', 'assets/player_sprite.png', 50, 50, 8);
        game.load.spritesheet('bat', 'assets/bat_sprite.png', 45, 36, 4);
        game.load.image('bullet', 'assets/yellow_ball.png');
        
    }
    
    function create() 
    {
        // Physics
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        // Floor background
        game.add.sprite(0, 0, 'floor');
        // Invisible walls
        wallTop = game.add.sprite(47, 0, 'wallTop');
        wallBot = game.add.sprite(47, 585, 'wallBot');
        wallLeft = game.add.sprite(0, 0, 'wallLeft');
        wallRight = game.add.sprite(763, 0, 'wallRight');
        
        game.physics.enable(wallTop,Phaser.Physics.ARCADE);
        game.physics.enable(wallBot,Phaser.Physics.ARCADE);
        game.physics.enable(wallLeft,Phaser.Physics.ARCADE);
        game.physics.enable(wallRight,Phaser.Physics.ARCADE);
        wallTop.body.immovable = true;
        wallBot.body.immovable = true;
        wallLeft.body.immovable = true;
        wallRight.body.immovable = true;
        
        wallTop.body.checkCollision.up = false;
        wallTop.body.checkCollision.left = false;
        wallTop.body.checkCollision.right = false;
        
        wallBot.body.checkCollision.down = false;
        wallBot.body.checkCollision.left = false;
        wallBot.body.checkCollision.right = false;
        
        wallLeft.body.checkCollision.left = false;
        wallLeft.body.checkCollision.up = false;
        wallLeft.body.checkCollision.down = false;
        
        wallRight.body.checkCollision.right = false;
        wallRight.body.checkCollision.up = false;
        wallRight.body.checkCollision.down = false;
        
        // Keyboard input
        //wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        //aKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
        //sKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
        //dKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
        
        //wKey.onDown.add(shootUp());
        //aKey.onDown.add(shootLeft());
        //sKey.onDown.add(shootDown());
        //dKey.onDown.add(shootRight());
        
        // Player
        player = game.add.sprite(300, 200, 'player', 2);
        player.smoothed = false;
        
        left = player.animations.add('left', [0,1], 8, true);
        right = player.animations.add('right', [6,7], 8, true);
        player.animations.add('up', [4,5], 8, true);
        player.animations.add('down', [2,3], 8, true);
        
        left.enableUpdate = true;
        right.enableUpdate = true;
        
        game.physics.enable(player, Phaser.Physics.ARCADE);
        
        game.camera.follow(player);
        
        // Bullets
        bullets = game.add.group();
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;
        
        bullets.createMultiple(40, 'bullet');
        bullets.setAll('checkWorldBounds', true);
        bullets.setAll('outOfBoundsKill', true);
        
        //input
        cursors = game.input.keyboard.createCursorKeys();
        game.input.keyboard.addKeyCapture(Phaser.Keyboard.SPACEBAR);/*
        game.input.keyboard.addKeyCapture(Phaser.Keyboard.A);
        game.input.keyboard.addKeyCapture(Phaser.Keyboard.S);
        game.input.keyboard.addKeyCapture(Phaser.Keyboard.D);
        */
        // Bat
    }
    
    function update() 
    {   
        // Wall collision
        game.physics.arcade.collide(player, wallTop);
        game.physics.arcade.collide(player, wallBot);
        game.physics.arcade.collide(player, wallLeft);
        game.physics.arcade.collide(player, wallRight);
        
        player.body.velocity.set(0);
        
        // Plyaer movement
        if (cursors.left.isDown)
        {
            player.body.velocity.x = -150;
            player.play('left');
        }
        else if (cursors.right.isDown)
            {
                player.body.velocity.x = 150;
                player.play('right');
            }
        else if (cursors.up.isDown)
            {
                player.body.velocity.y = -150;
                player.play('up');
            }
        else if (cursors.down.isDown)
            {
                player.body.velocity.y = 150;
                player.play('down');
            }
        else
            {
                player.animations.stop();
            }
        
        // Bullets
        
        if (game.input.activePointer.isDown)
            {
                shootUp();
            }
        /*else if (game.input.keyboard.isDown(Phaser.KeyCode.A))
            {
                shootLeft();
            }
        else if (game.input.keyboard.isDown(Phaser.KeyCode.S))
            {
                shootDown();
            }
        else if (game.input.keyboard.isDown(Phaser.KeyCode.D))
            {
                shootRight();
            }
        */
        
        // Bat summons
        if (totalBats < 5)
            {
                summonBat();
            }
        // Bat ai
        
        
    }
        
    function summonBat()
    {
        // Spawns bat outside of map  
        bat = game.add.sprite(game.world.randomX, game.world.randomY, 'bat');
        game.physics.enable(bat, Phaser.Physics.ARCADE);

        bat.enableBody = true;
        
        bat.animations.add('walk');
        bat.animations.play('walk', 8, true);
        
        game.physics.arcade.moveToObject(bat, player, 20);
        
        totalBats++;
    }
    
    function shootUp()
    {
        /*
        if (game.time.now > bulletTime)
            {
                bullet = bullets.getFirstExists(false);
                
                if (bullet)
                    {
                        bullet.reset(sprite.body.x + 16, sprite.body.y + 16);
                        bullet.lifespan = 2000;
                        bullet.rotation = sprite.rotation;
                        game.physics.arcade.velocityFromRotation(sprite.rotation, 400, bullet.body.velocity);
                        bulletTime = game.time.now + 50;
                    }
            }*/
        if (game.time.now > nextFire && bullets.countDead() > 0)
    {
        nextFire = game.time.now + fireRate;

        var bullet = bullets.getFirstDead();

        bullet.reset(sprite.x - 8, sprite.y - 8);

        game.physics.arcade.moveToPointer(bullet, 300);
    }
    }
    
    function shootDown()
    {
        
    }
    
    function shootLeft()
    {
        
    }
    
    function shootRight()
    {
        
    }
    
    function render()
    {
        
    }
};
