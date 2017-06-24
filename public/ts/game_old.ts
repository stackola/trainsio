/*import vector = require("./models/vector");

var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', {
    preload: preload,
    create: create,
    update: update,
    render: render
});


function preload() {
    game.load.image('mushroom', 'assets/sprites/mushroom3.png');
}

var cursors;
var g;

function create() {



    //  Make our game world 2000x2000 pixels in size (the default is to match the game size)
    game.world.setBounds(0, 0, 2020, 2020);



    cursors = game.input.keyboard.createCursorKeys();
    game.input.mouse.mouseWheelCallback = mouseWheel;
    g = game.add.graphics(0, 0);
    g.beginFill(0xFF3300);


    // draw a shape
    g.moveTo(50, 50);
    g.lineTo(250, 50);
    g.lineTo(100, 100);
    g.lineTo(250, 220);
    g.lineTo(50, 220);
    g.lineTo(50, 50);
    g.endFill();

    g.beginFill(0xFFFFFF);
    g.drawRect(10, 10, 2000, 2000);
    g.endFill();


    game.world.scale.set(3);
    drawChunk({
        position: {
            x: 0,
            y: 0
        },
        size: 15,
        id: '0:0'
    }, g);
}

function update() {
    var dragPoint:vector|null = null;
    if (cursors.up.isDown) {
        game.camera.y -= 4;
    } else if (cursors.down.isDown) {
        game.camera.y += 4;
    }

    if (cursors.left.isDown) {
        game.camera.x -= 4;
    } else if (cursors.right.isDown) {
        game.camera.x += 4;
    }



    if (game.input.activePointer.isDown) {
        if (dragPoint) {
            // move the camera by the amount the mouse has moved since last update      
            game.camera.x += (dragPoint.x - game.input.activePointer.position.x) / 2;
            game.camera.y += (dragPoint.y - game.input.activePointer.position.y) / 2;
        } // set new drag origin to current position 
        var pos = game.input.activePointer.position.clone();
        dragPoint = new vector(pos.x, pos.y);
    } else {
        dragPoint = null;
    }



}

function render() {
    game.camera.setSize(800, 600);
    game.debug.cameraInfo(game.camera, 32, 32);
}

function mouseWheel(event) {
    console.log(game.world.scale);
    if (game.input.mouse.wheelDelta === Phaser.Mouse.WHEEL_UP) {
        game.world.scale.set(game.world.scale.x + 0.03);

    } else {
        game.world.scale.set(game.world.scale.x - 0.03);
    }

}


function drawChunk(chunk, graphics) {
    var tileSize = 20;
    graphics.beginFill(0xFF0000);
    graphics.drawRect(chunk.position.x * chunk.size * tileSize+10, chunk.position.y * chunk.size * tileSize+10, chunk.size * tileSize, chunk.size * tileSize);
    graphics.endFill();

    for (var x = 0; x < chunk.size; x++) {
        for (var y = 0; y < chunk.size; y++) {
            graphics.beginFill(0x000000);
            graphics.drawRect(x * tileSize+2+10, y * tileSize+2+10, tileSize-4, tileSize-4);
            graphics.endFill();
        }
    }
}*/