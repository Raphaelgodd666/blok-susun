const game = document.getElementById("game");
const scoreText = document.getElementById("score");

let blockWidth = 300;
let blockHeight = 30;
let positionY = 400 - blockHeight;
let speed = 2;
let direction = 1;
let currentBlock = null;
let stack = [];
let score = 0;

function createBlock() {
  const block = document.createElement("div");
  block.classList.add("block");
  block.style.width = blockWidth + "px";
  block.style.top = positionY + "px";
  block.style.left = "0px";
  game.appendChild(block);
  currentBlock = block;
}

function moveBlock() {
  if (!currentBlock) return;

  let left = parseFloat(currentBlock.style.left);
  if (left + blockWidth >= 300 || left <= 0) direction *= -1;

  currentBlock.style.left = left + speed * direction + "px";
  requestAnimationFrame(moveBlock);
}

function stopBlock() {
  const lastBlock = stack[stack.length - 1];
  const currentLeft = parseFloat(currentBlock.style.left);
  const lastLeft = lastBlock ? parseFloat(lastBlock.style.left) : 0;
  const overlap = Math.min(currentLeft + blockWidth, lastLeft + blockWidth) - Math.max(currentLeft, lastLeft);

  if (overlap <= 0) {
    alert("Game Over! Skor akhir: " + score);
    location.reload();
    return;
  }

  blockWidth = overlap;
  currentBlock.style.width = blockWidth + "px";
  currentBlock.style.left = Math.max(currentLeft, lastLeft) + "px";

  stack.push(currentBlock);
  score++;
  scoreText.textContent = "Skor: " + score;

  positionY -= blockHeight;
  if (positionY < 0) {
    alert("Menang! Kamu susun semua blok! Skor: " + score);
    location.reload();
    return;
  }

  createBlock();
  moveBlock();
}

document.body.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    stopBlock();
  }
});

createBlock();
moveBlock();