"use strict";
exports.__esModule = true;
var conveyor_1 = require("./conveyor");
var vector_1 = require("./vector");
var factory_1 = require("./factory");
var localPosition_1 = require("./localPosition");
var shortid = require('shortid');
var tile = (function () {
    function tile(x, y, chunk) {
        this.itemStack = null;
        this.neighbors = null;
        this.conveyor = null;
        this.factory = null;
        this.tick = function () {
            this._tick();
        }.bind(this);
        this.localPosition = new localPosition_1["default"](x, y, chunk);
        this.shortid = shortid.generate();
    }
    tile.prototype.getGamestate = function () {
        var obj = {
            position: this.localPosition.toObject(),
            hasItem: this.itemStack != null,
            hasConveyor: this.conveyor != null
        };
        return obj;
    };
    tile.prototype.makeFactory = function (i, l) {
        this.factory = new factory_1["default"](i, l, this);
    };
    tile.prototype.getNeighbors = function () {
        if (this.neighbors == null) {
            this.neighbors = new Map();
            var x = this.localPosition.getGlobal().x;
            var y = this.localPosition.getGlobal().y;
            var bottomLeft = new vector_1["default"](x - 1, y - 1);
            var left = new vector_1["default"](x - 1, y);
            var topLeft = new vector_1["default"](x - 1, y + 1);
            var top = new vector_1["default"](x, y + 1);
            var bottom = new vector_1["default"](x, y - 1);
            var bottomRight = new vector_1["default"](x + 1, y - 1);
            var right = new vector_1["default"](x + 1, y);
            var topRight = new vector_1["default"](x + 1, y + 1);
            if (this.localPosition.chunk.world.isTile(bottomLeft)) {
                this.neighbors.set("bottomLeft", this.localPosition.chunk.world.getTileFromGlobal(bottomLeft));
                // console.log("added bottomLeft");
            }
            if (this.localPosition.chunk.world.isTile(left)) {
                this.neighbors.set("left", this.localPosition.chunk.world.getTileFromGlobal(left));
                // console.log("added left");
            }
            if (this.localPosition.chunk.world.isTile(topLeft)) {
                this.neighbors.set("topLeft", this.localPosition.chunk.world.getTileFromGlobal(topLeft));
                // console.log("added topLeft");
            }
            if (this.localPosition.chunk.world.isTile(top)) {
                this.neighbors.set("top", this.localPosition.chunk.world.getTileFromGlobal(top));
                // console.log("added top");
            }
            if (this.localPosition.chunk.world.isTile(bottom)) {
                this.neighbors.set("bottom", this.localPosition.chunk.world.getTileFromGlobal(bottom));
                // console.log("added bottom");
            }
            if (this.localPosition.chunk.world.isTile(bottomRight)) {
                this.neighbors.set("bottomRight", this.localPosition.chunk.world.getTileFromGlobal(bottomRight));
                // console.log("added bottomRight");
            }
            if (this.localPosition.chunk.world.isTile(right)) {
                this.neighbors.set("right", this.localPosition.chunk.world.getTileFromGlobal(right));
                // console.log("added right");
            }
            if (this.localPosition.chunk.world.isTile(topRight)) {
                this.neighbors.set("topRight", this.localPosition.chunk.world.getTileFromGlobal(topRight));
                // console.log("added topRight");
            }
        }
        return this.neighbors;
    };
    tile.prototype.makeConveyor = function (direction) {
        this.conveyor = new conveyor_1["default"](this, direction);
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
        if (this.factory != null) {
            this.factory.tick();
        }
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
