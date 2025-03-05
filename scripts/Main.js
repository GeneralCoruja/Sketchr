import * as CanvasHandler from './Handlers/CanvasEventHandler.js';

new p5(function(p5){
    p5.setup = () => CanvasHandler.setup(p5);
    p5.draw = () => CanvasHandler.draw(p5);
    p5.mouseReleased = () => CanvasHandler.mouseReleased(p5);
    p5.keyPressed = () => CanvasHandler.keyPressed(p5);
})
