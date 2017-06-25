import itemStack from "./itemStack";
import item from "./item";
import chunk from "./chunk";
import conveyor from "./conveyor";
import vector from "./vector";
import factory from "./factory";
import localPosition from "./localPosition";
var shortid = require('shortid');

export default class tile {

	itemStack: itemStack | null = null;
	neighbors: Map < string, tile > | null = null;
	conveyor: conveyor | null = null;
	factory: factory | null = null;
	localPosition: localPosition;
	shortid: string;
	constructor(x: number, y: number, chunk: chunk) {

		this.localPosition = new localPosition(x, y, chunk);
		this.shortid=shortid.generate();


	}
	getGamestate(): object {
		var obj = {
			position: this.localPosition.toObject(),
			hasItem: this.itemStack != null,
			hasConveyor: this.conveyor != null,
			hasFactory: this.factory != null,
			id:this.shortid
		};

		if (this.conveyor != null){
			obj["conveyor"]=this.conveyor.getGamestate();
		}
		return obj;
	}
	makeFactory(i: item, l: number) {
		this.factory = new factory(i, l, this);
		console.log("made factory!");
	}

	getNeighbors(): Map < string, tile > {
		if (this.neighbors == null) {

			this.neighbors = new Map();

			var x = this.localPosition.getGlobal().x;
			var y = this.localPosition.getGlobal().y;

			var bottomLeft = new vector(x - 1, y - 1);
			var left = new vector(x - 1, y);
			var topLeft = new vector(x - 1, y + 1);

			var top = new vector(x, y + 1);
			var bottom = new vector(x, y - 1);

			var bottomRight = new vector(x + 1, y - 1);
			var right = new vector(x + 1, y);
			var topRight = new vector(x + 1, y + 1);


			if (this.localPosition.chunk.world.isTile(bottomLeft)) {
				this.neighbors.set("bottomLeft", this.localPosition.chunk.world.getTileFromGlobal(bottomLeft));
				// console.log("added bottomLeft");
			}
			if (this.localPosition.chunk.world.isTile(left)) {
				this.neighbors.set("left", this.localPosition.chunk.world.getTileFromGlobal(left));
				// console.log("added left");
			}
			if (this.localPosition.chunk.world.isTile(topLeft)) {
				this.neighbors.set("topLeft", this.localPosition.chunk.world.getTileFromGlobal(topLeft));
				// console.log("added topLeft");
			}


			if (this.localPosition.chunk.world.isTile(top)) {
				this.neighbors.set("top", this.localPosition.chunk.world.getTileFromGlobal(top));
				// console.log("added top");
			}
			if (this.localPosition.chunk.world.isTile(bottom)) {
				this.neighbors.set("bottom", this.localPosition.chunk.world.getTileFromGlobal(bottom));
				// console.log("added bottom");
			}



			if (this.localPosition.chunk.world.isTile(bottomRight)) {
				this.neighbors.set("bottomRight", this.localPosition.chunk.world.getTileFromGlobal(bottomRight));
				// console.log("added bottomRight");
			}
			if (this.localPosition.chunk.world.isTile(right)) {
				this.neighbors.set("right", this.localPosition.chunk.world.getTileFromGlobal(right));
				// console.log("added right");
			}
			if (this.localPosition.chunk.world.isTile(topRight)) {
				this.neighbors.set("topRight", this.localPosition.chunk.world.getTileFromGlobal(topRight));
				// console.log("added topRight");
			}

		}
		return this.neighbors;
	}

	makeConveyor(direction: string): void {
		this.conveyor = new conveyor(this, direction);
	}


	toSymbol(): string {
		if (this.itemStack != null || (this.conveyor != null && this.conveyor.itemStack != null)) {
			return "0";
		}
		return "O";
	}



	receiveItemStack(s: itemStack): boolean {
		if (this.itemStack == null) {
			this.itemStack = s;
			// console.log(this.getLocation() + " received item stack");

			return true;
		}
		//console.log("item already set on this tile.");
		return false;
	}
	_tick(): void {
		if (this.factory != null) {
			this.factory.tick();
		}

		if (this.itemStack != null) {
			this.itemStack.tick();
		}

		if (this.conveyor != null) {
			this.conveyor.tick();
		}
	}
	tick = function(): void {
		this._tick();
	}.bind(this);

}