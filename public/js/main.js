var socket = io();
var state = [];
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var keys=[];
var tileSize = 20;

socket.on('chunkState', function(chunkstate) {
	//console.log("chunkstate", chunkstate);
	state[chunkstate.id] = chunkstate;
	//drawChunk(chunkstate);	
});

camera = {
	position: {
		x: 0,
		y: 0
	}
};

function drawChunk(chunk) {
	var x0 = chunk.position.x * chunk.size * tileSize;
	var y0 = chunk.position.y * chunk.size * tileSize;
	var size = chunk.size * tileSize;

	ctx.lineWidth = "6";
	ctx.beginPath();
	ctx.rect(x0, y0, size, size);
	ctx.stroke();
	ctx.closePath();


}

$(function() {
	$('#posButton').click(function() {
		socket.emit("playerPosition", {
			x: 49,
			y: 49
		});
		camera.position.x = (49+1)*tileSize-150;
		camera.position.y = (49+1)*tileSize-150;
	});


});

window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame;

function loop() {
	requestAnimationFrame(loop);
	var pressed={
		left:keys[37]|false,
		right:keys[39]|false,
		down:keys[40]|false,
		up:keys[38]|false,
		mouse:keys["mouse"]|false
	}
	var dirty = false;
	if (pressed.right){
		camera.position.x++;
		dirty=true;
	}
	if (pressed.left){
		camera.position.x--;
			dirty=true;
	}
	if (pressed.up){
		camera.position.y--;
			dirty=true;
	}
	if (pressed.down){
		camera.position.y++;
		dirty=true;
	}

	if (dirty){
		console.log( Math.floor(camera.position.x/tileSize))
		console.log( Math.floor(camera.position.y/tileSize))
		var xx = Math.floor(camera.position.x/tileSize);
		var yy = Math.floor(camera.position.y/tileSize);
		if (xx<0) xx=0;
		if (yy<0) yy=0;
		if (xx>49) xx=49;
		if (yy>49) yy=49;
		socket.emit("playerPosition", {
			x: Math.floor(xx),
			y:  Math.floor(yy)
		});
	}
	ctx.save();
	ctx.clearRect(0, 0, 1000, 1000);
	ctx.beginPath();
	ctx.translate(-camera.position.x,-camera.position.y );
	ctx.translate(300,300);
	

	for (var key in state) {
		if (state.hasOwnProperty(key)) {
			drawChunk(state[key]);
		}
	}

	ctx.closePath();
	ctx.restore();

	




}


loop();


window.addEventListener("keydown", function (e) {
	keys[e.keyCode] = true;
});
window.addEventListener("keyup", function (e) {
	keys[e.keyCode] = false;
});