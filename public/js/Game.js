define(["require", "exports"], function (require, exports) {
    "use strict";
    var Game = (function () {
        function Game() {
        }
        Game.prototype.init = function (mapSize) {
            var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', {
                preload: this.preload,
                create: this.create,
                update: this.update,
                render: this.render
            });
        };
        Game.prototype.preload = function () {
        };
        Game.prototype.create = function () {
        };
        Game.prototype.update = function () {
        };
        Game.prototype.render = function () {
        };
        return Game;
    }());
    return Game;
});
