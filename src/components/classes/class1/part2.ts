

import p5 from "p5"

const canvasWidth = 400
const canvasHeight = canvasWidth

let lineK = 0
let slider: p5.Element
const lineEquasion = (x: number): number => {
  // kx + b
  return lineK * x + 0
}

new p5((p: p5) => {
  p.setup = () => {
    p.createCanvas(canvasWidth, canvasHeight)

    slider = p.createSlider(-1, 1, lineK, 0.1)
  }

  p.draw = () => {
    p.clear()
    p.background(0)
    p.translate(p.width / 2, p.height / 2)


    ///

    lineK = slider.value()
    p.push()
    p.text(`${lineK} * x + 0`, -150, -150)
    p.pop()
    ///

    const x1 = -p.width / 2
    const y1 = lineEquasion(x1)

    const x2 = p.height / 2
    const y2 = lineEquasion(x2)

    p.stroke('red')
    p.strokeWeight(4)

    p.line(x1, y1, x2, y2)

  }
})