const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

//Background image
const background = new Image();
background.src = "images/bground.png";

const foreground = new Image();
foreground.src = "images/fground.png"

//Log image
const log = new Image();
log.src = "images/log.png";

//Bird image
const bird = new Image();
bird.src = "images/bird.png";

let pX = 60;
let pY = 40;

//Gravity
const g = 1.5;

//Score sound
const scoreSound = new Audio("audio/score.mp3");

document.addEventListener('keydown', (event) => {
    pY -= 25;
});

const gap = 133;
let score = 0;

//Array of logs
let logs = [
    {x: canvas.width,
        y:  Math.floor(Math.random() * log.height) - log.height
    }
];
function draw() {

    //Drawing backgound image
    context.drawImage(background, 0, 0);
    
    //Drawing bird
    context.drawImage(bird, pX, pY);

    pY += g;
    
    for ( let i = 0; i < logs.length; i++) {
        //Drawing logs
        context.drawImage(log, logs[i].x, logs[i].y);
        context.drawImage(log, logs[i].x, logs[i].y + log.height + gap);
        logs[i].x--;
        //Adding a log
        if (logs[i].x == 180)
            logs.push({
                x: canvas.width,
                y:  Math.floor(Math.random() * log.height) - log.height});
        //Increment score
        if (logs[i].x == 50) {   
                score++;
                scoreSound.play();
        }   
        //Collision
        if ( ((pX + bird.width >= logs[i].x && pX <= logs[i].x + log.width) && (pY <= logs[i].y + log.height || pY + bird.height >= logs[i].y + log.height + gap))    
                || (pY + bird.height >= canvas.height - foreground.height)) {  
            location.reload();
            
        }      
    }    
      
    context.drawImage(foreground, 0, canvas.height - foreground.height); 
    
    //Dispaly score
    context.font = "23px Arial";
    context.fillStyle= "#333";
    context.fillText("Score: " + score, 30, canvas.height - 60);

    requestAnimationFrame(draw);
}

draw();
