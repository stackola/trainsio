// import Chunk = require("./Chunk.js");
import ItemStack = require("./ItemStack.js");
import Game = require("./Game.js");


class ItemManager {
	items: Array < {
			id: string,
			item: ItemStack
		} >
		game: Game;
	constructor(g: Game) {
		this.items = [];
		this.game = g;
	}

	has(query: string): boolean {
		
		return this.items.filter(function(v) {
			return v.id == query;
		}).length > 0;
	}

	get(query: string): ItemStack {
		return this.items.filter(function(v) {
			return v.id == query
		})[0].item;
	}

	add(is: ItemStack): void {
		this.items.push({
			id: is.id,
			item: is
		});
		console.log("added obj"+is.id);
		console.log(this.items);
	}
}

export = ItemManager;