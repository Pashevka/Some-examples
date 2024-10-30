import p5 from "p5";
export const renderFpsCounter = (p: p5) => {
    p.textSize(20);
    p.fill(255);
    let fps = p.frameRate();
    p.text(`FPS: ${fps.toFixed(2)}`, -p.width / 2 + 10, -p.height / 2 + 20);
}
