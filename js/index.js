"use strict";
exports.__esModule = true;
var map_1 = require("./model/map");
var item_1 = require("./model/item");
var factory_1 = require("./model/factory");
var world = new map_1["default"](50, 50, 10);
//instantiate items.
var gold = new item_1["default"]("Gold");
var f = new factory_1["default"](gold, 1, world.chunks[0][0].tiles[0][0]);
/*

world.tiles[0][2].makeConveyor("right");
world.tiles[0][3].makeConveyor("up");
*/
world.chunks[0][0].tiles[0][1].makeConveyor("right");
world.chunks[0][0].tiles[1][1].makeConveyor("right");
function tick() {
    f.tick();
    world.tick();
    console.log(world.chunks[0][0].toSymbols());
}
setInterval(function () {
    console.log("tick");
    tick();
}, 1000 / 10);
