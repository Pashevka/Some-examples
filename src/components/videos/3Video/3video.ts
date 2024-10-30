import p5 from "p5";
import { canvasHeight, canvasWidth } from "../../../constants";
import { renderFpsCounter } from "../../../helpers/renderFpsCounter";
import { recordCanvasHandler } from "../../../helpers/recordCanvasHandler";
import { Square } from "./Square";

let size = 2;
let slider;
let circles = [];
const holeOffset = 30; // Offset for the hole
let squareInstance: Square;


new p5((p: p5) => {
    p.setup = () => {
        p.createCanvas(canvasWidth, canvasHeight);
        slider = p.createSlider(0, 100, size, 1);
        slider.size(600);

        const btn = document.querySelector('button');
        btn.onclick = () => {
            recordCanvasHandler(btn);
            p.frameRate(60);
        };

        // Initialize some circles
        for (let i = 0; i < 2; i++) {
            circles.push(new Circle(0, 0, 10, p.random(p.TWO_PI), 2));
        }
        squareInstance = new Square(canvasWidth)
    };

    p.draw = () => {
        p.clear();
        p.background(0);
        p.translate(p.width / 2, p.height / 2);
        renderFpsCounter(p);
        // Draw rotating square with hole


        squareInstance.update()
        squareInstance.show(p)
        return
        // Update circles
        for (let i = circles.length - 1; i >= 0; i--) {
            const c = circles[i];
            c.update();
            c.show(p);

            if (!c.checkBounds(p, squareSize)) {
                // Circle has left the square boundary
                circles.splice(i, 1); // Remove the circle
                // Add 2 new circles when one exits
                for (let j = 0; j < 2; j++) {
                    circles.push(new Circle(0, 0, 10, p.random(p.TWO_PI), 2));
                }
            }
        }
    };
});