import tile from "./tile";
import map from "./map";
export default class chunk {
	//chunnks are size X size squares of tiles.
	x: number;
	y: number;
	size: number;
	tiles: Array < Array < tile >> = [];
	world: map;
	constructor(x: number, y: number, size: number, world: map) {
		this.x = x;
		this.y = y;
		this.size = size;
		this.world = world;

		for (var x: number = 0; x < this.size; x++) {
			this.tiles[x] = [];

			for (var y: number = 0; y < this.size; y++) {
				var t: tile = new tile(x, y, this);
				this.tiles[x][y] = t;
			}
		}
	}

	toString(): string {
		var str = "Chunk " + this.x + ":" + this.y + "\n";
		for (var x: number = 0; x < this.size; x++) {
			for (var y: number = 0; y < this.size; y++) {				
				str += this.tiles[x][y].getLocation() + "\n";
			}
		}
		return str;
	}
	tick = function() {

	}.bind(this);

}