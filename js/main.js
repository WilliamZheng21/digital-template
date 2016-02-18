window.onload = function() {

    "use strict";
    
    var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    var wallTop;
    var wallBot;
    var wallLeft;
    var wallRight;
    var door;
    
    var oneblock;
    var twoblockside;
    var twoblockvert;
    var threeblockside;
    var threeblockvert;
    var fiveblockside;
    var sixblock;
    var eightblock;
    var eightblocktwo;
    
    var cursors;
    var player;
    var left;
    var right;

    var bat;
    var totalBats = 0;
    
    var timer = 0;
    var bgMusic;
    var sounds;
    var current;
    var loopCount = 0;
    
    var end;
    
    function preload() 
    {
        game.load.spritesheet('player', 'assets/player_sprite.png', 50, 50, 8);
        game.load.spritesheet('bat', 'assets/bat_sprite.png', 45, 36, 4);
        game.load.image('floor', 'assets/Floor.png' );
        game.load.image('wallTop', 'assets/wall_bound_top.png');
        game.load.image('wallBot', 'assets/wall_bound_bot.png');
        game.load.image('wallLeft', 'assets/wall_bound_left.png');
        game.load.image('wallRight', 'assets/wall_bound_right.png');
        game.load.image('door', 'assets/opening.png');
        game.load.image('1block', 'assets/1block.png');
        game.load.image('2blockside', 'assets/2blockside.png');
        game.load.image('2blockvert', 'assets/2blockvert.png');
        game.load.image('3blockside', 'assets/3blockside.png');
        game.load.image('3blockvert', 'assets/3blockvert.png');
        game.load.image('5blockside', 'assets/5blockside.png');
        game.load.image('6block', 'assets/6block.png');
        game.load.image('8block', 'assets/8block.png');
        game.load.audio('bgMusic', 'assets/Abyss.mp3');
        game.load.image('end', 'assets/end.png');

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

        // Opening
        door = game.add.sprite(368, 30, 'door');
        game.physics.enable(door, Phaser.Physics.ARCADE);
        door.body.immovable = true;
        
        // Maze setup
        oneblock = game.add.sprite(199, 124, '1block');
        oneblock = game.add.sprite(405, 125, '1block');
        oneblock = game.add.sprite(558, 175, '1block'); 
        oneblock = game.add.sprite(405, 228, '1block');
        oneblock = game.add.sprite(199, 380, '1block');
        oneblock = game.add.sprite(252, 483, '1block');
        oneblock = game.add.sprite(713, 380, '1block');
        oneblock = game.add.sprite(98, 277, '1block');
        twoblockside = game.add.sprite(47, 124, '2blockside');
        twoblockside = game.add.sprite(508, 480, '2blockside');
        twoblockside = game.add.sprite(459, 175, '2blockside');
        threeblockvert = game.add.sprite(304, 75, '3blockvert');
        eightblock = game.add.sprite(306, 430, '8block');
        fiveblockside = game.add.sprite(154,227, '5blockside');
        eightblocktwo = game.add.sprite(510, 280, '8block');
        twoblockvert = game.add.sprite(510, 74, '2blockvert');
        
        game.physics.enable(oneblock, Phaser.Physics.ARCADE);
        game.physics.enable(twoblockside, Phaser.Physics.ARCADE);
        game.physics.enable(threeblockvert, Phaser.Physics.ARCADE);
        game.physics.enable(fiveblockside, Phaser.Physics.ARCADE);
        game.physics.enable(eightblock, Phaser.Physics.ARCADE);
        game.physics.enable(eightblocktwo, Phaser.Physics.ARCADE);
        game.physics.enable(twoblockvert, Phaser.Physics.ARCADE);
        
        oneblock.body.immovable = true;
        twoblockside.body.immovable = true;
        threeblockvert.body.immovable = true;
        fiveblockside.body.immovable = true;
        eightblock.body.immovable = true;
        eightblocktwo.body.immovable = true;
        twoblockvert.body.immovable = true;
        
        // Player
        player = game.add.sprite(710, 530, 'player', 2);
        player.smoothed = false;
        
        left = player.animations.add('left', [0,1], 8, true);
        right = player.animations.add('right', [6,7], 8, true);
        player.animations.add('up', [4,5], 8, true);
        player.animations.add('down', [2,3], 8, true);
        
        left.enableUpdate = true;
        right.enableUpdate = true;
        
        game.physics.enable(player, Phaser.Physics.ARCADE);
        
        game.camera.follow(player);
        
        //input
        cursors = game.input.keyboard.createCursorKeys();

        bgMusic = game.add.audio('bgMusic');
        bgMusic.play();
    }
    
    function update() 
    {   
        // Wall collision
        game.physics.arcade.collide(player, wallTop);
        game.physics.arcade.collide(player, wallBot);
        game.physics.arcade.collide(player, wallLeft);
        game.physics.arcade.collide(player, wallRight);
        game.physics.arcade.collide(player, oneblock);
        game.physics.arcade.collide(player, twoblockside);
        game.physics.arcade.collide(player, eightblock);
        game.physics.arcade.collide(player, eightblocktwo);
        game.physics.arcade.collide(player, fiveblockside);
        game.physics.arcade.collide(player, threeblockvert);
        game.physics.arcade.collide(player, twoblockvert);
        
        // Escape
        game.physics.arcade.collide(player, door, collisionHandler, null, this);
        
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

        // Bat summons
        if (totalBats < 5)
            {
                summonBat();
            }
        
        // Music
        if (!(bgMusic.isPlaying))
            {
                bgMusic.play();
            }
          
    }
        
    function start() 
    {
        sounds.shift();
        
        bgMusic.loopFull(1);
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
    
    function collisionHandler (obj1, obj2)
    {
        game.world.removeAll();
        var end = game.load.sprite(266, 264, 'end');
    }
   
};
