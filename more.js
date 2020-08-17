function gamePlay() {
    const HEAD_IMAGE = new Image();
    HEAD_IMAGE.src = "images/olaf2.png";
    const BODY_IMAGE = new Image();
    BODY_IMAGE.src = "images/snowball.png";
    const APPLE_IMAGE = new Image();
    APPLE_IMAGE.src = "images/apple.png";

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

        for (let i = 1; i < SNAKE.body.length; i++) {
            const child = SNAKE.body[i];
            const parent = SNAKE.body[i - 1];

            if (child.y > parent.y) {
                child.y -= SNAKE.moveAmount;
            } else if (child.y < parent.y) {
                child.y += SNAKE.moveAmount;
            } else if (child.x > parent.x && parent.y % 30 === 0) {
                child.x -= SNAKE.moveAmount;
            } else if (child.x < parent.x && parent.y % 30 === 0) {
                child.x += SNAKE.moveAmount;
            }

            ctx.drawImage(BODY_IMAGE, child.x, child.y);
        }

        ctx.drawImage(APPLE_IMAGE, APPLE.x, APPLE.y);
        ctx.drawImage(HEAD_IMAGE, SNAKE.body[0].x, SNAKE.body[0].y);
        checkAppleCollision();
        checkLosingCollision();
    }, 1000 / FRAMES_PER_SECOND);
}

function addSnakeBodyPart() {
    let newBodyX = APPLE.x;
    let newBodyY = APPLE.y;
    // time for each body piece to move a grid length
    let snakeBodyTime = (1000 / FRAMES_PER_SECOND) * (GRID_SIZE / SNAKE.moveAmount);
    setTimeout(() => {
        SNAKE.body.push({ x: newBodyX, y: newBodyY });
    }, snakeBodyTime * SNAKE.body.length);
}
