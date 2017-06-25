import Chunk = require("./Chunk.js");
import Game = require("./Game.js");


class GameStateManager {
	chunks: Array<{id:string, chunk:Chunk}>
	game:Game;
	constructor(g:Game) {
		this.game=g;
		this.chunks=[];


	}

	receiveChunk(chunk: any) {
		//console.log("chunk received");
		//console.log(chunk);
		//check if we have seen this chunk before
		var search = this.chunks.filter(function(c){return c.id == chunk.id});
		if (search.length==0){
			//console.log("new chunk");
			this.chunks.push({id:chunk.id, chunk: new Chunk(chunk, this.game)});
			//console.log(this.chunks);
		}
		else{
			//console.log("old chunk update stuff");
			search[0].chunk.update(chunk);
		}
	}



}

export = GameStateManager;