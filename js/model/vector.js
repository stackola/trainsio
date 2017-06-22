"use strict";
exports.__esModule = true;
var vector = (function () {
    function vector(x, y) {
        this.tick = function () {
        }.bind(this);
        this.x = x;
        this.y = y;
    }
    vector.prototype.randomize = function (x, y) {
        this.x = Math.floor(Math.random() * (x));
        this.y = Math.floor(Math.random() * (y));
        console.log(this.x + ":" + this.y);
    };
    vector.prototype.round = function () {
        return new vector(Math.floor(this.x), Math.floor(this.y));
    };
    return vector;
}());
exports["default"] = vector;
