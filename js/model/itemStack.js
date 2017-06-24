"use strict";
exports.__esModule = true;
var shortid = require('shortid');
var itemStack = (function () {
    function itemStack(i, c) {
        this.tick = function () {
        }.bind(this);
        this.item = i;
        this.count = c;
        this.shortid = shortid.generate();
    }
    return itemStack;
}());
exports["default"] = itemStack;
