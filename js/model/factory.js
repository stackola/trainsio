"use strict";
exports.__esModule = true;
var itemStack_1 = require("./itemStack");
var factory = (function () {
    function factory(i, l, t) {
        this.tick = function () {
            this._tick();
        }.bind(this);
        this.product = i;
        this.level = l;
        this.baseTile = t;
        this.setOutput();
    }
    factory.prototype.setOutput = function () {
        var ns = this.baseTile.getNeighbors();
        this.outputTile = ns.values().next().value;
        // console.log("set factory output tile." + this.outputTile.localPosition.getString());
    };
    factory.prototype._tick = function () {
        if (this.outputTile.receiveItemStack(new itemStack_1["default"](this.product, 10))) {
            // console.log("factory dropped of item stack");
        }
    };
    return factory;
}());
exports["default"] = factory;
