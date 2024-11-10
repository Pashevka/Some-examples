import p5 from "p5"
import { lineEquation } from "./part9"
import { Perceptron } from "./Perceptron"

export class Circle {
    public x: number
    public y: number
    public radius: number = 10
    public p: p5
    constructor(p: p5, x?: number, y?: number,) {
        this.x = x ? x : p.random(-1, 1)
        this.y = y ? y : p.random(-1, 1)
        this.p = p
    }

    static getMappedX(x: number, p: p5) {
        return p.map(x, -1, 1, -p.width / 2, p.width / 2)
    }
    static getMappedY(y: number, p: p5) {
        return p.map(y, -1, 1, -p.height / 2, p.height / 2)
    }
    public showCorrect(p: p5, nn: Perceptron) {
        const yLine = lineEquation(Circle.getMappedX(this.x, p))
        const yDiff = Circle.getMappedY(this.y, p) - yLine
        const color = yDiff > 0 ? 'blue' : 'red'
        nn.train(this.x, this.y, yDiff > 0 ? 1 : -1)
        p.fill(color)
        p.ellipse(Circle.getMappedX(this.x, p), Circle.getMappedY(this.y, p), this.radius, this.radius)
    }

    public showPredicted(p: p5, nn: Perceptron) {
        const predictedValue = nn.guess(this.x, this.y)
        const color = predictedValue > 0 ? 'blue' : 'red'
        p.fill(color)
        p.ellipse(Circle.getMappedX(this.x, p), Circle.getMappedY(this.y, p), this.radius * 1.8, this.radius * 1.8)

    }

    public show(p: p5, nn: Perceptron) {
        this.showPredicted(p, nn)
        this.showCorrect(p, nn)
    }
}