define(["require", "exports", "../../js/vendor/three"], function (require, exports, THREEJS) {
    "use strict";
    var Game = (function () {
        function Game(t) {
            this.THREE = t;
        }
        Game.prototype.init = function (mapSize) {
            this.size = mapSize;
            var WIDTH = 600;
            var HEIGHT = 400;
            // Set some camera attributes.
            // Create a WebGL renderer, camera
            // and a scene
            this.renderer = new THREEJS.WebGLRenderer();
            var VIEW_ANGLE = 0;
            var ASPECT = WIDTH / HEIGHT;
            var NEAR = 0.1;
            var FAR = 10000;
            this.camera = new this.THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 0.1, 20000);
            this.camera.position.z = 5;
            this.scene = new this.THREE.Scene();
            // Add the camera to the scene.
            this.scene.add(this.camera);
            var geometry = new this.THREE.CubeGeometry(1, 1, 1);
            geometry.scale(0.8, 0.8, 0.8);
            var material = new this.THREE.MeshBasicMaterial({
                color: 0xFFFFFF
            });
            var cube = new this.THREE.Mesh(geometry, material);
            this.scene.add(cube);
            // Create a light, set its position, and add it to the scene.
            var light = new this.THREE.PointLight(0xffffff);
            light.position.set(-100, 200, 100);
            this.scene.add(light);
            this.scene.add(new this.THREE.AxisHelper(5));
            // Start the renderer.
            this.renderer.setSize(WIDTH, HEIGHT);
            // Attach the renderer-supplied
            // DOM element.
            var container = document.querySelector('#container');
            container.appendChild(this.renderer.domElement);
            this.renderer.render(this.scene, this.camera);
        };
        return Game;
    }());
    return Game;
});
