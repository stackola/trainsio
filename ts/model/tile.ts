import itemStack from "./itemStack";
import chunk from "./chunk";
import conveyor from "./conveyor";
export default class tile {
	x: number;
	y: number;
	itemStack: itemStack | null = null;
	chunk: chunk;
	neighbors: Map < string, tile > | null = null;
	conveyor: conveyor | null = null;

	constructor(x: number, y: number, chunk: chunk) {
		this.x = x;
		this.y = y;
		this.chunk = chunk;

	}
	makeConveyor(direction: string): void {
		this.conveyor = new conveyor(this, direction);
	}
	getLocation(): string {
		return "Tile (" + this.x + ":" + this.y + ")";
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