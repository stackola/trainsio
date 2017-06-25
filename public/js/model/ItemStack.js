define(["require", "exports"], function (require, exports) {
    "use strict";
    var ItemStack = (function () {
        function ItemStack(obj, position, im) {
            this.item = obj.name;
            this.count = obj.count;
            this.id = obj.id;
            this.im = im;
            var spriteMap = new this.im.game.THREE.TextureLoader().load("/sprites/gold.png");
            this.spriteMat = new this.im.game.THREE.SpriteMaterial({
                map: spriteMap,
                color: 0xffffff,
                rotation: Math.PI / 2 * 1
            });
            this.sprite = new this.im.game.THREE.Sprite(this.spriteMat);
            this.gameObject = new this.im.game.THREE.Mesh();
            this.gameObject.add(this.sprite);
            this.gameObject.translateZ(2);
            this.gameObject.translateX(position.x);
            this.gameObject.translateY(position.y);
            this.im.game.scene.add(this.gameObject);
        }
        ItemStack.prototype.update = function (obj, position) {
            this.gameObject.position.set(position.x, position.y, 2);
        };
        return ItemStack;
    }());
    return ItemStack;
});
