const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");
const apple = new Image();
apple.src = "images/apple.png";
const snakeHead = new Image();
snakeHead.src = "images/olaf2.png";
const snakeBodyPiece = new Image();
snakeBodyPiece.src = "images/snowball.png";
let appleX = 480;
let appleY = 30;
let snakeHeadX = 30;
let snakeHeadY = 30;
let moveAmount = 15;

apple.onload = function () {
    ctx.drawImage(apple, appleX, appleY);
};

function checkAppleCollision() {
    if (snakeHeadX === appleX && snakeHeadY === appleY) {
        appleX = Math.floor(23 * Math.random()) * 30 + 30;
        appleY = Math.floor(14 * Math.random()) * 30 + 30;
        //if apple position does not equal body or head position of the snake draw image///else rerun
        ctx.drawImage(apple, appleX, appleY);
    }
}

const framesPerSecond = 20;
let negativeAxis = false;
let direction = "RIGHT";

snakeHead.onload = function () {
    setInterval(function () {
        ctx.clearRect(snakeHeadX, snakeHeadY, 30, 30);

        if (direction === "RIGHT" || direction === "LEFT") {
            snakeHeadX = updateAxis(snakeHeadX);
        } else {
            snakeHeadY = updateAxis(snakeHeadY);
        }

        ctx.drawImage(snakeHead, snakeHeadX, snakeHeadY);
        checkAppleCollision();
    }, 1000 / framesPerSecond);
};

function updateAxis(position) {
    if (!negativeAxis) {
        position += moveAmount;
        return position;
    } else {
        position -= moveAmount;
        return position;
    }
}

document.addEventListener("keydown", function (e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        if (snakeHeadX % 30 === 15) {
            snakeHeadX += 15;
            ctx.clearRect(snakeHeadX - 15, snakeHeadY, 30, 30);
        }
        direction = "RIGHT";
        negativeAxis = false;
    }
});

document.addEventListener("keydown", function (e) {
    if (e.key === "Left" || e.key === "ArrowLeft") {
        if (snakeHeadX % 30 === 15) {
            snakeHeadX -= 15;
            ctx.clearRect(snakeHeadX + 15, snakeHeadY, 30, 30);
        }
        direction = "LEFT";
        negativeAxis = true;
    }
});

document.addEventListener("keydown", function (e) {
    if (e.key === "Up" || e.key === "ArrowUp") {
        if (snakeHeadY % 30 === 15) {
            snakeHeadY -= 15;
            ctx.clearRect(snakeHeadX, snakeHeadY + 15, 30, 30);
        }
        direction = "UP";
        negativeAxis = true;
    }
});

document.addEventListener("keydown", function (e) {
    if (e.key === "Down" || e.key === "ArrowDown") {
        if (snakeHeadY % 30 === 15) {
            snakeHeadY += 15;
            ctx.clearRect(snakeHeadX, snakeHeadY - 15, 30, 30);
        }
        direction = "DOWN";
        negativeAxis = false;
    }
});
