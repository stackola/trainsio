import item from "./item";
import tile from "./tile";
export default class factory {
	product: item;
	level: number;
	baseTile: tile;

	constructor(i: item, l: number, t: tile) {
		this.product = i;
		this.level = l;
		this.baseTile = t;
		this.setOutput();
	}

	setOutput(): void {
		var ns = this.baseTile.getNeighbors();
		console.log(ns);

	}

	tick = function(): void {

	}.bind(this);
}