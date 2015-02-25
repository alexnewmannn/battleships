var game = new Phaser.Game(500, 500, Phaser.AUTO, 'battleships', { preload: preload, create: create, update: update, render: render });

var map;
var layer1;


function preload() {
	game.load.image('test', 'assets/tilemap.png');
}

function create() {
	game.stage.backgroundColor = '#000';

	map = game.add.tilemap();

	map.addTilesetImage('', 'test', 50, 50);

	layer1 = map.create('tiles', 10, 10, 50, 50);
	layer1.resizeWorld();


	for (var y = 0; y < 50; y++) {
		for (var i = 0; i < 50; i++) {
			console.log(i, y)
			map.putTile(0, i, y, layer1)
		}
	}
}

function update() {
	if (game.input.mousePointer.isDown) {
		// console.log(layer1.getTileX(game.input.activePointer.worldX * 50))
	}
}

function render() {

}