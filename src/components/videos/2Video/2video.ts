import p5 from "p5";
import { canvasHeight, canvasWidth } from "../../../constants";
import { recordCanvasHandler } from "../../../helpers/recordCanvasHandler";
const maxSize = 600

new p5((p: p5) => {
    let angle = 0; // For rotation
    let maxShapes = 20; // Number of shapes
    let shapes = []; // To hold shape properties
    const getDefaultShape = (arg = {}) => {
        return {
            id: p.random(0, 10),
            size: p.random(0, 30), // Random initial size
            angle: p.random(p.TWO_PI), // Random angle
            rotationSpeed: p.random(-0.02, 0.02), // Speed of rotation
            hue: p.random(360),
            hasChild: false,
            ...arg
        }
    }
    p.setup = () => {
        p.createCanvas(canvasWidth, canvasHeight);
        for (let i = 0; i < maxShapes; i++) {
            shapes.push(getDefaultShape());
        }
        const btn = document.querySelector('button');
        btn.onclick = () => {
            recordCanvasHandler(btn)
            p.frameRate(60)
        };
        p.text('asdasd')

        p.frameRate(0)
    };

    p.draw = () => {
        p.clear();
        p.background(0);
        p.translate(p.width / 2, p.height / 2);
        let fps = p.frameRate();
        for (let i = 0; i < shapes.length; i++) {
            let shape = shapes[i];
            let currentSize = shape.size + p.sin(angle + shape.id) * 20; // Pulsating effect

            // Color cycling
            p.fill(p.map(shape.size, 0, maxSize, 0, 255), p.map(shape.size, 0, maxSize, 255, 0), p.map(shape.size, 0, maxSize, 255, 0));
            p.stroke(255);
            p.strokeWeight(1);

            // Rotate and draw shapes
            p.push();
            p.rotate(shape.angle);
            p.rect(0, 0, currentSize, currentSize);
            p.pop();

            // Update properties for next frame
            shape.angle += shape.rotationSpeed; // Rotate shape
            shape.size += 1

            if (shape.size > 50 && !shape.hasChild) {
                shape.hasChild = true;
                shapes.push(getDefaultShape({
                    size: 0
                }))
            }

            if (shape.size > maxSize) {
                shapes.splice(i, 1)
            }
        }
        p.translate(0, 0);
        p.textSize(20)
        // p.text(fps, -canvasWidth / 2 + 10, -canvasHeight / 2 + 20);

        angle += 0.02; // Increase angle for pulsating effect
    };
});