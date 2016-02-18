window.onload = function() {

    "use strict";
    
    var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    var cursors;
    var player;
    var left;
    var right;
    
    function preload() {
        game.load.image( 'floor', 'assets/Floor.png' );
        game.load.spritesheet( 'player', 'assets/player_sprite.png', 50, 50, 8);
    }
    
    function create() {
        // Floor background
        game.add.sprite(0, 0, 'floor');
        
        player = game.add.sprite(300, 200, 'player', 3);
        player.smoothed = false;
        
        left = player.animations.add('left', [1,2], 60, true);
        right = player.animations.add('right', [7,8], 60, true);
        player.animations.add('up', [5,6], 60, true);
        player.animations.add('down', [3,4], 60, true);
        
        left.enableUpdate = true;
        right.enableUpdate = true;
        
        game.physics.enable(player, Phaser.Physics.ARCADE);
        
        game.camera.follow(player);
        
        cursors = game.input.keyboard.createCursorKeys();
    }
    
    function update() {
        player.body.velocity.set(0);
        
        if (cursors.left.isDown)
        {
            player.body.velocity.x = -50;
            player.play('left');
        }
        else if (cursors.right.isDown)
            {
                player.body.velocity.x = 50;
                player.play('right');
            }
        else if (cursors.up.isDown)
            {
                player.body.velocity.y = -50;
                player.play('up');
            }
        else if (cursors.down.isDown)
            {
                player.body.velocity.y = 50;
                player.play('down');
            }
        else
            {
                player.animations.stop();
            }
    }
    
};
