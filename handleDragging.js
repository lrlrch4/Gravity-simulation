
//Handle dragging vector
function vectorMouseDown(event){
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const distanceMouseVector = Math.sqrt(
            (mouseX - vectorController.pos.x)**2 + (mouseY - vectorController.pos.y)**2
        );

    if(distanceMouseVector < vectorController.radius){
        vectorController.isDragging = true; 
    }       
};        

function vectorMouseMove(event){
    if(vectorController.isDragging){ 
        
        vectorController.pos.x = event.clientX - rect.left;
        vectorController.pos.y = event.clientY - rect.top;

        ball.vel.x = (vectorController.pos.x - ball.pos.x)/scaleVector;
        ball.vel.y = (vectorController.pos.y - ball.pos.y)/scaleVector;

        drawFrame();
    }
};

function vectorMouseUp(){
    vectorController.isDragging = false;
};