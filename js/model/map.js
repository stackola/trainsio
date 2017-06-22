"use strict";
exports.__esModule = true;
var chunk_1 = require("./chunk");
var map = (function () {
    function map(sx, sy, cs) {
        this.chunks = [];
        this.tick = function () {
        }.bind(this); // always bind this to functions you want to pass.
        var countX = Math.floor(sx / cs);
        var countY = Math.floor(sy / cs);
        for (var x = 0; x < countX; ++x) {
            this.chunks[x] = [];
            for (var y = 0; y < countY; ++y) {
                console.log("making chunk " + x + ":" + y);
                this.chunks[x][y] = (new chunk_1["default"](x, y, cs, this));
            }
        }
        console.log(this.chunks[0][0].toString());
    }
    return map;
}());
exports["default"] = map;
