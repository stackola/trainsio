define(["require", "exports"], function (require, exports) {
    "use strict";
    var SocketManager = (function () {
        function SocketManager(s, gsm) {
            this.name = "okay";
            this.gsm = gsm;
            this.socket = s.connect();
            this.socket.on("connect", this.connect.bind(this));
            this.socket.on("chunkState", this.chunkState.bind(this));
        }
        SocketManager.prototype.connect = function () {
            console.log("socket connected");
            console.log(this.name);
        };
        SocketManager.prototype.chunkState = function (cs) {
            this.gsm.receiveChunk(cs);
        };
        SocketManager.prototype.playerPosition = function (v) {
            this.socket.emit("playerPosition", v.toObject());
        };
        return SocketManager;
    }());
    return SocketManager;
});
