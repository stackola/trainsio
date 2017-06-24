import Game = require("./Game.js");
import GameStateManager = require("./GameStateManager.js");
exports.default =  requirejs([
	'/js/Game.js',
	'/js/model/vector.js',
	'/socket.io/socket.io.js',
	'/js/SocketManager.js',
	'/js/GameStateManager.js',
	'/js/model/Chunk.js'
	],
	function(
		_Game,
		Vector,
		sockets,
		SocketManager,
		GameStateManager,
		Chunk
		) {

		console.log("loaded");

		//the gamestatemanager, receives socket stuff, outputs gameobject onto game possibly?
		var g: Game = new _Game(); //the game DOM object kind of

		g.init(new Vector(2000, 2000));

		var gsm:GameStateManager = new GameStateManager(g);
		var s: SocketIOClient.Socket = sockets;
		var socketManager = new SocketManager(s, gsm); // talks to the server.
	});