import p5 from "p5";
import { canvasHeight, canvasWidth } from "../../../constants";
import { getRandomColor } from "../../../helpers/getRandomColor";
import { recordCanvasHandler } from "../../../helpers/recordCanvasHandler";
import PerlinBrush from "./PerlinBrush";


let brush: PerlinBrush;
const symmetry: number = 8;
const angle: number = 360 / symmetry;
let slider: p5.Element;
let p5Canvas: p5.Renderer;
let btn

new p5((p: p5) => {
    p.setup = () => {
        p5Canvas = p.createCanvas(canvasWidth, canvasHeight);
        brush = new PerlinBrush(p);
        slider = p.createSlider(0, 100, 1, 1);
        slider.size(600);
        p.background(0, 0, 0)
        btn = document.querySelector('button');
    btn.onclick = () => recordCanvasHandler(btn);

    };

    p.draw = () => {
        p.noStroke();

        p.translate(p.width / 2, p.height / 2);
        let g = slider.value();
        brush.txC = g;
        brush.tyC = g;

        for (let i = 0; i < g; i++) {
            brush.stepLinear(p);
            brush.display(p)
        }
    };
});