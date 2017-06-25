import Game = require("./Game.js");
import Tile = require("./Tile.js");

class Chunk {
	created: Date | null = null;
	updated: Date | null = null;
	game: Game;
	gameObject: THREE.Mesh;
	tiles: Array<Tile>;
	constructor(obj: {
		position: {
			x: number,
			y: number
		},
		size: number
	}, game: Game) {
		// create 
		this.game = game;
		var now = new Date();
		this.created = now;
		this.updated = now;

		//draw box
		var geometry: THREE.CubeGeometry = new this.game.THREE.CubeGeometry(obj.size, obj.size, 1);
		geometry.scale(0.9, 0.9, 0.9);
		var material = new this.game.THREE.MeshBasicMaterial({
			color: 0xFFFFFF
		});
		this.gameObject = new this.game.THREE.Mesh(geometry, material);
		this.gameObject.translateX(obj.position.x * obj.size);
		this.gameObject.translateY(obj.position.y * obj.size);
		console.log("created chunk", this.gameObject.position);
		this.game.floor.add(this.gameObject);

	}
}

export = Chunk;