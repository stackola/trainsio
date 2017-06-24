define(["require", "exports"], function (require, exports) {
    "use strict";
    var Game = (function () {
        function Game() {
        }
        Game.prototype.init = function (mapSize) {
            this.size = mapSize;
        };
        return Game;
    }());
    return Game;
});
