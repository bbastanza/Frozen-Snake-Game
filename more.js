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
        checkLosingCollision();
    }, 1000 / FRAMES_PER_SECOND);
}

function moveSnakeHead() {
    snake.body[0].x % 30 === 0 && snake.body[0].y % 30 === 0 ? (snake.direction = snake.newDirection) : null;

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
            const PARENT = snake.body[i - 1];
            snake.body[i] = Object.assign({}, PARENT);
        }
    }

    for (let i = 1; i < snake.body.length; i++) {
        const bodyPart = snake.body[i];
        const bodyImage = new Image();
        bodyImage.src = "images/snowball.png";
        ctx.drawImage(bodyImage, bodyPart.x, bodyPart.y);
    }
}

function checkLosingCollision() {
    for (let i = 1; i < snake.body.length; i++) {
        const bodyPart = snake.body[i];
        if (snake.body[0].x === bodyPart.x && snake.body[0].y === bodyPart.y) {
            gameOver();
        }
    }
    if (
        snake.body[0].x > canvas.width - 30 ||
        snake.body[0].x < 0 ||
        snake.body[0].y > canvas.height - 30 ||
        snake.body[0].y < 0
    ) {
        gameOver();
    }
}

function gameOver() {
    crashSound.play();
    updateLeaderBoard(scoring.score);

    scoring.score = 0;
    snake.body = [
        { x: 90, y: 30 },
        { x: 60, y: 30 },
        { x: 30, y: 30 },
        { x: 0, y: 30 },
    ];

    snake.direction = "RIGHT";
    snake.newDirection = "RIGHT";
    snake.moveAmount = 3.75;

    scoreDisplay.textContent = `Score: ${scoring.score}`;
    newHighScore = false;

    randomApplePosition();
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

    localStorage.setItem("high-score", JSON.stringify(scoring.highScore));
    localStorage.setItem("second-place", JSON.stringify(secondPlace));
    localStorage.setItem("third-place", JSON.stringify(thirdPlace));

    newHighScore
        ? alert(`New High Score!\n1st --> ${highScore}\n2nd --> ${secondPlace}\n 3rd --> ${thirdPlace}`)
        : alert(`Game Over!\n1st --> ${highScore}\n2nd --> ${secondPlace}\n 3rd --> ${thirdPlace}`);
}
