function updateLeaderBoard(score) {
    let highScore = JSON.parse(localStorage.getItem("high-score")) || 0;
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

    scoreAlert(highScore, secondPlace, thirdPlace, score);
}

function scoreAlert(highScore, secondPlace, thirdPlace, score) {
    modalFirstPlace.textContent = `1st  ${highScore}`;
    modalSecondPlace.textContent = `2nd ${secondPlace}`;
    modalThirdPlace.textContent = `3rd  ${thirdPlace}`;
    modalFooter.textContent = "Press Space Bar to Play Again!";
    newHighScore ? (modalHeader.textContent = "New High Score!") : (modalHeader.textContent = `Game Over! You got ${score} snowflakes!`);
    showModal();
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

    snake = new Snake();

    scoreDisplay.textContent = `Score: ${scoring.score}`;
    newHighScore = false;

    randomApplePosition();
}
