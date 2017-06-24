import Vector = require("./Vector.js");
class InputManager {
	isDragging: boolean = false;
	actuallyDragging: boolean = false;
	minDistance: number = 1;
	dragStart: Vector | null = null;
	lastPosition: Vector | null = null;
	canvas: HTMLCanvasElement;
	constructor(c: HTMLCanvasElement) {
		this.canvas = c;
		document.addEventListener('mousedown', this.mouseDown.bind(this), false);
		document.addEventListener('mousemove', this.mouseMove.bind(this), false);
		document.addEventListener('mouseup', this.mouseUp.bind(this), false);
		console.log("initialized input manager");
	}

	mouseDown(evt): void {
		this.isDragging = true;
		this.dragStart = this.getMousePos(this.canvas, evt);
		this.lastPosition = new Vector(this.dragStart.x, this.dragStart.y);

	}
	mouseUp(): void {
		if (this.actuallyDragging == false){
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
			var moveSinceLastFrame = this.lastPosition.difference(mousePos);
			this.lastPosition = new Vector(mousePos.x, mousePos.y);
			// check if difference since dragstart is biggeer than 5?
			if (this.actuallyDragging || difference.length() > 10) {
				this.actuallyDragging = true;
				console.log("dragging actually");
			}
			console.log(difference.length());

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