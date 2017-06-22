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
var sizeX = 100;
var sizeY = 100;
var world = new map_1["default"](sizeX, sizeY, 10);
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
console.log("done initializing");
function tick() {
    console.time('tick');
    world.tick();
    console.timeEnd('tick');
    console.log(world.chunks[0][0].toSymbols());
}
setInterval(function () {
    //console.log("tick");
    //tick();
}, 1000 / 10);
