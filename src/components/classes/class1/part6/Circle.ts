import p5 from "p5"
import { lineEquation } from "./part6"
import { Perceptron } from "./Perceptron"

export class Circle {
    public x: number
    public y: number
    public radius: number = 10
    constructor(p: p5, x?: number, y?: number,) {
        this.x = x ? x : p.random(-p.width / 2, p.width / 2)

        this.y = y ? y : p.random(-p.height / 2, p.height / 2)
    }


    public showCorrect(p: p5) {
        const yLine = lineEquation(this.x)
        const yDiff = this.y - yLine
        const color = yDiff > 0 ? 'blue' : 'red'
        p.fill(color)
        p.ellipse(this.x, this.y, this.radius, this.radius)
    }

    public showPredicted(p: p5, nn: Perceptron) {
        const predictedValue = nn.guess(this.x, this.y)
        const color = predictedValue > 0 ? 'blue' : 'red'
        p.fill(color)
        p.ellipse(this.x, this.y, this.radius * 1.8, this.radius * 1.8)

    }

    public show(p: p5, nn: Perceptron) {
        this.showPredicted(p, nn)
        this.showCorrect(p)
    }
}