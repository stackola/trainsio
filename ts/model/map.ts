import tile from "./tile";
import chunk from "./chunk";
export default class map {
	// initialize tiles array
	sizeX: number;
	sizeY: number;
	chunks: Array < Array < chunk >> = [];
	constructor(sx: number, sy: number, cs:number) {
		var countX = Math.floor(sx/cs);
		var countY = Math.floor(sy/cs);
	
		
		for (var x = 0; x < countX; ++x) {
			this.chunks[x]=[];
			for (var y = 0; y < countY; ++y) {
				console.log("making chunk "+x+":"+y);
				this.chunks[x][y] = (new chunk(x,y,cs,this));
			}
		}

		console.log(this.chunks[0][0].toString());
	}



	tick = function(): void {

	}.bind(this); // always bind this to functions you want to pass.
}