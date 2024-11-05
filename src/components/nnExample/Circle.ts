import p5 from "p5";
import { canvasWidth } from "../../constants";
import { NeuralNetwork } from "./NeuralNetwork";
import { resultFunction } from "./resultFunction";
import { BaseXYClass } from "./BaseXYClass";
import { b, k } from ".";

export const f = (x: number) => {
    // y = kx + b
    return k * x + b
}
export class Circle extends BaseXYClass {
    public bias: number = 1
    public color: string = 'red'
    public radius: number = 20;

    constructor(p: p5, x?: number, y?: number) {
        super(p, x, y)
    }

    getColorFromValue(value: number): string {
        if (value === 1) {
            return 'blue'
        } else {
            return 'red'
        }
    }

    setColor(color: string) {
        this.color = color
    }
    // Красный - 0
    // Синий - 1
    showRight(p: p5) {
        p.push()
        p.fill(this.color)
        p.circle(this.pixelX, this.pixelY, this.radius * 2)
        p.pop()
    }
    showNetwork(p: p5, nn: NeuralNetwork) {
        p.push()
        let targetResult = resultFunction(this.x, this.y)
        const result = nn.result([this.x, this.y, this.bias])
        if (result === 0) {
            p.fill('red')
        } else {
            p.fill('blue')
        }
        nn.train([this.x, this.y, this.bias], targetResult)

        p.circle(this.pixelX, this.pixelY, this.radius)
        p.pop()
    }
    show(p: p5, nn: NeuralNetwork) {
        const shouldBeColor = resultFunction(this.x, this.y)
        this.setColor(this.getColorFromValue(shouldBeColor))

        // right res
        this.showRight(p)

        ///// network res
        this.showNetwork(p, nn)



    }
}