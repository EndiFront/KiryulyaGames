// --- ЗВУКОВОЙ ДВИЖОК (WEB AUDIO API) ---
const SoundEngine = {
  ctx: null,
  isMuted: false,

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  },

  playButtonClick() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(800, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(
      400,
      this.ctx.currentTime + 0.05,
    );

    gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.05);
  },

  playCurtain() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(120, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(
      450,
      this.ctx.currentTime + 0.25,
    );
    osc.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.5);

    gain.gain.setValueAtTime(0.01, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.2, this.ctx.currentTime + 0.25);
    gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.5);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.5);
  },

  playShoot() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(600, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(
      100,
      this.ctx.currentTime + 0.12,
    );

    gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.12);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.12);
  },

  playMagnetStart() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(200, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(550, this.ctx.currentTime + 0.2);

    gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.18, this.ctx.currentTime + 0.2);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.2);
  },

  playModalOpen() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.setValueAtTime(880, now + 0.08);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.linearRampToValueAtTime(0.01, now + 0.2);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.2);
  },

  playWin() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.5];
    const now = this.ctx.currentTime;

    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, now + idx * 0.09);

      gain.gain.setValueAtTime(0.2, now + idx * 0.09);
      gain.gain.linearRampToValueAtTime(0.01, now + idx * 0.09 + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + idx * 0.09);
      osc.stop(now + idx * 0.09 + 0.35);
    });
  },

  playGameOver() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.linearRampToValueAtTime(80, now + 0.6);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.linearRampToValueAtTime(0.01, now + 0.6);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.6);
  },
};

window.addEventListener(
  "pointerdown",
  () => {
    SoundEngine.init();
  },
  { once: true },
);

let currentLang = "ru";

const TRANSLATIONS = {
  ru: {
    continue: "ПРОДОЛЖИТЬ (УРОВЕНЬ {level})",
    start: "НАЧАТЬ ИГРУ",
    level: "Уровень {level}",
    goDoor: "Иди к двери! 🚪",
    max: "MAX",
  },
  en: {
    continue: "CONTINUE (LEVEL {level})",
    start: "START GAME",
    level: "Level {level}",
    goDoor: "Go to the door! 🚪",
    max: "MAX",
  },
  tr: {
    continue: "DEVAM ET (SEVİYE {level})",
    start: "OYUNA BAŞLA",
    level: "Seviye {level}",
    goDoor: "Kapıya git! 🚪",
    max: "MAKS",
  },
};

function t(key, params = {}) {
  const langPack = TRANSLATIONS[currentLang] || TRANSLATIONS.ru;
  let text = langPack[key] || TRANSLATIONS.ru[key] || key;
  for (const paramKey in params) {
    text = text.replace(`{${paramKey}}`, params[paramKey]);
  }
  return text;
}

// --- ИНИЦИАЛИЗА CANVAS И ЭКРАНА ---
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let width = 0;
let height = 0;

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

// --- ШАБЛОНЫ КАРТ И ЛОКАЦИЙ ---
const MAP_TEMPLATES = [
  {
    name: "Локация A",
    bgSrc: "assets/fon-one.png",
    playerSpawn: { x: 0.22, y: 0.17, w: 0.055, h: 0.14 },
    enemySpawn: { x: 0.775, y: 0.15, w: 0.063, h: 0.13, type: "door-v" },
  },
  {
    name: "Локация B",
    bgSrc: "assets/fon-two.png",
    playerSpawn: { x: 0.06, y: 0.3, w: 0.1, h: 0.4 },
    enemySpawn: { x: 0.775, y: 0.15, w: 0.065, h: 0.13, type: "door-v" },
  },
  {
    name: "Локация C",
    bgSrc: "assets/fon-three.png",
    playerSpawn: { x: 0.06, y: 0.3, w: 0.1, h: 0.4 },
    enemySpawn: { x: 0.62, y: 0.5, w: 0.2, h: 0.21, type: "hatch-h" },
  },
];

let currentTemplateIndex = 0;
let currentLevelNumber = 1;

// --- СОСТОЯНИЕ И СОХРАНЕНИЯ ---
let coins = 0;
let gameState = {
  coins: 0,
  currentLevel: 1,
  upgrades: { maxHp: 0, energy: 0, cooling: 0, radius: 0 },
};

// --- АССЕТЫ ---
const assets = {
  bg: new Image(),
  main: new Image(),
  cop: new Image(),
  voin: new Image(),
};

let loadedAssetsCount = 0;

function onAssetLoad() {
  loadedAssetsCount++;
}

assets.main.onload = onAssetLoad;
assets.cop.onload = onAssetLoad;
assets.voin.onload = onAssetLoad;

assets.main.onerror = onAssetLoad;
assets.cop.onerror = onAssetLoad;
assets.voin.onerror = onAssetLoad;

assets.main.src = "assets/main.png";
assets.cop.src = "assets/cop.png";
assets.voin.src = "assets/voin.png";

function loadLevelBg(templateIndex) {
  assets.bg = new Image();
  assets.bg.onload = onAssetLoad;
  assets.bg.onerror = onAssetLoad;
  assets.bg.src = MAP_TEMPLATES[templateIndex].bgSrc;
}

function initGame() {
  loadLevelBg(0);
  loadGameState();
  updateStartButtonUI();
}

function updateStartButtonUI() {
  const startBtn = document.getElementById("startGameBtn");
  if (startBtn) {
    if (currentLevelNumber > 1) {
      startBtn.innerText = t("continue", { level: currentLevelNumber });
    } else {
      startBtn.innerText = t("start");
    }
  }
}

const player = {
  x: 0,
  y: 0,
  radius: 20,
  speed: 240,
  maxHp: 100,
  hp: 100,
  facing: "right",
  angle: 0,
  isMoving: false,
  isMagnetActive: false,
  magnetRadius: 130,
  attractedItems: [],
  magnetEnergy: 3.0,
  maxMagnetEnergy: 3.0,
  magnetCooldown: 0.0,
  maxCooldown: 4.0,
  isOverheated: false,
  isGodMode: false,
};

let playerSpawnAnim = {
  active: true,
  startX: 0,
  targetX: 0,
  startY: 0,
  targetY: 0,
  progress: 0,
};

const enemyDoor = { progress: 0, state: "closed", speed: 2.2 };
let doorSpawnTimer = 0;
let spawnDelayTimer = 0;

const enemies = [];
const bullets = [];

let levelWaves = [1, 2];
let maxTotalEnemies = 3;
let currentWaveIndex = 0;
let spawnedInCurrentWave = 0;
let totalSpawnedEnemies = 0;

let isLevelCompleted = false;
let isExitingLevel = false;
let isGamePaused = true;
let lastTime = performance.now();

// --- УПРАВЛЕНИЕ И ВВОД ---
const keys = {};
const mousePos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
let isMouseDown = false;

let touchControl = {
  active: false,
  startX: 0,
  startY: 0,
  currentX: 0,
  currentY: 0,
  touchId: null,
};
let rightTouchId = null;

function clearInputState() {
  for (let k in keys) keys[k] = false;
  isMouseDown = false;
  if (player.isMagnetActive) {
    player.isMagnetActive = false;
    releaseMagnet();
  }
  touchControl.active = false;
  touchControl.touchId = null;
  rightTouchId = null;
}

window.addEventListener("keydown", (e) => {
  if (e.repeat) return;
  keys[e.code] = true;
  if (e.code === "Escape") togglePause(!isGamePaused);
});

window.addEventListener("keyup", (e) => {
  keys[e.code] = false;
});

window.addEventListener("blur", clearInputState);
document.addEventListener("visibilitychange", () => {
  const mainMenu = document.getElementById("mainMenuOverlay");
  const isMenuVisible = mainMenu && !mainMenu.classList.contains("hidden");
  if (document.hidden && !isMenuVisible) togglePause(true);
});

function tryActivateMagnet() {
  if (
    !player.isOverheated &&
    player.magnetEnergy > 0 &&
    !isExitingLevel &&
    !isGamePaused
  ) {
    if (!player.isMagnetActive) {
      SoundEngine.playMagnetStart();
    }
    player.isMagnetActive = true;
  }
}

window.addEventListener("mousedown", (e) => {
  if (e.button === 0) {
    isMouseDown = true;
    tryActivateMagnet();
  }
});

window.addEventListener("mouseup", (e) => {
  if (e.button === 0) {
    isMouseDown = false;
    if (player.isMagnetActive) {
      player.isMagnetActive = false;
      releaseMagnet();
    }
  }
});

window.addEventListener("mousemove", (e) => {
  mousePos.x = e.clientX;
  mousePos.y = e.clientY;
});

function releaseMagnet() {
  const count = player.attractedItems.length;
  if (count === 0) return;

  SoundEngine.playShoot();

  const baseAngle = player.angle;
  const spreadArc = Math.min(Math.PI / 3, count * 0.08);

  player.attractedItems.forEach((_, index) => {
    const offset = count > 1 ? (index / (count - 1) - 0.5) * spreadArc : 0;
    const finalAngle = baseAngle + offset;
    const speed = 960;

    bullets.push({
      x: player.x,
      y: player.y,
      vx: Math.cos(finalAngle) * speed,
      vy: Math.sin(finalAngle) * speed,
      radius: 8,
      fromPlayer: true,
    });
  });

  player.attractedItems = [];
}

// --- СПАВН И РЕЖИССУРА УРОВНЯ ---
function spawnSingleEnemy() {
  const spawn = MAP_TEMPLATES[currentTemplateIndex].enemySpawn;
  const doorX = canvas.width * spawn.x;
  const doorY = canvas.height * spawn.y;
  const doorW = canvas.width * spawn.w;
  const doorH = canvas.height * spawn.h;

  const enemyHp =
    currentLevelNumber === 1
      ? 1
      : Math.min(5, 1 + Math.floor((currentLevelNumber - 1) / 2));
  const enemySpeed = Math.min(160, 90 + (currentLevelNumber - 1) * 8);
  const shootInterval = Math.max(1.0, 2.4 - (currentLevelNumber - 1) * 0.15);

  enemies.push({
    x: doorX + doorW / 2,
    y: doorY + doorH * 0.5,
    radius: 24,
    speed: enemySpeed,
    maxHp: enemyHp,
    hp: enemyHp,
    type: Math.random() > 0.5 ? "cop" : "voin",
    facing: "left",
    isMoving: true,
    shootTimer: shootInterval * (0.5 + Math.random() * 0.5),
    baseShootInterval: shootInterval,
    animOffset: Math.random() * 1000,
  });

  spawnedInCurrentWave++;
  totalSpawnedEnemies++;
}

function updateLevelDirector(dt) {
  if (playerSpawnAnim.active) {
    playerSpawnAnim.progress += 1.5 * dt;
    const p = Math.min(1, playerSpawnAnim.progress);

    player.x =
      playerSpawnAnim.startX +
      (playerSpawnAnim.targetX - playerSpawnAnim.startX) * p;
    player.y =
      playerSpawnAnim.startY +
      (playerSpawnAnim.targetY - playerSpawnAnim.startY) * p;

    if (playerSpawnAnim.progress >= 1) playerSpawnAnim.active = false;
  }

  if (enemyDoor.state === "opening") {
    enemyDoor.progress = Math.min(1, enemyDoor.progress + enemyDoor.speed * dt);
    if (enemyDoor.progress >= 1) {
      enemyDoor.state = "open";
      doorSpawnTimer = Math.max(0.2, 0.4 - currentLevelNumber * 0.02);
      if (totalSpawnedEnemies < maxTotalEnemies) spawnSingleEnemy();
    }
  } else if (enemyDoor.state === "open") {
    doorSpawnTimer -= dt;
    if (doorSpawnTimer <= 0) {
      if (
        spawnedInCurrentWave >= levelWaves[currentWaveIndex] ||
        totalSpawnedEnemies >= maxTotalEnemies
      ) {
        enemyDoor.state = "closing";
      } else {
        enemyDoor.state = "opening";
      }
    }
  } else if (enemyDoor.state === "closing") {
    if (!isLevelCompleted) {
      enemyDoor.progress = Math.max(
        0,
        enemyDoor.progress - enemyDoor.speed * 1.5 * dt,
      );
      if (enemyDoor.progress <= 0) enemyDoor.state = "closed";
    }
  }

  if (totalSpawnedEnemies < maxTotalEnemies) {
    const targetWaveSize = levelWaves[currentWaveIndex];
    if (spawnedInCurrentWave >= targetWaveSize && enemies.length === 0) {
      currentWaveIndex++;
      spawnedInCurrentWave = 0;
    }
    if (spawnedInCurrentWave < targetWaveSize && enemyDoor.state === "closed") {
      spawnDelayTimer += dt;
      if (spawnDelayTimer >= Math.max(0.5, 1.2 - currentLevelNumber * 0.05)) {
        spawnDelayTimer = 0;
        enemyDoor.state = "opening";
      }
    }
  } else if (enemies.length === 0 && !isLevelCompleted) {
    isLevelCompleted = true;
    enemyDoor.state = "opening";
  }

  if (isLevelCompleted && !isExitingLevel) {
    const spawn = MAP_TEMPLATES[currentTemplateIndex].enemySpawn;
    const doorX = canvas.width * spawn.x;
    const doorY = canvas.height * spawn.y;
    const doorW = canvas.width * spawn.w;
    const doorH = canvas.height * spawn.h;

    const distToDoor = Math.hypot(
      player.x - (doorX + doorW / 2),
      player.y - (doorY + doorH * 0.5),
    );
    if (distToDoor < 50) {
      isExitingLevel = true;
      player.isMagnetActive = false;
      showWinModal();
    }
  }
}

function showWinModal() {
  SoundEngine.playWin();
  const winOverlay = document.getElementById("winOverlay");
  if (winOverlay) winOverlay.classList.remove("hidden");
}

function showGameOverModal() {
  SoundEngine.playGameOver();
  const gameOverOverlay = document.getElementById("gameOverOverlay");
  if (gameOverOverlay) gameOverOverlay.classList.remove("hidden");
  isGamePaused = true;
}

// --- ОБНОВЛЕНИЕ ИГРОВОЙ ЛОГИКИ ---
function update(dt) {
  if (!document.hasFocus()) clearInputState();

  updateLevelDirector(dt);
  if (playerSpawnAnim.active || isExitingLevel) return;

  if (!touchControl.active) {
    player.angle = Math.atan2(mousePos.y - player.y, mousePos.x - player.x);
  }

  let moveX = 0;
  let moveY = 0;

  if (keys["KeyW"] || keys["ArrowUp"]) moveY -= 1;
  if (keys["KeyS"] || keys["ArrowDown"]) moveY += 1;
  if (keys["KeyA"] || keys["ArrowLeft"]) {
    moveX -= 1;
    player.facing = "left";
  }
  if (keys["KeyD"] || keys["ArrowRight"]) {
    moveX += 1;
    player.facing = "right";
  }

  if (touchControl.active) {
    const dx = touchControl.currentX - touchControl.startX;
    const dy = touchControl.currentY - touchControl.startY;
    const dist = Math.hypot(dx, dy);

    if (dist > 10) {
      moveX = dx / dist;
      moveY = dy / dist;
      player.facing = moveX < 0 ? "left" : "right";
      if (!isMouseDown) player.angle = Math.atan2(dy, dx);
    }
  }

  if (isMouseDown) {
    player.angle = Math.atan2(mousePos.y - player.y, mousePos.x - player.x);
  }

  player.isMoving = moveX !== 0 || moveY !== 0;

  if (player.isMoving) {
    const len = Math.hypot(moveX, moveY);
    const speed = player.isMagnetActive ? player.speed * 0.55 : player.speed;
    player.x += (moveX / len) * speed * dt;
    player.y += (moveY / len) * speed * dt;
  }

  const topLimit = height * 0.22;
  const bottomLimit = height * 0.88;

  player.x = Math.max(40, Math.min(width - 40, player.x));
  player.y = Math.max(topLimit, Math.min(bottomLimit, player.y));

  enemies.forEach((enemy) => {
    const dx = player.x - enemy.x;
    const dy = player.y - enemy.y;
    const dist = Math.hypot(dx, dy);

    enemy.facing = dx < 0 ? "left" : "right";

    if (dist > 160) {
      enemy.isMoving = true;
      enemy.x += (dx / dist) * enemy.speed * dt;
      enemy.y += (dy / dist) * enemy.speed * dt;
    } else {
      enemy.isMoving = false;
    }

    enemy.shootTimer -= dt;
    if (enemy.shootTimer <= 0) {
      enemy.shootTimer = enemy.baseShootInterval;
      const angle = Math.atan2(dy, dx);
      const bulletSpeed = Math.min(420, 270 + currentLevelNumber * 12);
      bullets.push({
        x: enemy.x,
        y: enemy.y,
        vx: Math.cos(angle) * bulletSpeed,
        vy: Math.sin(angle) * bulletSpeed,
        radius: 5,
        fromPlayer: false,
      });
    }
  });

  if (player.isMagnetActive) {
    for (let bIdx = bullets.length - 1; bIdx >= 0; bIdx--) {
      const b = bullets[bIdx];
      if (!b.fromPlayer) {
        if (Math.hypot(player.x - b.x, player.y - b.y) <= player.magnetRadius) {
          player.attractedItems.push({ type: "bullet" });
          bullets.splice(bIdx, 1);
        }
      }
    }
  }

  for (let bIdx = bullets.length - 1; bIdx >= 0; bIdx--) {
    const b = bullets[bIdx];
    b.x += b.vx * dt;
    b.y += b.vy * dt;

    if (b.x < 0 || b.x > width || b.y < 0 || b.y > height) {
      bullets.splice(bIdx, 1);
      continue;
    }

    if (b.fromPlayer) {
      for (let eIdx = enemies.length - 1; eIdx >= 0; eIdx--) {
        const e = enemies[eIdx];
        if (Math.hypot(b.x - e.x, b.y - e.y) < b.radius + e.radius) {
          e.hp -= 1;
          if (e.hp <= 0) {
            enemies.splice(eIdx, 1);
            coins += 50 + currentLevelNumber * 10;
            saveGameState();
          }
          bullets.splice(bIdx, 1);
          break;
        }
      }
    } else {
      if (
        Math.hypot(b.x - player.x, b.y - player.y) <
        b.radius + player.radius
      ) {
        if (!player.isGodMode) player.hp = Math.max(0, player.hp - 10);
        bullets.splice(bIdx, 1);
        if (player.hp <= 0) showGameOverModal();
      }
    }
  }

  const scoreEl = document.getElementById("scoreText");
  const levelEl = document.getElementById("levelText");
  const waveEl = document.getElementById("waveText");
  const ammoEl = document.getElementById("ammoText");
  const hpEl = document.getElementById("hpText");

  if (scoreEl) scoreEl.innerText = coins;
  if (levelEl) levelEl.innerText = t("level", { level: currentLevelNumber });
  if (waveEl) {
    waveEl.innerText = isLevelCompleted
      ? t("goDoor")
      : `${currentWaveIndex + 1}/${levelWaves.length} (${totalSpawnedEnemies}/${maxTotalEnemies})`;
  }
  if (ammoEl) ammoEl.innerText = player.attractedItems.length;
  if (hpEl) hpEl.innerText = player.isGodMode ? "∞" : player.hp;

  if (player.isMagnetActive) {
    player.magnetEnergy = Math.max(0, player.magnetEnergy - dt);
    if (player.magnetEnergy <= 0) {
      player.isMagnetActive = false;
      player.isOverheated = true;
      player.magnetCooldown = player.maxCooldown;
      releaseMagnet();
    }
  } else {
    if (player.isOverheated) {
      player.magnetCooldown = Math.max(0, player.magnetCooldown - dt);
      if (player.magnetCooldown <= 0) {
        player.isOverheated = false;
        player.magnetEnergy = player.maxMagnetEnergy;
      }
    } else if (player.magnetEnergy < player.maxMagnetEnergy) {
      player.magnetEnergy = Math.min(
        player.maxMagnetEnergy,
        player.magnetEnergy + dt * 0.75,
      );
    }
  }

  if (
    isMouseDown &&
    !player.isOverheated &&
    player.magnetEnergy > 0 &&
    !isExitingLevel
  ) {
    tryActivateMagnet();
  }

  const circle = document.getElementById("magnetProgress");
  const timerText = document.getElementById("magnetTimerText");
  const widget = document.getElementById("magnetWidget");

  if (circle && widget) {
    const circumference = 2 * Math.PI * 28;
    if (player.isOverheated) {
      widget.classList.add("cooldown");
      const progress = player.magnetCooldown / player.maxCooldown;
      circle.style.strokeDashoffset = circumference * (1 - progress);
      if (timerText) timerText.innerText = player.magnetCooldown.toFixed(1);
    } else {
      widget.classList.remove("cooldown");
      const progress = player.magnetEnergy / player.maxMagnetEnergy;
      circle.style.strokeDashoffset = circumference * (1 - progress);
      if (timerText)
        timerText.innerText = player.isMagnetActive
          ? player.magnetEnergy.toFixed(1)
          : "";
    }
  }
}

// --- ОТРИСОВКА ---
function drawSprite(
  img,
  x,
  y,
  targetHeight,
  flipX,
  isMoving = false,
  timeOffset = 0,
) {
  if (!img.complete || img.naturalWidth === 0) return;

  const aspectRatio = img.naturalWidth / img.naturalHeight;
  const targetWidth = targetHeight * aspectRatio;
  const time = Date.now() / 100 + timeOffset;
  let bounceY = 0;
  let rotationAngle = 0;

  if (isMoving) {
    bounceY = Math.abs(Math.sin(time * 1.5)) * 6;
    rotationAngle = Math.sin(time) * 0.08;
  } else {
    bounceY = Math.sin(time * 0.4) * 1.5;
  }

  ctx.save();
  ctx.translate(x, y - bounceY);
  ctx.rotate(flipX ? -rotationAngle : rotationAngle);
  if (flipX) ctx.scale(-1, 1);

  ctx.drawImage(
    img,
    -targetWidth / 2,
    -targetHeight / 2,
    targetWidth,
    targetHeight,
  );
  ctx.restore();
}

function draw() {
  ctx.clearRect(0, 0, width, height);

  if (assets.bg.complete && assets.bg.naturalWidth !== 0) {
    ctx.drawImage(assets.bg, 0, 0, width, height);

    const spawn = MAP_TEMPLATES[currentTemplateIndex].enemySpawn;
    const dx = width * spawn.x;
    const dy = height * spawn.y;
    const dw = width * spawn.w;
    const dh = height * spawn.h;

    ctx.save();
    ctx.beginPath();
    ctx.rect(dx, dy, dw, dh);
    ctx.clip();

    ctx.fillStyle = "#0c1017";
    ctx.fillRect(dx, dy, dw, dh);

    const sx = spawn.x * assets.bg.naturalWidth;
    const sy = spawn.y * assets.bg.naturalHeight;
    const sw = spawn.w * assets.bg.naturalWidth;
    const sh = spawn.h * assets.bg.naturalHeight;

    if (spawn.type === "hatch-h") {
      const animXOffset = (enemyDoor.progress || 0) * dw;
      ctx.drawImage(assets.bg, sx, sy, sw, sh, dx + animXOffset, dy, dw, dh);
    } else {
      const animYOffset = (enemyDoor.progress || 0) * dh;
      ctx.drawImage(assets.bg, sx, sy, sw, sh, dx, dy - animYOffset, dw, dh);
    }

    if (isLevelCompleted && enemyDoor.progress >= 0.8) {
      ctx.fillStyle = "rgba(0, 229, 255, 0.35)";
      ctx.fillRect(dx, dy, dw, dh);
    }

    ctx.restore();
  }

  if (player.isMagnetActive) {
    ctx.fillStyle = "rgba(0, 229, 255, 0.07)";
    ctx.strokeStyle = "#00e5ff";
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 6]);
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.magnetRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.setLineDash([]);
  }

  enemies.forEach((e) => {
    ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
    ctx.beginPath();
    ctx.ellipse(e.x, e.y + 36, 18, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    const img = e.type === "cop" ? assets.cop : assets.voin;
    drawSprite(
      img,
      e.x,
      e.y,
      88,
      e.facing === "left",
      e.isMoving,
      e.animOffset || 0,
    );

    if (e.maxHp > 1) {
      const barW = 36;
      const barH = 5;
      const barX = e.x - barW / 2;
      const barY = e.y - 50;

      ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
      ctx.fillRect(barX, barY, barW, barH);

      ctx.fillStyle = "#ff1744";
      ctx.fillRect(barX, barY, barW * (e.hp / e.maxHp), barH);
    }
  });

  if (!isExitingLevel && !playerSpawnAnim.active && player.isMagnetActive) {
    ctx.save();
    ctx.strokeStyle = "rgba(0, 229, 255, 0.4)";
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);

    ctx.beginPath();
    ctx.moveTo(player.x, player.y);
    const targetX = player.x + Math.cos(player.angle) * 180;
    const targetY = player.y + Math.sin(player.angle) * 180;
    ctx.lineTo(targetX, targetY);
    ctx.stroke();

    ctx.translate(targetX, targetY);
    ctx.rotate(player.angle);

    const rectWidth = 14;
    const rectHeight = 8;

    ctx.strokeStyle = "#00e5ff";
    ctx.lineWidth = 2;
    ctx.setLineDash([]);
    ctx.strokeRect(-rectWidth / 2, -rectHeight / 2, rectWidth, rectHeight);

    ctx.fillStyle = "rgba(0, 229, 255, 0.35)";
    ctx.fillRect(-rectWidth / 2, -rectHeight / 2, rectWidth, rectHeight);

    ctx.restore();
  }

  if (!isExitingLevel) {
    ctx.fillStyle = "rgba(0, 0, 0, 0.35)";
    ctx.beginPath();
    ctx.ellipse(player.x, player.y + 40, 22, 7, 0, 0, Math.PI * 2);
    ctx.fill();

    drawSprite(
      assets.main,
      player.x,
      player.y,
      96,
      player.facing === "left",
      player.isMoving,
    );
  }

  const count = player.attractedItems.length;
  player.attractedItems.forEach((item, index) => {
    const orbitAngle =
      Date.now() / 200 + index * ((Math.PI * 2) / Math.max(1, count));
    const orbX = player.x + Math.cos(orbitAngle) * (player.radius + 18);
    const orbY = player.y + Math.sin(orbitAngle) * (player.radius + 18);

    ctx.shadowColor = "#00e5ff";
    ctx.shadowBlur = 8;
    ctx.fillStyle = "#00e5ff";
    ctx.beginPath();
    ctx.arc(orbX, orbY, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  });

  bullets.forEach((b) => {
    ctx.fillStyle = b.fromPlayer ? "#00e5ff" : "#ff1744";
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
    ctx.fill();
  });
}

// --- ИГРОВОЙ ЦИКЛ ---
function loop(currentTime) {
  if (isGamePaused) {
    lastTime = currentTime;
    requestAnimationFrame(loop);
    return;
  }

  const deltaTime = (currentTime - lastTime) / 1000;
  lastTime = currentTime;

  const clampedDelta = Math.min(deltaTime, 0.1);
  update(clampedDelta);
  draw();

  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);

// --- СИСТЕМА УРОВНЕЙ И ПЕРЕХОДОВ ---
function triggerCurtainTransition(callback) {
  SoundEngine.playCurtain();
  const curtainOverlay = document.getElementById("curtainOverlay");
  if (!curtainOverlay) {
    if (callback) callback();
    return;
  }

  curtainOverlay.classList.remove("hidden");
  setTimeout(() => curtainOverlay.classList.add("closed"), 20);

  setTimeout(() => {
    if (callback) callback();
    curtainOverlay.classList.remove("closed");
    setTimeout(() => curtainOverlay.classList.add("hidden"), 500);
  }, 520);
}

function startLevel(levelNum) {
  currentLevelNumber = levelNum;

  if (currentLevelNumber === 1) {
    currentTemplateIndex = 0;
  } else {
    let availableIndices = MAP_TEMPLATES.map((_, i) => i).filter(
      (i) => i !== currentTemplateIndex,
    );
    currentTemplateIndex =
      availableIndices[Math.floor(Math.random() * availableIndices.length)];
  }

  if (currentLevelNumber === 1) {
    levelWaves = [1, 2];
    maxTotalEnemies = 3;
  } else {
    const waveCount = Math.min(6, 2 + Math.floor(currentLevelNumber / 2));
    levelWaves = [];
    let enemyCount = 0;

    for (let i = 0; i < waveCount; i++) {
      const enemiesInWave = Math.min(
        8,
        2 + Math.floor(currentLevelNumber * 0.8) + i,
      );
      levelWaves.push(enemiesInWave);
      enemyCount += enemiesInWave;
    }
    maxTotalEnemies = enemyCount;
  }

  loadLevelBg(currentTemplateIndex);
  resetLevel();
}

function resetLevel() {
  enemies.length = 0;
  bullets.length = 0;
  player.attractedItems = [];

  currentWaveIndex = 0;
  spawnedInCurrentWave = 0;
  totalSpawnedEnemies = 0;
  spawnDelayTimer = 0;

  isLevelCompleted = false;
  isExitingLevel = false;
  enemyDoor.state = "closed";
  enemyDoor.progress = 0;

  const currentLvl = MAP_TEMPLATES[currentTemplateIndex];

  if (currentTemplateIndex === 1 || currentTemplateIndex === 2) {
    const targetX =
      width * (currentLvl.playerSpawn.x + currentLvl.playerSpawn.w * 0.8);
    const startX = targetX - width * 0.05;
    const fixedY =
      height * (currentLvl.playerSpawn.y + currentLvl.playerSpawn.h * 0.5);

    player.x = startX;
    player.y = fixedY;

    playerSpawnAnim = {
      active: true,
      startX: startX,
      targetX: targetX,
      startY: fixedY,
      targetY: fixedY,
      progress: 0,
    };
  } else {
    const targetX =
      width * (currentLvl.playerSpawn.x + currentLvl.playerSpawn.w / 2);
    const startY = height * 0.35;
    const targetY = height * 0.47;

    player.x = targetX;
    player.y = startY;

    playerSpawnAnim = {
      active: true,
      startX: targetX,
      targetX: targetX,
      startY: startY,
      targetY: targetY,
      progress: 0,
    };
  }

  applyUpgradesToPlayer();
  clearInputState();

  if (!isMobileDevice() || !isPortrait()) {
    togglePause(false);
  }
}

function togglePause(paused) {
  isGamePaused = paused;
  clearInputState();

  const pauseOverlay = document.getElementById("pauseOverlay");
  if (isGamePaused) {
    pauseOverlay?.classList.remove("hidden");
  } else {
    pauseOverlay?.classList.add("hidden");
    lastTime = performance.now();
  }
}

// --- СОХРАНЕНИЯ И МАГАЗИН ---
const maxUpgradeLevel = 5;
const UPGRADE_COSTS = {
  maxHp: [200, 400, 600, 800, 1000],
  energy: [250, 450, 650, 850, 1050],
  cooling: [300, 500, 700, 900, 1100],
  radius: [350, 550, 750, 950, 1150],
};

function loadGameState() {
  const saved = localStorage.getItem("magnet_heist_save");
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      gameState = { ...gameState, ...parsed };
      coins = gameState.coins || 0;
      currentLevelNumber = gameState.currentLevel || 1;
    } catch (e) {
      console.error("Ошибка чтения сохранения", e);
    }
  }
  applyUpgradesToPlayer();
}

function saveGameState() {
  gameState.coins = coins;
  gameState.currentLevel = currentLevelNumber;
  localStorage.setItem("magnet_heist_save", JSON.stringify(gameState));
}

function applyUpgradesToPlayer() {
  const u = gameState.upgrades;
  player.maxHp = 100 + (u.maxHp || 0) * 25;
  player.hp = player.maxHp;
  player.maxMagnetEnergy = 3.0 + (u.energy || 0) * 0.5;
  player.magnetEnergy = player.maxMagnetEnergy;
  player.maxCooldown = Math.max(1.0, 4.0 - (u.cooling || 0) * 0.5);
  player.magnetRadius = 130 + (u.radius || 0) * 20;
}

function updateShopUI() {
  const shopCoinsText = document.getElementById("shopCoinsText");
  if (shopCoinsText) shopCoinsText.innerText = coins;

  const bindItem = (btnId, lvlTextId, type, costs) => {
    const lvl = gameState.upgrades[type] || 0;
    const btn = document.getElementById(btnId);
    const lvlText = document.getElementById(lvlTextId);

    if (lvlText) lvlText.innerText = `Ур. ${lvl}/${maxUpgradeLevel}`;
    if (btn) {
      if (lvl >= maxUpgradeLevel) {
        btn.innerText = t("max");
        btn.disabled = true;
      } else {
        const cost = costs[lvl];
        btn.innerText = `${cost} 🪙`;
        btn.disabled = coins < cost;
      }
    }
  };

  bindItem("buyHpBtn", "hpLvlText", "maxHp", UPGRADE_COSTS.maxHp);
  bindItem("buyEnergyBtn", "energyLvlText", "energy", UPGRADE_COSTS.energy);
  bindItem("buyCoolingBtn", "coolingLvlText", "cooling", UPGRADE_COSTS.cooling);
  bindItem("buyRadiusBtn", "radiusLvlText", "radius", UPGRADE_COSTS.radius);
}

function buyUpgrade(type, costs) {
  const currentLvl = gameState.upgrades[type] || 0;
  if (currentLvl >= maxUpgradeLevel) return;

  const cost = costs[currentLvl];
  if (coins >= cost) {
    SoundEngine.playButtonClick();
    coins -= cost;
    gameState.upgrades[type] = currentLvl + 1;
    saveGameState();
    applyUpgradesToPlayer();
    updateShopUI();
  }
}

// --- СОБЫТИЯ ИНТЕРФЕЙСА И КНОПОК ---
document.getElementById("pauseBtn")?.addEventListener("click", (e) => {
  e.stopPropagation();
  SoundEngine.playButtonClick();
  togglePause(true);
});

document.getElementById("resumeBtn")?.addEventListener("click", (e) => {
  e.stopPropagation();
  SoundEngine.playButtonClick();
  togglePause(false);
});

document.getElementById("startGameBtn")?.addEventListener("click", () => {
  SoundEngine.playButtonClick();
  lockOrientation();
  const mainMenuOverlay = document.getElementById("mainMenuOverlay");

  triggerCurtainTransition(() => {
    if (mainMenuOverlay) mainMenuOverlay.classList.add("hidden");
    startLevel(currentLevelNumber);
    showTrainingHintIfNeeded();
  });
});

document.getElementById("nextLevelBtn")?.addEventListener("click", () => {
  SoundEngine.playButtonClick();
  const winOverlay = document.getElementById("winOverlay");
  if (winOverlay) winOverlay.classList.add("hidden");

  saveGameState();

  triggerCurtainTransition(() => {
    startLevel(currentLevelNumber + 1);
    saveGameState();
  });
});

document.getElementById("restartBtn")?.addEventListener("click", () => {
  SoundEngine.playButtonClick();
  const gameOverOverlay = document.getElementById("gameOverOverlay");
  if (gameOverOverlay) gameOverOverlay.classList.add("hidden");
  resetLevel();
});

document.getElementById("reviveAdBtn")?.addEventListener("click", () => {
  SoundEngine.playButtonClick();
  player.hp = player.maxHp;
  const gameOverOverlay = document.getElementById("gameOverOverlay");
  if (gameOverOverlay) gameOverOverlay.classList.add("hidden");
  togglePause(false);
});

document.getElementById("rewardedAdBtn")?.addEventListener("click", () => {
  SoundEngine.playButtonClick();
  coins += 300;
  saveGameState();
  updateShopUI();
});

document
  .getElementById("buyHpBtn")
  ?.addEventListener("click", () => buyUpgrade("maxHp", UPGRADE_COSTS.maxHp));
document
  .getElementById("buyEnergyBtn")
  ?.addEventListener("click", () => buyUpgrade("energy", UPGRADE_COSTS.energy));
document
  .getElementById("buyCoolingBtn")
  ?.addEventListener("click", () =>
    buyUpgrade("cooling", UPGRADE_COSTS.cooling),
  );
document
  .getElementById("buyRadiusBtn")
  ?.addEventListener("click", () => buyUpgrade("radius", UPGRADE_COSTS.radius));

const shopOverlay = document.getElementById("shopOverlay");

document.getElementById("shopBtn")?.addEventListener("click", () => {
  SoundEngine.playModalOpen();
  updateShopUI();
  shopOverlay?.classList.remove("hidden");
});

document.getElementById("closeShopBtn")?.addEventListener("click", () => {
  SoundEngine.playButtonClick();
  shopOverlay?.classList.add("hidden");
});

window.addEventListener("contextmenu", (e) => e.preventDefault());

// --- АДАПТАЦИЯ И ОРИЕНТАЦИЯ ЭКРАНА ---
function isMobileDevice() {
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    window.matchMedia("(pointer: coarse)").matches
  );
}

function isPortrait() {
  return window.innerHeight > window.innerWidth;
}

function checkOrientation() {
  const orientationOverlay = document.getElementById("orientationOverlay");
  const mainMenu = document.getElementById("mainMenuOverlay");
  const isMenuVisible = mainMenu && !mainMenu.classList.contains("hidden");

  if (isMobileDevice() && isPortrait()) {
    if (orientationOverlay) orientationOverlay.classList.remove("hidden");
    if (!isGamePaused && !isMenuVisible) togglePause(true);
  } else {
    if (orientationOverlay) orientationOverlay.classList.add("hidden");
  }
}

function lockOrientation() {
  if (screen.orientation && screen.orientation.lock) {
    screen.orientation.lock("landscape").catch(() => {});
  }
}

window.addEventListener("resize", () => {
  resize();
  checkOrientation();
});

window.addEventListener("orientationchange", () => {
  setTimeout(() => {
    resize();
    checkOrientation();
  }, 200);
});

// --- СЕНСОРНОЕ УПРАВЛЕНИЕ ---
window.addEventListener(
  "touchstart",
  (e) => {
    if (e.target.closest("button") || e.target.closest(".modal-box")) {
      return;
    }
    e.preventDefault();

    for (let i = 0; i < e.changedTouches.length; i++) {
      const touch = e.changedTouches[i];
      if (touch.clientX < window.innerWidth / 2 && !touchControl.active) {
        touchControl.active = true;
        touchControl.touchId = touch.identifier;
        touchControl.startX = touch.clientX;
        touchControl.startY = touch.clientY;
        touchControl.currentX = touch.clientX;
        touchControl.currentY = touch.clientY;
      } else if (
        touch.clientX >= window.innerWidth / 2 &&
        rightTouchId === null
      ) {
        rightTouchId = touch.identifier;
        isMouseDown = true;
        mousePos.x = touch.clientX;
        mousePos.y = touch.clientY;
        tryActivateMagnet();
      }
    }
  },
  { passive: false },
);

window.addEventListener(
  "touchmove",
  (e) => {
    e.preventDefault();
    for (let i = 0; i < e.changedTouches.length; i++) {
      const touch = e.changedTouches[i];

      if (touchControl.active && touch.identifier === touchControl.touchId) {
        touchControl.currentX = touch.clientX;
        touchControl.currentY = touch.clientY;
      }

      if (rightTouchId !== null && touch.identifier === rightTouchId) {
        mousePos.x = touch.clientX;
        mousePos.y = touch.clientY;
      }
    }
  },
  { passive: false },
);

window.addEventListener("touchend", (e) => {
  for (let i = 0; i < e.changedTouches.length; i++) {
    const touch = e.changedTouches[i];

    if (touchControl.active && touch.identifier === touchControl.touchId) {
      touchControl.active = false;
      touchControl.touchId = null;
    }

    if (rightTouchId !== null && touch.identifier === rightTouchId) {
      rightTouchId = null;
      isMouseDown = false;
      if (player.isMagnetActive) {
        player.isMagnetActive = false;
        releaseMagnet();
      }
    }
  }
});

function showTrainingHintIfNeeded() {
  const isTouchDevice = isMobileDevice();
  const tabletHintEl = document.getElementById("instructions-tablet");

  if (isTouchDevice && tabletHintEl) {
    tabletHintEl.classList.remove("hidden");

    const hideHint = (e) => {
      if (e.target.closest("button") || e.target.closest(".modal-box")) return;
      tabletHintEl.classList.add("hidden");
      window.removeEventListener("touchstart", hideHint);
    };

    window.addEventListener("touchstart", hideHint);
  }
}

// --- АВТОСОХРАНЕНИЕ ПРИ СВОРТЫВАНИИ / ЗАКРЫТИИ ---
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") {
    saveGameState();
  }
});

window.addEventListener("pagehide", () => {
  saveGameState();
});

// --- ФИНАЛЬНАЯ ИНИЦИАЛИЗАЦИЯ ---
initGame();
checkOrientation();