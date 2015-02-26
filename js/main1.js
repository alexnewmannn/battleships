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
var shipImages = [];

function preload() {
	tileX = game.world.width / 10;
	tileY = game.world.height / 10;

	game.load.image('ship4', 'assets/4ship.png');
	game.load.image('ship3', 'assets/3ship.png');
	game.load.image('ship2', 'assets/2ship.png');
	game.load.image('background', 'assets/background.jpg');

	game.load.image('spacer', 'assets/spacer.png')

	ships = ['ship4', 'ship3', 'ship2']; // pass in the asset name
}

function create() {
	var background = game.add.tileSprite(0, 0, 500, 500, 'background');
	game.stage.backgroundColor = '#444444';
	renderGrid();
	renderShips();
	for (var j = 0; j < shipImages.length; j++) {
		game.physics.enable(shipImages[j], Phaser.Physics.ARCADE);
		shipImages[j].body.immovable = true;
		// shipImages[j].body.setSize(shipImages[j].body.width + 100, shipImages[j].body.height + 100, -50, -50)
		shipImages[j].body.collideWorldBounds = true; // note this should actually prevent the use of filtered array below.
		//maybe create a mask with a sprite the size of 1 square, this will take the mouse click position
		// and snap it to the nearest grid point to prevent any overlaps.
	}

}

function update() {
	// game.input.onDown.add(detectShip, this);
}

function render() {

}
var mask;
function detectShip(ship) {
	ship.alpha = 1;
	mask = game.add.graphics(0, 0);
	mask.beginFill(0xffffff);
	mask.drawRect(ship.position.x, ship.position.y, 50, 50)
	ship.mask = mask
	console.log(ship)
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
		shipImages.push(game.add.sprite(filteredArray[Math.floor(Math.random() * filteredArray.length)], filteredArray[Math.floor(Math.random() * filteredArray.length)], ships[i]));
	}

	for (var j = 0; j < shipImages.length; j++) {
		shipImages[j].inputEnabled = true;
		shipImages[j].alpha = 0.8; // set this to 0 when not developing
		shipImages[j].boundingBox = true // bounding box and bounding box offset
		shipImages[j].events.onInputDown.add(detectShip, this) // move to update
	}
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