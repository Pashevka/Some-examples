import p5 from "p5"

export class Perceptron {
    public w1: number
    public w2: number

    constructor(p: p5) {
        this.w1 = p.random(-1, 1)
        this.w2 = p.random(-1, 1)
    }

    private activationFunction(x: number): number {
        return x > 0 ? 1 : -1
    }

    public guess(x: number, y: number): number {
        const result = x * this.w1 + y * this.w2

        const activatedResult = this.activationFunction(result)

        return activatedResult
    }

}