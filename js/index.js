"use strict";
exports.__esModule = true;
var map_1 = require("./model/map");
var item_1 = require("./model/item");
var player_1 = require("./model/player");
var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var players = [];
//put everything below this line in it's own class.
var sizeX = 150;
var sizeY = 150;
var chunkSize = 15;
var world = new map_1["default"](sizeX, sizeY, chunkSize);
app.use(express.static('public'));
io.on('connection', function (socket) {
    console.log('a user connected');
    var p = new player_1["default"]("NONAME", socket, world);
    players.push(p);
});
http.listen(process.env.PORT || 5000, function () {
    console.log('listening on *:5000');
});
//instantiate items.
var gold = new item_1["default"]("Gold");
/*

world.tiles[0][2].makeConveyor("right");
world.tiles[0][3].makeConveyor("up");
*/
world.chunks[0][0].tiles[0][0].makeFactory(gold, 1);
world.chunks[0][0].tiles[0][1].makeConveyor("right");
world.chunks[0][0].tiles[1][1].makeConveyor("right");
world.chunks[0][0].tiles[2][1].makeConveyor("right");
world.chunks[0][0].tiles[3][1].makeConveyor("right");
world.chunks[0][0].tiles[4][1].makeConveyor("right");
world.chunks[0][0].tiles[5][1].makeConveyor("right");
world.chunks[0][0].tiles[6][1].makeConveyor("right");
world.chunks[0][0].tiles[7][1].makeConveyor("right");
world.chunks[0][0].tiles[8][1].makeConveyor("right");
console.log("done initializing");
function tick() {
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
            }
            else {
                //console.log("no one in this room");
            }
        }
    }
    console.log("Sent messages to " + sent + " rooms.");
}
setInterval(function () {
    //console.log("tick");
    tick();
    console.time('sendGamestate');
    sendGamestate();
    console.timeEnd('sendGamestate');
}, 1000 / 10);
