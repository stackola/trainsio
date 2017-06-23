import vector from "./vector";
import tile from "./tile";
import chunk from "./chunk";
import map from "./map";
var shortid = require('shortid');
export default class player {
	name: string;
	gold: number;
	socket: SocketIO.Socket;
	position: vector;
	chunk: chunk | null = null;
	world: map;
	tile: tile;
	rooms: Array < string > ;
	shortid: string;
	constructor(name: string, s: SocketIO.Socket, world: map) {
		this.name = name;
		this.world = world;
		this.gold = 1000;
		this.socket = s;
		this.rooms = [];
		this.shortid = shortid.generate();
		var v = new vector(0, 0);
		//v.randomize(world.sizeX, world.sizeY);
		this.setPosition(v);

		this.socket.on("playerPosition", function(data) {
			this.setPosition(new vector(data.x, data.y));
			console.log("received position data from player");
		}.bind(this));
	}

	setChunk(): void {

	}

	setPosition(v: vector) {
		this.position = v;
		this.tile = this.world.getTileFromGlobal(this.position.round());
		this.chunk = this.tile.localPosition.chunk;

		//subscribe to own chunk

		for (var r of this.rooms) {
			this.socket.leave(r);
			console.log("left room " + r);
		}
		this.rooms = [];
		this.socket.join(this.chunk.room);
		this.rooms.push(this.chunk.room);
		console.log("joined room " + this.chunk.room);

		this.chunk.getNeighbors().forEach(function(value: chunk) {
			this.socket.join(value.room);
			this.rooms.push(value.room);
			console.log("joined room " + value.room);
		}.bind(this));
		//subscribe to all neighbors chunks room.
		console.log(this.tile.localPosition.getString());

	}



	tick = function() {

	}.bind(this);

}