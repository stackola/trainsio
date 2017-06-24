"use strict";
exports.__esModule = true;
var shortid = require('shortid');
var item = (function () {
    function item(name) {
        this.tick = function () {
        }.bind(this);
        this.name = name;
        this.shortid = shortid.generate();
    }
    return item;
}());
exports["default"] = item;
