define(["require", "exports"], function (require, exports) {
    "use strict";
    var ItemManager = (function () {
        function ItemManager(g) {
            this.items = [];
            this.game = g;
        }
        ItemManager.prototype.has = function (query) {
            return this.items.filter(function (v) {
                return v.id == query;
            }).length > 0;
        };
        ItemManager.prototype.get = function (query) {
            return this.items.filter(function (v) {
                return v.id == query;
            })[0].item;
        };
        ItemManager.prototype.add = function (is) {
            this.items.push({
                id: is.id,
                item: is
            });
            console.log("added obj" + is.id);
            console.log(this.items);
        };
        return ItemManager;
    }());
    return ItemManager;
});
