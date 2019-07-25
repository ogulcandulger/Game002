let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

canvas.width = window.innerWidth-100;
canvas.height = window.innerHeight-180;

let x = canvas.width / 2;
let y = canvas.height - 30; 
let dx = 2;
let dy = -2;
let ballRadius = 8;
let color = "red";
let paddleHeight = 75;
let paddleWidth = 10;
let paddleY = (canvas.height-paddleHeight) / 2;
let upPressed = false;
let bottomPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

const keyDownHandler = e => {
    if(e.key == "ArrowUp") {
        rightPressed = true;
    }
    else if(e.key == "ArrowDown") {
        leftPressed = true;
    }
}

const keyUpHandler = e => {
    if(e.key == "ArrowUp") {
        rightPressed = false;
    }
    else if(e.key == "ArrowDown") {
        leftPressed = false;
    }
}

const getRandomColor = () => {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}