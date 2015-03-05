var game = new Phaser.Game(500, 500, Phaser.AUTO, 'battleships', { preload: preload, create: create, update: update, render: render });

var map;
var fx;
var layer1;
var test;
var ships = [[3, 'y'], [4, 'y'], [6, 'y'], [2, 'y'], [3, 'y'], [5, 'y']];
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

function preload() {
	game.load.image('test', 'assets/tilemap.png');
	game.load.audio('boom', ['assets/Audio/boom.mp3', 'assets/Audio/boom.ogg']); //sprite it
	game.load.audio('no', ['assets/Audio/nono.mp3', 'assets/Audio.nono.ogg']);
	game.load.audio('sfx', ['assets/Audio/audiosprite.mp3', 'assets/Audio.audiosprite/ogg']);
}

function create() {
	game.stage.backgroundColor = '#000';

	fx = game.add.audio('sfx');
	fx.allowMultiple = true;
	fx.addMarker('boom', 0, 1.0);
	fx.addMarker('noo', 1, 2.4);

	map = game.add.tilemap();

	map.addTilesetImage('', 'test', 50, 50);

	layer1 = map.create('tiles', 10, 10, 50, 50);
	layer1.resizeWorld();
	layer1.inputEnabled = true;


	for (var y = 0; y < 50; y++) {
		for (var i = 0; i < 50; i++) {
			map.putTile(0, i, y);
		}
	}

	plotShips();

	layer1.alpha = 0.9;
}

var shipBoundaries;
var xAxis;
var yAxis;
var yAxisPoints = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
var coords = [];
var jointcoords = [];

function plotShips() {
	for (var i = 0; i < ships.length; i++) { // this is for each ship
		shipBoundaries = Math.floor(10 - ships[i][0]);
		xAxis = Math.floor(Math.random() * shipBoundaries);
		yAxis = yAxisPoints[Math.floor(Math.random() * yAxisPoints.length)];
		grid[yAxis].splice(xAxis, ships[i][0]); //delete the length of the ship starting from the start position
		yAxisPoints.splice(yAxis, 1);

		for (var y = 1; y < ships[i][0] + 1; y++) {
			jointcoords = { 
				'name': [xAxis, yAxis], 
				Y: yAxis, 
				X: xAxis 
			};

			coords.push(jointcoords);
			xAxis += 1;
		}
	}
}

var clicked = [];


function renderTile() {
	var mouseX = game.input.activePointer.worldX;
	var mouseY = game.input.activePointer.worldY;
	var tileX = layer1.getTileX(mouseX);
	var tileY = layer1.getTileY(mouseY);

	for (var j = 0; j < clicked.length; j++) {
		if (clicked[j][0] === tileX && clicked[j][1] === tileY) {
			return false;
		}
	}

	for (var i = 0; i < coords.length; i++) {
		if (tileX === coords[i].X && tileY === coords[i].Y) {
			map.putTile(1, tileX, tileY);

			fx.stop('boom');
			fx.play('boom');

			break;
		} else {
			map.putTile(3, layer1.getTileX(mouseX), layer1.getTileY(mouseY), layer1);
		}

		// If the for loop ends and the last loop isnt a hit, play the sound to avoid looping
		if (i + 1 === coords.length && tileX !== coords[i].X) {
			fx.stop('noo');
			fx.play('noo');
		}

	}
	clicked.push([tileX, tileY]);
}

function update() {
	layer1.events.onInputDown.add(renderTile, this);
}

function render() {
}