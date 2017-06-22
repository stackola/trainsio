import map from "./model/map";
import item from "./model/item";
import factory from "./model/factory";
import conveyor from "./model/conveyor";
import vector from "./model/vector";

var world: map = new map(350, 350, 25);



//instantiate items.
var gold: item = new item("Gold");


/*

world.tiles[0][2].makeConveyor("right");
world.tiles[0][3].makeConveyor("up");
*/
world.chunks[0][0].tiles[0][0].makeFactory(gold, 1);
world.chunks[0][0].tiles[0][1].makeConveyor("right");
world.chunks[0][0].tiles[1][1].makeConveyor("right");

console.log("done initializing");

function tick(): void {
	console.time('tick');
	world.tick();
	console.timeEnd('tick');

	console.log(world.chunks[0][0].toSymbols());
}


setInterval(function() {
	//console.log("tick");
	tick();

}, 1000 / 10);