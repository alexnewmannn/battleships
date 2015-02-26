var game = new Phaser.Game(500, 500, Phaser.AUTO, 'battleships', { preload: preload, create: create, update: update, render: render });

var map;
var layer1;
var test;

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

	var test = Math.floor(Math.random() * 7);
	var test2 = Math.floor(Math.random() * 9) + 1;
	map.putTile(1, test, test2, layer2)
	map.putTile(1, test + 1, test2, layer2)
	map.putTile(1, test + 2, test2, layer2)

	layer2.alpha = 0.3
}

function update() {
	if (game.input.mousePointer.isDown) {
	}
}

function render() {

}