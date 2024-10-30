import p5 from "p5";
export default class PerlinBrush {
  x: number;
  y: number;
  px: number;
  py: number;
  tx: number;
  ty: number;
  txC: number
  tyC: number
  velocityX: number;
  velocityY: number;
  prevX: number;
  prevY: number;

  constructor(p: p5) {
    this.x = p.width / 2;
    this.y = p.height / 2;
    this.px = p.width / 2;
    this.py = p.height / 2;
    this.tx = 0;
    this.ty = 10000;
    this.txC = 0.115;
    this.tyC = 0.12;
    this.velocityX = 2;
    this.velocityY = 1;
  }

  // step(p: p5) {
  //   this.px = this.x;
  //   this.py = this.y;
  //   this.x = p.map(p.noise(this.tx + 1), 0, 1, 0, p.width);
  //   this.y = p.map(p.noise(this.ty), 0, 1, 0, p.height);
  //   this.tx += this.txC
  //   this.ty += this.tyC
  // }
  stepLinear(p: p5) {
    this.x += this.velocityX
    this.y += this.velocityY
    this.prevX = this.x
    this.prevY = this.y
    if (this.x > p.width || this.x < 0) {
      this.velocityX *= -1
    }
    if (this.y > p.height || this.y < 0) {
      this.velocityY *= -1
    }
    this.velocityX += 0 * Math.sign(this.velocityX)
    this.velocityY += 0 * Math.sign(this.velocityY)
  }
  display(p: p5) {
    p.push();
    p.translate(-(p.width / 2), -(p.height / 2));
    p.fill(200, p.map(this.x, 0, p.width, 0, 255), p.map(this.y, 0, p.height, 0, 255));
    // p.strokeWeight(1)
    p.ellipse(this.x, this.y, 5, 5);
    p.line(this.x, this.y, this.prevX, this.prevY)
    p.pop()
  }
}
