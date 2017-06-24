
import Game = require("./Game.js");
requirejs([
		'/js/Game.js',
		'/js/model/vector.js',
		'/socket.io/socket.io.js',
		'/js/SocketManager.js',
		'/js/GameStateManager.js'
	],
	function(		
		_Game,
		Vector,
		sockets,
		SocketManager,
		GameStateManager
		) {

		console.log("loaded");
		var s:SocketIOClient.Socket = sockets;


		var g: Game = new _Game();	//the game DOM object kind of
		var gsm = new GameStateManager(g);	//the gamestatemanager, receives socket stuff, outputs gameobject onto game possibly?
		var socketManager = new SocketManager(s, gsm); // talks to the server.

		g.init(new Vector(2000,2000));

	

	});