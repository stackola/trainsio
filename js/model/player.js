"use strict";
exports.__esModule = true;
var vector_1 = require("./vector");
var shortid = require('shortid');
var player = (function () {
    function player(name, s, world) {
        this.chunk = null;
        this.tick = function () {
        }.bind(this);
        this.name = name;
        this.world = world;
        this.gold = 1000;
        this.socket = s;
        this.rooms = [];
        this.position = new vector_1["default"](24, 24);
        this.shortid = shortid.generate();
        var v = new vector_1["default"](0, 0);
        //v.randomize(world.sizeX, world.sizeY);
        this.setPosition(v);
        this.socket.on("playerPosition", function (data) {
            this.setPosition(new vector_1["default"](data.x, data.y));
            console.log("received position data from player");
        }.bind(this));
    }
    player.prototype.setChunk = function () {
    };
    player.prototype.setPosition = function (v) {
        var oldTile = this.world.getTileFromGlobal(this.position.round());
        var oldChunk = oldTile.localPosition.chunk;
        this.position = v;
        this.tile = this.world.getTileFromGlobal(this.position.round());
        this.chunk = this.tile.localPosition.chunk;
        //subscribe to own chunk
        // check if user changed chunk.
        if (oldChunk != this.chunk) {
            console.log("user moved to new chunk");
            for (var _i = 0, _a = this.rooms; _i < _a.length; _i++) {
                var r = _a[_i];
                this.socket.leave(r);
                console.log("left room " + r);
            }
            this.rooms = [];
            this.socket.join(this.chunk.room);
            this.rooms.push(this.chunk.room);
            console.log("joined room " + this.chunk.room);
            this.chunk.getNeighbors().forEach(function (value) {
                this.socket.join(value.room);
                this.rooms.push(value.room);
                console.log("joined room " + value.room);
            }.bind(this));
        }
        else {
            console.log("user stayed in chunk");
        }
        //subscribe to all neighbors chunks room.
        console.log(this.tile.localPosition.getString());
    };
    return player;
}());
exports["default"] = player;
