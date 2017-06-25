import vector from "./vector";
import tile from "./tile";
import chunk from "./chunk";
import map from "./map";
var shortid = require('shortid');
export default class player {
	name: string;
	gold: number;
	socket: SocketIO.Socket;
	position: vector|null = null;
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

			if (data.x > 0 && data.y > 0 ){
				if (data.x < this.world.sizeX &&  data.y < this.world.sizeY){
					this.setPosition(new vector(data.x, data.y));
					//console.log("received position data from player");
				}

			}

		}.bind(this));
	}

	setChunk(): void {

	}

	setPosition(v: vector) {
		var firstTime=false;
		if (this.position == null){
			this.position = v;

			this.tile = this.world.getTileFromGlobal(this.position.round());
			this.chunk = this.tile.localPosition.chunk;
			firstTime=true;
		}

		var oldTile = this.world.getTileFromGlobal(this.position.round());
		var oldChunk = oldTile.localPosition.chunk;

		this.position = v;

		this.tile = this.world.getTileFromGlobal(this.position.round());
		this.chunk = this.tile.localPosition.chunk;


		//subscribe to own chunk
		// check if user changed chunk.
		if (firstTime || oldChunk != this.chunk) {

			console.log("user moved to new chunk");
			var ns = []; 
			console.log("new chunks rooms");
			this.chunk.getNeighbors().forEach(function(value:chunk){
				ns.push(value.room);
				console.log(value.room);
			});
			for (var r of this.rooms) {
				if (ns.indexOf(r) == -1 && r != this.chunk.room){
					this.socket.leave(r);
					console.log("left room " + r);
				}
				else
				{
					console.log("staying in room i guess" + r);
				}
				
			}
			this.rooms = [];
			this.socket.join(this.chunk.room);
			this.rooms.push(this.chunk.room);
			console.log("joined room " + this.chunk.room);

			this.chunk.getNeighbors().forEach(function(value: chunk) {
				this.socket.join(value.room);
				this.socket.join(value.room);
				this.socket.join(value.room);
				this.socket.join(value.room);
				this.rooms.push(value.room);
				console.log("joined room " + value.room);
			}.bind(this));

			console.log("USER IS IN "+ this.rooms.length+ " ROOMS");
		} else {
			//console.log("user stayed in chunk");
		}

		
		//console.log(this.tile.localPosition.getString());

	}



	tick = function() {

	}.bind(this);

}