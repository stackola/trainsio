var _tile = require("./tile.js");
function map(sizeX, sizeY){
	//initialize tiles array
	this.sizeX=sizeX;
	this.sizeY=sizeY;
	
	this.tiles = []; 
	for (var x = 0; x < this.sizeX; x++) {
		this.tiles[x]=[];

		for (var y = 0; y < this.sizeY; y++) {
			this.tiles[x][y]=new _tile(x,y);
		}
	}


	this.toString = function(){
		var str="";
		for (var x = 0; x < this.sizeX; x++) {
			for (var y = 0; y < this.sizeY; y++) {
				str+=this.tiles[x][y].getLocation();
			}
		}
		return str;
	}
}

module.exports = map;