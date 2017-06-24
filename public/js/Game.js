define(["require", "exports"], function (require, exports) {
    "use strict";
    var Game = (function () {
        function Game(gsm) {
            this.preload = function () {
            }.bind(this);
            this.create = function () {
                this.game.world.setBounds(0, 0, this.size.x, this.size.y);
            }.bind(this);
            this.update = function () {
                // get current state from gamestatemanager
                // update all elements in gamestate
                // remove elements not in gamestate
            }.bind(this);
            this.render = function () {
                this.game.debug.cameraInfo(this.game.camera, 32, 32);
            }.bind(this);
            this.gsm = gsm;
        }
        Game.prototype.init = function (mapSize) {
            this.size = mapSize;
            this.game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', {
                preload: this.preload,
                create: this.create,
                update: this.update,
                render: this.render
            });
        };
        return Game;
    }());
    return Game;
});
