import GraphicsObject from '../Models/GraphicsObject.js';

export default class Tool {
    strokeWeight = 10;
    color = 'black';
    canvas = null;
    lastMousePos = null;

    //variables for cropping image
    xOffset = 20;
    yOffset = 20;
    xPos = null;
    yPos = null;
    xPos2 = null;
    yPos2 = null;

    constructor(p5, canvas) {
        this.canvas = canvas;
        this.setup(p5);
    }

    setup(p5) {
        this.canvas.stroke(this.color);
        this.canvas.fill(this.color);
        this.canvas.strokeWeight(this.strokeWeight);

        //setup inputs
        p5.mouseClicked = () => this.mouseClicked(p5);
        p5.mouseDragged = () => this.mouseDragged(p5);
        p5.mouseMoved = () => this.mouseMoved(p5);
    }

    draw(p5, canvas) {
        // this.canvas.point(p5.mouseX, p5.mouseY);
    }

    mouseClicked(p5) {
        if (this.lastMousePos == null) {
            this.lastMousePos = { x: p5.mouseX, y: p5.mouseY };
        }
    }

    mouseDragged(p5) {
        if (this.lastMousePos != null) {
            this.canvas.line(p5.mouseX, p5.mouseY, this.lastMousePos.x, this.lastMousePos.y);
        }

        //update coordinates to crop
        if (p5.mouseX < this.xPos || this.xPos == null) {
            this.xPos = p5.mouseX;
        }
        if (p5.mouseY < this.yPos || this.yPos == null) {
            this.yPos = p5.mouseY;
        }
        if (p5.mouseX > this.xPos2 || this.xPos2 == null) {
            this.xPos2 = p5.mouseX;
        }
        if (p5.mouseY > this.yPos2 || this.yPos2 == null) {
            this.yPos2 = p5.mouseY;
        }


        this.lastMousePos = { x: p5.mouseX, y: p5.mouseY };
    }

    mouseMoved(p5) {
        if (!p5.mouseIsPressed) {
            this.lastMousePos = null;
        }
    }


    finish(canvas) {
        let image = canvas.get(this.xPos - this.xOffset,
            this.yPos - this.yOffset,
            this.xPos2 + this.xOffset,
            this.yPos2 + this.yOffset);
        let graphicsObject = new GraphicsObject(image,
            this.xPos - this.xOffset,
            this.yPos - this.yOffset);

        this.resetCroppingVariables();
        return graphicsObject;
    }

    // reset cropping variables 
    resetCroppingVariables() {
        this.xPos = null;
        this.yPos = null;
        this.xPos2 = null;
        this.yPos2 = null;
    }
}