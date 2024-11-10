import p5 from "p5"

export class Perceptron {
    public w1: number
    public w2: number
    public w3: number
    constructor(p: p5) {
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
        const lr = 0.0001
        const error = target - guess

        this.w1 += error * x * lr
        this.w2 += error * y * lr
        this.w3 += error * 1 * lr
    }
}