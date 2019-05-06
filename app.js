let bX = 10;
let bY = 150;

let g = 1.5;

let score = 0;

let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");


let bg = new Image();
let log = new Image();

let fg = new Image();
let bird = new Image();

let fly = new Audio();
let scor = new Audio();

bg.src = "images/background.png";
log.src = "images/mylog.png";

fg.src = "images/fground.png";
bird.src = "images/blueBird.png";

fly.src = "sounds/fly.mp3";
scor.src = "sounds/score.mp3";

let gap = 120;
let constant = log.height + gap;

let pipe = [];
pipe[0] = {
    x: cvs.width,
    y: 0
};
document.addEventListener("keydown", moveUp);

function moveUp() {
    bY -= 25;
    fly.play();
}

function draw() {
    ctx.drawImage(bg, 0, 0);

    for (let i = 0; i < pipe.length; i++) {
        ctx.drawImage(log, pipe[i].x, pipe[i].y);
        ctx.drawImage(log, pipe[i].x, pipe[i].y + constant);
        pipe[i].x--;
        if (pipe[i].x == cvs.width - 188) {
            pipe.push({
                x: cvs.width,
                y: Math.floor(Math.random() * log.height) - log.height
            });
        }
        //Collision
        let pX = pipe[i].x
        let pY = pipe[i].y
        if (bX >= pX && bX + bird.width <= pX + log.width && 
            (bY <= pY + log.height || bY + bird.height >= pY + constant) || bY + bird.height >= 388) {
            location.reload();
          
        }    
        if (pipe[i].x == 5) {
            score++;
            scor.play();
        }
    }



    ctx.drawImage(fg, 0, cvs.height - fg.height);

    ctx.drawImage(bird, bX, bY);

    bY += g;
    ctx.fillStyle = "#666";
    ctx.font = "20px Verdana";
    ctx.fillText("Score: " + score, 10, cvs.height - 20);

    requestAnimationFrame(draw);
}
draw();
