// this execrsie made by shanee Gat, ofir peleg, gal or ;

var canvas = document.getElementById('my-canvas'); // catch the canvas from html
var context = canvas.getContext('2d');

function drawPixel(context, x, y, color) { // the main function that draws pixels on screen
    var roundedX = Math.round(x);
    var roundedY = Math.round(y);

    context.beginPath();
    context.fillStyle = color || '#000';
    context.fillRect(roundedX, roundedY, 1, 1);
    context.fill();
}

let Points = []; //array for consisting of all points

function getPositions(ev) {
    if (Points.length <= 1) {
        if (ev == null) { ev = window.event }
        let obj = new Object();
        obj.x = ev.clientX;
        obj.y = ev.clientY;

        Points.push(obj); // one array consisting of all points

        if (Points.length == 2) {
            let gap = (Points[1].x - Points[0].x);
            let Point3 = new Object();
            Point3.x = Math.round(Points[1].x + gap * 0.2);
            Point3.y = Points[0].y;

            let Point4 = new Object();
            Point4.x = Math.round(Points[0].x - gap * 0.2);
            Point4.y = Points[1].y;
            Points.push(Point3); // one array consisting of all points
            Points.push(Point4); // one array consisting of all points

            let middlePoint = new Object();
            middlePoint.x = (Math.abs(Points[0].x + Points[1].x) / 2);
            middlePoint.y = (Math.abs(Points[0].y + Points[1].y) / 2);
            /*the lines below draw the parallelogram-polygon */
            draw_line(Points[0].x, Points[0].y, Points[1].x, Points[1].y, 'blue')
            draw_line(Points[3].x, Points[3].y, Points[2].x, Points[2].y, 'blue')
            draw_line(Points[3].x, Points[3].y, Points[0].x, Points[0].y, 'blue')
            draw_line(Points[1].x, Points[1].y, Points[2].x, Points[2].y, 'blue')
            draw_line(Points[3].x, Points[3].y, Points[1].x, Points[1].y, 'blue')
            draw_line(Points[0].x, Points[0].y, Points[2].x, Points[2].y, 'blue')

            /*the line below draw the circle-polygon */
            draw_circle(middlePoint.x, middlePoint.y, Points[1].x, Points[1].y);

            let numberOfLines = 70; // can be changed by user if we want
            /*the line below draw the curve-polygon */
            draw_curve(Points[0].x, Points[2].x, Points[3].x, Points[1].x, Points[0].y, Points[2].y, Points[3].y, Points[1].y, numberOfLines);
        }
    }
  }


/*********************************************************************************************************************************************************** */
let draw_line = (x1, y1, x2, y2, color) => {
    // Iterators, counters required by algorithm
    let x, y, dx, dy, dx1, dy1, px, py, xe, ye, i;
    // Calculate line deltas
    dx = x2 - x1;
    dy = y2 - y1;
    // Create a positive copy of deltas (makes iterating easier)
    dx1 = Math.abs(dx);
    dy1 = Math.abs(dy);
    // Calculate error intervals for both axis
    px = 2 * dy1 - dx1;
    py = 2 * dx1 - dy1;
    // The line is X-axis dominant
    if (dy1 <= dx1) {
        // Line is drawn left to right
        if (dx >= 0) {
            x = x1; y = y1; xe = x2;
        } else { // Line is drawn right to left (swap ends)
            x = x2; y = y2; xe = x1;
        }
        drawPixel(context, Math.round(x), Math.round(y), color);
        // Draw first pixel
        // Rasterize the line
        for (i = 0; x < xe; i++) {
            x = x + 1;
            // Deal with octants...
            if (px < 0) {
                px = px + 2 * dy1;
            } else {
                if ((dx < 0 && dy < 0) || (dx > 0 && dy > 0)) {
                    y = y + 1;
                } else {
                    y = y - 1;
                }
                px = px + 2 * (dy1 - dx1);
            }
            // Draw pixel from line span at
            // currently rasterized position
            drawPixel(context, Math.round(x), Math.round(y), color);
        }
    } else {
        // The line is Y-axis dominant
        // Line is drawn bottom to top
        if (dy >= 0) {
            x = x1; y = y1; ye = y2;
        } else { // Line is drawn top to bottom
            x = x2; y = y2; ye = y1;
        }
        drawPixel(context, Math.round(x), Math.round(y), color);
        // Draw first pixel
        // Rasterize the line
        for (i = 0; y < ye; i++) {
            y = y + 1;
            // Deal with octants...
            if (py <= 0) {
                py = py + 2 * dx1;
            } else {
                if ((dx < 0 && dy < 0) || (dx > 0 && dy > 0)) {
                    x = x + 1;
                } else {
                    x = x - 1;
                }
                py = py + 2 * (dx1 - dy1);
            }
            // Draw pixel from line span at
            // currently rasterized position
            drawPixel(context, Math.round(x), Math.round(y), color);
        }
    }
}



function draw_circle(x1, y1, x2, y2) {
    var dx = (x2 - x1);
    var dy = (y2 - y1);
    var radius = Math.sqrt(dx * dx + dy * dy);
    var x = 0;
    var y = radius;
    var p = 3 - (2 * radius);

    while (x <= y) {
        plot_circle_points(x1, y1, x, y);
        if (p < 0) {
            p = p + 4 * x + 6;
        }
        else {
            plot_circle_points(x1, y1, x + 1, y);
            p = p + 4 * (x - y) + 10;
            y = y - 1;
        }
        x = x + 1;
    }
}

function plot_circle_points(x1, y1, x, y) {
    drawPixel(context, x1 + x, y1 + y, 'pink');
    drawPixel(context, x1 - x, y1 + y, 'pink');
    drawPixel(context, x1 + x, y1 - y, 'pink');
    drawPixel(context, x1 - x, y1 - y, 'pink');
    drawPixel(context, x1 + y, y1 + x, 'pink');
    drawPixel(context, x1 - y, y1 + x, 'pink');
    drawPixel(context, x1 + y, y1 - x, 'pink');
    drawPixel(context, x1 - y, y1 - x, 'pink');
}


function draw_curve(x1, x2, x3, x4, y1, y2, y3, y4, NumberofLines) { //get 4 "points of parallelogram-polygon and number of lines - (requested by execrsie setting)"

    dt = 1 / NumberofLines;

    ax = -x1 + 3 * x2 - 3 * x3 + x4;  // calculate the coefficient of the polygons
    bx = 3 * x1 - 6 * x2 + 3 * x3;
    cx = -3 * x1 + 3 * x2;
    dx = x1;

    ay = -y1 + 3 * y2 - 3 * y3 + y4;
    by = 3 * y1 - 6 * y2 + 3 * y3;
    cy = -3 * y1 + 3 * y2;
    dy = y1;

    var X = x1;
    var Y = y1;
    var t = dt;

    while (t < 1.0) {         // if t = 1 -> we reached p4 (the end point)
        var xt = ax * (Math.pow(t, 3)) + bx * (Math.pow(t, 2)) + cx * t + dx;
        var yt = ay * (Math.pow(t, 3)) + by * (Math.pow(t, 2)) + cy * t + dy;
        draw_line(X, Y, xt, yt, 'black');
        X = xt;
        Y = yt;
        t = dt + t;
    }
    draw_line(xt, yt, x4, y4, 'black');   // always draw the last line speratly
}


