define(["require", "exports", "./ItemStack.js"], function (require, exports, ItemStack) {
    "use strict";
    var Conveyor = (function () {
        function Conveyor(tile, obj) {
            this.tile = tile;
            this.progress = obj.progress;
            //                  Sorry.
            var spriteMap = new this.tile.chunk.game.THREE.TextureLoader().load("/sprites/conveyor_1.png");
            var rotation = 0; //top
            if (obj.direction == "right") {
                rotation = rotation = Math.PI / 2 * 3; //right
            }
            if (obj.direction == "left") {
                rotation = Math.PI / 2 * 1;
            }
            if (obj.direction == "down") {
                rotation = Math.PI / 2 * 2;
            }
            this.spriteMat = new this.tile.chunk.game.THREE.SpriteMaterial({
                map: spriteMap,
                color: 0xffffff,
                rotation: rotation
            });
            this.sprite = new this.tile.chunk.game.THREE.Sprite(this.spriteMat);
            this.tile.gameObject.add(this.sprite);
            if (obj.hasItem) {
                if (this.tile.chunk.game.itemManager.has(obj.item.id)) {
                    console.log("item in itemmanager, should update it");
                    var is = this.tile.chunk.game.itemManager.get(obj.item.id);
                    is.update(obj.item, this.tile.toWorldPosition());
                }
                else {
                    console.log("creating itemstack");
                    this.tile.chunk.game.itemManager.add(new ItemStack({ id: obj.item.id, count: 12, name: "gold" }, this.tile.toWorldPosition(), this.tile.chunk.game.itemManager));
                }
            }
        }
        Conveyor.prototype.tick = function () {
        };
        Conveyor.prototype.update = function (obj) {
            this.progress = obj.progress;
            if (obj.hasItem) {
                if (this.tile.chunk.game.itemManager.has(obj.item.id)) {
                    console.log("item in itemmanager, should update it");
                    var is = this.tile.chunk.game.itemManager.get(obj.item.id);
                    var v = this.tile.toWorldPosition();
                    v.x += 1 - this.progress;
                    is.update(obj.item, v);
                }
                else {
                    console.log("creating itemstack");
                    this.tile.chunk.game.itemManager.add(new ItemStack({ id: obj.item.id, count: 12, name: "gold" }, this.tile.toWorldPosition(), this.tile.chunk.game.itemManager));
                }
            }
        };
        return Conveyor;
    }());
    return Conveyor;
});
