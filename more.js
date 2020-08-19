function gamePlay() {
    const APPLE_IMAGE = new Image();
    APPLE_IMAGE.src = "images/apple.png";
    const HEAD_IMAGE = new Image();
    HEAD_IMAGE.src = "images/olaf2.png";

    setInterval(function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        moveSnakeBody();

        moveSnakeHead();

        if (!randomizeApple) {
            ctx.drawImage(APPLE_IMAGE, APPLE.x, APPLE.y);
        }

        ctx.drawImage(HEAD_IMAGE, SNAKE.body[0].x, SNAKE.body[0].y);

        checkAppleCollision();
        checkLosingCollision();
    }, 1000 / FRAMES_PER_SECOND);
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
    if (SNAKE.body.length <= 1) return;

    const HEAD = SNAKE.body[0];
    const HEAD_CHILD = SNAKE.body[1];

    if (
        HEAD.x - HEAD_CHILD.x === 30 ||
        HEAD.x - HEAD_CHILD.x === -30 ||
        HEAD.y - HEAD_CHILD.y === 30 ||
        HEAD.y - HEAD_CHILD.y === -30
    ) {
        for (let i = SNAKE.body.length - 1; i > 0; i--) {
            const parent = SNAKE.body[i - 1];

            SNAKE.body[i] = Object.assign({}, parent);

            // SNAKE.body[i] = JSON.parse(JSON.stringify(parent));
        }
    }

    for (let i = 1; i < SNAKE.body.length; i++) {
        const bodyPart = SNAKE.body[i];
        const BODY_IMAGE = new Image();
        BODY_IMAGE.src = "images/snowball.png";
        ctx.drawImage(BODY_IMAGE, bodyPart.x, bodyPart.y);
    }
}

function checkLosingCollision() {
    for (let i = 1; i < SNAKE.body.length; i++) {
        const BODY_PART = SNAKE.body[i];
        if (SNAKE.body[0].x === BODY_PART.x && SNAKE.body[0].y === BODY_PART.y) {
            gameOver();
        }
    }
    if (
        SNAKE.body[0].x > canvas.width - 30 ||
        SNAKE.body[0].x < 0 ||
        SNAKE.body[0].y > canvas.height - 30 ||
        SNAKE.body[0].y < 0
    ) {
        gameOver();
    }
}

function gameOver() {
    crashSound.play();
    updateLeaderBoard(SCORING.score);

    SCORING.score = 0;
    SNAKE.body = [
        { x: 90, y: 30 },
        { x: 60, y: 30 },
        { x: 30, y: 30 },
        { x: 0, y: 30 },
    ];

    SNAKE.direction = "RIGHT";
    SNAKE.newDirection = "RIGHT";
    SNAKE.moveAmount = 3.75;

    SCORE_DISPLAY.textContent = `Score: ${SCORING.score}`;
    newHighScore = false;

    randomApple();
}

function updateLeaderBoard(score) {
    let highScore = JSON.parse(window.localStorage.getItem("high-score")) || 0;
    let secondPlace = JSON.parse(localStorage.getItem("second-place")) || 0;
    let thirdPlace = JSON.parse(localStorage.getItem("third-place")) || 0;
    if (score > highScore) {
        thirdPlace = secondPlace;
        secondPlace = highScore;
        highScore = score;
    } else if (score > secondPlace || score === highScore) {
        thirdPlace = secondPlace;
        secondPlace = score;
    } else if (score > thirdPlace || score === secondPlace) {
        thirdPlace = score;
    }
    localStorage.setItem("high-score", JSON.stringify(SCORING.highScore));
    localStorage.setItem("second-place", JSON.stringify(secondPlace));
    localStorage.setItem("third-place", JSON.stringify(thirdPlace));
    newHighScore
        ? alert(`New High Score!\nGold <--> ${highScore}\nSilver <--> ${secondPlace}\n Bronze <--> ${thirdPlace}`)
        : alert(`Game Over!\nGold <--> ${highScore}\nSilver <--> ${secondPlace}\n Bronze <--> ${thirdPlace}`);
}
