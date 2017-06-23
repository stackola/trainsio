import tile from "./tile";
import itemStack from "./itemStack";
import player from "./player";
var shortid = require('shortid');
export default class conveyor {

	inputTile: tile;
	itemStack: itemStack | null;
	outputTile: tile | null;
	totalTicks: number;
	player: player;
	ticksLeft: number = this.totalTicks;
	shortid: string;
	constructor(t: tile, direction: string, totalTicks: number = 5) {
		this.inputTile = t;
		this.totalTicks = totalTicks;
		this.shortid = shortid.generate();
		if (this.inputTile.getNeighbors().has(direction)) {
			this.outputTile = this.inputTile.getNeighbors().get(direction);
			// console.log("Set output tile to " + this.outputTile.localPosition.getString());
		}



	}
	pickup(): boolean {
		if (this.inputTile.itemStack != null) {
			this.itemStack = this.inputTile.itemStack;
			this.inputTile.itemStack = null;
			// console.log("Conv. picked up item from " + this.inputTile.localPosition.getString());
			return true;
		} else {
			// console.log("Conv. trid picking up item from " + this.inputTile.localPosition.getString() + ", but tile was empty.");
			return false;
		}

	}
	_tick(): void {
		if (this.itemStack != null) {
			// we have an item
			this.ticksLeft--;

			if (this.ticksLeft == 0) {
				// Done ticking. drop object on next tile. potentially pick up item from input tile.
				this.ticksLeft = this.totalTicks;
				// console.log("Conveyor done moving! looking to dropoff");
				if (this.outputTile != null && this.outputTile.receiveItemStack(this.itemStack) == true) {
					// console.log(this.outputTile.localPosition.getString() + " accepted the itemstack");
					this.itemStack = null;
				} else {
					// console.log("tile has not accepted the item stack. trying again next tick");
					this.ticksLeft = 1;
				}

			}

		} else {
			// no item. pick one up if possible
			// console.log("conveyor has no item");
			this.pickup();

		}
	}
	tick = function() {
		this._tick();
	}.bind(this);

}