import chunk from "./chunk";
import vector from "./vector";
export default class localPosition {
	x: number;
	y: number;
	chunk: chunk;
	constructor(x: number, y: number, chunk: chunk) {
		this.x = x;
		this.y = y;
		this.chunk = chunk;
	}

	getGlobal(): vector {
		return new vector(this.chunk.x * this.chunk.size + this.x, this.chunk.y * this.chunk.size + this.y);
	}
	getString(): string {
		return "Chunk (" + this.chunk.x + ":" + this.chunk.y + "). Pos: (" + this.x + ":" + this.y + ")";
	}
	toObject(): object {
		return new vector(this.x, this.y).toObject();
	}
	tick = function() {

	}.bind(this);

}