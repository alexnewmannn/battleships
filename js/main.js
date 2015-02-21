var game = new Phaser.Game(500, 500, Phaser.AUTO, 'battleships', { preload: preload, create: create, update: update, render: render });

var tileX;
var tileY;

function preload() {
	tileX = game.world.width / 10;
	tileY = game.world.height / 10;
}

var map;
var player1;


var tile;


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
	game.input.onDown.add(detectShip, this);
}

function update() {
}

function render() {

}

function detectShip() {
	console.log(map)
	console.log(map.getTileWorldXY(30, 30))
}

function renderGrid() {
	for (var i = 0; i < 10; i++) {
		for (var y = 0; y < 10; y++) {
			renderRows(i, y);
		}
	}
}

function renderRows(posX, posY) {
	posX = posX * tileX;
	posY = posY * tileY;

	tile = game.add.graphics();
	tile.lineStyle(2, 0xffffff, 1);
	tile.beginFill(0x000000, 1);
	tile.drawRect(posX, posY, tileX, tileY);
	tile.endFill();
}