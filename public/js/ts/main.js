define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = requirejs([
        '/js/model/Game.js',
        '/js/model/vector.js',
        '/socket.io/socket.io.js',
        '/js/model/SocketManager.js',
        '/js/model/GameStateManager.js',
        '/js/model/Chunk.js',
        '/js/vendor/three.js',
    ], function (_Game, Vector, sockets, SocketManager, GameStateManager, Chunk, THREE) {
        console.log("loaded");
        //the gamestatemanager, receives socket stuff, outputs gameobject onto game possibly?
        var g = new _Game(THREE); //the game DOM object kind of
        g.init(new Vector(2000, 2000));
        var gsm = new GameStateManager(g);
        var s = sockets;
        var socketManager = new SocketManager(s, gsm); // talks to the server.
    });
});
