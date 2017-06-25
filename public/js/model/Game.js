define(["require", "exports", "./Vector.js", "./InputManager.js", "./ItemManager.js", "./ItemStack.js"], function (require, exports, Vector, InputManager, ItemManager, ItemStack) {
    "use strict";
    var Game = (function () {
        function Game(t) {
            this.tick = function () {
                this._tick();
            }.bind(this);
            this.THREE = t;
            this.itemManager = new ItemManager(this);
        }
        Game.prototype.setSocketManager = function (sm) {
            this.socketManger = sm;
        };
        Game.prototype.init = function (mapSize) {
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
            var container = document.querySelector('#container');
            container.appendChild(this.renderer.domElement);
            var inputManager = new InputManager(this.renderer.domElement, this);
            this.renderer.render(this.scene, this.camera);
            console.log("creating item named JAJA");
            this.itemManager.add(new ItemStack({ id: 'JAJA', count: 12, name: "gold" }, new Vector(0, 0), this.itemManager));
            console.log(this.itemManager.has("JAJA"));
        };
        Game.prototype.moveCam = function (v) {
            //console.log("moving cam maybe", v);
            this.camera.position.add(new this.THREE.Vector3(-v.x / 50 * 1 / this.camera.zoom, v.y / 50 * 1 / this.camera.zoom, 0));
            this.outputCenter();
        };
        Game.prototype.binaryZoom = function (d) {
            this.camera.zoom += d * 0.11;
            if (this.camera.zoom < 0.5) {
                this.camera.zoom = 0.5;
            }
            this.camera.updateProjectionMatrix();
            console.log(this.camera.zoom);
            this.outputCenter();
        };
        Game.prototype.outputCenter = function () {
            console.log(this.camera.position);
            this.socketManger.playerPosition(new Vector(this.camera.position.x, this.camera.position.y));
        };
        Game.prototype._tick = function () {
            this.renderer.render(this.scene, this.camera);
        };
        return Game;
    }());
    return Game;
});
