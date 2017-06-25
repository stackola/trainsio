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

	getGamestate(): object {
		var obj = {
			name:this.item.name,
			conut:this.count,
			id:this.shortid		
		};
		return obj;
	}

	tick = function() {

	}.bind(this);

}