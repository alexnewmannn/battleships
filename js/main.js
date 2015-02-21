var game = new Phaser.Game(500, 500, Phaser.AUTO, 'battleships', { preload: preload, create: create, update: update, render: render });

var tile;
var tileX;
var tileY;
var plotX = [0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500];

function preload() {
	tileX = game.world.width / 10;
	tileY = game.world.height / 10;

	game.load.image('ship4', 'assets/4ship.png');
	game.load.image('background', 'assets/background.jpg')
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
	return value <= Phaser.Math.floor(game.world.width - game.cache.getImage('ship4').width);
}

function renderShips() {
	var myArray = plotX.filter(calculatePosition);
	var randomX = myArray[Math.floor(Math.random() * myArray.length)];
	game.add.image(randomX, 0, 'ship4')
}

function renderGrid() {
	// Here the current iteration is multiplied by the width of each tile
	for (var x = 0; x < 10; x++) {
		for (var y = 0; y < 10; y++) {
			posX = x * tileX;
			posY = y * tileY;

			tile = game.add.graphics();
			tile.lineStyle(2, 0x00ff00, 0.2);
			tile.drawRect(posX, posY, tileX, tileY); // Then the above math is applied to the position of rect
			tile.endFill();
		}
	}
}