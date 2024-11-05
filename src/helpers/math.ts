export class DumbMath {
    static sigmoid(x: number) {
        return 1 / (1 + Math.exp(-x))
    }

    static dsigmoid(y: number) {
        // return DumbMath.sigmoid(x) * (1 - DumbMath.sigmoid(x))
        return y * (1 - y)
    }
}