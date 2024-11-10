import p5 from "p5";
import { canvasHeight, canvasWidth } from "../../../constants";
import { recordCanvasHandler } from "../../../helpers/recordCanvasHandler";
let btn2
let btn

var capturer = new CCapture({
    format: 'webm',
    framerate: 20, // Reduce frame rate
    // width: yourWidth,
    // height: yourHeight,
});
var running = false;

new p5((p: p5) => {
    let angle = 0;
    let numShapes = 1200;
    let shapes = [];
    let colors = [];
    let maxRadius = 250;
    let moveSpeed = 2; // Speed at which ellipses move outwards

    // Predefined colors for shapes
    const predefinedColors = [
        p.color(239, 71, 111),
        p.color(255, 209, 102),
        p.color(6, 214, 160),
        p.color(17, 138, 178),
        p.color(25, 118, 210),
        p.color(49, 35, 69),
        p.color(188, 125, 241),
        p.color(34, 32, 52),
    ];

    p.setup = () => {

        window.ca = capturer
        p.createCanvas(canvasWidth, canvasHeight);
        p.noStroke();
        btn = document.querySelectorAll('button')[0];
        btn2 = document.querySelectorAll('button')[1];
        btn.onclick = () => {
            capturer.start();
        };
        btn2.onclick = () => {
            capturer.save();
        };
        p.frameRate(300)
        // Initialize shape data and colors
        for (let i = 0; i < numShapes; i++) {
            shapes[i] = {
                angle: p.random(p.TWO_PI),
                radius: p.random(0, p.width / 2),
                size: p.random(20, 80),
                direction: p.random([-1, 1]) // Random direction for left or right
            };
            colors[i] = predefinedColors[p.floor(p.random(predefinedColors.length))];
        }
    };

    p.draw = () => {
        p.clear();
        p.background(20);
        p.translate(p.width / 2, p.height / 2);

        // Draw background grid
        drawGrid();

        // Draw patterns using the shapes
        for (let i = 0; i < numShapes; i++) {
            let shapeData = shapes[i];

            // Calculate position based on polar coordinates
            let x = shapeData.radius * p.cos(shapeData.angle);
            let y = shapeData.radius * p.sin(shapeData.angle);
            x = i % 2 === 0 ? x : -x;
            console.log("🚀 ~ newp5 ~ x:", p.createVector(p.width / 2, p.height / 2).mag())

            // Move shape slowly to the side
            shapeData.radius += shapeData.direction * moveSpeed * p.random(0.5, 2);

            // Reset shape to center if it is out of screen boundaries
            if (p.createVector(x, y).mag() > p.createVector(p.width / 2, p.height / 2).mag()) {
                shapeData.radius = p.random(0);
                shapeData.angle = p.random(p.TWO_PI); // Randomize angle for a new direction
            }

            // Apply transformations
            p.push();
            p.translate(x, y);
            p.rotate(angle + i * 0.05);
            p.fill(colors[i]);
            p.ellipse(0, 0, shapeData.size, shapeData.size);
            p.pop();

            // Update shape data for animation
            shapeData.angle += 0.02;
            shapeData.size += p.sin(angle + i * 0.2) * 0.2;


        }

        // Increment the angle for rotation effects
        angle += 0.01;
        test(p.canvas)
    };
    const test = async (canvas) => {
        capturer.capture(canvas);
    }
    function drawGrid() {
        const spacing = 40;

        p.stroke(255, 10);
        p.strokeWeight(1);

        for (let x = -p.width; x < p.width; x += spacing) {
            p.line(x, -p.height, x, p.height);
        }
        for (let y = -p.height; y < p.height; y += spacing) {
            p.line(-p.width, y, p.width, y);
        }
    }
});