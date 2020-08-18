const DEBUG = true;
if (DEBUG) {
    SNAKE.body = [
        { x: 150, y: 30 },
        { x: 120, y: 30 },
        { x: 90, y: 30 },
        { x: 60, y: 30 },
        { x: 30, y: 30 },
    ];
    FRAMES_PER_SECOND = 5;
    SNAKE.moveAmount = 30;
}

function gamePlay() {
    const APPLE_IMAGE = new Image();
    APPLE_IMAGE.src = "images/apple.png";
    const HEAD_IMAGE = new Image();
    HEAD_IMAGE.src = "images/olaf2.png";

    setInterval(function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // moveSnakeTail();
        moveSnakeBody();
        moveSnakeHead();

        ctx.drawImage(APPLE_IMAGE, APPLE.x, APPLE.y);
        ctx.drawImage(HEAD_IMAGE, SNAKE.body[0].x, SNAKE.body[0].y);

        checkAppleCollision();
        checkLosingCollision();
        //
    }, 1000 / FRAMES_PER_SECOND);
}

function addSnakeBodyPart() {
    let newBodyX = APPLE.x;
    let newBodyY = APPLE.y;
    let snakeBodyTime = (1000 / FRAMES_PER_SECOND) * (GRID_SIZE / SNAKE.moveAmount);
    setTimeout(() => {
        SNAKE.body.push({ x: newBodyX, y: newBodyY });
    }, snakeBodyTime * SNAKE.body.length);
}

function moveSnakeHead() {
    SNAKE.body[0].x % 30 === 0 && SNAKE.body[0].y % 30 === 0 ? (SNAKE.direction = SNAKE.newDirection) : null;

    switch (SNAKE.direction) {
        case "RIGHT":
            SNAKE.body[0].x += SNAKE.moveAmount;
            break;
        case "LEFT":
            SNAKE.body[0].x -= SNAKE.moveAmount;
            break;
        case "DOWN":
            SNAKE.body[0].y += SNAKE.moveAmount;
            break;
        case "UP":
            SNAKE.body[0].y -= SNAKE.moveAmount;
            break;
        default:
            break;
    }
}

function moveSnakeBody() {
    for (let i = SNAKE.body.length - 1; i > 0; i--) {
        const child = SNAKE.body[i];
        const parent = SNAKE.body[i - 1];

        if (child.y > parent.y) {
            child.y -= SNAKE.moveAmount;
            child.x = parent.x;
        }
        if (child.y < parent.y) {
            child.y += SNAKE.moveAmount;
            child.x = parent.x;
        }
        if (child.x > parent.x) {
            child.x -= SNAKE.moveAmount;
            child.y = parent.y;
        }
        if (child.x < parent.x) {
            child.x += SNAKE.moveAmount;
            child.y = parent.y;
        }
        const BODY_IMAGE = new Image();
        BODY_IMAGE.src = "images/snowball.png";
        ctx.drawImage(BODY_IMAGE, child.x, child.y);
    }
}
