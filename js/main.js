var game = new Phaser.Game(500, 500, Phaser.AUTO, 'battleships', { preload: preload, create: create, update: update, render: render });

var map;
var layer1;
var test;
var ships = [[3, 'y'], [4, 'y'], [6, 'y'], [2, 'y']];
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
}

function create() {
	game.stage.backgroundColor = '#000';

	map = game.add.tilemap();

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

	var test = Math.floor(Math.random() * 7);
	// var test2 = Math.floor(Math.random() * 9) + 1;
	// map.putTile(1, test, test2, layer2)
	// map.putTile(1, test + 1, test2, layer2)
	// map.putTile(1, test + 2, test2, layer2)

	layer2.alpha = 1;
}

var shipBoundaries;
var startingPoint;
var row;
var rowArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
var coords = [];
var jointcoords = [];

function renderShips() {
	for (var i = 0; i < ships.length; i++) { // this is for each ship
		shipBoundaries = Math.floor(10 - ships[i][0])
		startingPoint = Math.floor(Math.random() * shipBoundaries);
		row = rowArray[Math.floor(Math.random() * rowArray.length)];

		grid[row].splice(startingPoint, ships[i][0]); //delete the length of the ship starting from the start position
		rowArray.splice(row, 1);

		for (var y = 1; y < ships[i][0] + 1; y++) { // this is the ship size
			map.putTile(1, startingPoint, row, layer1);
			console.log(startingPoint, row)
			// delete grid[row][startingPoint];
			jointcoords = [startingPoint, row];
			coords.push(jointcoords);
			startingPoint += 1;
		}
	}


	// each random value should be removed from an array 
	// to avoid it being used again later (will later sort exceptions out, i.e they 
	// can be on same row if the distance between is greater than 2)
	// each x and y coord should be pushed to an array within an array
	// and be checked via - array[i][0] && array[i][0] were clicked 
}

function test() {
	console.log(coords)
	for (var i = 0; i < coords.length; i++) {
		// console.log(coords[i][0], coords[i][1])
		// console.log(coords[i][0],layer1.getTileX(game.input.activePointer.worldX))
		if (coords[i][0] === layer1.getTileX(game.input.activePointer.worldX) && coords[i][1] === layer1.getTileY(game.input.activePointer.worldY)) {
			console.log('hit')
			map.removeTile(layer1.getTileX(game.input.activePointer.worldX), layer1.getTileY(game.input.activePointer.worldY), layer2)
			// new array of 'hits' that have been hit
			// to avoid double clicks
		}
	}

}

function update() {
			layer1.events.onInputDown.add(test, this)
}

function render() {
}