import tile from "./tile";
export default class map {
	// initialize tiles array
	sizeX: number;
	sizeY: number;
	tiles: Array < Array < tile >>
		constructor(sx: number, sy: number) {
			this.tiles = [];
			this.sizeX = sx;
			this.sizeY = sy;
			for (var x: number = 0; x < this.sizeX; x++) {
				this.tiles[x] = [];

				for (var y: number = 0; y < this.sizeY; y++) {
					var t: tile = new tile(x, y, this);
					this.tiles[x][y] = t;
				}
			}
		}



	getString(): string {
		var str = "Map of size (" + this.sizeX + "x" + this.sizeY + ") \n";
		for (var x = 0; x < this.sizeX; x++) {
			for (var y = 0; y < this.sizeY; y++) {
				str += this.tiles[x][y].getLocation() + "\n";
			}
		}
		return str;
	}

	toSymbols(): string {
		var str = "Map as symbols:\n"
		for (var x = this.sizeX - 1; x >= 0; x--) {
			for (var y = 0; y < this.sizeY; y++) {

				str += this.tiles[x][y].toSymbol();
			}
			str += "\n";
		}
		return str;
	}

	getNeighbors(tile: tile): Map < string, tile > {
		var ret: Map < string, tile >= new Map();
		if (tile.y - 1 >= 0) {
			ret.set("left", this.tiles[tile.x][tile.y - 1])
		}
		if (tile.y + 1 < this.sizeY) {
			ret.set("right", this.tiles[tile.x][tile.y + 1])
		}
		if (tile.x - 1 >= 0) {
			ret.set("down", this.tiles[tile.x - 1][tile.y])
		}
		if (tile.x + 1 < this.sizeX) {
			ret.set("up", this.tiles[tile.x + 1][tile.y])
		}

		return ret;
	}

	tick = function(): void {
		for (var x = 0; x < this.sizeX; x++) {
			for (var y = 0; y < this.sizeY; y++) {
				this.tiles[x][y].tick();
			}
		}
	}.bind(this); // always bind this to functions you want to pass.
}