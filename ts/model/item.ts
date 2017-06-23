var shortid = require('shortid');
export default class item {
	name: string;
	shortid: string;
	constructor(name: string) {
		this.name = name;
		this.shortid = shortid.generate();
	}

	tick = function() {

	}.bind(this);

}