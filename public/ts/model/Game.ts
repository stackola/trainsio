import Vector = require("./Vector.js");
import InputManager = require("./InputManager.js");
import SocketManager = require("./SocketManager.js");



class Game {
	size: Vector;
	scene: THREE.Scene;
	THREE: any;
	camera: THREE.OrthographicCamera;
	renderer: THREE.WebGLRenderer;
	floor: THREE.Mesh;
	socketManger: SocketManager;

	constructor(t: any) {
		this.THREE = t;
	}

	setSocketManager(sm: SocketManager): void {
		this.socketManger = sm;
	}

	init(mapSize: Vector): void {

		this.size = mapSize;

		var WIDTH = 640;
		var HEIGHT = 480;
		var chunkSize = 15;
		// Set some camera attributes.
		// Create a WebGL renderer, camera
		// and a scene
		this.renderer = new this.THREE.WebGLRenderer();


		var ASPECT = WIDTH / HEIGHT;
		this.camera = new this.THREE.OrthographicCamera(-ASPECT * 5, ASPECT * 5, 5, -5, 0.1, 20000);
		this.camera.zoom = 1;
		this.camera.position.z = 10;
		this.camera.updateProjectionMatrix();


		this.scene = new this.THREE.Scene();

		// var light = new this.THREE.PointLight(0xffffff);
		// light.position.set(-100, 200, 100);
		this.floor = new this.THREE.Mesh();
		// this.floor.translateX(chunkSize / 2);
		// this.floor.translateY(chunkSize / 2);

		this.scene.add(this.camera);
		this.scene.add(this.floor);
		//this.scene.add(light);
		this.scene.add(new this.THREE.AxisHelper(5));
		this.renderer.setSize(WIDTH, HEIGHT);

		// Attach the renderer-supplied
		// DOM element.
		var container =
		document.querySelector('#container');
		container.appendChild(this.renderer.domElement);
		var inputManager = new InputManager(this.renderer.domElement, this);

		this.renderer.render(this.scene, this.camera);

	}
	moveCam(v: Vector): void {
		//console.log("moving cam maybe", v);
		this.camera.position.add(new this.THREE.Vector3(-v.x / 50 * 1 / this.camera.zoom, v.y / 50 * 1 / this.camera.zoom, 0));
		this.outputCenter();
	}
	binaryZoom(d: number): void {
		this.camera.zoom += d * 0.11;
		if (this.camera.zoom < 0.5) {
			this.camera.zoom=0.5;
		}
		this.camera.updateProjectionMatrix();
		console.log(this.camera.zoom);
		this.outputCenter();
	}
	outputCenter(): void {
		console.log(this.camera.position);
		this.socketManger.playerPosition(new Vector(this.camera.position.x, this.camera.position.y));
	}
	_tick(): void {
		this.renderer.render(this.scene, this.camera);
	}

	tick = function() {
		this._tick();
	}.bind(this);
}



export = Game;