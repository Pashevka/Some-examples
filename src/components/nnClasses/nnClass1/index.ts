import p5 from "p5";
let canvasWidth = 800;
let canvasHeight = 800;


new p5((p: p5) => {
    p.setup = () => {
        p.createCanvas(canvasWidth, canvasHeight);
    };

    p.draw = () => {
        p.clear();
        p.background(0);

        p.fill('red')
        p.circle(100, 100, 50)

        p.push()
        p.stroke('blue')
        p.strokeWeight(5)
        p.line(0, 0, 100, 100)
        p.pop()
    };
});