import Vector = require("./Vector.js");
import InputManager = require("./InputManager.js");



class Game {
	size: Vector;
	scene: THREE.Scene;
	THREE: any;
	camera: THREE.OrthographicCamera;
	renderer: THREE.WebGLRenderer;

	constructor(t: any) {
		this.THREE = t;
	}

	init(mapSize: Vector): void {

		this.size = mapSize;

		var WIDTH = 600;
		var HEIGHT = 400;
		// Set some camera attributes.
		// Create a WebGL renderer, camera
		// and a scene
		this.renderer = new this.THREE.WebGLRenderer();


		var ASPECT = WIDTH / HEIGHT;
		this.camera = new this.THREE.OrthographicCamera(-ASPECT * 5, ASPECT * 5, 5, -5, 0.1, 20000);
		this.camera.zoom = 2;
		this.camera.position.z = 10;
		this.camera.updateProjectionMatrix();
		

		this.scene = new this.THREE.Scene();

		var geometry: THREE.CubeGeometry = new this.THREE.CubeGeometry(1, 1, 1);
		geometry.scale(0.8, 0.8, 0.8);
		var material = new this.THREE.MeshBasicMaterial({
			color: 0xFFFFFF
		});
		var cube: THREE.Mesh = new this.THREE.Mesh(geometry, material);
		

		var light = new this.THREE.PointLight(0xffffff);
		light.position.set(-100, 200, 100);


		this.scene.add(this.camera);
		this.scene.add(cube);
		this.scene.add(light);
		this.scene.add(new this.THREE.AxisHelper(5));

		

		this.renderer.setSize(WIDTH, HEIGHT);

		// Attach the renderer-supplied
		// DOM element.
		var container =
		document.querySelector('#container');
		container.appendChild(this.renderer.domElement);
		var inputManager = new InputManager(this.renderer.domElement);

		this.renderer.render(this.scene, this.camera);

	}
	_tick(): void {
		//this.camera.position.add(new this.THREE.Vector3(0, 0.01, 0));
		this.renderer.render(this.scene, this.camera);
	}

	tick = function() {
		this._tick();
	}.bind(this);
}



export = Game;