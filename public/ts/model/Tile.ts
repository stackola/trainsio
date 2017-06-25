import Game = require("./Game.js");
import Chunk = require("./Chunk.js");
import Vector = require("./Vector.js");

class Tile {
	position: Vector;
	chunk: Chunk;
	gameObject: THREE.Mesh;
	constructor(obj: any, chunk: Chunk) {
		this.position = new Vector(obj.position.x, obj.position.y);
		this.chunk = chunk;
		//console.log("created tile", this.position);

		var geometry: THREE.CubeGeometry = new this.chunk.game.THREE.CubeGeometry(1, 1, 1);
		geometry.scale(0.9, 0.9, 0.9);
		var material = new this.chunk.game.THREE.MeshBasicMaterial({
			color: 0xff0000
		});
		this.gameObject = new this.chunk.game.THREE.Mesh(geometry, material);
		this.gameObject.translateX(this.position.x);
		this.gameObject.translateY(this.position.y);
		this.chunk.gameObject.add(this.gameObject);

	}
}

export = Tile;