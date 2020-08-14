function gamePlay() {
    const snakeHeadImage = new Image();
    snakeHeadImage.src = "images/olaf2.png";
    const snakeBodyPiece = new Image();
    snakeBodyPiece.src = "images/snowball.png";
    const apple = new Image();
    apple.src = "images/apple.png";

    snakeHeadImage.onload = function () {
        const framesPerSecond = 60;
        setInterval(function () {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

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

            ctx.drawImage(apple, APPLE.x, APPLE.y);

            for (let i = 1; i < SNAKE.body.length; i++) {
                const bodyElement = SNAKE.body[i];

                ctx.drawImage(snakeBodyPiece, bodyElement.x, bodyElement.y);
                if (SNAKE.body[0].x === bodyElement.x && SNAKE.body[0].y === bodyElement.y) {
                    gameOver();
                }
            }

            ctx.drawImage(snakeHeadImage, SNAKE.body[0].x, SNAKE.body[0].y);
            checkAppleCollision();
            checkBorderCollision();
            // checkBodyCollision();
        }, 1000 / framesPerSecond);
    };
}
function addSnakeBodyPart() {
    SNAKE.body.push({ x: APPLE.x, y: APPLE.y });
    console.log(SNAKE.body);
}
// function check snake body collision
// let checkBodyCollision = () => {
//     for (let i = 1; i < SNAKE.body.length; i++) {
//         const bodyPart = SNAKE.body[i];
//         if (SNAKE.body[0] == bodyPart) {
//             gameOver();
//         }
//     }
// };
