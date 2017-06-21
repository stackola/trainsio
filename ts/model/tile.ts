import itemStack from "./itemStack";
import map from "./map";
export default class tile {
	x: number;
	y: number;
	itemStack: itemStack | null;
	world: map;

	constructor(x: number, y: number, world: map) {
		this.x = x;
		this.y = y;
		this.world = world;
	}
	getLocation(): string {
		return "Tile (" + this.x + ":" + this.y + ")";
	}

	getNeighbors(): Map < string, tile > {
		return this.world.getNeighbors(this);
	}

	tick = function(): void {

	}.bind(this);

}