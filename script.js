const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

window.onload = () => {
    drawApple();
    gamePlay();
    // put highscore on screen from local storage
};

const SCORING = {
    score: 0,
    highScore: 0,
};

const SNAKE = {
    body: [{ x: 30, y: 30 }],
    direction: "RIGHT",
    newDirection: "RIGHT",
    moveAmount: 3.75,
};

const APPLE = {
    x: "",
    y: "",
};

function checkAppleCollision() {
    if (SNAKE.body[0].x === APPLE.x && SNAKE.body[0].y === APPLE.y) {
        drawApple();
        SCORING.score++;

        if (SCORING.score > SCORING.highScore) {
            SCORING.highScore = SCORING.score;
            document.getElementById("high-score").textContent = `High Score: ${SCORING.highScore}`;
        }
        document.getElementById("score").textContent = `Score: ${SCORING.score}`;
    }
}

function drawApple() {
    const apple = new Image();
    apple.src = "images/apple.png";
    apple.onload = () => {
        APPLE.x = Math.floor(23 * Math.random()) * 30 + 30;
        APPLE.y = Math.floor(14 * Math.random()) * 30 + 30;
        //if apple position does not equal body or head position of the snake draw image///else rerun
        ctx.drawImage(apple, APPLE.x, APPLE.y);
    };
}

function gamePlay() {
    const snakeHeadImage = new Image();
    snakeHeadImage.src = "images/olaf2.png";
    const snakeBodyPiece = new Image();
    snakeBodyPiece.src = "images/snowball.png";
    snakeHeadImage.onload = function () {
        const framesPerSecond = 60;
        setInterval(function () {
            ctx.clearRect(SNAKE.body[0].x - 3, SNAKE.body[0].y - 3, 36, 36);

            if (SNAKE.body[0].x % 30 === 0 && SNAKE.body[0].y % 30 === 0) {
                SNAKE.direction = SNAKE.newDirection;
            }

            if (SNAKE.direction === "RIGHT") {
                SNAKE.body[0].x += SNAKE.moveAmount;
            }
            if (SNAKE.direction === "LEFT") {
                SNAKE.body[0].x -= SNAKE.moveAmount;
            }
            if (SNAKE.direction === "DOWN") {
                SNAKE.body[0].y += SNAKE.moveAmount;
            }
            if (SNAKE.direction === "UP") {
                SNAKE.body[0].y -= SNAKE.moveAmount;
            }

            ctx.drawImage(snakeHeadImage, SNAKE.body[0].x, SNAKE.body[0].y);
            checkAppleCollision();
            checkBorderCollision();
            // check snake collision
        }, 1000 / framesPerSecond);
    };
}

document.addEventListener("keydown", function (e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        SNAKE.newDirection = "RIGHT";
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        SNAKE.newDirection = "LEFT";
    } else if (e.key === "Up" || e.key === "ArrowUp") {
        SNAKE.newDirection = "UP";
    } else if (e.key === "Down" || e.key === "ArrowDown") {
        SNAKE.newDirection = "DOWN";
    } else if (e.keyCode === 32) {
        alert("Pause");
    }
});

function checkBorderCollision() {
    if (
        SNAKE.body[0].x > canvas.width - 30 ||
        SNAKE.body[0].x < 0 ||
        SNAKE.body[0].y > canvas.height - 30 ||
        SNAKE.body[0].y < 0
    ) {
        alert(`You Hit A Wall`);
    }
}

// game over function include local storage of high score
