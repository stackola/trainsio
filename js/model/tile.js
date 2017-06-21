"use strict";
exports.__esModule = true;
var tile = (function () {
    function tile(x, y) {
        this.getLocation = function () {
            return "Tile (" + this.x + ":" + this.y + ")";
        };
        this.tick = function () {
        }.bind(this);
        this.x = x;
        this.y = y;
    }
    return tile;
}());
exports["default"] = tile;
