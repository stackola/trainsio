import Vector = require("./model/Vector.js");


class Game {
	size: Vector;
	constructor() {

	}

	init(mapSize: Vector): void {
		this.size = mapSize;
	
	}
}

export = Game;