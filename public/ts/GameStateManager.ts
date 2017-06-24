import Game = require("./Game.js");

class GameStateManager {
	g: Game;
	constructor(g: Game) {
		this.g = g;
	}
}

export = GameStateManager;