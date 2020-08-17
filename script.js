const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

const SCORE_DISPLAY = document.getElementById("score");
const HIGH_SCORE_DISPLAY = document.getElementById("high-score");

const FRAMES_PER_SECOND = 60;
const GRID_SIZE = 30;

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
            HIGH_SCORE_DISPLAY.textContent = `High Score: ${SCORING.highScore}`;
        }
        SCORE_DISPLAY.textContent = `Score: ${SCORING.score}`;
        addSnakeBodyPart();
        drawRandomApple();
    }
}

function drawRandomApple() {
    const APPLE_IMAGE = new Image();
    APPLE_IMAGE.src = "images/apple.png";
    APPLE_IMAGE.onload = () => {
        APPLE.x = Math.floor(23 * Math.random()) * 30 + 30;
        APPLE.y = Math.floor(14 * Math.random()) * 30 + 30;
        //if apple position does not equal body or head position of the snake draw image///else rerun ////while loop////
        ctx.drawImage(APPLE_IMAGE, APPLE.x, APPLE.y);
    };
}

document.addEventListener("keydown", function (e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        if (SNAKE.direction !== "LEFT") {
            SNAKE.newDirection = "RIGHT";
        }
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        if (SNAKE.direction !== "RIGHT") {
            SNAKE.newDirection = "LEFT";
        }
    } else if (e.key === "Up" || e.key === "ArrowUp") {
        if (SNAKE.direction !== "DOWN") {
            SNAKE.newDirection = "UP";
        }
    } else if (e.key === "Down" || e.key === "ArrowDown") {
        if (SNAKE.direction !== "UP") {
            SNAKE.newDirection = "DOWN";
        }
    } else if (e.keyCode === 32) {
        alert("Pause");
    }
});

function checkLosingCollision() {
    for (let i = 1; i < SNAKE.body.length; i++) {
        const BODY_PART = SNAKE.body[i];
        if (SNAKE.body[0].x === BODY_PART.x && SNAKE.body[0].y === BODY_PART.y) {
            gameOver();
        }
    }

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
    SCORE_DISPLAY.textContent = `Score: ${SCORING.score}`;
}

// game over function include local storage of high score
