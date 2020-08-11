window.onload = function () {
    let apple = new Image();
    apple.src = "images/apple.png";

    let canvas = document.getElementById("game-canvas");
    let ctx = canvas.getContext("2d");
    appleX = Math.floor(34 * Math.random()) * 15 + 20;
    appleY = Math.floor(24 * Math.random()) * 20 + 20;

    ctx.drawImage(apple, appleX, appleY);
};
let canvas = document.getElementById("game-canvas");
let ctx = canvas.getContext("2d");
appleX = Math.floor(23 * Math.random()) * 30 + 30;
appleY = Math.floor(14 * Math.random()) * 30 + 30;
olafX = 30;
olafY = 30;
snowballX = Math.floor(23 * Math.random()) * 30 + 30;
snowballY = Math.floor(14 * Math.random()) * 30 + 30;
let moveX = 1;
let snowball = new Image();
snowball.src = "images/snowball.png";
let apple = new Image();
apple.src = "images/apple.png";

setInterval(function () {
    let olaf = new Image();
    olaf.src = "images/olaf2.png";
    let olafX = updateX(olafX, moveX);
    olaf.onload = function () {
        ctx.drawImage(olaf, olafX, 0, canvas.width, canvas.height);
    };
}, 100);

function updateX(x, dx) {
    x += dx;
    return x;
}
