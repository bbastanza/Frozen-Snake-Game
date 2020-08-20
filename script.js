const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

const scoreDisplay = document.getElementById("score");
const highScoreDisplay = document.getElementById("high-score");
let newHighScore = false;

const FRAMES_PER_SECOND = 60;
const GRID_SIZE = 30;

let randomizeApple;

let bellSound;
let crashSound;

const scoring = {
    score: 0,
    highScore: JSON.parse(window.localStorage.getItem("high-score")) || 0,
};

const snake = {
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

const apple = {
    x: "",
    y: "",
};

window.onload = () => {
    alert("Welcome to Frozen Snake! Press Space to begin!");
    randomApple();
    gamePlay();
    bellSound = new Audio("sfx/bellssfx.mp3");
    crashSound = new Audio("sfx/crash.mp3");
    highScoreDisplay.textContent = `High Score: ${scoring.highScore}`;
};

function checkAppleCollision() {
    if (snake.body[0].x === apple.x && snake.body[0].y === apple.y) {
        bellSound.play();
        updateScoreDisplay();
        addSnakeBodyPart();
        randomApple();
    }
}

function updateScoreDisplay() {
    scoring.score++;
    if (scoring.score > scoring.highScore) {
        scoring.highScore = scoring.score;
        highScoreDisplay.textContent = `High Score: ${scoring.highScore}`;
        newHighScore = true;
    }
    scoreDisplay.textContent = `Score: ${scoring.score}`;
}

function addSnakeBodyPart() {
    let newBodyX = apple.x;
    let newBodyY = apple.y;
    let snakeBodyTime = (1000 / FRAMES_PER_SECOND) * (GRID_SIZE / snake.moveAmount);
    setTimeout(() => {
        snake.body.push({ x: newBodyX, y: newBodyY });
    }, snakeBodyTime * snake.body.length);
}

function randomApple() {
    apple.x = Math.floor(23 * Math.random()) * 30 + 30;
    apple.y = Math.floor(14 * Math.random()) * 30 + 30;
}

document.addEventListener("keydown", function (e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        if (snake.direction !== "LEFT") {
            snake.newDirection = "RIGHT";
        }
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        if (snake.direction !== "RIGHT") {
            snake.newDirection = "LEFT";
        }
    } else if (e.key === "Up" || e.key === "ArrowUp") {
        if (snake.direction !== "DOWN") {
            snake.newDirection = "UP";
        }
    } else if (e.key === "Down" || e.key === "ArrowDown") {
        if (snake.direction !== "UP") {
            snake.newDirection = "DOWN";
        }
    } else if (e.keyCode === 32) {
        alert("Pause");
    }
});
