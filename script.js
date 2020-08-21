const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

const scoreDisplay = document.getElementById("score");
const highScoreDisplay = document.getElementById("high-score");
let newHighScore = false;

const FRAMES_PER_SECOND = 60;
const GRID_SIZE = 30;

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
    randomApplePosition();
    gamePlay();
    bellSound = new Audio("sfx/bellssfx.mp3");
    crashSound = new Audio("sfx/crash.mp3");
    highScoreDisplay.textContent = `High Score: ${scoring.highScore}`;
};

function checkAppleCollision() {
    if (snake.body[0].x === apple.x && snake.body[0].y === apple.y) {
        bellSound.play();

        addSnakeBodyPart();

        randomApplePosition();

        updateScoreDisplay();
    }
}

function addSnakeBodyPart() {
    let newBodyX = apple.x;
    let newBodyY = apple.y;
    let snakeBodyTime = (1000 / FRAMES_PER_SECOND) * (GRID_SIZE / snake.moveAmount);
    setTimeout(() => {
        snake.body.push({ x: newBodyX, y: newBodyY });
    }, snakeBodyTime * snake.body.length);
}

function randomApplePosition() {
    apple.x = Math.floor(23 * Math.random()) * 30 + 30;
    apple.y = Math.floor(14 * Math.random()) * 30 + 30;
}

function checkAppleOnBody() {
    for (const bodyPart of snake.body) {
        if (apple.x === bodyPart.x && apple.y === bodyPart.y) randomApplePosition();
    }
}

function checkLosingCollision() {
    for (let i = 1; i < snake.body.length; i++) {
        const bodyPart = snake.body[i];
        if (snake.body[0].x === bodyPart.x && snake.body[0].y === bodyPart.y) return gameOver();
    }

    if (
        snake.body[0].x > canvas.width - 30 ||
        snake.body[0].x < 0 ||
        snake.body[0].y > canvas.height - 30 ||
        snake.body[0].y < 0
    )
        gameOver();
}
