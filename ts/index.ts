import map from "./model/map";
import item from "./model/item";
import factory from "./model/factory";

var world: map = new map(10, 10);

//instantiate items.
var gold: item = new item("Gold");

var f: factory = new factory(gold, 1, world.tiles[0][0]);

// function tick(): void {
// 	world.tick();
// }


// setInterval(function() {
// 	tick();
// }, 1000 / 10);