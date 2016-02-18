window.onload = function() {

    "use strict";
    
    var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    function preload() {
        game.load.image( 'floor', 'assets/Floor.png' );
        game.load.spritesheet( 'player', 'assets/player_sprite.png', 50, 50, 8);
    }
    
    function create() {
        // Floor background
        game.add.sprite(0, 0, 'floor');
        
        var player = game.add.sprite(300, 200, 'player');
        var walk = player.animations.add('walk');
        
        player.animations.play('walk', 1, true);
    }
    
    function update() {
    }
};
