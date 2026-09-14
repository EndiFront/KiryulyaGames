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

let cardsData = [];
let previousOrder = [];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let isBoardLocked = false;

const grid = document.getElementById("grid");
const movesEl = document.getElementById("moves");
const matchesEl = document.getElementById("matches");
const overlay = document.getElementById("overlay");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-desc");
const startBtn = document.getElementById("start-btn");

let audioCtx = null;

function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
}

function playSound(type) {
  if (!audioCtx) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  const now = audioCtx.currentTime;

  if (type === "flip") {
    osc.type = "sine";
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.exponentialRampToValueAtTime(500, now + 0.1);
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.linearRampToValueAtTime(0, now + 0.1);
    osc.start(now);
    osc.stop(now + 0.1);
  } else if (type === "match") {
    osc.type = "triangle";
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.2);
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.linearRampToValueAtTime(0, now + 0.2);
    osc.start(now);
    osc.stop(now + 0.2);
  } else if (type === "unflip") {
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(140, now + 0.15);
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.linearRampToValueAtTime(0, now + 0.15);
    osc.start(now);
    osc.stop(now + 0.15);
  }
}

function fisherYatesShuffle(array) {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function isSameOrder(arr1, arr2) {
  if (arr1.length !== arr2.length || arr1.length === 0) return false;
  return arr1.every((item, index) => item === arr2[index]);
}

function getUniqueShuffledCards() {
  const baseCards = [...images, ...images];
  let newOrder = fisherYatesShuffle(baseCards);

  while (isSameOrder(newOrder, previousOrder)) {
    newOrder = fisherYatesShuffle(baseCards);
  }

  previousOrder = [...newOrder];
  return newOrder;
}

function createBoard() {
  grid.innerHTML = "";
  cardsData = getUniqueShuffledCards();

  cardsData.forEach((imgSrc, index) => {
    const card = document.createElement("div");
    card.classList.add("card-item");
    card.dataset.image = imgSrc;
    card.dataset.index = index;

    card.innerHTML = `
      <div class="card-front"></div>
      <div class="card-back">
        <img src="${imgSrc}" alt="Карточка">
      </div>
    `;

    card.addEventListener("click", () => handleCardClick(card));
    grid.appendChild(card);
  });
}

function handleCardClick(card) {
  if (
    isBoardLocked ||
    card.classList.contains("flipped") ||
    card.classList.contains("matched")
  ) {
    return;
  }

  card.classList.add("flipped");
  playSound("flip");
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    moves++;
    movesEl.textContent = moves;
    checkMatch();
  }
}

function spawnPlusOne(card) {
  const popup = document.createElement("div");
  popup.classList.add("score-popup");
  popup.textContent = "+1";
  card.appendChild(popup);

  setTimeout(() => popup.remove(), 800);
}

function checkMatch() {
  isBoardLocked = true;
  const [card1, card2] = flippedCards;

  if (card1.dataset.image === card2.dataset.image) {
    playSound("match");

    setTimeout(() => {
      spawnPlusOne(card1);
      spawnPlusOne(card2);

      card1.classList.add("matched");
      card2.classList.add("matched");

      matchedPairs++;
      matchesEl.textContent = `${matchedPairs} / 10`;
      flippedCards = [];
      isBoardLocked = false;

      if (matchedPairs === 10) {
        setTimeout(endGame, 600);
      }
    }, 300);
  } else {
    setTimeout(() => {
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      playSound("unflip");
      flippedCards = [];
      isBoardLocked = false;
    }, 800);
  }
}

function startGame() {
  initAudio();
  moves = 0;
  matchedPairs = 0;
  flippedCards = [];
  isBoardLocked = false;

  movesEl.textContent = moves;
  matchesEl.textContent = `0 / 10`;
  overlay.classList.add("hidden");

  createBoard();
}

function endGame() {
  modalTitle.textContent = "Победа!";
  modalDesc.textContent = `Вы нашли все пары за ${moves} ходов!`;
  startBtn.textContent = "Сыграть ещё раз";
  overlay.classList.remove("hidden");
}

startBtn.addEventListener("click", startGame);