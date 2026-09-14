async function lockLandscape() {
  try {
    if (screen.orientation && screen.orientation.lock) {
      await screen.orientation.lock("landscape");
    }
  } catch (e) {}
}
window.addEventListener("load", lockLandscape);
document.addEventListener("click", lockLandscape, { once: true });

let currentAttempt = 0;
let goalsCount = 0;
let isLocked = false;

const maxAttempts = 5;

const keeper = document.getElementById("keeper");
const ball = document.getElementById("ball");
const resultMsg = document.getElementById("result-msg");
const overlay = document.getElementById("overlay");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-desc");
const startBtn = document.getElementById("start-btn");

const btnLeft = document.getElementById("btn-left");
const btnRight = document.getElementById("btn-right");
const dots = document.querySelectorAll(".dot");

function resetPositions() {
  keeper.className = "keeper";
  ball.className = "ball";
  resultMsg.className = "result-msg";
  isLocked = false;
}

function updateDots(isGoal) {
  if (currentAttempt < maxAttempts) {
    const currentDot = dots[currentAttempt];
    if (isGoal) {
      currentDot.classList.add("goal");
    } else {
      currentDot.classList.add("miss");
    }
  }
}

function getRandomDirection() {
  const array = new Uint8Array(1);
  window.crypto.getRandomValues(array);
  return array[0] % 2 === 0 ? "left" : "right";
}

function shoot(playerChoice) {
  if (isLocked || currentAttempt >= maxAttempts) return;
  isLocked = true;

  // Чистый рандом для направления прыжка вратаря
  const keeperChoice = getRandomDirection();

  ball.classList.add(`shoot-${playerChoice}`);
  keeper.classList.add(`jump-${keeperChoice}`);

  setTimeout(() => {
    const isGoal = playerChoice !== keeperChoice;

    if (isGoal) {
      goalsCount++;
      resultMsg.textContent = "ГОЛ!";
      resultMsg.className = "result-msg show goal-text";
    } else {
      resultMsg.textContent = "СЕЙВ!";
      resultMsg.className = "result-msg show save-text";
    }

    updateDots(isGoal);
    currentAttempt++;

    setTimeout(() => {
      if (currentAttempt >= maxAttempts) {
        showEndGameModal();
      } else {
        resetPositions();
      }
    }, 1000);
  }, 450);
}

function showEndGameModal() {
  if (goalsCount >= 3) {
    modalTitle.textContent = "Вы молодец!";
    modalDesc.textContent = `Забито голов: ${goalsCount} из ${maxAttempts}`;
  } else {
    modalTitle.textContent = "Старайтесь лучше";
    modalDesc.textContent = `Забито голов: ${goalsCount} из ${maxAttempts}`;
  }

  startBtn.textContent = "Играть заново";
  overlay.classList.remove("hidden");
}

function startGame() {
  currentAttempt = 0;
  goalsCount = 0;

  dots.forEach((dot) => {
    dot.className = "dot";
  });

  overlay.classList.add("hidden");
  resetPositions();
}

btnLeft.addEventListener("click", () => shoot("left"));
btnRight.addEventListener("click", () => shoot("right"));
startBtn.addEventListener("click", startGame);

window.focus();