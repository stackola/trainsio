"use strict";
exports.__esModule = true;
var vector_1 = require("./vector");
var globalPosition = (function () {
    function globalPosition(x, y, chunk) {
        this.tick = function () {
        }.bind(this);
        this.x = x;
        this.y = y;
        this.chunk = chunk;
    }
    globalPosition.prototype.getGlobal = function () {
        return new vector_1["default"](this.chunk.x * this.chunk.size + this.x, this.chunk.y * this.chunk.size + this.y);
    };
    globalPosition.prototype.getString = function () {
        return "Chunk (" + this.chunk.x + ":" + this.chunk.y + "). Pos: (" + this.x + ":" + this.y + ")";
    };
    return globalPosition;
}());
exports["default"] = globalPosition;
