function gamePlay() {
    const appleImage = new Image();
    appleImage.src = "images/apple.png";
    const headImage = new Image();
    headImage.src = "images/olaf2.png";

    setInterval(function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        moveSnakeBody();

        moveSnakeHead();

        ctx.drawImage(appleImage, apple.x, apple.y);

        ctx.drawImage(headImage, snake.body[0].x, snake.body[0].y);

        checkAppleCollision();

        checkAppleOnBody();

        checkLosingCollision();
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
    if (e.keyCode === 32) return alert("Pause");
});
