import Tool from '../Tools/Tool.js';

let tool;

function setup(p5) {
    setupCanvas(p5);
    setupTool(p5);
}

function draw(p5) {
    if(p5.mouseIsPressed){
        tool.draw(p5);
    }

}


// Custom Functions

function setupCanvas(p5){
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.background(255);
}

function setupTool(p5){
    tool = new Tool(p5)
}

export{
    setup,
    draw
}

