define(["require", "exports"], function (require, exports) {
    "use strict";
    var Vector = (function () {
        function Vector(x, y) {
            this.tick = function () {
            }.bind(this);
            this.x = x;
            this.y = y;
        }
        Vector.prototype.randomize = function (x, y) {
            this.x = Math.floor(Math.random() * (x));
            this.y = Math.floor(Math.random() * (y));
            console.log(this.x + ":" + this.y);
        };
        Vector.prototype.round = function () {
            return new Vector(Math.floor(this.x), Math.floor(this.y));
        };
        Vector.prototype.toObject = function () {
            return {
                x: this.x,
                y: this.y
            };
        };
        Vector.prototype.difference = function (v2) {
            return new Vector(v2.x - this.x, v2.y - this.y);
        };
        Vector.prototype.length = function () {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        };
        return Vector;
    }());
    return Vector;
});
