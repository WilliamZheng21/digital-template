window.onload = function() {

    "use strict";
    
    var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    function preload() {
        // Load an image and call it 'logo'.
        game.load.image('Logo', 'assets/phaser.png')
        game.load.image( 'floor', 'assets/Floor.png' );
    }
    
    var bouncy;
    
    function create() {
        // Floor background
        game.add.sprite(0, 0, 'floor');
    }
    
    function update() {
    }
};
