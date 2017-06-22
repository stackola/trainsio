"use strict";
exports.__esModule = true;
var vector_1 = require("./vector");
var player = (function () {
    function player(name, s, world) {
        this.chunk = null;
        this.tick = function () {
        }.bind(this);
        this.name = name;
        this.world = world;
        this.gold = 1000;
        this.socket = s;
        var v = new vector_1["default"](0, 0);
        v.randomize(world.sizeX, world.sizeY);
        this.setPosition(v);
    }
    player.prototype.setChunk = function () {
    };
    player.prototype.setPosition = function (v) {
        this.position = v;
        this.tile = this.world.getTileFromGlobal(this.position.round());
        this.chunk = this.tile.localPosition.chunk;
        console.log(this.tile.localPosition.getString());
    };
    return player;
}());
exports["default"] = player;
