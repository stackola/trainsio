define(["require", "exports", "./Tile.js"], function (require, exports, Tile) {
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
            this.gameObject = new this.game.THREE.Mesh();
            this.gameObject.translateX(obj.position.x * obj.size);
            this.gameObject.translateY(obj.position.y * obj.size);
            this.game.floor.add(this.gameObject);
            for (var i = 0; i < obj.tiles.length; ++i) {
                this.tiles.push(new Tile(obj.tiles[i], this));
            }
        }
        Chunk.prototype.update = function () {
        };
        return Chunk;
    }());
    return Chunk;
});
