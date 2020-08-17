function gamePlay() {
    const snakeHeadImage = new Image();
    snakeHeadImage.src = "images/olaf2.png";
    const snakeBodyPiece = new Image();
    snakeBodyPiece.src = "images/snowball.png";
    const apple = new Image();
    apple.src = "images/apple.png";

    setInterval(function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (SNAKE.body[0].x % 30 === 0 && SNAKE.body[0].y % 30 === 0) {
            SNAKE.direction = SNAKE.newDirection;
        }

        if (SNAKE.direction === "RIGHT") {
            SNAKE.body[0].x += SNAKE.moveAmount;
            for (let i = 1; i < SNAKE.body.length; i++) {
                if (SNAKE.body[i].y > SNAKE.body[i - 1].y) {
                    SNAKE.body[i].y -= SNAKE.moveAmount;
                } else if (SNAKE.body[i].y < SNAKE.body[i - 1].y) {
                    SNAKE.body[i].y += SNAKE.moveAmount;
                } else if (SNAKE.body[i].x > SNAKE.body[i - 1].x) {
                    SNAKE.body[i].x -= SNAKE.moveAmount;
                } else if (SNAKE.body[i].x < SNAKE.body[i - 1].x) {
                    SNAKE.body[i].x += SNAKE.moveAmount;
                }

                ctx.drawImage(snakeBodyPiece, SNAKE.body[i].x, SNAKE.body[i].y);
            }
        }
        if (SNAKE.direction === "LEFT") {
            SNAKE.body[0].x -= SNAKE.moveAmount;
            for (let i = 1; i < SNAKE.body.length; i++) {
                if (SNAKE.body[i].y > SNAKE.body[i - 1].y) {
                    SNAKE.body[i].y -= SNAKE.moveAmount;
                } else if (SNAKE.body[i].y < SNAKE.body[i - 1].y) {
                    SNAKE.body[i].y += SNAKE.moveAmount;
                } else if (SNAKE.body[i].x > SNAKE.body[i - 1].x) {
                    SNAKE.body[i].x -= SNAKE.moveAmount;
                } else if (SNAKE.body[i].x < SNAKE.body[i - 1].x) {
                    SNAKE.body[i].x += SNAKE.moveAmount;
                }

                ctx.drawImage(snakeBodyPiece, SNAKE.body[i].x, SNAKE.body[i].y);
            }
        }
        if (SNAKE.direction === "DOWN") {
            SNAKE.body[0].y += SNAKE.moveAmount;
            for (let i = 1; i < SNAKE.body.length; i++) {
                if (SNAKE.body[i].x > SNAKE.body[i - 1].x) {
                    SNAKE.body[i].x -= SNAKE.moveAmount;
                } else if (SNAKE.body[i].x < SNAKE.body[i - 1].x) {
                    SNAKE.body[i].x += SNAKE.moveAmount;
                } else if (SNAKE.body[i].y > SNAKE.body[i - 1].y) {
                    SNAKE.body[i].y -= SNAKE.moveAmount;
                } else if (SNAKE.body[i].y < SNAKE.body[i - 1].y) {
                    SNAKE.body[i].y += SNAKE.moveAmount;
                }
                ctx.drawImage(snakeBodyPiece, SNAKE.body[i].x, SNAKE.body[i].y);
            }
        }
        if (SNAKE.direction === "UP") {
            SNAKE.body[0].y -= SNAKE.moveAmount;
            for (let i = 1; i < SNAKE.body.length; i++) {
                if (SNAKE.body[i].x > SNAKE.body[i - 1].x) {
                    SNAKE.body[i].x -= SNAKE.moveAmount;
                } else if (SNAKE.body[i].x < SNAKE.body[i - 1].x) {
                    SNAKE.body[i].x += SNAKE.moveAmount;
                } else if (SNAKE.body[i].y > SNAKE.body[i - 1].y) {
                    SNAKE.body[i].y -= SNAKE.moveAmount;
                } else if (SNAKE.body[i].y < SNAKE.body[i - 1].y) {
                    SNAKE.body[i].y += SNAKE.moveAmount;
                }
                ctx.drawImage(snakeBodyPiece, SNAKE.body[i].x, SNAKE.body[i].y);
            }
        }

        ctx.drawImage(apple, APPLE.x, APPLE.y);
        ctx.drawImage(snakeHeadImage, SNAKE.body[0].x, SNAKE.body[0].y);
        checkAppleCollision();
        checkBorderCollision();
        checkBodyCollision();
    }, 1000 / framesPerSecond);
}

function addSnakeBodyPart() {
    let newBodyX = APPLE.x;
    let newBodyY = APPLE.y;
    // time for each body piece to move a grid length
    let snakeBodyTime = (1000 / framesPerSecond) * (gridSize / SNAKE.moveAmount);
    setTimeout(() => {
        SNAKE.body.push({ x: newBodyX, y: newBodyY });
    }, snakeBodyTime * SNAKE.body.length);
}

function checkBodyCollision() {
    for (let i = 1; i < SNAKE.body.length; i++) {
        const bodyElement = SNAKE.body[i];
        if (SNAKE.body[0].x === bodyElement.x && SNAKE.body[0].y === bodyElement.y) {
            gameOver();
        }
    }
}

////////////////////////////////////////////////////////////////////
// for (let i = 1; i < SNAKE.body.length; i++) {
//     if (SNAKE.body[i].y > SNAKE.body[i - 1].y) {
//         SNAKE.body[i].y -= SNAKE.moveAmount;
//     } else if (SNAKE.body[i].y < SNAKE.body[i - 1].y) {
//         SNAKE.body[i].y += SNAKE.moveAmount;
//     } else if (SNAKE.body[i].x > SNAKE.body[i - 1].x) {
//         SNAKE.body[i].x -= SNAKE.moveAmount;
//     } else if (SNAKE.body[i].x < SNAKE.body[i - 1].x) {
//         SNAKE.body[i].x += SNAKE.moveAmount;
//     }

//     ctx.drawImage(snakeBodyPiece, SNAKE.body[i].x, SNAKE.body[i].y);
// }
////////////////////////////////////////////////////////////////////////
// function verticalMovement() {
//     for (let i = 1; i < SNAKE.body.length; i++) {
//         if (SNAKE.body[i].y > SNAKE.body[i - 1].y) {
//             SNAKE.body[i].y -= SNAKE.moveAmount;
//         } else if (SNAKE.body[i].y < SNAKE.body[i - 1].y) {
//             SNAKE.body[i].y += SNAKE.moveAmount;
//         } else if (SNAKE.body[i].x > SNAKE.body[i - 1].x) {
//             SNAKE.body[i].x -= SNAKE.moveAmount;
//         } else if (SNAKE.body[i].x < SNAKE.body[i - 1].x) {
//             SNAKE.body[i].x += SNAKE.moveAmount;
//         }

//         ctx.drawImage(snakeBodyPiece, SNAKE.body[i].x, SNAKE.body[i].y);
//     }
// }

// function horizontalMovement() {
//     for (let i = 1; i < SNAKE.body.length; i++) {
//         if (SNAKE.body[i].x > SNAKE.body[i - 1].x) {
//             SNAKE.body[i].x -= SNAKE.moveAmount;
//         } else if (SNAKE.body[i].x < SNAKE.body[i - 1].x) {
//             SNAKE.body[i].x += SNAKE.moveAmount;
//         } else if (SNAKE.body[i].y > SNAKE.body[i - 1].y) {
//             SNAKE.body[i].y -= SNAKE.moveAmount;
//         } else if (SNAKE.body[i].y < SNAKE.body[i - 1].y) {
//             SNAKE.body[i].y += SNAKE.moveAmount;
//         }
//         ctx.drawImage(snakeBodyPiece, SNAKE.body[i].x, SNAKE.body[i].y);
//     }
// }
