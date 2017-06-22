"use strict";
exports.__esModule = true;
var chunk_1 = require("./chunk");
var localPosition_1 = require("./localPosition");
var map = (function () {
    function map(sx, sy, cs) {
        this.chunks = [];
        this.tick = function () {
            this._tick();
        }.bind(this); // always bind this to functions you want to pass.
        var countX = Math.floor(sx / cs);
        var countY = Math.floor(sy / cs);
        this.chunkSize = cs;
        for (var x = 0; x < countX; ++x) {
            this.chunks[x] = [];
            for (var y = 0; y < countY; ++y) {
                //console.log("making chunk " + x + ":" + y);
                this.chunks[x][y] = (new chunk_1["default"](x, y, cs, this));
            }
        }
    }
    map.prototype.getLocalFromGlobal = function (v) {
        var chunkX = Math.floor(v.x / this.chunkSize);
        var chunkY = Math.floor(v.y / this.chunkSize);
        var localX = v.x - chunkX * this.chunkSize;
        var localY = v.y - chunkY * this.chunkSize;
        var lp = new localPosition_1["default"](localX, localY, this.chunks[chunkX][chunkY]);
        //console.log(lp.getString());
        //console.log(lp.getGlobal());
        return lp;
    };
    map.prototype.getTileFromGlobal = function (v) {
        var lp = this.getLocalFromGlobal(v);
        return lp.chunk.tiles[lp.x][lp.y];
    };
    map.prototype.isTile = function (v) {
        //x has to be between 0 and chunks.length*chunkSize
        if (v.x >= 0 && v.x < this.chunkSize * this.chunks.length) {
            if (v.y >= 0 && v.y < this.chunkSize * this.chunks[0].length) {
                ///console.log("Tile " + v.x + ":" + v.y + " is in range");
                return true;
            }
            else {
                ///console.log("Tile " + v.x + ":" + v.y + " is out of range in y");
                return false;
            }
        }
        else {
            ///console.log("Tile " + v.x + ":" + v.y + " is out of range in x");
            return false;
        }
    };
    map.prototype.isChunk = function (v) {
        return (typeof this.chunks[v.x] != "undefined" && typeof this.chunks[v.x][v.y] != "undefined");
    };
    map.prototype._tick = function () {
        for (var i = 0; i < this.chunks.length; ++i) {
            for (var j = 0; j < this.chunks[0].length; ++j) {
                this.chunks[i][j].tick();
            }
        }
    };
    return map;
}());
exports["default"] = map;
