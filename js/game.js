"use strict";
exports.__esModule = true;
var shortid = require('shortid');
var map_1 = require("./model/map");
var item_1 = require("./model/item");
var player_1 = require("./model/player");
var game = (function () {
    function game(name, io, sizeX, sizeY, chunkSize) {
        this.players = [];
        this.tick = function () {
            this._tick();
        }.bind(this);
        this.shortid = shortid.generate();
        var ss = io.of('/' + this.shortid);
        this.socket = ss;
        this.name = name;
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.chunkSize = chunkSize;
        this.world = new map_1["default"](sizeX, sizeY, chunkSize);
        console.log(this.socket);
        console.log("game setup");
        this.socket.on('connection', this.playerConnected.bind(this));
        this.makeWorld();
    }
    game.prototype.playerConnected = function (socket) {
        console.log('a user connected');
        var p = new player_1["default"]("NONAME", socket, this.world);
        this.players.push(p);
    };
    game.prototype.makeWorld = function () {
        var gold = new item_1["default"]("Gold");
        this.world.chunks[0][0].tiles[0][0].makeFactory(gold, 1);
        this.world.chunks[0][0].tiles[0][1].makeConveyor("right");
        this.world.chunks[0][0].tiles[1][1].makeConveyor("right");
        this.world.chunks[0][0].tiles[2][1].makeConveyor("right");
        this.world.chunks[0][0].tiles[3][1].makeConveyor("right");
        this.world.chunks[0][0].tiles[4][1].makeConveyor("right");
        this.world.chunks[0][0].tiles[5][1].makeConveyor("right");
        this.world.chunks[0][0].tiles[6][1].makeConveyor("right");
        this.world.chunks[0][0].tiles[7][1].makeConveyor("right");
        this.world.chunks[0][0].tiles[8][1].makeConveyor("top");
        this.world.chunks[0][0].tiles[8][2].makeConveyor("top");
        this.world.chunks[0][0].tiles[8][3].makeConveyor("top");
        this.world.chunks[0][0].tiles[8][4].makeConveyor("left");
        this.world.chunks[0][0].tiles[7][4].makeConveyor("left");
        this.world.chunks[0][0].tiles[6][4].makeConveyor("bottom");
    };
    game.prototype._tick = function () {
        console.log("GAME TICK" + this.shortid);
        console.time('tick');
        this.world.tick();
        console.timeEnd('tick');
        this.sendGamestate();
    };
    game.prototype.sendGamestate = function () {
        //for each chunk, get the room, and transmit the chunk to the room.
        var sent = 0;
        for (var i = 0; i < this.world.chunks.length; ++i) {
            for (var j = 0; j < this.world.chunks[0].length; ++j) {
                var aChunk = this.world.chunks[i][j];
                //see if anyone is in that room.
                if (typeof this.socket.adapter.rooms[aChunk.room] != "undefined" && this.socket.adapter.rooms[aChunk.room].length > 0) {
                    var gs = aChunk.getGamestate();
                    //console.log("gamestate for a chunk");
                    this.socket.to(aChunk.room).emit('chunkState', gs);
                    sent++;
                }
                else {
                    //console.log("no one in this room");
                }
            }
        }
        console.log("Sent messages to " + sent + " rooms.");
    };
    return game;
}());
exports["default"] = game;
