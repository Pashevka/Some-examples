

import p5 from "p5"
import { Circle } from "./Circle"
import { Perceptron } from "./Perceptron"

const canvasWidth = 400
const canvasHeight = canvasWidth

let lineK = -1
let lineB = 0
let sliderK: p5.Element
let sliderB: p5.Element

const circlesArray: Circle[] = []
const circlesAmount = 200
export const lineEquation = (x: number): number => {
  // kx + b
  return lineK * x + lineB
}

new p5((p: p5) => {
  const nn = new Perceptron(p)

  p.setup = () => {
    p.createCanvas(canvasWidth, canvasHeight)
    sliderK = p.createSlider(-5, 5, lineK, 0.1)
    sliderB = p.createSlider(-canvasWidth / 2, canvasWidth / 2, lineB, 0.1)

    for (let i = 0; i < circlesAmount; i++) {
      circlesArray.push(new Circle(p))
    }
  }

  p.draw = () => {
    // frame setup
    p.clear()
    p.background(0)
    p.translate(p.width / 2, p.height / 2)
    //
    // circles

    circlesArray.forEach(circle => {
      circle.show(p, nn)
    })


    // console.log(nn.w1, nn.w2, nn.w3)



    // sliders and line formula
    lineK = sliderK.value() as number
    lineB = sliderB.value() as number
    p.push()
    p.fill('grey')
    p.rect(-canvasWidth / 2, -canvasWidth / 2, 100, 20)
    p.fill('black')
    p.text(`${lineK} * x + ${lineB}`, -canvasWidth / 2 + 14, -canvasWidth / 2 + 14,)
    p.pop()


    // line neural network
    const x1nn = -1
    const y1nn = nn.guessY(x1nn)

    const x2nn = 1
    const y2nn = nn.guessY(x2nn)


    p.push()
    p.stroke('red')
    p.line(Circle.getMappedX(x1nn, p), Circle.getMappedY(y1nn, p), Circle.getMappedX(x2nn, p), Circle.getMappedY(y2nn, p))
    p.pop()

    // line
    const x1 = -p.width / 2
    const y1 = lineEquation(x1)

    const x2 = p.height / 2
    const y2 = lineEquation(x2)


    p.push()
    p.stroke('white')
    p.line(x1, y1, x2, y2)
    p.pop()

    // show nn

    nn.show(p)


  }
})