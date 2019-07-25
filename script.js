let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let x = canvas.width / 6;
let y = canvas.height-50; 
let dx = 2;
let dy = -2;
let ballRadius = 10;
let color = "white";
let paddleHeight = 75;
let paddleWidth = 10;
let paddleY = (canvas.height-paddleHeight) / 2;
let oppPaddleY = (canvas.height-paddleHeight) / 2;
let upPressed = false;
let downPressed = false;



document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.key == "Up" || e.key == "ArrowUp") {
        upPressed = true;
    }
    else if(e.key == "Down" || e.key == "ArrowDown") {
        downPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Up" || e.key == "ArrowUp") {
        upPressed = false;
    }
    else if(e.key == "Down" || e.key == "ArrowDown") {
        downPressed = false;
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

const dashedLine = () => {
    ctx.beginPath();
    ctx.setLineDash([7, 12]);
    ctx.moveTo(canvas.width/2, 0);
    ctx.lineTo(canvas.width/2, canvas.height);
    ctx.strokeStyle = "white";
    ctx.stroke();
    // ctx.fillStyle = "white";
    // ctx.fill();
}

function oppDrawPaddle() {
    ctx.beginPath();
    ctx.rect(canvas.width-11, oppPaddleY, paddleWidth, paddleHeight);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(1, paddleY, paddleWidth, paddleHeight);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}
  
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    oppDrawPaddle();
    dashedLine();
    x += dx;
    y += dy;
    if(y + dy > (canvas.height-ballRadius) || y + dy < ballRadius) {
        dy = -dy;
        color = getRandomColor();
        ctx.fill();
    }

    if(x + dx > canvas.width-ballRadius) {
        if(y > oppPaddleY && y < oppPaddleY + paddleHeight) {
        dx = -dx;
        } else {
            alert("GAME OVER");
            document.location.reload();
            clearInterval(interval);
        }
    } else if(x + dx < ballRadius) {
        if(y > paddleY && y < paddleY + paddleHeight) {
            dx = -(dx*1.2);
        }
        else {
            alert("GAME OVER");
            document.location.reload();
            clearInterval(interval);
        }
    }    
    
    if(downPressed && paddleY < canvas.height - paddleHeight) {
        paddleY += 5;
    }
    else if(upPressed && paddleY > 0) {
        paddleY -= 5;
    }

    if(y > (oppPaddleY + paddleHeight/2)  && oppPaddleY <canvas.height - paddleHeight) {
        oppPaddleY +=2;
    }
    else if(y < (oppPaddleY + paddleHeight/2)  && oppPaddleY > 0) {
        oppPaddleY -= 2;
    }

}




let interval = setInterval(draw, 10);