export default class Tool {
    strokeWeight = 10;
    color = 'black';

    lastMousePos = null;

    constructor(p5) {
        this.setup(p5);
    }

    setup(p5) {
        p5.stroke(this.color);
        p5.fill(this.color);
        p5.strokeWeight(this.strokeWeight);

        //setup inputs
        p5.mouseClicked = () => this.mouseClicked(p5);
        p5.mouseDragged = () => this.mouseDragged(p5);
        p5.mouseMoved = () => this.mouseMoved(p5);
    }

    draw(p5) {
        p5.point(p5.mouseX, p5.mouseY);
    }

    mouseClicked(p5) {
        if (this.lastMousePos == null) {
            this.lastMousePos = { x: p5.mouseX, y: p5.mouseY };
        }
    }

    mouseDragged(p5) {
        if (this.lastMousePos != null) {
            p5.line(p5.mouseX, p5.mouseY, this.lastMousePos.x, this.lastMousePos.y);
        }

        this.lastMousePos = { x: p5.mouseX, y: p5.mouseY };
    }

    mouseMoved(p5) {
        if (!p5.mouseIsPressed) {
            console.log('mouse released');
            this.lastMousePos = null;
        }
    }
}