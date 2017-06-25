import Tile = require("./Tile.js");

class Conveyor {
	direction: string;
	gameObject: THREE.Sprite;
	tile: Tile;
	spriteMat:THREE.SpriteMaterial;
	sprite:THREE.Sprite;
	constructor(tile: Tile, obj:any) {
		this.tile = tile;
				//                  Sorry.
		var spriteMap = new this.tile.chunk.game.THREE.TextureLoader().load("/sprites/conveyor_1.png");
		var rotation = 0; //right
		if (obj.direction == "up"){
			rotation=Math.PI / 2 * 1
		}
		if (obj.direction == "left"){
			rotation=Math.PI / 2 * 2
		}
		if (obj.direction == "down"){
			rotation=Math.PI / 2 * 3
		}
		this.spriteMat = new this.tile.chunk.game.THREE.SpriteMaterial({
			map: spriteMap,
			color: 0xffffff,
			rotation: Math.PI / 2 * 3
		});
		this.sprite = new this.tile.chunk.game.THREE.Sprite(this.spriteMat);
		this.tile.gameObject.add(this.sprite);
	}

	update():void{
		this.spriteMat.rotation+=0.01;
	}
}

export = Conveyor;