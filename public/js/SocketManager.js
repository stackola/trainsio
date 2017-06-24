define(["require", "exports"], function (require, exports) {
    "use strict";
    var SocketManager = (function () {
        function SocketManager(s, gsm) {
            this.name = "okay";
            this.gsm = gsm;
            this.socket = s.connect();
            this.socket.on("connect", this.connect.bind(this));
        }
        SocketManager.prototype.connect = function () {
            console.log("socket connected");
            console.log(this.name);
        };
        return SocketManager;
    }());
    return SocketManager;
});
