define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    requirejs([
        '/js/game.js',
        '/js/model/vector.js',
        '/socket.io/socket.io.js'
    ], function (_Game, Vector, sockets) {
        console.log("loaded");
        var g = new _Game();
        var s = sockets.connect();
        s.on("connect", function (socket) {
            console.log("socket connected");
            g.init(new Vector(2000, 2000));
        });
        s.on("chunkState", function (socket) {
            console.log("chunk");
        });
    });
});
