"use strict";
exports.__esModule = true;
var tile_1 = require("./tile");
var vector_1 = require("./vector");
var chunk = (function () {
    function chunk(x, y, size, world) {
        this.tiles = [];
        this.neighbors = null;
        this.tick = function () {
            this._tick();
        }.bind(this);
        this.x = x;
        this.room = x + ":" + y;
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
    chunk.prototype.getGamestate = function () {
        var tileStates = [];
        for (var x = 0; x < this.size; x++) {
            for (var y = 0; y < this.size; y++) {
                tileStates.push(this.tiles[x][y].getGamestate());
            }
        }
        var obj = {
            'tiles': tileStates,
            'position': {
                x: this.x,
                y: this.y
            },
            'size': this.size,
            'id': this.x + ":" + this.y
        };
        return obj;
    };
    chunk.prototype.getNeighbors = function () {
        if (this.neighbors == null) {
            //need to fill neighbors map
            this.neighbors = new Map();
            var bottomLeft = new vector_1["default"](this.x - 1, this.y - 1);
            var left = new vector_1["default"](this.x - 1, this.y);
            var topLeft = new vector_1["default"](this.x - 1, this.y + 1);
            var top = new vector_1["default"](this.x, this.y + 1);
            var bottom = new vector_1["default"](this.x, this.y - 1);
            var bottomRight = new vector_1["default"](this.x + 1, this.y - 1);
            var right = new vector_1["default"](this.x + 1, this.y);
            var topRight = new vector_1["default"](this.x + 1, this.y + 1);
            if (this.world.isChunk(bottomLeft)) {
                this.neighbors.set("bottomLeft", this.world.chunks[bottomLeft.x][bottomLeft.y]);
                console.log("added bottomLeft");
            }
            if (this.world.isChunk(left)) {
                this.neighbors.set("left", this.world.chunks[left.x][left.y]);
                console.log("added left");
            }
            if (this.world.isChunk(topLeft)) {
                this.neighbors.set("topLeft", this.world.chunks[topLeft.x][topLeft.y]);
                console.log("added topLeft");
            }
            if (this.world.isChunk(top)) {
                this.neighbors.set("top", this.world.chunks[top.x][top.y]);
                console.log("added top");
            }
            if (this.world.isChunk(bottom)) {
                this.neighbors.set("bottom", this.world.chunks[bottom.x][bottom.y]);
                console.log("added bottom");
            }
            if (this.world.isChunk(bottomRight)) {
                this.neighbors.set("bottomRight", this.world.chunks[bottomRight.x][bottomRight.y]);
                console.log("added bottomRight");
            }
            if (this.world.isChunk(right)) {
                this.neighbors.set("right", this.world.chunks[right.x][right.y]);
                console.log("added right");
            }
            if (this.world.isChunk(topRight)) {
                this.neighbors.set("topRight", this.world.chunks[topRight.x][topRight.y]);
                console.log("added topRight");
            }
        }
        return this.neighbors;
    };
    chunk.prototype.toString = function () {
        var str = "Chunk " + this.x + ":" + this.y + "\n";
        for (var x = 0; x < this.size; x++) {
            for (var y = 0; y < this.size; y++) {
                str += this.tiles[x][y].localPosition.getString() + "\n";
            }
        }
        return str;
    };
    chunk.prototype.toSymbols = function () {
        var str = "Chunk " + this.x + ":" + this.y + "\n";
        for (var y = this.size - 1; y >= 0; y--) {
            for (var x = 0; x < this.size; x++) {
                str += this.tiles[x][y].toSymbol();
            }
            str += "\n";
        }
        return str;
    };
    chunk.prototype._tick = function () {
        for (var i = 0; i < this.tiles.length; ++i) {
            for (var j = 0; j < this.tiles[0].length; ++j) {
                this.tiles[i][j].tick();
            }
        }
    };
    return chunk;
}());
exports["default"] = chunk;
