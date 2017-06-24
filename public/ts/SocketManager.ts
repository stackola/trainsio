import GameStateManager = require("./GameStateManager");
class SocketManager {
	socket: SocketIOClient.Socket;
	name: string = "okay";
	gsm: GameStateManager;

	constructor(s: SocketIOClient.Socket, gsm: GameStateManager) {
		this.gsm = gsm;
		this.socket = s.connect();
		this.socket.on("connect", this.connect.bind(this));
	}
	connect(): void {
		console.log("socket connected");
		console.log(this.name);
	}



}

export = SocketManager;