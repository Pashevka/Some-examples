

import p5 from "p5"

const canvasWidth = 400
const canvasHeight = canvasWidth

let lineK = 0
let lineB = 0
let sliderK: p5.Element
let sliderB: p5.Element

const circlesArray = []
const circlesAmount = 400
const lineEquation = (x: number): number => {
  // kx + b
  return lineK * x + lineB
}

new p5((p: p5) => {
  p.setup = () => {
    p.createCanvas(canvasWidth, canvasHeight)
    sliderK = p.createSlider(-5, 5, lineK, 0.1)
    sliderB = p.createSlider(-canvasWidth / 2, canvasWidth / 2, lineB, 0.1)

    for (let i = 0; i < circlesAmount; i++) {
      circlesArray.push({
        x: p.random(-canvasWidth / 2, canvasWidth / 2),
        y: p.random(-canvasHeight / 2, canvasHeight / 2)
      })
    }
  }

  p.draw = () => {
    // frame setup
    p.clear()
    p.background(0)
    p.translate(p.width / 2, p.height / 2)
    //
    // circles
    for (let i = 0; i < circlesAmount; i++) {
      const circle = circlesArray[i]
      const x = circle.x
      const y = circle.y
      const yLine = lineEquation(x)
      const yDiff = y - yLine
      const color = yDiff > 0 ? 'blue' : 'red'
      p.stroke(color)
      p.ellipse(x, y, 10, 10)
    }
















    // sliders and line formula
    lineK = sliderK.value() as number
    lineB = sliderB.value() as number
    p.push()
    p.fill('grey')
    p.rect(-canvasWidth / 2, -canvasWidth / 2, 100, 20)
    p.fill('black')
    p.text(`${lineK} * x + ${lineK}`, -canvasWidth / 2 + 14, -canvasWidth / 2 + 14,)
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



  }
})