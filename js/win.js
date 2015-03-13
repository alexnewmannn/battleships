'use strict';
var background;
var bae;
var text;
var boom;

Battleships.win = function(game) {};
Battleships.win.prototype = {
	preload: function() {
		this.load.image('flames', 'assets/flames.jpg');
		this.load.image('cathy', 'assets/bae.png');
		this.load.audio('jam', ['assets/Audio/boomboomboom.mp3', 'assets/Audio.boomboomboom.ogg']);

	},
	create: function() {
		boom = this.add.audio('jam');
		boom.play();

		background = this.add.tileSprite(0, 0, 700, 500, 'flames');
		bae = this.add.sprite(this.world.centerX - 136, this.world.centerY - 146, 'cathy');

		text = this.add.text(100, 100, 'You won! \nYou r00l d00d!!!', {
			font: '40px Comic Sans, Comic Sans MS',
			fill: '#fff',
			align: 'center'
		});

		var gradient = text.context.createLinearGradient(0, 0, 0, text.height - 10);
		gradient.addColorStop(0, '#0f0');
		gradient.addColorStop(1, '#f0c');

		text.fill = gradient;
		text.setShadow(3, 0, 'rgba(255, 255, 255, 0.5)', 0);
	},
	update: function() {
		background.tilePosition.y += 1;
		background.tilePosition.x += 1;

		text.position.x += 8;

		if (text.position.x >= 500 + text.width) {
			text.position.x = -text.width;
		}
	}
};
