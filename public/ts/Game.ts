import Vector = require("./model/Vector.js");
class Game {
	game: Phaser.Game;
	size: Vector;
	constructor() {

	}

	init(mapSize: Vector): void {
		this.size = mapSize;
		this.game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', {
			preload: this.preload,
			create: this.create,
			update: this.update,
			render: this.render
		});
	}

	preload = function() {

	}.bind(this);

	create = function() {
		this.game.world.setBounds(0, 0, this.size.x, this.size.y);
	}.bind(this);

	update = function() {
		// get current state from gamestatemanager
		// update all elements in gamestate
		// remove elements not in gamestate
	}.bind(this);

	render = function() {
		this.game.debug.cameraInfo(this.game.camera, 32, 32);
	}.bind(this);
}

export = Game;