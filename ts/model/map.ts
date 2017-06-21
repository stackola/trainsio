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
					var t: tile = new tile(x, y);
					this.tiles[x][y] = t;
				}
			}
		}



	getString = function(): string {
		var str = "Map of size (" + this.sizeX + "x" + this.sizeY + ") \n";
		for (var x = 0; x < this.sizeX; x++) {
			for (var y = 0; y < this.sizeY; y++) {
				str += this.tiles[x][y].getLocation() + "\n";
			}
		}
		return str;
	}

	tick = function(): void {
		console.log("map tick");
		// map tick, who knows.
	}.bind(this); // always bind this to functions you want to pass.
}