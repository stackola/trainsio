"use strict";
exports.__esModule = true;
var map_1 = require("./model/map");
var item_1 = require("./model/item");
var factory_1 = require("./model/factory");
var world = new map_1["default"](15, 15);
//instantiate items.
var gold = new item_1["default"]("Gold");
var f = new factory_1["default"](gold, 1, world.tiles[0][0]);
world.tiles[0][1].makeConveyor("right");
world.tiles[0][2].makeConveyor("right");
world.tiles[0][3].makeConveyor("up");
function tick() {
    f.tick();
    world.tick();
    console.log(world.toSymbols());
}
setInterval(function () {
    //console.log("tick");
    tick();
}, 1000 / 10);
