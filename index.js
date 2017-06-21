var _map = require("./model/map.js");

var map = new _map(10, 10);
console.log(map.toString());

function tick() {

	map.tick();
}


setInterval(function() {
	tick();
}, 1000 / 10);