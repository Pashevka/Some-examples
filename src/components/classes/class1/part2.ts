

import p5 from "p5"

const canvasWidth = 400
const canvasHeight = canvasWidth

let lineK = 0
let lineB = 0
let sliderK: p5.Element
let sliderB: p5.Element
const lineEquation = (x: number): number => {
  // kx + b
  return lineK * x + lineB
}

new p5((p: p5) => {
  p.setup = () => {
    p.createCanvas(canvasWidth, canvasHeight)

    sliderK = p.createSlider(-5, 5, lineK, 0.1)
    sliderB = p.createSlider(-canvasWidth / 2, canvasWidth / 2, lineB, 0.1)
  }

  p.draw = () => {
    // frame setup
    p.clear()
    p.background(0)
    p.translate(p.width / 2, p.height / 2)

    // sliders and line formula
    lineK = sliderK.value() as number
    lineB = sliderB.value() as number
    p.push()
    p.fill('white')
    p.text(`${lineK} * x + ${lineK}`, -150, -150)
    p.pop()

    // line
    const x1 = -p.width / 2
    const y1 = lineEquation(x1)

    const x2 = p.height / 2
    const y2 = lineEquation(x2)

    p.strokeWeight(2)

    p.push()
    p.stroke('white')
    p.line(x1, y1, x2, y2)
    p.pop()



  }
})