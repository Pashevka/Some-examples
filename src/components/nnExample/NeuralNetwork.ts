export class NeuralNetwork {
    public w1: number;
    public w2: number;

    public lr: number = 0.0000003

    constructor() {
        this.w1 = Math.random();
        this.w2 = Math.random();
    }

    activationFunction(sum: number) {
        if (sum > 0) {
            return 1
        } else {
            return 0
        }
    }

    train(x: number, y: number, target: number) {
        const guess = this.result(x, y)

        const error = target - guess

        this.w1 = this.w1 + error * x * this.lr
        this.w2 = this.w2 + error * y * this.lr
    }

    result(x: number, y: number): number {
        const weighted = x * this.w1 + y * this.w2
        const activatedResult = this.activationFunction(weighted)

        return activatedResult
    }
}