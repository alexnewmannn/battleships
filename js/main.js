'use strict';

var game = new Phaser.Game(700, 500, Phaser.AUTO, 'battleships', { preload: preload, create: create, update: update, render: render });

var fx;
var ships = [[3, 'y'], [4, 'y'], [6, 'y'], [2, 'y'], [3, 'y'], [5, 'y']];
var background;
var displayCount;
var countDescription;
var shipBoundaries;
var xAxis;
var yAxis;
var yAxisPoints = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
var coords = [];
var jointcoords = [];
var shipCount = 0;
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

var WebFontConfig = {
	active: function() {
		game.time.events.add(Phaser.Timer.SECOND, createText, this);
	},
	google: {
		families: ['Inconsolata']
	}
};

function preload() {
	game.load.spritesheet('hit', 'assets/hit.png', 50, 50);
	game.load.spritesheet('miss', 'assets/miss.png', 50, 50);
	game.load.image('background', 'assets/background.jpg');
	game.load.audio('boom', ['assets/Audio/boom.mp3', 'assets/Audio/boom.ogg']); //sprite it
	game.load.audio('no', ['assets/Audio/nono.mp3', 'assets/Audio.nono.ogg']);
	game.load.audio('sfx', ['assets/Audio/audiosprite.mp3', 'assets/Audio.audiosprite/ogg']);

	game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
}

function create() {
	game.stage.backgroundColor = '#14232d';

	fx = game.add.audio('sfx');
	fx.allowMultiple = true;
	fx.addMarker('boom', 0, 1.0);
	fx.addMarker('noo', 1, 2.4);

	background = game.add.sprite(0, 0, 'background');
	background.inputEnabled = true;

	for (var y = 0; y < 10; y++) {
		for (var i = 0; i < 10; i++) {
			var graphs = game.add.graphics();
			graphs.lineStyle(2, 0xffffff, 0.1);
			graphs.drawRect(i * 50, y * 50, 50, 50);
			graphs.endFill();
		}
	}

	plotShips();
}

function createText() {
	displayCount = game.add.text(574, 70, shipCount , {
		font: '45px Inconsolata',
		fill: '#d74848',
		align: 'center',
		fontWeight: 'bold'
	});
	countDescription = game.add.text(512, 130, 'LEFT TO FIND!', {
		font: '28px Inconsolata',
		fill: '#f7f85f',
		align: 'center',
		fontWeight: 'bold'
	});
}

function plotShips() {
	for (var i = 0; i < ships.length; i++) { // this is for each ship
		shipCount += ships[i][0];
		shipBoundaries = Math.floor(10 - ships[i][0]);
		xAxis = Math.floor(Math.random() * shipBoundaries);
		yAxis = yAxisPoints[Math.floor(Math.random() * yAxisPoints.length)];
		grid[yAxis].splice(xAxis, ships[i][0]); //delete the length of the ship starting from the start position
		yAxisPoints.splice(yAxis, 1);

		for (var y = 1; y < ships[i][0] + 1; y++) {
			jointcoords = {
				Y: yAxis,
				X: xAxis
			};

			coords.push(jointcoords);
			xAxis += 1;
		}
	}
	console.log(jointcoords)
}

var clicked = [];


function renderTile() {
	var tileX = game.math.snapToFloor(game.input.x, 50) / 50;
	var tileY = game.math.snapToFloor(game.input.y, 50) / 50;

	for (var j = 0; j < clicked.length; j++) {
		if (clicked[j][0] === tileX && clicked[j][1] === tileY) {
			return false;
		}
	}

	if (_.isEmpty(_.where(coords, {X: tileX, Y: tileY}))) {
		miss(tileX, tileY);
	} else {
		placeHit(tileX, tileY);
	}

	clicked.push([tileX, tileY]);
}

function update() {
	background.events.onInputDown.add(renderTile, this);
}

function render() {
}

function placeHit(tileX, tileY) {
	var spriteTest = game.add.sprite(tileX * 50, tileY * 50, 'hit', 1);
	spriteTest.animations.add('hit', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], false);
	spriteTest.animations.play('hit');
	shipCount--;
	displayCount.setText(shipCount)

	// fx.stop('boom');
	// fx.play('boom');
}

function miss(tileX, tileY) {
	var missSprite = game.add.sprite(tileX * 50, tileY * 50, 'miss', 1);
	missSprite.animations.add('miss', null, false);
	missSprite.animations.play('miss');
}