"use strict";
exports.__esModule = true;
var tile_1 = require("./tile");
var map = (function () {
    function map(sx, sy) {
        this.getString = function () {
            var str = "Map of size (" + this.sizeX + "x" + this.sizeY + ") \n";
            for (var x = 0; x < this.sizeX; x++) {
                for (var y = 0; y < this.sizeY; y++) {
                    str += this.tiles[x][y].getLocation() + "\n";
                }
            }
            return str;
        };
        this.tick = function () {
            console.log("map tick");
            // map tick, who knows.
        }.bind(this); // always bind this to functions you want to pass.
        this.tiles = [];
        this.sizeX = sx;
        this.sizeY = sy;
        for (var x = 0; x < this.sizeX; x++) {
            this.tiles[x] = [];
            for (var y = 0; y < this.sizeY; y++) {
                var t = new tile_1["default"](x, y);
                this.tiles[x][y] = t;
            }
        }
    }
    return map;
}());
exports["default"] = map;
