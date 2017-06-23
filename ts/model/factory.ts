import item from "./item";
import tile from "./tile";
import itemStack from "./itemStack";
var shortid = require('shortid');
export default class factory {
	product: item;
	level: number;
	baseTile: tile;
	outputTile: tile;
	shortid:string;
	constructor(i: item, l: number, t: tile) {
		this.product = i;
		this.level = l;
		this.baseTile = t;
		this.setOutput();
		this.shortid = shortid.generate();
	}

	setOutput(): void {
		var ns = this.baseTile.getNeighbors();
		this.outputTile = ns.values().next().value;
		// console.log("set factory output tile." + this.outputTile.localPosition.getString());

	}
	_tick(): void {
		if (this.outputTile.receiveItemStack(new itemStack(this.product, 10))) {
			// console.log("factory dropped of item stack");
		}
	}
	tick = function(): void {
		this._tick();
	}.bind(this);
}