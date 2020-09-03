function checkAppleCollision() {
    if (snake.body[0].x === apple.x && snake.body[0].y === apple.y) {
        bellSound.play();

        addSnakeBodyPart();

        randomApplePosition();

        updateScoreDisplay();
    }
}

function addSnakeBodyPart() {
    const newBodyX = apple.x;
    const newBodyY = apple.y;
    const snakeBodyTime = (1000 / FRAMES_PER_SECOND) * (GRID_SIZE / snake.moveAmount);
    setTimeout(() => {
        snake.body.push({ x: newBodyX, y: newBodyY });
    }, snakeBodyTime * (snake.body.length - 2));
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
    let wallCollisionHappened = checkWallCollision();
    if (wallCollisionHappened) gameOver();
}

function checkWallCollision() {
    return (
        snake.body[0].x > canvas.width - 30 ||
        snake.body[0].x < 0 ||
        snake.body[0].y > canvas.height - 30 ||
        snake.body[0].y < 0
    );
}

document.addEventListener("keydown", function (e) {
    const key = e.key;
    switch (true) {
        case key === "Right" || key === "ArrowRight":
            if (snake.direction !== "LEFT") return (snake.newDirection = "RIGHT");
            break;
        case key === "Left" || key === "ArrowLeft":
            if (snake.direction !== "RIGHT") return (snake.newDirection = "LEFT");
            break;
        case key === "Up" || key === "ArrowUp":
            if (snake.direction !== "DOWN") return (snake.newDirection = "UP");
            break;
        case key === "Down" || key === "ArrowDown":
            if (snake.direction !== "UP") return (snake.newDirection = "DOWN");
            break;
        default:
            break;
    }
    if (e.keyCode === 32) {
        if (gameGoing) {
            modalHeader.textContent = "Pause";
            modalFooter.textContent = "Press Space Bar to Resume";
            showModal();
        } else hideModal();
    }
});
