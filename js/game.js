'use strict';
var fx;
var background;

var shipBoundaries;
var ships = [[3, 'y'], [4, 'y'], [6, 'y'], [2, 'y'], [3, 'y'], [5, 'y']];

var xAxis;
var yAxis;
var yAxisPoints = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
var index;

var coords = [];
var jointcoords = [];
var grid = [
	[0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
	[0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
	[0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
	[0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
	[0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
	[0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
	[0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
	[0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
	[0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
	[0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
];

var clicked = [];
var shipCount = 0;
var missCount = 0;
var initialCount;
var displayCount;
var countDescription;

var winText;

Battleships.start = function(game) {};

Battleships.start.prototype = {
	preload: function() {
		this.load.spritesheet('hit', 'assets/hit.png', 50, 50);
		this.load.spritesheet('miss', 'assets/miss.png', 50, 50);
		this.load.image('background', 'assets/background.jpg');
		this.load.image('win', 'assets/win.png');
		this.load.audio('sfx', ['assets/Audio/audiosprite.mp3', 'assets/Audio.audiosprite/ogg']);
	},

	create: function() {
		this.game.stage.backgroundColor = '#14232d';

		fx = this.add.audio('sfx');
		fx.allowMultiple = true;
		fx.addMarker('boom', 0, 1.0);
		fx.addMarker('noo', 1, 2.4);

		background = this.add.sprite(0, 0, 'background');
		background.inputEnabled = true;

		for (var y = 0; y < 10; y++) {
			for (var i = 0; i < 10; i++) {
				var graphs = this.add.graphics();
				graphs.lineStyle(2, 0xffffff, 0.1);
				graphs.drawRect(i * 50, y * 50, 50, 50);
				graphs.endFill();
			}
		}

		this.plotships();
	},

	plotships: function() {
		for (var i = 0; i < ships.length; i++) { // this is for each ship
			shipCount += ships[i][0];
			shipBoundaries = Math.floor(10 - ships[i][0]);
			xAxis = Math.floor(Math.random() * shipBoundaries);
			yAxis = yAxisPoints[Math.floor(Math.random() * yAxisPoints.length)];
			index = yAxisPoints.indexOf(yAxis);
			yAxisPoints.splice(index, 1);

			for (var y = 1; y < ships[i][0] + 1; y++) {
				grid[yAxis][xAxis] = 'X';
				jointcoords = {
					Y: yAxis,
					X: xAxis
				};

				coords.push(jointcoords);
				xAxis += 1;
			}
		}
		initialCount = shipCount;

		this.createText();
	},


	renderTile: function() {
		var tileX = this.math.snapToFloor(this.input.x, 50) / 50;
		var tileY = this.math.snapToFloor(this.input.y, 50) / 50;

		for (var j = 0; j < clicked.length; j++) {
			if (clicked[j][0] === tileX && clicked[j][1] === tileY) {
				return false;
			}
		}

		if (_.isEmpty(_.where(coords, {X: tileX, Y: tileY}))) {
			this.miss(tileX, tileY);
		} else {
			this.placeHit(tileX, tileY);
		}

		clicked.push([tileX, tileY]);
	},

	update: function() {
		background.events.onInputDown.add(this.renderTile, this);
	},

	createText: function() {
		displayCount = this.add.text(574, 70, shipCount , {
			font: '45px Arial',
			fill: '#d74848',
			align: 'center',
			fontWeight: 'bold'
		});

		countDescription = this.add.text(502, 130, 'LEFT TO FIND!', {
			font: '28px Arial',
			fill: '#f7f85f',
			align: 'center',
			fontWeight: 'bold'
		});

		winText = this.add.text(530, 300, 'Click button \nto win!', {
			font: '25px Comic Sans, Comic Sans MS',
			fill: '#fff',
			align: 'center'
		});

		this.add.button(555, this.world.centerY + 150, 'win', this.changeState, this);
	},

	placeHit: function(tileX, tileY) {
		var spriteTest = this.add.sprite(tileX * 50, tileY * 50, 'hit', 1);
		spriteTest.animations.add('hit', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], false);
		spriteTest.animations.play('hit');
		shipCount--;
		displayCount.setText(shipCount);

		if (shipCount === 0) {
			this.game.state.start('Win');
			shipCount = initialCount;
		}

		fx.stop('boom');
		fx.play('boom');
	},

	miss: function(tileX, tileY) {
		var missSprite = this.add.sprite(tileX * 50, tileY * 50, 'miss', 1);

		missSprite.animations.add('miss', null, false);
		missSprite.animations.play('miss');

		missCount++;

		fx.stop('noo');
		fx.play('noo');

		if (missCount === 70) {
			this.game.state.start('Lose');
		}
	},

	changeState: function() {
		this.game.state.start('Win');
	}
};