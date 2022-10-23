const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

const width = canvas.width = window.innerWidth //set height and width to canvas
const height = canvas.height = window.innerHeight

function randomNumBetween(min,max){ //Generate random number function
    return Math.floor(Math.random() * (max-min+1) + min)
}

function randomRGB() { //function will be used to get random color balls
    return `rgb(${randomNumBetween(200,210)},${randomNumBetween(200,210)},${randomNumBetween(200,210)})`
}

class Ball {
    constructor (x, y, velX, velY, color, size){
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.color = color;
        this.size = size;
    }

    draw() {
        context.beginPath(); //start drawing balls
        context.fillStyle = this.color;
        context.arc(this.x, this.y, this.size, 0, 2*Math.PI);
        context.fill(); // lastly to fill the object with our parameters
    }

    update(){ //what happens when ball hits the edge of the screen
        if(this.x + this.size >= width || this.y + this.size>=height){
            this.x=randomNumBetween(-1000-width, width-1000); //generate new position for new balls
            this.y=randomNumBetween(-1000, 100)
            
        }

        this.x += Math.random() * 1 + this.velX;
        this.y += Math.random() * 1 + this.velY;
        
    }
}

const balls = []

while(balls.length<250){ // how many balls
    const size = randomNumBetween(0.5,5)
    const ball = new Ball(
        randomNumBetween(-1000-width, width-1000),
        randomNumBetween(-1000-height, height-1000),
        randomNumBetween(4,5),
        randomNumBetween(3,6),
        randomRGB(),
        size
    )

    balls.push(ball)  // add generated ball into the balls array
}
function loopAnimation() {
    
    context.fillStyle = 'rgba(0,0,0,0.6)'
    context.fillRect(0,0,width,height)
    for(const ball of balls) {
        ball.draw()
        ball.update()
    }
    requestAnimationFrame(loopAnimation)
    
}

loopAnimation();