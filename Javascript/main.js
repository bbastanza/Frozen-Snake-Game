const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

const modal = document.getElementById("modal-background");
const closeBtn = document.getElementById("close-button");

const modalHeader = document.querySelector(".modal-content h3");
const modalFirstPlace = document.getElementById("modal-first-place");
const modalSecondPlace = document.getElementById("modal-second-place");
const modalThirdPlace = document.getElementById("modal-third-place");
const modalFooter = document.getElementById("modal-footer");

const scoreDisplay = document.getElementById("score");
const highScoreDisplay = document.getElementById("high-score");
let newHighScore = false;

const FRAMES_PER_SECOND = 60;
const GRID_SIZE = 30;

let bellSound;
let crashSound;

let gameGoing = true;

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
    showModal();
    gamePlay();
    randomApplePosition();

    bellSound = new Audio("sfx/bellssfx.mp3");
    crashSound = new Audio("sfx/crash.mp3");
    highScoreDisplay.textContent = `High Score: ${scoring.highScore}`;
};

function gamePlay() {
    const appleImage = new Image();
    appleImage.src = "images/apple.png";
    const headImage = new Image();
    headImage.src = "images/olaf2.png";

    setInterval(() => {
        if (gameGoing) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            moveSnakeBody();

            moveSnakeHead();

            ctx.drawImage(appleImage, apple.x, apple.y);

            ctx.drawImage(headImage, snake.body[0].x, snake.body[0].y);

            checkAppleCollision();

            checkAppleOnBody();

            checkLosingCollision();
        }
    }, 1000 / FRAMES_PER_SECOND);
}

function moveSnakeHead() {
    if (snake.body[0].x % 30 === 0 && snake.body[0].y % 30 === 0) snake.direction = snake.newDirection;

    switch (snake.direction) {
        case "RIGHT":
            snake.body[0].x += snake.moveAmount;
            break;
        case "LEFT":
            snake.body[0].x -= snake.moveAmount;
            break;
        case "DOWN":
            snake.body[0].y += snake.moveAmount;
            break;
        case "UP":
            snake.body[0].y -= snake.moveAmount;
            break;
        default:
            break;
    }
}

function moveSnakeBody() {
    if (snake.body.length <= 1) return;

    const head = snake.body[0];
    const headChild = snake.body[1];

    if (
        head.x - headChild.x === 30 ||
        head.x - headChild.x === -30 ||
        head.y - headChild.y === 30 ||
        head.y - headChild.y === -30
    ) {
        for (let i = snake.body.length - 1; i > 0; i--) {
            const parent = snake.body[i - 1];
            snake.body[i] = Object.assign({}, parent);
        }
    }

    for (const bodyPart of snake.body) {
        const bodyImage = new Image();
        bodyImage.src = "images/snowball.png";
        ctx.drawImage(bodyImage, bodyPart.x, bodyPart.y);
    }
}
