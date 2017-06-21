"use strict";
exports.__esModule = true;
var factory = (function () {
    function factory(i, l, t) {
        this.tick = function () {
        }.bind(this);
        this.product = i;
        this.level = l;
        this.baseTile = t;
        this.setOutput();
    }
    factory.prototype.setOutput = function () {
        var ns = this.baseTile.getNeighbors();
        console.log(ns);
    };
    return factory;
}());
exports["default"] = factory;
