"use strict";
exports.__esModule = true;
var tile_1 = require("./tile");
var chunk = (function () {
    function chunk(x, y, size, world) {
        this.tiles = [];
        this.tick = function () {
        }.bind(this);
        this.x = x;
        this.y = y;
        this.size = size;
        this.world = world;
        for (var x = 0; x < this.size; x++) {
            this.tiles[x] = [];
            for (var y = 0; y < this.size; y++) {
                var t = new tile_1["default"](x, y, this);
                this.tiles[x][y] = t;
            }
        }
    }
    chunk.prototype.toString = function () {
        var str = "Chunk " + this.x + ":" + this.y + "\n";
        for (var x = 0; x < this.size; x++) {
            for (var y = 0; y < this.size; y++) {
                str += this.tiles[x][y].getLocation() + "\n";
            }
        }
        return str;
    };
    return chunk;
}());
exports["default"] = chunk;
