import item from "./item";
export default class itemStack {
	count: number;
	item: item;
	constructor(i: item, c: number) {
		this.item = i;
		this.count = c;
	}

	tick = function() {

	}.bind(this);

}