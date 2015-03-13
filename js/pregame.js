'use strict';

var Battleships = {};

Battleships.pregame = function(game) {};
Battleships.pregame.prototype = {
	preload: function() {
		this.load.image('button', 'assets/button.png');
	},
	create: function() {
		this.add.button(this.world.centerX - 223, this.world.centerY - 75, 'button', this.changeState, this);
	},
	changeState: function() {
		this.game.state.start('Start');
	}
};
