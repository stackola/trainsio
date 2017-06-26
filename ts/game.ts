var shortid = require('shortid');
import map from "./model/map";
import item from "./model/item";
import factory from "./model/factory";
import conveyor from "./model/conveyor";
import vector from "./model/vector";
import player from "./model/player";


export default class game {
	socket:SocketIO.Namespace ;
	players: Array < player >= [];
	shortid: string;
	sizeX: number;
	sizeY: number;
	chunkSize: number;
	world:map;
	name:string;
	constructor(name: string, io, sizeX:number, sizeY:number, chunkSize:number) {	
		this.shortid = shortid.generate();
		var ss:SocketIO.Namespace = io.of('/'+this.shortid);
		this.socket=ss;
		this.name=name;
		this.sizeX=sizeX;
		this.sizeY=sizeY;
		this.chunkSize = chunkSize;
		this.world = new map(sizeX, sizeY, chunkSize);
		console.log(this.socket);
		console.log("game setup");
		this.socket.on('connection', this.playerConnected.bind(this));
		this.makeWorld();
	}

	playerConnected(socket):void{
		console.log('a user connected');
		var p: player = new player("NONAME", socket, this.world);
		this.players.push(p);
	}

	makeWorld(){
		var gold: item = new item("Gold");

		this.world.chunks[0][0].tiles[0][0].makeFactory(gold, 1);
		this.world.chunks[0][0].tiles[0][1].makeConveyor("right");
		this.world.chunks[0][0].tiles[1][1].makeConveyor("right");
		this.world.chunks[0][0].tiles[2][1].makeConveyor("right");
		this.world.chunks[0][0].tiles[3][1].makeConveyor("right");
		this.world.chunks[0][0].tiles[4][1].makeConveyor("right");
		this.world.chunks[0][0].tiles[5][1].makeConveyor("right");
		this.world.chunks[0][0].tiles[6][1].makeConveyor("right");
		this.world.chunks[0][0].tiles[7][1].makeConveyor("right");
		this.world.chunks[0][0].tiles[8][1].makeConveyor("top");
		this.world.chunks[0][0].tiles[8][2].makeConveyor("top");
		this.world.chunks[0][0].tiles[8][3].makeConveyor("top");
		this.world.chunks[0][0].tiles[8][4].makeConveyor("left");
		this.world.chunks[0][0].tiles[7][4].makeConveyor("left");
		this.world.chunks[0][0].tiles[6][4].makeConveyor("bottom");
		

	}

	_tick(): void {
		console.log("GAME TICK" + this.shortid);
		console.time('tick');
		this.world.tick();
		console.timeEnd('tick');
		this.sendGamestate();
	}

	sendGamestate() {
		//for each chunk, get the room, and transmit the chunk to the room.
		var sent = 0;
		for (var i = 0; i < this.world.chunks.length; ++i) {
			for (var j = 0; j < this.world.chunks[0].length; ++j) {
				var aChunk = this.world.chunks[i][j];
				//see if anyone is in that room.
				if (typeof this.socket.adapter.rooms[aChunk.room] != "undefined" && this.socket.adapter.rooms[aChunk.room].length > 0) {
					var gs = aChunk.getGamestate();
					//console.log("gamestate for a chunk");
					this.socket.to(aChunk.room).emit('chunkState', gs);
					sent++;

				} else {
					//console.log("no one in this room");
				}

			}
		}
		console.log("Sent messages to " + sent + " rooms.");
	}
	tick = function() {
		this._tick();
		
	}.bind(this);

}