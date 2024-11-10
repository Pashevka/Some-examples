import p5 from "p5"

let lrSlider: p5.Element = null

export class Perceptron {
    public w1: number
    public w2: number
    public w3: number
    public lr: number = 1
    constructor(p: p5) {
        this.w1 = p.random(-1, 1)
        this.w2 = p.random(-1, 1)
        this.w3 = p.random(-1, 1)
        lrSlider = p.createSlider(0.0001, 1, this.lr, 0.000001)
        p.createButton('Restart').mousePressed(() => this.restart(p))
    }

    public restart(p: p5) {
        this.w1 = p.random(-1, 1)
        this.w2 = p.random(-1, 1)
        this.w3 = p.random(-1, 1)
    }

    private activationFunction(x: number): number {
        return x > 0 ? 1 : -1
    }

    public guess(x: number, y: number): number {
        const result = x * this.w1 + y * this.w2 + 1 * this.w3

        const activatedResult = this.activationFunction(result)

        return activatedResult
    }

    public guessY(x: number): number {
        const result = -(this.w1 * x) / this.w2 - (this.w3 * 1) / this.w2
        return result
    }

    public train(x: number, y: number, target: number) {
        const guess = this.guess(x, y)
        const lr = this.lr
        const error = target - guess

        this.w1 += error * x * lr
        this.w2 += error * y * lr
        this.w3 += error * 1 * lr
    }

    public show(p: p5) {
        const left = -p.width / 2
        const top = -p.height / 2
        const rectHeight = 80

        this.lr = lrSlider.value()
        p.push()
        p.fill('gray')
        p.rect(left, top + 20, 130, rectHeight)

        p.fill('white')
        p.translate(15, 0)
        p.circle(left + 15, top + 25 + 10, 20)
        p.circle(left + 15, top + 50 + 10, 20)
        p.circle(left + 15, top + 75 + 10, 20)
        p.circle(left + 80, top + 50 + 10, 20)

        p.line(left + 15, top + 25 + 10, left + 80, top + 50 + 10)
        p.line(left + 15, top + 50 + 10, left + 80, top + 50 + 10)
        p.line(left + 15, top + 75 + 10, left + 80, top + 50 + 10)

        p.fill('black')
        p.textSize(7)
        p.text('X', left - 10, top + 30 + 10)
        p.text('Y', left - 10, top + 55 + 10)
        p.text('Bias', left - 10, top + 80 + 10)

        p.fill('white')
        p.text(this.w1.toFixed(4), left + 27, top + 30 + 10)
        p.text(this.w2.toFixed(4), left + 27, top + 50 + 10)
        p.text(this.w3.toFixed(4), left + 27, top + 70 + 10)


        p.text(`Learning rate: ${this.lr.toFixed(4)}`, left + 40, top + 95)

        p.pop()
    }
}