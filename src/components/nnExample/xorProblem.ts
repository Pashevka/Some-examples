import p5 from "p5";
import { canvasWidth, canvasHeight } from "../../constants";
import { NeuralNetwork } from "./NeuralNetwork";
const nn = new NeuralNetwork(2, 12, 1)
let lrSlider: p5.Element
window.nn = nn
new p5((p: p5) => {
    let trainingData = [
        {
            inputs: [0, 1],
            targets: [1]
        },
        {
            inputs: [1, 0],
            targets: [1]
        },
        {
            inputs: [0, 0],
            targets: [0]
        },
        {
            inputs: [1, 1],
            targets: [0]
        }
    ]

    p.setup = () => {
        p.createCanvas(canvasWidth, canvasHeight);

        p.frameRate(30)

        lrSlider = p.createSlider(0.01, 0.5, 0.1, 0.01)
    };
    p.draw = () => {
        p.clear();
        p.background(0)

        for (let i = 0; i < 1000; i++) {
            let data = p.random(trainingData)
            nn.train(data.inputs, data.targets)
        }

        nn.setLearningRate(lrSlider.value())
        console.log("🚀 ~ newp5 ~ nn.lr:", nn.lr)
        let resolution = 10
        let cols = p.width / resolution
        let rows = p.height / resolution

        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {

                let x1 = i / cols
                let x2 = j / rows
                let inputs = [x1, x2]

                let y = nn.feedForward(inputs)[0]
                p.noStroke()
                p.fill(y * 255)

                p.rect(i * resolution, j * resolution, resolution, resolution)
            }
        }

    };
});
