define(["require", "exports", "./Chunk.js"], function (require, exports, Chunk) {
    "use strict";
    var GameStateManager = (function () {
        function GameStateManager(g) {
            this.game = g;
            this.chunks = [];
        }
        GameStateManager.prototype.receiveChunk = function (chunk) {
            console.log("chunk received");
            console.log(chunk);
            //check if we have seen this chunk before
            if (this.chunks.filter(function (c) { return c.id == chunk.id; }).length == 0) {
                console.log("new chunk");
                this.chunks.push({ id: chunk.id, chunk: new Chunk(chunk) });
                console.log(this.chunks);
            }
            else {
                console.log("old chunk update stuff");
            }
        };
        return GameStateManager;
    }());
    return GameStateManager;
});
