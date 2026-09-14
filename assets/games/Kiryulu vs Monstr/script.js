const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let isGameRunning = false;
let score = 0;
let baseSpeed = 4;
let animationFrameId = null;

const assets = {
  bg: new Image(),
  main: new Image(),
  cop: new Image(),
  voin: new Image()
};

assets.bg.src = "assets/bg.jpg";
assets.main.src = "assets/main.png";
assets.cop.src = "assets/cop.png";
assets.voin.src = "assets/voin.png";

const player = {
  x: 0,
  y: 0,
  width: 40,
  height: 60,
  speed: 6,
  facing: "right",
  isMoving: false
};

let enemies = [];
const keys = {};

function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

window.addEventListener("keydown", (e) => {
  keys[e.code] = true;
});
window.addEventListener("keyup", (e) => {
  keys[e.code] = false;
});

function spawnEnemy() {
  const type = Math.random() > 0.5 ? "cop" : "voin";
  const side = Math.random() > 0.5 ? "left" : "right";
  const x = side === "left" ? -50 : canvas.width + 50;
  const y = Math.random() * (canvas.height - 100) + 50;
  
  enemies.push({
    x: x,
    y: y,
    type: type,
    speed: baseSpeed + Math.random() * 2,
    facing: side === "left" ? "right" : "left",
    isMoving: true,
    animOffset: Math.random() * 1000
  });
}

function update() {
  player.isMoving = false;

  if (keys["KeyW"] || keys["ArrowUp"]) {
    player.y -= player.speed;
    player.isMoving = true;
  }
  if (keys["KeyS"] || keys["ArrowDown"]) {
    player.y += player.speed;
    player.isMoving = true;
  }
  if (keys["KeyA"] || keys["ArrowLeft"]) {
    player.x -= player.speed;
    player.facing = "left";
    player.isMoving = true;
  }
  if (keys["KeyD"] || keys["ArrowRight"]) {
    player.x += player.speed;
    player.facing = "right";
    player.isMoving = true;
  }

  player.x = Math.max(0, Math.min(canvas.width - player.width, player.x));
  player.y = Math.max(0, Math.min(canvas.height - player.height, player.y));

  enemies.forEach((e) => {
    const dx = player.x - e.x;
    const dy = player.y - e.y;
    const dist = Math.hypot(dx, dy);

    if (dist > 0) {
      e.x += (dx / dist) * e.speed;
      e.y += (dy / dist) * e.speed;
      e.facing = dx > 0 ? "right" : "left";
    }
  });
}

function drawSprite(img, x, y, targetHeight, flipX, isMoving, animOffset = 0) {
  if (!img.complete || img.naturalWidth === 0) return;

  const aspectRatio = img.naturalWidth / img.naturalHeight;
  const targetWidth = targetHeight * aspectRatio;

  ctx.save();
  ctx.translate(x, y);

  if (flipX) {
    ctx.scale(-1, 1);
  }

  let bounce = 0;
  if (isMoving) {
    bounce = Math.sin((Date.now() + animOffset) / 100) * 4;
  }

  ctx.drawImage(
    img,
    flipX ? -targetWidth : 0,
    -bounce,
    targetWidth,
    targetHeight
  );

  ctx.restore();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (assets.bg.complete && assets.bg.naturalWidth !== 0) {
    ctx.drawImage(assets.bg, 0, 0, canvas.width, canvas.height);
  }

  const isMobile = isMobileDevice();
  const enemyHeight = isMobile ? 64 : 88;
  const playerHeight = isMobile ? 70 : 96;

  enemies.forEach((e) => {
    const img = e.type === "cop" ? assets.cop : assets.voin;
    drawSprite(
      img,
      e.x,
      e.y,
      enemyHeight,
      e.facing === "left",
      e.isMoving,
      e.animOffset || 0
    );
  });

  drawSprite(
    assets.main,
    player.x,
    player.y,
    playerHeight,
    player.facing === "left",
    player.isMoving
  );
}

function gameLoop() {
  if (!isGameRunning) return;
  update();
  draw();
  animationFrameId = requestAnimationFrame(gameLoop);
}

function startGame() {
  player.x = canvas.width / 2;
  player.y = canvas.height / 2;
  enemies = [];
  isGameRunning = true;

  setInterval(spawnEnemy, 2000);
  gameLoop();
}

window.onload = () => {
  startGame();
};