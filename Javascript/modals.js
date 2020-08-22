function showModal() {
    gameGoing = false;
    modal.style.display = "block";
}

function hideModal() {
    gameGoing = true;
    modalFirstPlace.textContent = "";
    modalSecondPlace.textContent = "";
    modalThirdPlace.textContent = "";
    modal.style.display = "none";
}
