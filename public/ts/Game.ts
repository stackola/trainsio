import Vector = require("./model/Vector.js");
class Game {
	constructor() {

	}
	init(mapSize:Vector):void{
		var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', {
			preload: this.preload,
			create: this.create,
			update: this.update,
			render: this.render
		});
	}

	preload():void{

	}
	create():void{

	}
	update():void{

	}
	render():void{

	}



}

export = Game;