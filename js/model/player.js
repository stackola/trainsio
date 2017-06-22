"use strict";
exports.__esModule = true;
var player = (function () {
    function player(name) {
        this.tick = function () {
        }.bind(this);
        this.name = name;
        this.gold = 1000;
    }
    return player;
}());
exports["default"] = player;
