import p5 from "p5";

export class Circle {
    public x: number
    public y: number
    public r: number
    public angle: number
    public speed: number
    constructor(x: number, y: number, r: number, angle: number, speed: number) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.angle = angle;
        this.speed = speed;
    }

    update = () => {
        this.x += this.speed * Math.cos(this.angle);
        this.y += this.speed * Math.sin(this.angle);
    };

    checkBounds = (p: p5, squareSize) => {
        // Check collision with square
        if (this.x < -squareSize / 2 || this.x > squareSize / 2 ||
            this.y < -squareSize / 2 || this.y > squareSize / 2) {
            return false;
        }

    };

    show = (p: p5) => {
        p.fill(255);
        p.noStroke();
        p.ellipse(this.x, this.y, this.r);
    };

}

