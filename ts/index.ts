import map from "./model/map";
import item from "./model/item";
import factory from "./model/factory";
import conveyor from "./model/conveyor";
import vector from "./model/vector";
import player from "./model/player";
import game from "./game";


var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
http.listen(process.env.PORT || 5000, function() {
	console.log('listening on *:5000');
});
app.use(express.static('public'));
var io = require('socket.io')(http);


var g = new game("a game", io, 150, 150, 15);

setInterval(function() {
	//console.log("tick");
	console.time("allTick");
	g.tick();

	console.timeEnd("allTick");

}, 1000 / 10 );