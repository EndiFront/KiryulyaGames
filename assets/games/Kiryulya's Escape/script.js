const mazeElement = document.getElementById("maze");
const levelElement = document.getElementById("level-val");
const scoreElement = document.getElementById("score-val"); // Может отсутствовать в HTML

const winModal = document.getElementById("win-modal");
const modalMsg = document.getElementById("modal-msg");
const modalNextBtn = document.getElementById("modal-next-btn");

let currentLevel = parseInt(localStorage.getItem("prison_maze_level")) || 1;
let totalScore = parseInt(localStorage.getItem("prison_maze_score")) || 0;

let cols = 6;
let rows = 6;
let grid = [];
let playerPos = { x: 0, y: 0 };
let exitPos = { x: 0, y: 0 };
let isLevelCompleted = false;
let playerTokenElement = null;

class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.walls = { top: true, right: true, bottom: true, left: true };
    this.visited = false;
  }
}

function generateThinMaze(c, r) {
  let cells = [];
  for (let y = 0; y < r; y++) {
    let row = [];
    for (let x = 0; x < c; x++) {
      row.push(new Cell(x, y));
    }
    cells.push(row);
  }

  let stack = [];
  let current = cells[0][0];
  current.visited = true;

  function getUnvisitedNeighbors(cell) {
    let neighbors = [];
    let { x, y } = cell;

    if (y > 0 && !cells[y - 1][x].visited)
      neighbors.push({ cell: cells[y - 1][x], dir: "top" });
    if (x < c - 1 && !cells[y][x + 1].visited)
      neighbors.push({ cell: cells[y][x + 1], dir: "right" });
    if (y < r - 1 && !cells[y + 1][x].visited)
      neighbors.push({ cell: cells[y + 1][x], dir: "bottom" });
    if (x > 0 && !cells[y][x - 1].visited)
      neighbors.push({ cell: cells[y][x - 1], dir: "left" });

    return neighbors;
  }

  function removeWalls(a, b, dir) {
    if (dir === "top") {
      a.walls.top = false;
      b.walls.bottom = false;
    }
    if (dir === "right") {
      a.walls.right = false;
      b.walls.left = false;
    }
    if (dir === "bottom") {
      a.walls.bottom = false;
      b.walls.top = false;
    }
    if (dir === "left") {
      a.walls.left = false;
      b.walls.right = false;
    }
  }

  do {
    let neighbors = getUnvisitedNeighbors(current);
    if (neighbors.length > 0) {
      let nextObj = neighbors[Math.floor(Math.random() * neighbors.length)];
      let next = nextObj.cell;
      removeWalls(current, next, nextObj.dir);
      stack.push(current);
      current = next;
      current.visited = true;
    } else if (stack.length > 0) {
      current = stack.pop();
    }
  } while (stack.length > 0);

  playerPos = { x: 0, y: 0 };
  exitPos = { x: c - 1, y: r - 1 };

  if (r > 1) {
    cells[r - 1][c - 1].walls.top = false;
    cells[r - 2][c - 1].walls.bottom = false;
  }
  if (c > 1) {
    cells[r - 1][c - 1].walls.left = false;
    cells[r - 1][c - 2].walls.right = false;
  }

  return cells;
}

function initLevel() {
  isLevelCompleted = false;
  winModal.classList.add("hidden");

  cols = 5 + Math.floor(currentLevel * 0.8);
  rows = 5 + Math.floor(currentLevel * 0.8);

  if (cols > 20) cols = 20;
  if (rows > 20) rows = 20;

  grid = generateThinMaze(cols, rows);
  drawMaze();
  updateUI();
}

function drawMaze() {
  mazeElement.innerHTML = "";
  mazeElement.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
  mazeElement.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const cellData = grid[y][x];
      const cell = document.createElement("div");
      cell.classList.add("cell");

      if (cellData.walls.top) cell.classList.add("wall-top");
      if (cellData.walls.right) cell.classList.add("wall-right");
      if (cellData.walls.bottom) cell.classList.add("wall-bottom");
      if (cellData.walls.left) cell.classList.add("wall-left");

      if (x === 0 && y === 0) cell.classList.add("start-cell");
      if (x === exitPos.x && y === exitPos.y) cell.classList.add("exit-cell");

      mazeElement.appendChild(cell);
    }
  }

  playerTokenElement = document.createElement("div");
  playerTokenElement.classList.add("player-token");

  const playerAvatar = document.createElement("img");
  playerAvatar.src = "player.png";
  playerAvatar.alt = "Player";
  playerTokenElement.appendChild(playerAvatar);

  const tokenSize = 0.75;
  playerTokenElement.style.width = `${(100 / cols) * tokenSize}%`;
  playerTokenElement.style.height = `${(100 / rows) * tokenSize}%`;

  mazeElement.appendChild(playerTokenElement);
  updatePlayerPosition();
}

function updatePlayerPosition() {
  if (!playerTokenElement) return;

  const mazeWidth = mazeElement.clientWidth;
  const mazeHeight = mazeElement.clientHeight;

  const cellWidth = mazeWidth / cols;
  const cellHeight = mazeHeight / rows;

  const tokenSizeRatio = 0.65;
  const tokenWidth = cellWidth * tokenSizeRatio;
  const tokenHeight = cellHeight * tokenSizeRatio;

  const posX = playerPos.x * cellWidth + (cellWidth - tokenWidth) / 2;
  const posY = playerPos.y * cellHeight + (cellHeight - tokenHeight) / 2;

  playerTokenElement.style.transform = `translate(${posX}px, ${posY}px)`;
}

function movePlayer(dx, dy) {
  if (isLevelCompleted) return;

  const currentCell = grid[playerPos.y][playerPos.x];

  if (dy === -1 && currentCell.walls.top) return;
  if (dx === 1 && currentCell.walls.right) return;
  if (dy === 1 && currentCell.walls.bottom) return;
  if (dx === -1 && currentCell.walls.left) return;

  const newX = playerPos.x + dx;
  const newY = playerPos.y + dy;

  if (newX >= 0 && newX < cols && newY >= 0 && newY < rows) {
    playerPos.x = newX;
    playerPos.y = newY;

    updatePlayerPosition();

    if (playerPos.x === exitPos.x && playerPos.y === exitPos.y) {
      isLevelCompleted = true;
      totalScore += currentLevel * 100;
      currentLevel++;

      localStorage.setItem("prison_maze_level", currentLevel);
      localStorage.setItem("prison_maze_score", totalScore);

      updateUI();
      setTimeout(showWinModal, 150);
    }
  }
}

function showWinModal() {
  modalMsg.textContent = `Уровень ${currentLevel - 1} пройден!`;
  winModal.classList.remove("hidden");
}

function updateUI() {
  if (levelElement) levelElement.textContent = currentLevel;
  if (scoreElement) scoreElement.textContent = totalScore;
}

modalNextBtn.addEventListener("click", () => {
  initLevel();
  window.focus();
});

document
  .getElementById("btn-up")
  .addEventListener("click", () => movePlayer(0, -1));
document
  .getElementById("btn-down")
  .addEventListener("click", () => movePlayer(0, 1));
document
  .getElementById("btn-left")
  .addEventListener("click", () => movePlayer(-1, 0));
document
  .getElementById("btn-right")
  .addEventListener("click", () => movePlayer(1, 0));

document.addEventListener("keydown", (e) => {
  const key = e.key.toLowerCase();
  if (key === "arrowup" || key === "w" || key === "ц") movePlayer(0, -1);
  if (key === "arrowdown" || key === "s" || key === "ы") movePlayer(0, 1);
  if (key === "arrowleft" || key === "a" || key === "ф") movePlayer(-1, 0);
  if (key === "arrowright" || key === "d" || key === "в") movePlayer(1, 0);
});

window.addEventListener("resize", () => {
  if (playerTokenElement) updatePlayerPosition();
});

window.focus();

initLevel();