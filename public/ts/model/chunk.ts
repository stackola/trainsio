import Game = require("./Game.js");
import Tile = require("./Tile.js");

class Chunk {
	created: Date | null = null;
	updated: Date | null = null;
	game: Game;
	gameObject: THREE.Mesh;
	tiles: Array<Tile>=[];
	constructor(obj: {
		position: {
			x: number,
			y: number
		},
		size: number,
		tiles: Array<any>
	}, game: Game) {

		// create 
		this.game = game;
		var now = new Date();
		this.created = now;
		this.updated = now;

		
		this.gameObject = new this.game.THREE.Mesh();
		this.gameObject.translateX(obj.position.x * obj.size);
		this.gameObject.translateY(obj.position.y * obj.size);
	
		this.game.floor.add(this.gameObject);

		for (var i = 0; i < obj.tiles.length; ++i) {
			this.tiles.push(new Tile(obj.tiles[i], this));
		}

	}
	update(obj:any):void{
		for (var i = 0; i < obj.tiles.length; ++i) {
			this.tiles[i].update(obj.tiles[i]);
		}
	}


}

export = Chunk;