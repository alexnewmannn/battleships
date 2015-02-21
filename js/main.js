var game = new Phaser.Game(600, 600, Phaser.CANVAS, 'battleships', { preload: preload, create: create, update: update, render: render });

function preload() {
}

var map;
var player1;
var gridWidth;


var marker;
var tileX = 60;
var tileY = 60;

var counter = 0;
var tileNumber;
var colCounter;
var rowCounter;

function create() {
	game.stage.backgroundColor = '#b2b2b2';

	//pass through difficulties to change the size of grid.

	map = game.add.tilemap();

	player1 = map.create('player1', 10, 10, tileX, tileY);
	player1.resizeWorld();
	renderGrid();
	// game.input.addMoveCallback(showBorder, this);
}

function update() {

}

function render() {

}

function renderGrid() {
	gridWidth = Phaser.Math.floor(game.world.width / 10);
	gridHeight = Phaser.Math.floor(game.world.height / 10);
	var loop = 1;
	for (var i = 0; i <= 10; i++) {
		for (var y = 0; y <= 10; y++) {

			if (loop === 11) {
				return false;
			}
	var counter = 0;
	console.log(counter)
			renderRows(i, y);

			if (y === 10 && i === 10) {
				y = 0;
				i = 0;
				loop = ++loop;
			}
		}
	}
}

function renderRows(row, col) {

	tileNumber = counter + row;
	// console.log(row)
	rowCounter = row * 60;
	colCounter = col * 60;
	// console.log(rowCounter, colCounter)
	marker = game.add.graphics();
	marker.beginFill(0x000000, 0.2);
	marker.drawRect(rowCounter, colCounter, 60, 60);
	marker.endFill();

	// console.log(tileNumber)
	if (row === 10)  {
		rowCounter = counter + 60;
	}
	if (col === 10) {
		colCounter = counter + 60;
	}
}