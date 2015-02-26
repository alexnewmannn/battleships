var game = new Phaser.Game(500, 500, Phaser.AUTO, 'battleships', { preload: preload, create: create, update: update, render: render });

var map;
var layer1;
var test;
var ships = [[3, 'y'], [4, 'y'], [6, 'y']];
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

	layer2 = map.createBlankLayer('layer2', 10, 10, 50, 50);


	for (var y = 0; y < 50; y++) {
		for (var i = 0; i < 50; i++) {
			map.putTile(0, i, y, layer1)
		}
	}

	renderShips();

	var test = Math.floor(Math.random() * 7);
	// var test2 = Math.floor(Math.random() * 9) + 1;
	// map.putTile(1, test, test2, layer2)
	// map.putTile(1, test + 1, test2, layer2)
	// map.putTile(1, test + 2, test2, layer2)

	layer2.alpha = 0.3
}

var shipBoundaries;
var startingPoint;
var row;
var rowArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function renderShips() {
	for (var i = 0; i < ships.length; i++) { // this is for each ship
		shipBoundaries = Math.floor(10 - ships[i][0])
		startingPoint = Math.floor(Math.random() * shipBoundaries);
		row = rowArray[Math.floor(Math.random() * rowArray.length)];
		console.log(row)
		console.log(startingPoint, ships[i][0])

		grid[row].splice(startingPoint, ships[i][0]); //delete the length of the ship starting from the start position
		rowArray.splice(row, 1);

		for (var y = 1; y < ships[i][0] + 1; y++) { // this is the ship size
			map.putTile(1, startingPoint, row, layer2);
			// delete grid[row][startingPoint];
			startingPoint += 1;
		}
		console.log(grid)

	}


	// each random value should be removed from an array 
	// to avoid it being used again later (will later sort exceptions out, i.e they 
	// can be on same row if the distance between is greater than 2)
	// each x and y coord should be pushed to an array within an array
	// and be checked via - array[i][0] && array[i][0] were clicked 
}

function update() {
	if (game.input.mousePointer.isDown) {
	}
}

function render() {

}