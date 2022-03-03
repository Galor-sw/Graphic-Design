function drawPixel(context, x, y, color) {
    var roundedX = Math.round(x);
    var roundedY = Math.round(y);

    context.beginPath();
    context.fillStyle = color || '#000';
    context.fillRect(roundedX, roundedY, 1, 1);
    context.fill();
}

var canvas = document.getElementById('my-canvas');
var context = canvas.getContext('2d');
const colors = ['red', 'green', 'pink', 'black']
console.log(colors[1]);

for (var i = 0; i < 20000; i++) {
    let randX = (Math.random() * 200);
    let randY = (Math.random() * 200);
    let randColor = Math.round((Math.random() * 3));
    console.log(randColor);

    drawPixel(context, randX, randY, colors[randColor]);
}


