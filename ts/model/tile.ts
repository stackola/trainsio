export default class tile {
	x:number;
	y:number;

	constructor (x:number, y:number){
		this.x = x;
		this.y = y;
	}
	getLocation = function():string {
		return "Tile (" + this.x + ":" + this.y + ")";
	}

	tick = function():void {

	}.bind(this);

}

