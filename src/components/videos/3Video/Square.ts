import p5 from "p5";

export class Square {

    public size: number;
    public angle: number = 0
    public holeSize = 100
    constructor(size: number) {
        // const squareHipot = Math.sqrt(size * size + size * size)

        // this.size = squareHipot
        this.size = 1000
    }

    update() {
        // this.angle += 0.01
    }

    show(p: p5) {
        console.log("🚀 ~ Square ~ show ~ this.size:", this.size)
        p.push();
        p.rectMode(p.CENTER);
        p.noFill();
        p.strokeWeight(2);
        p.stroke(255)
        p.rotate(this.angle)
        p.rect(0, 0, this.size / 2, this.size / 2);
        p.strokeWeight(2)
        p.stroke(0)
        p.line(-this.size / 4, -this.size / 4, -this.size / 4, -this.size / 4 + this.holeSize)
        p.pop();
    }
}