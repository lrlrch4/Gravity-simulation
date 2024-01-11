function simulate() {

    frame +=1;
    t = frame * timeStep;

    ball.vel.x += ball.acc.x * timeStep;
    ball.vel.y += ball.acc.y * timeStep;

    ball.pos.x += ball.vel.x * timeStep;
    ball.pos.y += ball.vel.y * timeStep;

    if (ball.pos.x < ball.radius) {
        ball.pos.x = ball.radius;
        ball.vel.x = -ball.vel.x;
    }
    if (ball.pos.x > svgSimulationWidth - ball.radius) {
        ball.pos.x = svgSimulationWidth - ball.radius;
        ball.vel.x = -ball.vel.x;
    }
    if (ball.pos.y < ball.radius) {
        ball.pos.y = ball.radius;
        ball.vel.y = -ball.vel.y;
    }
    if (ball.pos.y > svgSimulationHeight - ball.radius) {
        ball.pos.y = svgSimulationHeight - ball.radius;
        ball.vel.y = -ball.vel.y;
    }

    distanceBalls = Math.sqrt( (massiveBall.pos.x - ball.pos.x)**2 + (massiveBall.pos.y - ball.pos.y)**2 )

    if(distanceBalls < massiveBall.radius + ball.radius){

        const normalVector = {
            x: (ball.pos.x - massiveBall.pos.x)/distanceBalls,
            y: (ball.pos.y - massiveBall.pos.y)/distanceBalls
        }
    
        const tangentVector = {
            x:  normalVector.y, 
            y: -normalVector.x
        }

        const velDotNormal  = ball.vel.x * normalVector.x  + ball.vel.y * normalVector.y;
        const velDotTangent = ball.vel.x * tangentVector.x + ball.vel.y * tangentVector.y;

        ball.pos.x = svgSimulationWidth/2 + (massiveBall.radius + ball.radius)*normalVector.x;
        ball.pos.y = svgSimulationHeight/2 + (massiveBall.radius + ball.radius)*normalVector.y;

        ball.vel.x = velDotTangent * tangentVector.x - eCoef * velDotNormal * normalVector.x;
        ball.vel.y = velDotTangent * tangentVector.y - eCoef * velDotNormal * normalVector.y; 
    }

    ball.acc = {
        x: k*(massiveBall.pos.x - ball.pos.x)/(distanceBalls**3), 
        y: k*(massiveBall.pos.y - ball.pos.y)/(distanceBalls**3) 
    };

    vectorController.pos.x = ball.pos.x + scaleVector * ball.vel.x;
    vectorController.pos.y = ball.pos.y + scaleVector * ball.vel.y;

}