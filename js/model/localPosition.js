"use strict";
exports.__esModule = true;
var vector_1 = require("./vector");
var localPosition = (function () {
    function localPosition(x, y, chunk) {
        this.tick = function () {
        }.bind(this);
        this.x = x;
        this.y = y;
        this.chunk = chunk;
    }
    localPosition.prototype.getGlobal = function () {
        return new vector_1["default"](this.chunk.x * this.chunk.size + this.x, this.chunk.y * this.chunk.size + this.y);
    };
    localPosition.prototype.getString = function () {
        return "Chunk (" + this.chunk.x + ":" + this.chunk.y + "). Pos: (" + this.x + ":" + this.y + ")";
    };
    localPosition.prototype.toObject = function () {
        return new vector_1["default"](this.x, this.y).toObject();
    };
    return localPosition;
}());
exports["default"] = localPosition;
