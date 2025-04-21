var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 10;
var paddleHeight = 10;
var defaultPaddleWidth = 75; 
var paddleWidth = defaultPaddleWidth;
var brickRowCount = 6; // Increased to fill more vertical space
var brickColumnCount = 9; // Increased to fill wider canvas
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 40; // Adjusted to fit more rows
var brickOffsetLeft = 35; // Adjusted to center bricks

var ballImage = new Image();
ballImage.src = "imgs/icons8-google-16.png";
var paddleImage = new Image();
paddleImage.src = "imgs/Google-search.png";
var enlargeImage = new Image();
enlargeImage.src = "imgs/monetized.png";
var shrinkImage = new Image();
shrinkImage.src = "imgs/demonetized.png";

var x, y, dx, dy, paddleX, rightPressed, leftPressed, bricks, isGameRunning, lives;
var powerUps = [];
var activePowerUp = null; 
var powerUpTimer = 0; 
var frameCount = 0;
var scaledPaddleHeight = paddleHeight;
var lifeColors = []; // Store fixed colors for lives

ballImage.onload = function() {
    initGame();
    draw();
};

paddleImage.onload = function() {
    draw();
};

enlargeImage.onload = function() {
    draw();
};

shrinkImage.onload = function() {
    draw();
};

function initGame() {
    x = canvas.width / 2;
    y = canvas.height - 30;
    dx = 3;
    dy = -3;
    paddleWidth = defaultPaddleWidth;
    paddleX = (canvas.width - paddleWidth) / 2;
    rightPressed = false;
    leftPressed = false;
    lives = 3;
    bricks = [];
    powerUps = []; 
    activePowerUp = null; 
    powerUpTimer = 0; 
    frameCount = 0; 
    scaledPaddleHeight = paddleHeight; 
    // Assign fixed colors for lives
    lifeColors = [getRandomColor(), getRandomColor(), getRandomColor()];
    // Color each letter in the title
    colorTitleLetters();
    for (var c = 0; c < brickColumnCount; c++) {
        bricks[c] = [];
        for (var r = 0; r < brickRowCount; r++) {
            bricks[c][r] = { x: 0, y: 0, status: 1, color: getRandomColor() };
        }
    }
    isGameRunning = false;
}

function getRandomColor() {
    const colors = ["#FFB70A", "#1D71EE", "#D6432F", "#06A35E"];
    return colors[Math.floor(Math.random() * colors.length)];
}

function colorTitleLetters() {
    const titleSpans = document.querySelectorAll("#gameTitle span");
    titleSpans.forEach((span) => {
        span.style.color = getRandomColor();
    });
}

function PowerUp(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type; 
    this.width = 20;
    this.height = 20;
    this.speed = 1;
}

PowerUp.prototype.draw = function() {
    if (this.type === "enlarge" && enlargeImage.complete && enlargeImage.naturalWidth !== 0) {
        ctx.drawImage(enlargeImage, this.x, this.y, this.width, this.height);
    } else if (this.type === "shrink" && shrinkImage.complete && shrinkImage.naturalWidth !== 0) {
        ctx.drawImage(shrinkImage, this.x, this.y, this.width, this.height);
    }
};

PowerUp.prototype.update = function() {
    this.y += this.speed; 
    if (this.y + this.height > canvas.height - scaledPaddleHeight &&
        this.x + this.width > paddleX && this.x < paddleX + paddleWidth) {
        if (this.type === "enlarge") {
            paddleWidth = defaultPaddleWidth * 2;
        } else if (this.type === "shrink") {
            paddleWidth = defaultPaddleWidth / 2;
        }
        activePowerUp = this.type;
        powerUpTimer = 10 * 60;
        if (paddleX + paddleWidth > canvas.width) {
            paddleX = canvas.width - paddleWidth;
        }
        var aspectRatio = paddleImage.naturalWidth ? paddleImage.naturalHeight / paddleImage.naturalWidth : 1;
        scaledPaddleHeight = paddleWidth * aspectRatio;
        return true;
    }
    
    return this.y > canvas.height;
};

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

document.getElementById("startButton").addEventListener("click", function() {
    if (!isGameRunning) {
        isGameRunning = true;
        draw();
    }
});

document.getElementById("stopButton").addEventListener("click", function() {
    isGameRunning = false;
});

document.getElementById("credentialsButton").addEventListener("click", function() {
    Swal.fire({
        title: 'Credentials',
        text: 'Made by Luka Dragan',
        icon: 'info',
        confirmButtonText: 'Exit',
        confirmButtonColor: '#FFB70A'
    });
});

document.getElementById("controlsButton").addEventListener("click", function() {
    Swal.fire({
        title: 'Controls',
        html: 'Use <b>Left Arrow</b> or <b>Right Arrow</b> keys to move the paddle.<br><b>Start</b> button to begin the game.<br><b>Stop</b> button to pause the game.',
        icon: 'info',
        confirmButtonText: 'Exit',
        confirmButtonColor: '#1D71EE'
    });
});

function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}

function drawBall() {
    if (ballImage.complete && ballImage.naturalWidth !== 0) {
        ctx.drawImage(ballImage, x - ballRadius, y - ballRadius, ballRadius * 2, ballRadius * 2);
    }
}

function drawPaddle() {
    if (paddleImage.complete && paddleImage.naturalWidth !== 0) {
        var aspectRatio = paddleImage.naturalWidth ? paddleImage.naturalHeight / paddleImage.naturalWidth : 1;
        scaledPaddleHeight = paddleWidth * aspectRatio;
        ctx.drawImage(paddleImage, paddleX, canvas.height - scaledPaddleHeight, paddleWidth, scaledPaddleHeight);
    } 
}

function drawBricks() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status === 1) {
                var brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
                var brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = bricks[c][r].color;
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function drawLives() {
    for (let i = 0; i < lives; i++) {
        ctx.beginPath();
        ctx.arc(canvas.width - 25 - (i * 30), 15, 10, 0, Math.PI * 2);
        ctx.fillStyle = lifeColors[i] || "#000"; // Use fixed color
        ctx.fill();
        ctx.closePath();
    }
}

function drawPowerUps() {
    for (var i = 0; i < powerUps.length; i++) {
        powerUps[i].draw();
    }
}

function updatePowerUps() {
    for (var i = powerUps.length - 1; i >= 0; i--) {
        if (powerUps[i].update()) {
            powerUps.splice(i, 1);
        }
    }
}

function updatePowerUpTimer() {
    if (activePowerUp && powerUpTimer > 0) {
        powerUpTimer--;
        if (powerUpTimer <= 0) {
            paddleWidth = defaultPaddleWidth;
            paddleX = Math.min(paddleX, canvas.width - paddleWidth);
            activePowerUp = null;
            var aspectRatio = paddleImage.naturalWidth ? paddleImage.naturalHeight / paddleImage.naturalWidth : 1;
            scaledPaddleHeight = paddleWidth * aspectRatio;
        }
    }
}

function collisionDetection() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            var b = bricks[c][r];
            if (b.status === 1) {
                if (x + ballRadius > b.x && x - ballRadius < b.x + brickWidth &&
                    y + ballRadius > b.y && y - ballRadius < b.y + brickHeight) {
                    if (x < b.x || x > b.x + brickWidth) {
                        dx = -dx;
                    } else {
                        dy = -dy;
                    }
                    b.status = 0;
                    var rand = Math.random();
                    if (rand < 0.33) {
                        powerUps.push(new PowerUp(b.x + brickWidth / 2 - 10, b.y + brickHeight, "enlarge"));
                    } else if (rand < 0.66) {
                        powerUps.push(new PowerUp(b.x + brickWidth / 2 - 10, b.y + brickHeight, "shrink"));
                    }

                    if (bricks.every(col => col.every(brick => brick.status === 0))) {
                        alert("YOU WIN, CONGRATULATIONS!");
                        resetGame();
                    }
                }
            }
        }
    }
}

function paddleCollision() {
    if (y + dy + ballRadius > canvas.height - scaledPaddleHeight && dy > 0) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            let hitPosition = (x - paddleX) / paddleWidth;
            let maxAngle = Math.PI / 3;
            let angle = (hitPosition - 0.5) * 2 * maxAngle;

            let speed = Math.sqrt(dx * dx + dy * dy);
            dx = speed * Math.sin(angle);
            dy = -speed * Math.cos(angle);

            return true;
        }
        return false;
    }
    return false;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawLives();
    drawPowerUps();

    if (isGameRunning) {
        frameCount++;
        collisionDetection();
        updatePowerUps();
        updatePowerUpTimer();

        x += dx;
        y += dy;

        if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
            dx = -dx;
        }
        if (y + dy < ballRadius) {
            dy = -dy;
        }

        if (!paddleCollision()) {
            if (y + dy > canvas.height + ballRadius) {
                lives--;
                if (lives <= 0) {
                    alert("GAME OVER!");
                    resetGame();
                } else {
                    x = canvas.width / 2;
                    y = canvas.height - 30;
                    dx = 3;
                    dy = -3;
                    paddleX = (canvas.width - paddleWidth) / 2;
                }
            }
        }

        if (rightPressed && paddleX < canvas.width - paddleWidth) {
            paddleX += 4;
        } else if (leftPressed && paddleX > 0) {
            paddleX -= 4;
        }

        requestAnimationFrame(draw);
    }
}

function resetGame() {
    initGame();
    draw();
}