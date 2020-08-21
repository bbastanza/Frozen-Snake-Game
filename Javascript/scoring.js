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

    scoreAlert(highScore, secondPlace, thirdPlace);
}

function scoreAlert(highScore, secondPlace, thirdPlace) {
    newHighScore
        ? alert(`New High Score!\n1st --> ${highScore}\n2nd --> ${secondPlace}\n 3rd --> ${thirdPlace}`)
        : alert(`Game Over!\n1st --> ${highScore}\n2nd --> ${secondPlace}\n 3rd --> ${thirdPlace}`);

    alert("Press Spacebar to Play Again!");
}

function updateScoreDisplay() {
    scoring.score++;
    if (scoring.score > scoring.highScore) {
        scoring.highScore = scoring.score;
        highScoreDisplay.textContent = `High Score: ${scoring.highScore}`;
        newHighScore = true;
    }
    scoreDisplay.textContent = `Score: ${scoring.score}`;
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
