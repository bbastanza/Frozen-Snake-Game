const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

const SCORE_DISPLAY = document.getElementById("score");
const HIGH_SCORE_DISPLAY = document.getElementById("high-score");
let newHighScore = false;

const FRAMES_PER_SECOND = 60;
const GRID_SIZE = 30;

let randomizeApple;

let bellSound;
let crashSound;

const SCORING = {
    score: 0,
    highScore: JSON.parse(window.localStorage.getItem("high-score")) || 0,
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
    alert("Welcome to Frozen Snake! Press Space to begin!");
    randomApple();
    gamePlay();
    bellSound = new Audio("sfx/bellssfx.mp3");
    crashSound = new Audio("sfx/crash.mp3");
    HIGH_SCORE_DISPLAY.textContent = `High Score: ${SCORING.highScore}`;
};

function checkAppleCollision() {
    if (SNAKE.body[0].x === APPLE.x && SNAKE.body[0].y === APPLE.y) {
        bellSound.play();
        updateScoreDisplay();
        addSnakeBodyPart();
        randomApple();
    }
}

function updateScoreDisplay() {
    SCORING.score++;
    if (SCORING.score > SCORING.highScore) {
        SCORING.highScore = SCORING.score;
        HIGH_SCORE_DISPLAY.textContent = `High Score: ${SCORING.highScore}`;
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

function randomApple() {
    APPLE.x = Math.floor(23 * Math.random()) * 30 + 30;
    APPLE.y = Math.floor(14 * Math.random()) * 30 + 30;
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
