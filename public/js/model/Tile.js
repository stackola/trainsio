define(["require", "exports"], function (require, exports) {
    "use strict";
    var Tile = (function () {
        function Tile(x, y, chunk) {
            this.x = x;
            this.y = y;
            this.chunk = chunk;
        }
        return Tile;
    }());
    return Tile;
});
