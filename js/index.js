"use strict";
exports.__esModule = true;
var map_1 = require("./model/map");
var item_1 = require("./model/item");
var factory_1 = require("./model/factory");
var world = new map_1["default"](10, 10);
//instantiate items.
var gold = new item_1["default"]("Gold");
var f = new factory_1["default"](gold, 1, world.tiles[0][0]);
// function tick(): void {
// 	world.tick();
// }
// setInterval(function() {
// 	tick();
// }, 1000 / 10); 
