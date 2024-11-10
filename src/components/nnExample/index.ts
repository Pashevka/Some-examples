import p5 from "p5";
import { canvasWidth, canvasHeight } from "../../constants";
import { Circle, f } from "./Circle";
import { NeuralNetwork } from "./NeuralNetwork";
import { Matrix } from "../../helpers/matrix";
export let k = 0.2
export let b = 0.3

let slider;
let slider2;


// new p5((p: p5) => {
//     const Mozg = new NeuralNetwork(2, 2, 1)
//     const circlesArray: Circle[] = []
//     const maxCirclesAmount = 1000

//     let trainingData = [
//         {
//             inputs: [0, 1],
//             targets: [1]
//         },
//         {
//             inputs: [1, 0],
//             targets: [1]
//         },
//         {
//             inputs: [0, 0],
//             targets: [0]
//         },
//         {
//             inputs: [1, 1],
//             targets: [0]
//         }
//     ]

//     p.setup = () => {
//         p.createCanvas(canvasWidth, canvasHeight);

//         for (let i = 0; i < maxCirclesAmount; i++) {
//             const circle = new Circle(p)
//             circlesArray.push(circle)
//         }
//         ////


//         for (let i = 0; i < 100000; i++) {
//             let data = p.random(trainingData)
//             Mozg.train(data.inputs, data.targets)
//         }

//         Mozg.feedForward([0, 1]).print() // 1
//         Mozg.feedForward([1, 0]).print() // 1
//         Mozg.feedForward([0, 0]).print() // 0
//         Mozg.feedForward([1, 1]).print() // 0
//         /////
//         slider = p.createSlider(-2, 2, k, 0.01)
//         slider.size(600);


//         slider2 = p.createSlider(-2, 2, k, 0.01)
//         slider2.size(600);
//     };
//     p.draw = () => {
//         p.clear();
//         k = slider.value()
//         b = slider2.value()

//         circlesArray.forEach(circle => {
//             // circle.show(p, Mozg)
//         })

//         // Mozg.show(p)

//         // const p1 = new Circle(p, -1, f(-1))
//         // const p2 = new Circle(p, 1, f(1))
//         // p.line(p1.pixelX, p1.pixelY, p2.pixelX, p2.pixelY)
//         // // p.line(0, p.height, p.width, 0)
//         // const np1 = new Circle(p, -1, Mozg.resultY(-1))
//         // const np2 = new Circle(p, 1, Mozg.resultY(1))

//         // p.line(np1.pixelX, np1.pixelY, np2.pixelX, np2.pixelY)
//     };
// });
