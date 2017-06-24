import Vector = require("./Vector.js");
import Game = require("./Game.js");
class InputManager {
	game: Game;
	isDragging: boolean = false;
	actuallyDragging: boolean = false;
	minDistance: number = 1;
	dragStart: Vector | null = null;
	lastPosition: Vector | null = null;
	canvas: HTMLCanvasElement;
	constructor(c: HTMLCanvasElement, g: Game) {
		this.canvas = c;
		this.game = g;
		document.addEventListener('mousedown', this.mouseDown.bind(this), false);
		document.addEventListener('mousemove', this.mouseMove.bind(this), false);
		document.addEventListener('mouseup', this.mouseUp.bind(this), false);
		document.addEventListener("mousewheel", this.wheel.bind(this), false);
		document.addEventListener("DOMMouseScroll", this.wheel.bind(this), false);
		console.log("initialized input manager");
	}
	wheel(evt): void{
		var evt = window.event || evt; // old IE support
		var delta = Math.max(-1, Math.min(1, (evt.wheelDelta || -evt.detail)));
		console.log(delta);
		this.game.binaryZoom(delta);
	}
	mouseDown(evt): void {
		this.isDragging = true;
		this.dragStart = this.getMousePos(this.canvas, evt);
		this.lastPosition = new Vector(this.dragStart.x, this.dragStart.y);

	}
	mouseUp(): void {
		if (this.actuallyDragging == false) {
			console.log("clicked", this.dragStart);
		}
		this.isDragging = false;
		this.actuallyDragging = false;
	}
	mouseMove(evt): void {
		if (this.isDragging) {
			//console.log("mousemove");
			var mousePos = this.getMousePos(this.canvas, evt);
			var difference = mousePos.difference(this.dragStart);


			// check if difference since dragstart is biggeer than 5?
			if (this.actuallyDragging || difference.length() > 10) {
				var moveSinceLastFrame = this.lastPosition.difference(mousePos);
				this.actuallyDragging = true;
				console.log("dragging actually", moveSinceLastFrame);
				this.game.moveCam(moveSinceLastFrame);

			}
			console.log(difference.length());
			this.lastPosition = new Vector(mousePos.x, mousePos.y);

		}
	}

	getMousePos(canvas, evt) {
		var rect = canvas.getBoundingClientRect();
		return new Vector(
			evt.clientX - rect.left,
			evt.clientY - rect.top
			)
	}
}

export = InputManager;