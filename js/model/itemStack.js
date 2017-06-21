"use strict";
exports.__esModule = true;
var itemStack = (function () {
    function itemStack(i, c) {
        this.tick = function () {
        }.bind(this);
        this.item = i;
        this.count = c;
    }
    return itemStack;
}());
exports["default"] = itemStack;
