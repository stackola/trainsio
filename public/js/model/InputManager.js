define(["require", "exports", "./Vector.js"], function (require, exports, Vector) {
    "use strict";
    var InputManager = (function () {
        function InputManager(c) {
            this.isDragging = false;
            this.actuallyDragging = false;
            this.minDistance = 1;
            this.dragStart = null;
            this.lastPosition = null;
            this.canvas = c;
            document.addEventListener('mousedown', this.mouseDown.bind(this), false);
            document.addEventListener('mousemove', this.mouseMove.bind(this), false);
            document.addEventListener('mouseup', this.mouseUp.bind(this), false);
            console.log("initialized input manager");
        }
        InputManager.prototype.mouseDown = function (evt) {
            this.isDragging = true;
            this.dragStart = this.getMousePos(this.canvas, evt);
            this.lastPosition = new Vector(this.dragStart.x, this.dragStart.y);
        };
        InputManager.prototype.mouseUp = function () {
            if (this.actuallyDragging == false) {
                console.log("clicked", this.dragStart);
            }
            this.isDragging = false;
            this.actuallyDragging = false;
        };
        InputManager.prototype.mouseMove = function (evt) {
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
        };
        InputManager.prototype.getMousePos = function (canvas, evt) {
            var rect = canvas.getBoundingClientRect();
            return new Vector(evt.clientX - rect.left, evt.clientY - rect.top);
        };
        return InputManager;
    }());
    return InputManager;
});
