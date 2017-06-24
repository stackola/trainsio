class Vector {
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

	round():Vector{
		return new Vector(Math.floor(this.x), Math.floor(this.y));
	}
	toObject():object{
		return {x:this.x, y:this.y};
	}
	tick = function() {

	}.bind(this);

}

export = Vector;