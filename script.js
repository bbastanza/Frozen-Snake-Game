const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

const SCORE_DISPLAY = document.getElementById("score");
const HIGH_SCORE_DISPLAY = document.getElementById("high-score");
let newHighScore = false;

let FRAMES_PER_SECOND = 60;
const GRID_SIZE = 30;

const SCORING = {
    score: 0,
    highScore: "",
};

const SNAKE = {
    body: [
        { x: 90, y: 30 },
        { x: 60, y: 30 },
        { x: 30, y: 30 },
        { x: 0, y: 30 },
    ],
    direction: "RIGHT",
    newDirection: "RIGHT",
    moveAmount: 3.75,
};

const APPLE = {
    x: "",
    y: "",
};

window.onload = () => {
    gamePlay();
    drawRandomApple();
    SCORING.highScore = JSON.parse(window.localStorage.getItem("high-score")) || 0;
    HIGH_SCORE_DISPLAY.textContent = `High Score: ${SCORING.highScore}`;
};

function checkAppleCollision() {
    if (SNAKE.body[0].x === APPLE.x && SNAKE.body[0].y === APPLE.y) {
        updateScores();
        addSnakeBodyPart();
        drawRandomApple();
    }
}

function updateScores() {
    SCORING.score++;
    if (SCORING.score > SCORING.highScore) {
        SCORING.highScore = SCORING.score;
        HIGH_SCORE_DISPLAY.textContent = `High Score: ${SCORING.highScore}`;
        window.localStorage.setItem("high-score", JSON.stringify(SCORING.highScore));
        newHighScore = true;
    }
    SCORE_DISPLAY.textContent = `Score: ${SCORING.score}`;
}

function addSnakeBodyPart() {
    let newBodyX = APPLE.x;
    let newBodyY = APPLE.y;
    let snakeBodyTime = (1000 / FRAMES_PER_SECOND) * (GRID_SIZE / SNAKE.moveAmount);
    setTimeout(() => {
        SNAKE.body.push({ x: newBodyX, y: newBodyY });
    }, snakeBodyTime * SNAKE.body.length);
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
