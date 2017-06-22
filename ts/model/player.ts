export default class player {
	name: string;
	gold: number;
	constructor(name: string) {
		this.name = name;
		this.gold=1000;
	}

	tick = function() {

	}.bind(this);

}