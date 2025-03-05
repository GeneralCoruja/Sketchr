import Tool from '../Tools/Tool.js';

let tool;
let fgCanvas;
let graphicsHistory = []; //holds all made graphics
let canvasUpdate = false;

const REFRESH_TIME = 60000;
const UpdateGraphicsObjectsTimer = () =>{
    UpdateGraphicsObjects();
    setTimeout(UpdateGraphicsObjectsTimer, REFRESH_TIME);
}

function setup(p5) {
    setupCanvas(p5);
    setupFGCanvas(p5);
    setupTool(p5);

    setTimeout(UpdateGraphicsObjectsTimer, REFRESH_TIME);
}

function draw(p5) {
    
    if(canvasUpdate){
        drawBackground(p5);

        //draw previous made graphics
        graphicsHistory.forEach(element => {
            p5.image(element.image, element.x, element.y);
        });
        canvasUpdate = false;
    }
    //draw fgCanvas over the main canvas
    p5.image(fgCanvas, 0, 0, fgCanvas.width, fgCanvas.height)
    
    //let tool draw on fgCanvas
    if(p5.mouseIsPressed){
        tool.draw(p5, fgCanvas);
    }
}

function mouseReleased(p5){
    var image = tool.finish(fgCanvas);
    graphicsHistory.push(image);
}

function keyPressed(p5){
    //detect ctrl + z
    if(p5.keyIsDown(p5.CONTROL) && p5.keyIsDown(90)){
        undo();
    }
}


// Custom Functions

function setupCanvas(p5){
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.background(255); 
}

function setupFGCanvas(p5){
    fgCanvas = p5.createGraphics(p5.windowWidth, p5.windowHeight);
    fgCanvas.background(p5.color(255, 255, 255, 0)); //set transparent background 
}

function setupTool(p5){
    tool = new Tool(p5, fgCanvas)
}

function drawBackground(p5){
    p5.background(255);
}

function clearForegroundCanvas(){
    fgCanvas.clear();
    canvasUpdate = true;
}

function undo(){
    graphicsHistory.pop();
    UpdateGraphicsObjects();
}

function UpdateGraphicsObjects(){
    clearForegroundCanvas();
    canvasUpdate = true;
    console.log("canvas updated");
}

export{
    setup,
    draw,
    mouseReleased,
    keyPressed
}

