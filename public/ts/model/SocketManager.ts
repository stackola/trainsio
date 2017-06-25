import GameStateManager = require("./GameStateManager");
import Vector = require("./Vector");
class SocketManager {
	socket: SocketIOClient.Socket;
	name: string = "okay";
	gsm: GameStateManager;

	constructor(s: SocketIOClient.Socket, gsm: GameStateManager) {
		this.gsm = gsm;
		this.socket = s.connect();
		this.socket.on("connect", this.connect.bind(this));
		this.socket.on("chunkState", this.chunkState.bind(this));
	}
	connect(): void {
		console.log("socket connected");
		console.log(this.name);
	}
	chunkState(cs: object): void {
		this.gsm.receiveChunk(cs);
	}

	playerPosition(v: Vector):void{
		this.socket.emit("playerPosition", v.toObject());
	}



}

export = SocketManager;