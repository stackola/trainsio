class Vector {
	x: number;
	y: number;
	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	randomize(x: number, y: number): void {
		this.x = Math.floor(Math.random() * (x));
		this.y = Math.floor(Math.random() * (y));
		console.log(this.x + ":" + this.y);
	}

	round(): Vector {
		return new Vector(Math.floor(this.x), Math.floor(this.y));
	}
	toObject(): object {
		return {
			x: this.x,
			y: this.y
		};
	}
	tick = function() {

	}.bind(this);

	difference(v2: Vector): Vector {
		return new Vector(v2.x - this.x, v2.y - this.y);
	}

	length(): number {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}

}

export = Vector;