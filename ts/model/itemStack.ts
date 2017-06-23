import item from "./item";
var shortid = require('shortid');
export default class itemStack {
	count: number;
	item: item;
	shortid: string;
	constructor(i: item, c: number) {
		this.item = i;
		this.count = c;
		this.shortid = shortid.generate();
	}

	tick = function() {

	}.bind(this);

}