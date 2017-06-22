export default class vector {
	x:number;
	y:number;
	constructor(x:number, y:number) {
		this.x=x;
		this.y=y;
	}

	randomize(x:number, y:number):void{
		this.x = Math.floor(Math.random() * (x)) ;
		this.y = Math.floor(Math.random() * (y));
		console.log(this.x+":"+this.y);
	}

	round():vector{
		return new vector(Math.floor(this.x), Math.floor(this.y));
	}
	tick = function() {

	}.bind(this);

}