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



		var gsm = new GameStateManager(); //the gamestatemanager, receives socket stuff, outputs gameobject onto game possibly?
		var g: Game = new _Game(gsm); //the game DOM object kind of

		var s: SocketIOClient.Socket = sockets;
		var socketManager = new SocketManager(s, gsm); // talks to the server.

		g.init(new Vector(2000, 2000));



	});