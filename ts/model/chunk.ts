import tile from "./tile";
import map from "./map";
import vector from "./vector";

export default class chunk {
	//chunnks are size X size squares of tiles.
	x: number;
	y: number;
	size: number;
	tiles: Array < Array < tile >> = [];
	world: map;
	neighbors: Map < string, chunk > | null = null;
	room: string;
	constructor(x: number, y: number, size: number, world: map) {
		this.x = x;
		this.room = x + ":" + y;
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
	getGamestate(): object {
		var tileStates = [];
		for (var x: number = 0; x < this.size; x++) {
			for (var y: number = 0; y < this.size; y++) {
				tileStates.push(this.tiles[x][y].getGamestate());
			}
		}

		var obj = {
			'tiles': tileStates,
			'position': {
				x: this.x,
				y: this.y
			},
			'size':this.size,
			'id':this.x+":"+this.y
		};

		return obj;
	}
	getNeighbors(): Map < string, chunk > {
		if (this.neighbors == null) {
			//need to fill neighbors map
			this.neighbors = new Map();

			var bottomLeft = new vector(this.x - 1, this.y - 1);
			var left = new vector(this.x - 1, this.y);
			var topLeft = new vector(this.x - 1, this.y + 1);

			var top = new vector(this.x, this.y + 1);
			var bottom = new vector(this.x, this.y - 1);

			var bottomRight = new vector(this.x + 1, this.y - 1);
			var right = new vector(this.x + 1, this.y);
			var topRight = new vector(this.x + 1, this.y + 1);

			if (this.world.isChunk(bottomLeft)) {
				this.neighbors.set("bottomLeft", this.world.chunks[bottomLeft.x][bottomLeft.y]);
				console.log("added bottomLeft");
			}
			if (this.world.isChunk(left)) {
				this.neighbors.set("left", this.world.chunks[left.x][left.y]);
				console.log("added left");
			}
			if (this.world.isChunk(topLeft)) {
				this.neighbors.set("topLeft", this.world.chunks[topLeft.x][topLeft.y]);
				console.log("added topLeft");
			}


			if (this.world.isChunk(top)) {
				this.neighbors.set("top", this.world.chunks[top.x][top.y]);
				console.log("added top");
			}
			if (this.world.isChunk(bottom)) {
				this.neighbors.set("bottom", this.world.chunks[bottom.x][bottom.y]);
				console.log("added bottom");
			}



			if (this.world.isChunk(bottomRight)) {
				this.neighbors.set("bottomRight", this.world.chunks[bottomRight.x][bottomRight.y]);
				console.log("added bottomRight");
			}
			if (this.world.isChunk(right)) {
				this.neighbors.set("right", this.world.chunks[right.x][right.y]);
				console.log("added right");
			}
			if (this.world.isChunk(topRight)) {
				this.neighbors.set("topRight", this.world.chunks[topRight.x][topRight.y]);
				console.log("added topRight");
			}



		}

		return this.neighbors;
	}

	toString(): string {
		var str = "Chunk " + this.x + ":" + this.y + "\n";
		for (var x: number = 0; x < this.size; x++) {
			for (var y: number = 0; y < this.size; y++) {
				str += this.tiles[x][y].localPosition.getString() + "\n";
			}
		}
		return str;
	}

	toSymbols(): string {
		var str = "Chunk " + this.x + ":" + this.y + "\n";

		for (var y: number = this.size - 1; y >= 0; y--) {
			for (var x: number = 0; x < this.size; x++) {
				str += this.tiles[x][y].toSymbol();
			}
			str += "\n";
		}
		return str;
	}
	_tick(): void {
		for (var i = 0; i < this.tiles.length; ++i) {
			for (var j = 0; j < this.tiles[0].length; ++j) {
				this.tiles[i][j].tick();
			}
		}
	}
	tick = function() {
		this._tick();
	}.bind(this);

}