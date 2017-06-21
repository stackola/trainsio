"use strict";
exports.__esModule = true;
var map_1 = require("./model/map");
var world = new map_1["default"](10, 10);
console.log(world.getString());
function tick() {
    world.tick();
}
setInterval(function () {
    tick();
}, 1000 / 10);
