var game = new Phaser.Game(500, 500, Phaser.AUTO, 'battleships', { preload: preload, create: create, update: update, render: render });

var tile;
var tileX;
var tileY;
var ships = [];
var plotX = [0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500];
var arrayX = [];
var arrayY = [];
var calculateWidth = [];
var filteredArray = [];

function preload() {
	tileX = game.world.width / 10;
	tileY = game.world.height / 10;

	game.load.image('ship4', 'assets/4ship.png');
	game.load.image('ship3', 'assets/3ship.png');
	game.load.image('ship2', 'assets/2ship.png');
	game.load.image('background', 'assets/background.jpg');

	ships = ['ship4', 'ship3', 'ship2']; // pass in the asset name
}

function create() {
	var background = game.add.tileSprite(0, 0, 500, 500, 'background');
	game.stage.backgroundColor = '#444444';
	renderGrid();
	renderShips();
}

function update() {
	game.input.onDown.add(detectShip, this);
}

function render() {

}

function detectShip() {
	console.log('hi');
}

function calculatePosition(value) {
	for (var i = 0; i < ships.length; i++) {
		calculateWidth.push(Phaser.Math.floor(game.world.width - game.cache.getImage(ships[i]).width));
	}
}

function filterValue(maxWidth) {
	return function(value) {
		return value <= calculateWidth[maxWidth];
	};
}

function renderShips() {
	calculatePosition();

	for (var i = 0; i < calculateWidth.length; i++) {
		filteredArray = plotX.filter(filterValue(i));
		game.add.image(filteredArray[Math.floor(Math.random() * filteredArray.length)], filteredArray[Math.floor(Math.random() * filteredArray.length)], ships[i]);
	}

	console.log(sprite.width)
}

function renderGrid() {
	// Here the current iteration is multiplied by the width of each tile
	for (var x = 0; x < 10; x++) {
		for (var y = 0; y < 10; y++) {
			posX = x * tileX;
			posY = y * tileY;

			tile = game.add.graphics();
			tile.lineStyle(1, 0x00ffff, 0.2);
			tile.drawRect(posX, posY, tileX, tileY); // Then the above math is applied to the position of rect
			tile.endFill();
		}
	}
}