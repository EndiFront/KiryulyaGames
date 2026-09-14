let score = 0;
let highScore = 0;
let timeLeft = 30;
let timerInterval = null;
let moleTimeout = null;
let activeHoleIndex = -1;
let isPlaying = false;

const overlay = document.getElementById("overlay");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-desc");
const startBtn = document.getElementById("start-btn");
const timerEl = document.getElementById("timer");
const scoreEl = document.getElementById("score");
const highScoreEl = document.getElementById("high-score");
const holeWrappers = document.querySelectorAll(".hole-wrapper");

// Web Audio API генератор звуков
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

  if (type === "spawn") {
    // Мягкий звук вылезания
    osc.type = "sine";
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.exponentialRampToValueAtTime(320, now + 0.15);
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.linearRampToValueAtTime(0, now + 0.15);
    osc.start(now);
    osc.stop(now + 0.15);
  } else if (type === "hit") {
    // Звонкий удачный удар
    osc.type = "triangle";
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.1);
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.linearRampToValueAtTime(0, now + 0.12);
    osc.start(now);
    osc.stop(now + 0.12);
  } else if (type === "miss") {
    // Низкий звук промаха
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(160, now);
    osc.frequency.exponentialRampToValueAtTime(70, now + 0.2);
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.linearRampToValueAtTime(0, now + 0.2);
    osc.start(now);
    osc.stop(now + 0.2);
  }
}

function getRandomHoleIndex() {
  let index;
  do {
    index = Math.floor(Math.random() * holeWrappers.length);
  } while (index === activeHoleIndex);
  return index;
}

function spawnMole() {
  holeWrappers.forEach((h) => h.classList.remove("active"));

  if (!isPlaying) return;

  activeHoleIndex = getRandomHoleIndex();
  holeWrappers[activeHoleIndex].classList.add("active");
  playSound("spawn");

  const speed = Math.floor(Math.random() * 300) + 650;
  moleTimeout = setTimeout(spawnMole, speed);
}

function startGame() {
  initAudio();
  score = 0;
  timeLeft = 30;
  isPlaying = true;

  scoreEl.textContent = score;
  timerEl.textContent = timeLeft;
  overlay.classList.add("hidden");

  timerInterval = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;

    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);

  spawnMole();
}

function endGame() {
  isPlaying = false;
  clearInterval(timerInterval);
  clearTimeout(moleTimeout);
  holeWrappers.forEach((h) => h.classList.remove("active"));

  if (score > highScore) {
    highScore = score;
    highScoreEl.textContent = highScore;
  }

  modalTitle.textContent = "Время вышло!";
  modalDesc.textContent = `Ваш результат: ${score} очков.`;
  startBtn.textContent = "Начать заново";
  overlay.classList.remove("hidden");
}

// Слушатели кликов для попадания и промаха
holeWrappers.forEach((wrapper) => {
  wrapper.addEventListener("click", () => {
    if (!isPlaying) return;

    if (wrapper.classList.contains("active")) {
      score++;
      scoreEl.textContent = score;
      wrapper.classList.remove("active");
      playSound("hit");
    } else {
      playSound("miss");
    }
  });
});

startBtn.addEventListener("click", startGame);