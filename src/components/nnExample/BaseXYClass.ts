import p5 from "p5";

export class BaseXYClass {
    public x: number;
    public y: number;
    public p: p5
    constructor(p: p5, x?: number, y?: number) {
        this.x = typeof x === 'number' ? x : p.random(-1, 1)

        this.y = typeof x === 'number' ? y : p.random(-1, 1)

        this.p = p
    }

    get pixelX(): number {
        return this.p.map(this.x, -1, 1, 0, this.p.width)
    }

   get  pixelY(): number {
        return this.p.map(this.y, -1, 1, this.p.height, 0)
    }

}