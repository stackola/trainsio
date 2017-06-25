import Game = require("./Game.js");
import Chunk = require("./Chunk.js");

class Tile {
	x:number;
	y:number;	
	chunk:Chunk;
	constructor(x:number, y:number, chunk: Chunk) {		
		this.x=x;
		this.y=y;
		this.chunk = chunk;
	}
}

export = Tile;