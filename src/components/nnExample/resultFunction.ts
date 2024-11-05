import { f } from "./Circle"

export const resultFunction = (x, y) => {
    // y = kx
    const lineY = f(x)
    return y > lineY ? 1 : 0
}