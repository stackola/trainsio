"use strict";
exports.__esModule = true;
var conveyor_1 = require("./conveyor");
var tile = (function () {
    function tile(x, y, chunk) {
        this.itemStack = null;
        this.neighbors = null;
        this.conveyor = null;
        this.tick = function () {
            this._tick();
        }.bind(this);
        this.x = x;
        this.y = y;
        this.chunk = chunk;
    }
    tile.prototype.makeConveyor = function (direction) {
        this.conveyor = new conveyor_1["default"](this, direction);
    };
    tile.prototype.getLocation = function () {
        return "Tile (" + this.x + ":" + this.y + ")";
    };
    tile.prototype.toSymbol = function () {
        if (this.itemStack != null || (this.conveyor != null && this.conveyor.itemStack != null)) {
            return "0";
        }
        return "O";
    };
    tile.prototype.receiveItemStack = function (s) {
        if (this.itemStack == null) {
            this.itemStack = s;
            // console.log(this.getLocation() + " received item stack");
            return true;
        }
        //console.log("item already set on this tile.");
        return false;
    };
    tile.prototype._tick = function () {
        if (this.itemStack != null) {
            this.itemStack.tick();
        }
        if (this.conveyor != null) {
            this.conveyor.tick();
        }
    };
    return tile;
}());
exports["default"] = tile;
