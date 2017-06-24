
import Game = require("./Game.js");
requirejs([
		'/js/game.js',
		'/js/model/vector.js',
		'/socket.io/socket.io.js'
	],
	function(		
		_Game,
		Vector,
		sockets) {

		console.log("loaded");
		var g: Game = new _Game();
		var s: SocketIOClient.Socket = sockets.connect();


		s.on("connect", function(socket) {
			console.log("socket connected");
			g.init(new Vector(2000,2000));
		});

		s.on("chunkState", function(socket) {
			console.log("chunk");
		});

	});