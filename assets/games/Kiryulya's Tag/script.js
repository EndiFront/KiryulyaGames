const GRID_SIZE = 4;
let boardState = [];
let emptyPos = { row: 3, col: 3 };
let moves = 0;

// Список картинок для пятнашек
const images = [
  "img/img1.png",
  "img/img2.png",
  "img/img3.png",
  "img/img4.png",
  "img/img5.png",
  "img/img6.png",
  "img/img7.png",
  "img/img8.png",
  "img/img9.png",
  "img/img10.png"
];

let currentImage = "";
let previousImage = "";

const boardEl = document.getElementById("board");
const movesEl = document.getElementById("moves");
const overlay = document.getElementById("overlay");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-desc");
const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");

let audioCtx = null;

function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
}

function playSlideSound() {
  if (!audioCtx) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  const now = audioCtx.currentTime;

  osc.type = "sine";
  osc.frequency.setValueAtTime(200, now);
  osc.frequency.exponentialRampToValueAtTime(400, now + 0.08);
  gain.gain.setValueAtTime(0.1, now);
  gain.gain.linearRampToValueAtTime(0, now + 0.08);

  osc.start(now);
  osc.stop(now + 0.08);
}

// Выбор случайной картинки, отличной от предыдущего раунда
function selectRandomImage() {
  let availableImages = images.filter((img) => img !== previousImage);
  if (availableImages.length === 0) availableImages = images;

  const randomIndex = Math.floor(Math.random() * availableImages.length);
  currentImage = availableImages[randomIndex];
  previousImage = currentImage;
}

function initBoardState() {
  boardState = [];
  let val = 1;
  for (let r = 0; r < GRID_SIZE; r++) {
    const row = [];
    for (let c = 0; c < GRID_SIZE; c++) {
      if (r === GRID_SIZE - 1 && c === GRID_SIZE - 1) {
        row.push(0);
      } else {
        row.push(val++);
      }
    }
    boardState.push(row);
  }
  emptyPos = { row: 3, col: 3 };
}

function setTilePosition(tileEl, row, col) {
  const gap = 6;
  const padding = 8;
  const sizeCalc = `((100% - 16px) / 4 - 6px)`;

  tileEl.style.top = `calc(${padding}px + ${row} * (${sizeCalc} + ${gap}px))`;
  tileEl.style.left = `calc(${padding}px + ${col} * (${sizeCalc} + ${gap}px))`;
}

// Расчет корректного смещения фона для конкретного значения плитки
function setTileBackground(tileEl, val) {
  const correctRow = Math.floor((val - 1) / GRID_SIZE);
  const correctCol = (val - 1) % GRID_SIZE;

  const xPercent = (correctCol / (GRID_SIZE - 1)) * 100;
  const yPercent = (correctRow / (GRID_SIZE - 1)) * 100;

  tileEl.style.backgroundImage = `url('${currentImage}')`;
  tileEl.style.backgroundSize = "400% 400%";
  tileEl.style.backgroundPosition = `${xPercent}% ${yPercent}%`;
}

function renderBoard() {
  boardEl.innerHTML = "";

  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      const val = boardState[r][c];
      if (val !== 0) {
        const tile = document.createElement("div");
        tile.classList.add("tile");
        tile.textContent = val;
        tile.dataset.val = val;
        tile.dataset.row = r;
        tile.dataset.col = c;

        setTileBackground(tile, val);
        setTilePosition(tile, r, c);
        makeTileDraggable(tile);

        boardEl.appendChild(tile);
      }
    }
  }
}

function makeTileDraggable(tile) {
  let startX = 0;
  let startY = 0;
  let isDragging = false;
  let allowedDirection = null;
  let maxDragDistance = 0;
  let chainTiles = [];

  const onPointerDown = (e) => {
    const r = parseInt(tile.dataset.row, 10);
    const c = parseInt(tile.dataset.col, 10);

    // Плитка должна быть в одном ряду или одном столбце с пустой ячейкой
    const isSameRow = r === emptyPos.row;
    const isSameCol = c === emptyPos.col;

    if (!isSameRow && !isSameCol) return;

    chainTiles = [];

    // Собираем все плитки между кликнутой и пустой ячейкой
    if (isSameRow) {
      const colStep = c < emptyPos.col ? 1 : -1;
      for (let currCol = c; currCol !== emptyPos.col; currCol += colStep) {
        const el = document.querySelector(`.tile[data-row='${r}'][data-col='${currCol}']`);
        if (el) {
          chainTiles.push({
            el: el,
            initialLeft: el.offsetLeft,
            initialTop: el.offsetTop,
            row: r,
            col: currCol
          });
        }
      }
      allowedDirection = c < emptyPos.col ? "right" : "left";
    } else if (isSameCol) {
      const rowStep = r < emptyPos.row ? 1 : -1;
      for (let currRow = r; currRow !== emptyPos.row; currRow += rowStep) {
        const el = document.querySelector(`.tile[data-row='${currRow}'][data-col='${c}']`);
        if (el) {
          chainTiles.push({
            el: el,
            initialLeft: el.offsetLeft,
            initialTop: el.offsetTop,
            row: currRow,
            col: c
          });
        }
      }
      allowedDirection = r < emptyPos.row ? "down" : "up";
    }

    if (chainTiles.length === 0) return;

    isDragging = true;
    chainTiles.forEach((item) => item.el.classList.add("dragging"));

    startX = e.clientX || e.touches[0].clientX;
    startY = e.clientY || e.touches[0].clientY;
    maxDragDistance = tile.offsetWidth + 6;

    document.addEventListener("pointermove", onPointerMove);
    document.addEventListener("pointerup", onPointerUp);
  };

  const onPointerMove = (e) => {
    if (!isDragging) return;

    const currentX = e.clientX || e.touches[0].clientX;
    const currentY = e.clientY || e.touches[0].clientY;

    let deltaX = currentX - startX;
    let deltaY = currentY - startY;

    if (allowedDirection === "right") {
      deltaX = Math.max(0, Math.min(deltaX, maxDragDistance));
      deltaY = 0;
    } else if (allowedDirection === "left") {
      deltaX = Math.min(0, Math.max(deltaX, -maxDragDistance));
      deltaY = 0;
    } else if (allowedDirection === "down") {
      deltaY = Math.max(0, Math.min(deltaY, maxDragDistance));
      deltaX = 0;
    } else if (allowedDirection === "up") {
      deltaY = Math.min(0, Math.max(deltaY, -maxDragDistance));
      deltaX = 0;
    }

    chainTiles.forEach((item) => {
      item.el.style.left = `${item.initialLeft + deltaX}px`;
      item.el.style.top = `${item.initialTop + deltaY}px`;
    });
  };

  const onPointerUp = () => {
    if (!isDragging) return;
    isDragging = false;
    chainTiles.forEach((item) => item.el.classList.remove("dragging"));

    document.removeEventListener("pointermove", onPointerMove);
    document.removeEventListener("pointerup", onPointerUp);

    const firstItem = chainTiles[0];
    const movedX = Math.abs(firstItem.el.offsetLeft - firstItem.initialLeft);
    const movedY = Math.abs(firstItem.el.offsetTop - firstItem.initialTop);

    const threshold = maxDragDistance * 0.3;

    if (movedX > threshold || movedY > threshold) {
      // Перемещаем плитку за плиткой в сторону пустой ячейки
      const targetRow = parseInt(tile.dataset.row, 10);
      const targetCol = parseInt(tile.dataset.col, 10);

      const countMoved = chainTiles.length;

      if (allowedDirection === "right" || allowedDirection === "left") {
        const step = allowedDirection === "right" ? 1 : -1;
        for (let c = emptyPos.col; c !== targetCol; c -= step) {
          boardState[emptyPos.row][c] = boardState[emptyPos.row][c - step];
        }
      } else {
        const step = allowedDirection === "down" ? 1 : -1;
        for (let r = emptyPos.row; r !== targetRow; r -= step) {
          boardState[r][emptyPos.col] = boardState[r - step][emptyPos.col];
        }
      }

      boardState[targetRow][targetCol] = 0;
      emptyPos = { row: targetRow, col: targetCol };

      moves += countMoved;
      movesEl.textContent = moves;
      playSlideSound();

      renderBoard();

      if (checkWin()) {
        setTimeout(endGame, 300);
      }
    } else {
      chainTiles.forEach((item) => {
        setTilePosition(item.el, item.row, item.col);
      });
    }
  };

  tile.addEventListener("pointerdown", onPointerDown);
}

function getValidMoves() {
  const movesArr = [];
  const { row, col } = emptyPos;

  if (row > 0) movesArr.push({ row: row - 1, col });
  if (row < GRID_SIZE - 1) movesArr.push({ row: row + 1, col });
  if (col > 0) movesArr.push({ row, col: col - 1 });
  if (col < GRID_SIZE - 1) movesArr.push({ row, col: col + 1 });

  return movesArr;
}

function shuffleBoard(stepsCount) {
  for (let i = 0; i < stepsCount; i++) {
    const validMoves = getValidMoves();
    const randomMove = validMoves[Math.floor(Math.random() * validMoves.length)];

    boardState[emptyPos.row][emptyPos.col] = boardState[randomMove.row][randomMove.col];
    boardState[randomMove.row][randomMove.col] = 0;
    emptyPos = { row: randomMove.row, col: randomMove.col };
  }
}

function checkWin() {
  let expected = 1;
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      if (r === GRID_SIZE - 1 && c === GRID_SIZE - 1) {
        return boardState[r][c] === 0;
      }
      if (boardState[r][c] !== expected++) return false;
    }
  }
  return true;
}

function startGame() {
  initAudio();
  moves = 0;
  movesEl.textContent = moves;
  overlay.classList.add("hidden");

  selectRandomImage();
  initBoardState();
  shuffleBoard(100);
  renderBoard();
}

function endGame() {
  modalTitle.textContent = "Победа!";
  modalDesc.textContent = `Картинка собрана за ${moves} ходов!`;
  startBtn.textContent = "Сыграть ещё раз";
  overlay.classList.remove("hidden");
}

startBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", startGame);