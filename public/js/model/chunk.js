define(["require", "exports", "./Tile.js", "./Vector.js"], function (require, exports, Tile, Vector) {
    "use strict";
    var Chunk = (function () {
        function Chunk(obj, game) {
            this.created = null;
            this.updated = null;
            this.tiles = [];
            // create 
            this.game = game;
            var now = new Date();
            this.created = now;
            this.updated = now;
            this.size = obj.size;
            this.position = new Vector(0, 0);
            this.position.x = obj.position.x * this.size;
            this.position.y = obj.position.x * this.size;
            this.gameObject = new this.game.THREE.Mesh();
            this.gameObject.translateX(obj.position.x * obj.size);
            this.gameObject.translateY(obj.position.y * obj.size);
            this.game.floor.add(this.gameObject);
            for (var i = 0; i < obj.tiles.length; ++i) {
                this.tiles.push(new Tile(obj.tiles[i], this));
            }
        }
        Chunk.prototype.update = function (obj) {
            for (var i = 0; i < obj.tiles.length; ++i) {
                this.tiles[i].update(obj.tiles[i]);
            }
        };
        return Chunk;
    }());
    return Chunk;
});
