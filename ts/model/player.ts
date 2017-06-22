import vector from "./vector";
import tile from "./tile";
import chunk from "./chunk";
import map from "./map";

export default class player {
	name: string;
	gold: number;
	socket: SocketIO.Socket;
	position: vector;
	chunk: chunk | null = null;
	world: map;
	tile: tile;
	constructor(name: string, s: SocketIO.Socket, world: map) {
		this.name = name;
		this.world = world;
		this.gold = 1000;
		this.socket = s;
		var v = new vector(0,0);
		v.randomize(world.sizeX, world.sizeY);
		this.setPosition(v);
	}

	setChunk(): void {
	
	}

	setPosition(v:vector){
		this.position=v;
		this.tile = this.world.getTileFromGlobal(this.position.round());
		this.chunk = this.tile.localPosition.chunk;
		console.log(this.tile.localPosition.getString());

	}



	tick = function() {

	}.bind(this);

}