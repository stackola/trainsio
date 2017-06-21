"use strict";
exports.__esModule = true;
var tile_1 = require("./tile");
var map = (function () {
    function map(sx, sy) {
        this.tick = function () {
            for (var x = 0; x < this.sizeX; x++) {
                for (var y = 0; y < this.sizeY; y++) {
                    this.tiles[x][y].tick();
                }
            }
        }.bind(this); // always bind this to functions you want to pass.
        this.tiles = [];
        this.sizeX = sx;
        this.sizeY = sy;
        for (var x = 0; x < this.sizeX; x++) {
            this.tiles[x] = [];
            for (var y = 0; y < this.sizeY; y++) {
                var t = new tile_1["default"](x, y, this);
                this.tiles[x][y] = t;
            }
        }
    }
    map.prototype.getString = function () {
        var str = "Map of size (" + this.sizeX + "x" + this.sizeY + ") \n";
        for (var x = 0; x < this.sizeX; x++) {
            for (var y = 0; y < this.sizeY; y++) {
                str += this.tiles[x][y].getLocation() + "\n";
            }
        }
        return str;
    };
    map.prototype.toSymbols = function () {
        var str = "Map as symbols:\n";
        for (var x = this.sizeX - 1; x >= 0; x--) {
            for (var y = 0; y < this.sizeY; y++) {
                str += this.tiles[x][y].toSymbol();
            }
            str += "\n";
        }
        return str;
    };
    map.prototype.getNeighbors = function (tile) {
        var ret = new Map();
        if (tile.y - 1 >= 0) {
            ret.set("left", this.tiles[tile.x][tile.y - 1]);
        }
        if (tile.y + 1 < this.sizeY) {
            ret.set("right", this.tiles[tile.x][tile.y + 1]);
        }
        if (tile.x - 1 >= 0) {
            ret.set("down", this.tiles[tile.x - 1][tile.y]);
        }
        if (tile.x + 1 < this.sizeX) {
            ret.set("up", this.tiles[tile.x + 1][tile.y]);
        }
        return ret;
    };
    return map;
}());
exports["default"] = map;
