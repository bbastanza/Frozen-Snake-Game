const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");
const scoreDisplay = document.getElementById("score");
const highScoreDisplay = document.getElementById("high-score");

const framesPerSecond = 60;
const gridSize = 30;
window.onload = () => {
    drawRandomApple();
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
        SCORING.score++;
        if (SCORING.score > SCORING.highScore) {
            SCORING.highScore = SCORING.score;
            highScoreDisplay.textContent = `High Score: ${SCORING.highScore}`;
        }
        scoreDisplay.textContent = `Score: ${SCORING.score}`;
        addSnakeBodyPart();
        drawRandomApple();
    }
}

function drawRandomApple() {
    const apple = new Image();
    apple.src = "images/apple.png";
    apple.onload = () => {
        APPLE.x = Math.floor(23 * Math.random()) * 30 + 30;
        APPLE.y = Math.floor(14 * Math.random()) * 30 + 30;
        //if apple position does not equal body or head position of the snake draw image///else rerun ////while loop////
        ctx.drawImage(apple, APPLE.x, APPLE.y);
    };
}

document.addEventListener("keydown", function (e) {
    // prevent left if right, right if left, up if down, down if up
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
        gameOver();
    }
}

function gameOver() {
    alert("GAME OVER");
    SCORING.score = 0;
    SNAKE.body = [{ x: "", y: "" }];
    SNAKE.body[0].x = 30;
    SNAKE.body[0].y = 30;
    SNAKE.direction = "RIGHT";
    SNAKE.newDirection = "RIGHT";
    SNAKE.moveAmount = 3.75;
    drawRandomApple();
    scoreDisplay.textContent = `Score: ${SCORING.score}`;
}

// game over function include local storage of high score
