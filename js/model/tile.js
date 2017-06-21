"use strict";
exports.__esModule = true;
var tile = (function () {
    function tile(x, y, world) {
        this.tick = function () {
        }.bind(this);
        this.x = x;
        this.y = y;
        this.world = world;
    }
    tile.prototype.getLocation = function () {
        return "Tile (" + this.x + ":" + this.y + ")";
    };
    tile.prototype.getNeighbors = function () {
        return this.world.getNeighbors(this);
    };
    return tile;
}());
exports["default"] = tile;
