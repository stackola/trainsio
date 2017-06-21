function tile(x, y) {
	this.x = x;
	this.y = y;

	this.walkable = true;
	this.hasFurniture = false;
	this.furniture = {exists:false};
	this.item={exists:false};

	this.getLocation = function() {
		return "Tile (" + this.x + ":" + this.y + ")";
	}

	this.tick = function() {

	}.bind(this);

}

module.exports = tile;