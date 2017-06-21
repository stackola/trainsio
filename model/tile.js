function tile(x,y){
	this.x=x;
	this.y=y;

	this.getLocation = function(){
		return "Tile ("+this.x+":"+this.y+")\n";
	}

}

module.exports = tile;