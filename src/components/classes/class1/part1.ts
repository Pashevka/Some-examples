import p5 from "p5"

const canvasWidth = 400
const canvasHeight = canvasWidth

var radius = 150;
var angle = 0;
var speed = 0.05;
var centerX = 200;
var centerY = 200;

new p5((p: p5) => {
  p.setup = () => {
    p.createCanvas(canvasWidth, canvasHeight)
  }

  p.draw = () => {
    p.clear()
    p.background(0)
    p.translate(p.width / 2, p.height / 2);

    var x = centerX + radius * Math.cos(angle);
    var y = centerY + radius * Math.sin(angle);
    p.ellipse(x, y, 50, 50);
  
    angle = angle + speed;
  }
})
