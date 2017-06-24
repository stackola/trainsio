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
            return { x: this.x, y: this.y };
        };
        return Vector;
    }());
    return Vector;
});
