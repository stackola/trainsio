"use strict";
exports.__esModule = true;
var game_1 = require("./game");
var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
http.listen(process.env.PORT || 5000, function () {
    console.log('listening on *:5000');
});
app.use(express.static('public'));
var io = require('socket.io')(http);
var g = new game_1["default"]("a game", io, 150, 150, 15);
var g2 = new game_1["default"]("a game", io, 150, 150, 15);
setInterval(function () {
    //console.log("tick");
    g.tick();
    g2.tick();
}, 1000 / 10);
