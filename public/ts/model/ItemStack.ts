// import Chunk = require("./Chunk.js");
// import Chunk = require("./Chunk.js");
import Vector = require("./Vector.js");
import ItemManager = require("./ItemManager.js");


class ItemStack {
	item:string;
	count:number;
	id:string;
	spriteMat:THREE.SpriteMaterial;
	sprite:THREE.Sprite;
	gameObject:THREE.Mesh;
	im:ItemManager;
	constructor(obj:any, position: Vector, im:ItemManager) {
		this.item=obj.name;
		this.count=obj.count;
		this.id=obj.id;
		this.im = im;

		var spriteMap = new this.im.game.THREE.TextureLoader().load("/sprites/gold.png");
		this.spriteMat = new this.im.game.THREE.SpriteMaterial({
			map: spriteMap,
			color: 0xffffff,
			rotation: Math.PI / 2 * 1
		});
		this.sprite = new this.im.game.THREE.Sprite(this.spriteMat);
		this.gameObject = new this.im.game.THREE.Mesh();

		this.gameObject.add(this.sprite);
		this.gameObject.translateZ(2);

		this.gameObject.translateX(position.x);
		this.gameObject.translateY(position.y);


		this.im.game.scene.add(this.gameObject);
	}

	update(obj:any, position:Vector):void{
		this.gameObject.position.set(position.x, position.y, 2);
	}
}

export = ItemStack;