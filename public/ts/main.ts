import Game = require("./model/Game.js");
import GameStateManager = require("./model/GameStateManager.js");
exports.default =  requirejs([
	'/js/model/Game.js',
	'/js/model/vector.js',
	'/socket.io/socket.io.js',
	'/js/model/SocketManager.js',
	'/js/model/GameStateManager.js',
	'/js/model/InputManager.js',
	'/js/model/ItemManager.js',
	'/js/model/ItemStack.js',
	'/js/model/Chunk.js',
	'/js/model/Tile.js',
	'/js/model/Conveyor.js',
	'/js/vendor/three.js',
	],
	function(
		_Game,
		Vector,
		sockets,
		SocketManager,
		GameStateManager,
		InputManager,
		ItemManager,
		ItemStack,
		Chunk,
		Tile,
		Conveyor,
		THREE
		) {

		console.log("loaded");

		//the gamestatemanager, receives socket stuff, outputs gameobject onto game possibly?
		var g: Game = new _Game(THREE); //the game DOM object kind of

		g.init(new Vector(2000, 2000));

		var gsm:GameStateManager = new GameStateManager(g);
		var s: SocketIOClient.Socket = sockets("/B13OGc0mb");
		var socketManager = new SocketManager(s, gsm); // talks to the server.
		g.setSocketManager(socketManager);
	

		function gameLoop(){
			requestAnimationFrame(gameLoop);
			g.tick();
		}
		

		gameLoop();
	});