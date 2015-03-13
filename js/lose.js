'use strict';

Battleships.lose = function(game) {};
Battleships.lose.prototype = {
	preload: function() {
		this.load.image('lost', 'assets/lost.jpg');

	},
	create: function() {
		this.add.image(0, 0, 'lost');
	}
};
