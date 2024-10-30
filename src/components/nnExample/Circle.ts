import p5 from "p5";
import { canvasWidth } from "../../constants";
import { NeuralNetwork } from "./NeuralNetwork";

export class Circle {
    public x: number;
    public y: number;
    public color: string = 'red'
    public radius: number = 20;

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }

    getRightColor(): number {
        if (this.x > this.y) {
            return 1
        } else {
            return 0
        }
    }

    setColor(color: string) {
        this.color = color
    }
    // Красный - 0
    // Синий - 1
    show(p: p5, nn: NeuralNetwork) {
        // y = kx + b
        p.push()
        let targetResult = this.x > this.y ? 1 : 0
        const color = this.getRightColor()
        if (color === 0) {
            this.setColor('red')
        } else {
            this.setColor('blue')
        }

        // p.fill(this.color)
        /////
        p.circle(this.x, this.y, this.radius * 2)

        const result = nn.result(this.x, this.y)
        if (result === 0) {
            p.fill('red')
        } else {
            p.fill('blue')
        }
        nn.train(this.x, this.y, targetResult)

        ////
        // p.strokeWeight(4)
        // p.stroke('green')
        p.circle(this.x, this.y, this.radius * 2)
        p.pop()

       

    }
}