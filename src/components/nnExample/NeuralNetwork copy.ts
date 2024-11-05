import p5 from "p5";

export class NeuralNetwork {
    public inputNodes: number
    public hiddenNodes: number
    public outputNodes: number

    public weights: number[] = []
    public lr: number = 0.00002
    public numberOfArguments: number

    constructor(inputNodes: number, hiddenNodes: number, outputNodes: number) {
        this.inputNodes = inputNodes
        this.hiddenNodes = hiddenNodes
        this.outputNodes = outputNodes

        ////
        this.numberOfArguments = inputNodes
        for (let i = 0; i <  this.numberOfArguments; i++) {
            this.weights.push(Math.random() * 2 - 1)
        }
    }

    activationFunction(sum: number) {
        if (sum > 0) {
            return 1
        } else {
            return 0
        }
    }



    train(inputs: number[], target: number) {
        const guess = this.result(inputs)

        const error = target - guess

        for (let i = 0; i < this.weights.length; i++) {
            this.weights[i] += error * inputs[i] * this.lr
        }
    }

    result(inputs: number[]): number {
        let weighted = null
        for (let i = 0; i < inputs.length; i++) {
            weighted += inputs[i] * this.weights[i]
        }
        const activatedResult = this.activationFunction(weighted)

        return activatedResult
    }

    resultY(x: number): number {
        const [w0, w1, w2] = this.weights
        return -(w2 / w1) - (w0 / w1) * x
    }

    show(p: p5) {
        p.push()
        for (let i = 0; i < this.numberOfArguments; i++) {
            p.fill('black')
            p.strokeWeight(2)
            p.stroke('white')
            p.circle(100, 100 + 100 * i, 50)
            p.push()
            p.stroke('black')
            p.line(100, 100 + 100 * i, 300, 200)
            p.pop()
            p.textSize(22)
            p.text(this.weights[i].toFixed(4), 150, 100 + 100 * i)
        }
        p.strokeWeight(2)
        p.circle(300, (100 + 100 * this.numberOfArguments - 1) / 2, 50)
        p.pop()

        // p.push()
        // p.fill('green')
        // p.circle(0, -250, 50)
        // p.circle(0, -150, 50)
        // p.circle(200, -200, 50)
        // p.line(0, -250, 200, -200)
        // p.line(0, -150, 200, -200)
        // p.textSize(22)
        // p.text(this.w1.toFixed(4), 50, -250)
        // p.text(this.w2.toFixed(4), 50, -150)
        // p.pop()
    }
}