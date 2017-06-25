import Game = require("./Game.js");
import Chunk = require("./Chunk.js");
import Vector = require("./Vector.js");
import Conveyor = require("./Conveyor.js");

class Tile {
	position: Vector;
	chunk: Chunk;
	gameObject: THREE.Mesh;
	conveyor: Conveyor;
	constructor(obj: any, chunk: Chunk) {
		this.position = new Vector(obj.position.x, obj.position.y);
		this.chunk = chunk;
		//console.log("created tile", this.position);
		var isEmpty= false;
		

		this.gameObject = new this.chunk.game.THREE.Mesh();
		this.gameObject.translateX(this.position.x);
		this.gameObject.translateY(this.position.y);		
		this.chunk.gameObject.add(this.gameObject);
		if (obj.hasConveyor) {
			this.conveyor = new Conveyor(this, obj.conveyor);

		}
		else
		{
			var geometry: THREE.CubeGeometry = new this.chunk.game.THREE.CubeGeometry(1, 1, 1);
			geometry.scale(0.9, 0.9, 0.9);
			geometry.translate(-1,0,0);
			var material = new this.chunk.game.THREE.MeshBasicMaterial({
				color: 0xff0000
			});
		}

	}

	update(obj: any): void {
	
		// if (obj.hasItem) {
			// 	this.gameObject.material = new this.chunk.game.THREE.MeshBasicMaterial({
				// 		color: 0x00FFFF
				// 	});
				// }
				// else
				// {
					// 	if (obj.hasConveyor) {
						// 		this.gameObject.material = new this.chunk.game.THREE.MeshBasicMaterial({
							// 			color: 0x00FF00
							// 		});

							// 		if (obj.conveyor.hasItem) {
								// 			this.gameObject.material = new this.chunk.game.THREE.MeshBasicMaterial({
									// 				color: 0x00FFFF
									// 			});
									// 		}
									// 	}
									// 	if (obj.hasFactory) {

										// 		this.gameObject.material = new this.chunk.game.THREE.MeshBasicMaterial({
											// 			color: 0x0000FF
											// 		});
											// 	}
											// }
										}
									}

									export = Tile;