import map from "./model/map";
import item from "./model/item";


var world:map = new map(10, 10);

console.log(world.getString());
function tick():void {
	world.tick();
}


setInterval(function() {
	tick();
}, 1000 / 10);