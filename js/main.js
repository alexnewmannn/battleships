var game = new Phaser.Game(500, 500, Phaser.AUTO, 'battleships', { preload: preload, create: create, update: update, render: render });

var map;
var boom;
var miss;
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
}

function create() {
	game.stage.backgroundColor = '#000';

	map = game.add.tilemap();
	boom = game.add.audio('boom');
	miss = game.add.audio('no');

	map.addTilesetImage('', 'test', 50, 50);

	layer1 = map.create('tiles', 10, 10, 50, 50);
	layer1.resizeWorld();
	layer1.inputEnabled = true;

	layer2 = map.createBlankLayer('layer2', 10, 10, 50, 50);


	for (var y = 0; y < 50; y++) {
		for (var i = 0; i < 50; i++) {
			map.putTile(0, i, y, layer2)
		}
	}

	renderShips();

	// layer2.alpha = 0.9;
}

var shipBoundaries;
var xAxis;
var yAxis;
var yAxisPoints = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
var coords = [];
var jointcoords = [];

function renderShips() {
	for (var i = 0; i < ships.length; i++) { // this is for each ship
		shipBoundaries = Math.floor(10 - ships[i][0])
		xAxis = Math.floor(Math.random() * shipBoundaries);
		yAxis = yAxisPoints[Math.floor(Math.random() * yAxisPoints.length)];
		grid[yAxis].splice(xAxis, ships[i][0]); //delete the length of the ship starting from the start position
		yAxisPoints.splice(yAxis, 1);

		for (var y = 1; y < ships[i][0] + 1; y++) { // this is the ship size
			map.putTile(1, xAxis, yAxis, layer1);
			
			jointcoords = { 
				'name': [xAxis, yAxis], 
				Y: yAxis, 
				X: xAxis 
			};
			coords.push(jointcoords);
			xAxis += 1;
		}
	}


	// each random value should be removed from an array 
	// to avoid it being used again later (will later sort exceptions out, i.e they 
	// can be on same row if the distance between is greater than 2)
	// each x and y coord should be pushed to an array within an array
	// and be checked via - array[i][0] && array[i][0] were clicked 
}

function test() {
	var mouseX = game.input.activePointer.worldX;
	var mouseY = game.input.activePointer.worldY;
	var tileX = layer1.getTileX(mouseX);
	var tileY = layer1.getTileY(mouseY);

	for (var i = 0; i < coords.length; i++) {
		if (tileX === coords[i].X && tileY === coords[i].Y) {
			map.removeTile(layer1.getTileX(mouseX), layer1.getTileY(mouseY), layer2)
			boom.play();
			break;
		} else {
			// miss.play();
			map.putTile(2, layer1.getTileX(mouseX), layer1.getTileY(mouseY), layer2)
		}

		console.log(i)
		console.log(coords.length)

		if (i + 1 === coords.length) {
			miss.play();
		}
	}
}

function update() {
	layer1.events.onInputDown.add(test, this)
}

function render() {
}