define(["require", "exports", "./Vector.js"], function (require, exports, Vector) {
    "use strict";
    var Tile = (function () {
        function Tile(obj, chunk) {
            this.position = new Vector(obj.position.x, obj.position.y);
            this.chunk = chunk;
            //console.log("created tile", this.position);
            var geometry = new this.chunk.game.THREE.CubeGeometry(1, 1, 1);
            geometry.scale(0.9, 0.9, 0.9);
            var material = new this.chunk.game.THREE.MeshBasicMaterial({
                color: 0xff0000
            });
            this.gameObject = new this.chunk.game.THREE.Mesh(geometry, material);
            this.gameObject.translateX(this.position.x);
            this.gameObject.translateY(this.position.y);
            this.chunk.gameObject.add(this.gameObject);
        }
        return Tile;
    }());
    return Tile;
});
