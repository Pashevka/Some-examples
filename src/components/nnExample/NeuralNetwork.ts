import p5 from "p5";
import { Matrix } from "../../helpers/matrix";
import { DumbMath } from "../../helpers/math";

export class NeuralNetwork {
    public inputNodes: number
    public hiddenNodes: number
    public outputNodes: number

    public weightsIH: Matrix = null
    public weightsHO: Matrix = null

    public biasH: Matrix = null
    public biasO: Matrix = null

    public lr: number = 0.1
    public numberOfArguments: number

    constructor(inputNodes: number, hiddenNodes: number, outputNodes: number) {
        this.inputNodes = inputNodes
        this.hiddenNodes = hiddenNodes
        this.outputNodes = outputNodes

        this.weightsIH = new Matrix(this.hiddenNodes, this.inputNodes)
        this.weightsHO = new Matrix(this.outputNodes, this.hiddenNodes)
        this.weightsIH.randomize()
        this.weightsHO.randomize()

        this.biasH = new Matrix(this.hiddenNodes, 1)
        this.biasO = new Matrix(this.outputNodes, 1)
        this.biasH.randomize()
        this.biasO.randomize()
    }

    activationFunction(sum: number) {
        return DumbMath.sigmoid(sum)
    }

    feedForward(input: number[]): number[] {

        let inputAsMatrix = Matrix.fromArray(input)

        let hidden = Matrix.multiply(this.weightsIH, inputAsMatrix)
        hidden.add(this.biasH)
        hidden.map(this.activationFunction)

        let output = Matrix.multiply(this.weightsHO, hidden)
        output.add(this.biasO)
        output.map(this.activationFunction)


        return output.toArray()

    }

    train(inputs: number[], answer: number[]) {

        // start feed forward
        let inputAsMatrix = Matrix.fromArray(inputs)

        let hidden = Matrix.multiply(this.weightsIH, inputAsMatrix)
        hidden.add(this.biasH)
        hidden.map(this.activationFunction)

        let outputs = Matrix.multiply(this.weightsHO, hidden)
        outputs.add(this.biasO)
        outputs.map(this.activationFunction)
        // end of feed forward 

        const targetsMatrix = Matrix.fromArray(answer)

        // calc error
        // ERROR = TARGET - OUTPUTS

        let outputErrors = Matrix.subtract(targetsMatrix, outputs)
        let gradients = Matrix.map(outputs, DumbMath.dsigmoid)
        gradients = Matrix.multiply(outputs, outputErrors)
        gradients.multiply(this.lr)

        // Calculate deltas
        const hiddenT = Matrix.transpose(hidden)
        const weightsHODeltas = Matrix.multiply(gradients, hiddenT)

        // 
        this.weightsHO.add(weightsHODeltas)



        // Calculate hidden layer error
        let whoT = Matrix.transpose(this.weightsHO)
        let hiddenErrors = Matrix.multiply(whoT, outputErrors)


        // Calculate hidden gradients
        let hiddenGradients = Matrix.map(hidden, DumbMath.dsigmoid)
        hiddenGradients = Matrix.multiply(hiddenGradients, hiddenErrors)
        hiddenGradients.multiply(this.lr)

        // Calculate input to hidden deltas

        let inputsT = Matrix.transpose(inputAsMatrix)
        let weightsIHDeltas = Matrix.multiply(hiddenGradients, inputsT)

        this.weightsIH.add(weightsIHDeltas)


    }

    result(inputs: number[]): number {
        let weighted = null
        for (let i = 0; i < inputs.length; i++) {
            weighted += inputs[i] * this.weights[i]
        }
        const activatedResult = this.activationFunction(weighted)

        return activatedResult
    }

    resultY(x: number): number {
        const [w0, w1, w2] = this.weights
        return -(w2 / w1) - (w0 / w1) * x
    }

    show(p: p5) {
        p.push()
        for (let i = 0; i < this.numberOfArguments; i++) {
            p.fill('black')
            p.strokeWeight(2)
            p.stroke('white')
            p.circle(100, 100 + 100 * i, 50)
            p.push()
            p.stroke('black')
            p.line(100, 100 + 100 * i, 300, 200)
            p.pop()
            p.textSize(22)
            p.text(this.weights[i].toFixed(4), 150, 100 + 100 * i)
        }
        p.strokeWeight(2)
        p.circle(300, (100 + 100 * this.numberOfArguments - 1) / 2, 50)
        p.pop()

        // p.push()
        // p.fill('green')
        // p.circle(0, -250, 50)
        // p.circle(0, -150, 50)
        // p.circle(200, -200, 50)
        // p.line(0, -250, 200, -200)
        // p.line(0, -150, 200, -200)
        // p.textSize(22)
        // p.text(this.w1.toFixed(4), 50, -250)
        // p.text(this.w2.toFixed(4), 50, -150)
        // p.pop()
    }
}