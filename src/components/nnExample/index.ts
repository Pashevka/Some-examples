import p5 from "p5";
import { canvasWidth, canvasHeight } from "../../constants";
import { Circle } from "./Circle";
import { NeuralNetwork } from "./NeuralNetwork";

const circlesArray: Circle[] = []
const maxCirclesAmount = 5000
const circlesAmount = 4000
const Mozg = new NeuralNetwork()
let slider;
console.log("🚀 ~ Mozg:", Mozg)

new p5((p: p5) => {
    p.setup = () => {
        p.createCanvas(canvasWidth, canvasHeight);


        for (let i = 0; i < maxCirclesAmount; i++) {
            const circle = new Circle(p.random(0, canvasWidth), p.random(0, canvasHeight))
            // const circle = new Circle(20, 40)
            circlesArray.push(circle)
        }
        p.frameRate(2)
        slider = p.createSlider(0, maxCirclesAmount, circlesAmount)
        slider.size(600);
    };
    p.draw = () => {
        p.clear();
        p.background(0);
        // p.translate(p.width / 2, p.height / 2);
        p.fill(255);

        for (let maxCirclesAmount = 0; maxCirclesAmount < slider.value(); maxCirclesAmount++) {
            const element = circlesArray[maxCirclesAmount];
            element.show(p, Mozg)

        }
        // circlesArray.forEach(circle => {
        //     circle.show(p, Mozg)
        // })

        // p.stroke(255)
        p.line(0, 0, canvasWidth, canvasHeight)

        p.push()
        p.fill('white')
        p.circle(250, 50, 50)
        p.circle(250, 150, 50)
        p.circle(450, 100, 50)
        p.line(250, 50, 450, 100)
        p.line(250, 150, 450, 100)
        p.textSize(22)
        p.text(Mozg.w1.toFixed(4), 300, 70)
        p.text(Mozg.w2.toFixed(4), 300, 140)
        p.pop()
    };

    p.mouseWheel = () => {
        const randomIndex = Math.floor(Math.random() * circlesArray.length)
        Mozg.train(circlesArray[randomIndex].x, circlesArray[randomIndex].y, circlesArray[randomIndex].getRightColor())
        // Mozg.train(item.x, item.y, item.getRightColor())
        console.log('trained')
    }
});