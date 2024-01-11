function drawFrame() {
    svgSimulation.select('#drawFrameGroup').remove();   

    const drawFrameGroup = svgSimulation.append('g').attr('id', 'drawFrameGroup');

    drawFrameGroup.append('circle')
        .attr('cx', ball.pos.x)
        .attr('cy', ball.pos.y)
        .attr('r', ball.radius)
        .attr('fill', '#0af');            
    
    const vector = drawFrameGroup.append('g');

    vector.append("defs")
        .append("marker")
        .attr("id", "arrow")
        .attr("viewBox", "0 0 10 10")
        .attr("refX", 5)
        .attr("refY", 5)
        .attr("markerWidth", .5*vectorController.radius)
        .attr("markerHeight", .5*vectorController.radius)
        .attr("orient", "auto-start-reverse")
        .append("path")
        .attr("d", "M 0 0 L 10 5 L 0 10 z")
        .attr('fill', '#0af');

    vector.append('line')
        .attr("x1", ball.pos.x)
        .attr("y1", ball.pos.y )
        .attr("x2", vectorController.pos.x)
        .attr("y2", vectorController.pos.y)
        .attr("stroke", '#0af')
        .attr("stroke-width", 3)         
        .attr("marker-end", "url(#arrow)");

    drawFrameGroup.append('circle')
        .attr('cx', vectorController.pos.x)
        .attr('cy', vectorController.pos.y)
        .attr('r', vectorController.radius)
        .attr('fill', 'red')
        .attr('opacity', 0);
    
    svgData.select('#dataFrameGroup').remove();
    
    const dataFrameGroup = svgData.append('g')
        .attr('id', 'dataFrameGroup'); 

    const dataText = [
        `frame = ${frame}`,
        `t = ${t.toFixed(2)}`,
        `r = (${x.invert(ball.pos.x).toFixed(2)}, ${y.invert(ball.pos.y).toFixed(2)})`,
        `v = (${(ball.vel.x/pixelsPerUnit).toFixed(2)}, ${(ball.vel.y/pixelsPerUnit).toFixed(2)})`,
        `a = (${(ball.acc.x/pixelsPerUnit).toFixed(2)}, ${(ball.acc.x/pixelsPerUnit).toFixed(2)})`,
    ]

    for(let i = 0; i<dataText.length; i++){
        dataFrameGroup.append('text')
            .text(`${dataText[i]}`)
            .attr('x', .05*svgDataWidth)
            .attr('y', .1*svgDataHeight + 30*i)
            .attr('fill', 'white')
            .style('font-size', '15px');
    }

}; 

//Handle simulation start, pause and reset

function update() {
    if(isSimulating){
        setTimeout(function () {
            simulate();
            drawFrame();
            update();
        }, 1000 / fps);
    }
};

function startSimulation(){ 
    startButtonCount += 1;
    isSimulating = true; 
    if(startButtonCount==1){
        update();
    }                    
};

function pauseSimulation(){
    startButtonCount = 0;
    isSimulating = false;       
};

function resetSimulation(){
    frame = 0;
    t = 0;
    startButtonCount = 0;
    isSimulating = false; 
    
    ball.pos.x = initialConditions.pos.x; 
    ball.pos.y = initialConditions.pos.y;

    ball.vel.x = initialConditions.vel.x; 
    ball.vel.y = initialConditions.vel.y;

    ball.isDragging = false;     
    
    vectorController.pos.x = initialConditions.pos.x + scaleVector * initialConditions.vel.x; 
    vectorController.pos.y = initialConditions.pos.y + scaleVector * initialConditions.vel.y;

    drawFrame();
};