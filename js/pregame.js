'use strict';

var Battleships = {};

Battleships.pregame = function(game) {};
Battleships.pregame.prototype = {
	preload: function() {
		this.load.image('button', 'assets/button.png');
		this.load.image('background', 'assets/background.jpg');
	},
	create: function() {
		this.add.tileSprite(0, 0, 700, 500, 'background');
		this.add.button(this.world.centerX - 223, this.world.centerY - 75, 'button', this.changeState, this);

	},
	changeState: function() {
		this.game.state.start('Start');
	}
};
