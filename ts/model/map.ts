import tile from "./tile";
import chunk from "./chunk";
import localPosition from "./localPosition";
import vector from "./vector";

export default class map {
	chunks: Array < Array < chunk >> = [];
	chunkSize: number;
	constructor(sx: number, sy: number, cs: number) {
		var countX = Math.floor(sx / cs);
		var countY = Math.floor(sy / cs);
		this.chunkSize = cs;
		for (var x = 0; x < countX; ++x) {
			this.chunks[x] = [];
			for (var y = 0; y < countY; ++y) {
				//console.log("making chunk " + x + ":" + y);
				this.chunks[x][y] = (new chunk(x, y, cs, this));
			}
		}

	}


	getLocalFromGlobal(v: vector): localPosition {
		var chunkX = Math.floor(v.x / this.chunkSize);
		var chunkY = Math.floor(v.y / this.chunkSize);
		var localX = v.x - chunkX * this.chunkSize;
		var localY = v.y - chunkY * this.chunkSize;
		var lp = new localPosition(localX, localY, this.chunks[chunkX][chunkY]);
		//console.log(lp.getString());
		//console.log(lp.getGlobal());
		return lp;
	}


	getTileFromGlobal(v: vector): tile {
		var lp = this.getLocalFromGlobal(v);
		return lp.chunk.tiles[lp.x][lp.y];
	}

	isTile(v: vector): boolean {
		//x has to be between 0 and chunks.length*chunkSize
		if (v.x >= 0 && v.x < this.chunkSize * this.chunks.length) {
			if (v.y >= 0 && v.y < this.chunkSize * this.chunks[0].length) {
				///console.log("Tile " + v.x + ":" + v.y + " is in range");
				return true;
			} else {
				///console.log("Tile " + v.x + ":" + v.y + " is out of range in y");
				return false;
			}
		} else {
			///console.log("Tile " + v.x + ":" + v.y + " is out of range in x");
			return false;
		}

	}

	isChunk(v: vector): boolean {
		return (typeof this.chunks[v.x] != "undefined" && typeof this.chunks[v.x][v.y] != "undefined");
	}
	_tick(): void {
		for (var i = 0; i < this.chunks.length; ++i) {
			for (var j = 0; j < this.chunks[0].length; ++j) {
				this.chunks[i][j].tick();
			}
		}
	}

	tick = function(): void {

		this._tick();
	}.bind(this); // always bind this to functions you want to pass.
}