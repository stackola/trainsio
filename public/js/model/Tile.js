define(["require", "exports", "./Vector.js", "./Conveyor.js", "./ItemStack.js"], function (require, exports, Vector, Conveyor, ItemStack) {
    "use strict";
    var Tile = (function () {
        function Tile(obj, chunk) {
            this.position = new Vector(obj.position.x, obj.position.y);
            this.chunk = chunk;
            //console.log("created tile", this.position);
            var isEmpty = false;
            this.gameObject = new this.chunk.game.THREE.Mesh();
            this.gameObject.translateX(this.position.x);
            this.gameObject.translateY(this.position.y);
            this.chunk.gameObject.add(this.gameObject);
            if (obj.hasConveyor) {
                this.conveyor = new Conveyor(this, obj.conveyor);
            }
            else if (obj.hasItem) {
                if (this.chunk.game.itemManager.has(obj.item.id)) {
                    console.log("item in itemmanager");
                }
                else {
                    console.log("creating itemstack");
                    this.chunk.game.itemManager.add(new ItemStack({
                        id: obj.item.id,
                        count: 12,
                        name: "gold"
                    }, this.toWorldPosition(), this.chunk.game.itemManager));
                }
            }
            else {
                var geometry = new this.chunk.game.THREE.CubeGeometry(1, 1, 1);
                geometry.scale(0.9, 0.9, 0.9);
                geometry.translate(-1, 0, 0);
                var material = new this.chunk.game.THREE.MeshBasicMaterial({
                    color: 0xff0000
                });
            }
        }
        Tile.prototype.toWorldPosition = function () {
            var x = this.position.x + this.chunk.position.x;
            var y = this.position.y + this.chunk.position.y;
            var v = new Vector(x, y);
            //console.log("world pos", v);
            return v;
        };
        Tile.prototype.update = function (obj) {
            if (obj.hasConveyor && this.conveyor == null) {
                this.conveyor = new Conveyor(this, obj.conveyor);
            }
            if (this.conveyor != null) {
                this.conveyor.update(obj.conveyor);
            }
            if (obj.hasItem) {
                if (this.chunk.game.itemManager.has(obj.item.id)) {
                    //console.log("item in itemmanager, should update");
                    var is = this.chunk.game.itemManager.get(obj.item.id);
                    is.update(obj.item, this.toWorldPosition());
                }
                else {
                    //console.log("creating itemstack");
                    this.chunk.game.itemManager.add(new ItemStack({
                        id: obj.item.id,
                        count: 12,
                        name: "gold"
                    }, this.toWorldPosition(), this.chunk.game.itemManager));
                }
            }
        };
        return Tile;
    }());
    return Tile;
});
