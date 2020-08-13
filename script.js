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
let moveX = 7.5;

apple.onload = function () {
    ctx.drawImage(apple, appleX, appleY);
};

function checkAppleCollision() {
    if (snakeHeadX === appleX && snakeHeadY === appleY) {
        appleX = Math.floor(23 * Math.random()) * 30 + 30;
        // appleY = Math.floor(14 * Math.random()) * 30 + 30;
        //if apple position does not equal body or head position of the snake draw image///else rerun
        ctx.drawImage(apple, appleX, appleY);
    }
}

const framesPerSecond = 30;

snakeHead.onload = function () {
    setInterval(function () {
        ctx.clearRect(snakeHeadX, snakeHeadY, 30, 30);
        snakeHeadX = updateAxis(snakeHeadX);
        ctx.drawImage(snakeHead, snakeHeadX, snakeHeadY);
        checkAppleCollision();
    }, 1000 / framesPerSecond);
};

function updateAxis(position) {
    position += moveX;
    if (position > canvas.width - 25 || position < -5) {
        moveX = -moveX;
    }
    return position;
}
