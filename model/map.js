var _tile = require("./tile.js");

function map(sizeX, sizeY) {
	// initialize tiles array
	this.sizeX = sizeX;
	this.sizeY = sizeY;
	this.tiles = [];

	for (var x = 0; x < this.sizeX; x++) {
		this.tiles[x] = [];

		for (var y = 0; y < this.sizeY; y++) {
			var t = new _tile(x, y);
			this.tiles[x][y] = t;
		}
	}


	this.toString = function() {
		var str = "Map of size (" + this.sizeX + "x" + this.sizeY + ") \n";
		for (var x = 0; x < this.sizeX; x++) {
			for (var y = 0; y < this.sizeY; y++) {
				str += this.tiles[x][y].getLocation() + "\n";
			}
		}
		return str;
	}

	this.tick = function() {
		console.log("map tick");
		// map tick, who knows.
	}.bind(this); // always bind this to functions you want to pass.
}

module.exports = map;