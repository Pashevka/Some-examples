import p5 from "p5";
import { canvasHeight, canvasWidth } from "../../../constants";

new p5((p: p5) => {
    p.setup = () => {
        p.createCanvas(canvasWidth, canvasHeight);
    };

    p.draw = () => {
        p.clear();
        p.background(0);
        p.translate(p.width / 2, p.height / 2);
    };
});