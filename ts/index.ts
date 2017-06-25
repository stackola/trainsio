import map from "./model/map";
import item from "./model/item";
import factory from "./model/factory";
import conveyor from "./model/conveyor";
import vector from "./model/vector";
import player from "./model/player";


var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var players: Array < player >= [];


//put everything below this line in it's own class.
var sizeX = 500;
var sizeY = 500;

var world: map = new map(sizeX, sizeY, 25);


app.use(express.static('public'));

io.on('connection', function(socket: SocketIO.Socket) {
	console.log('a user connected');
	var p: player = new player("NONAME", socket, world);
	players.push(p);

});

http.listen(process.env.PORT || 5000, function() {
	console.log('listening on *:5000');
});



//instantiate items.
var gold: item = new item("Gold");


/*

world.tiles[0][2].makeConveyor("right");
world.tiles[0][3].makeConveyor("up");
*/
world.chunks[0][0].tiles[0][0].makeFactory(gold, 1);
world.chunks[0][0].tiles[0][1].makeConveyor("right");
world.chunks[0][0].tiles[1][1].makeConveyor("right");

console.log("done initializing");


function tick(): void {
	console.time('tick');
	world.tick();
	console.timeEnd('tick');
	//console.log(world.chunks[0][0].toSymbols());
}

function sendGamestate() {
	//for each chunk, get the room, and transmit the chunk to the room.
	var sent = 0;
	for (var i = 0; i < world.chunks.length; ++i) {
		for (var j = 0; j < world.chunks[0].length; ++j) {
			var aChunk = world.chunks[i][j];
			//see if anyone is in that room.
			if (typeof io.sockets.adapter.rooms[aChunk.room] != "undefined" && io.sockets.adapter.rooms[aChunk.room].length > 0) {
				var gs = aChunk.getGamestate();
				//console.log("gamestate for a chunk");
				io.to(aChunk.room).emit('chunkState', gs);
				sent++;
			} else {
				//console.log("no one in this room");
			}

		}
	}
	console.log("Sent messages to " + sent + " rooms.");
}

setInterval(function() {
	//console.log("tick");
	tick();
	console.time('sendGamestate');
	sendGamestate();
	console.timeEnd('sendGamestate');

}, 1000 / 10);