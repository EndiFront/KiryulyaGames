const games = [
  {
    id: 1,
    title: "Поймай Кирюля",
    tagColor: "badge-red",
    bgClass: "bg-amber",
    cover: "assets/img/Kiryulu Whack a Mole.png",
    path: "assets/games/Kiryulu Whack a Mole/index.html",
  },
  {
    id: 2,
    title: "Какой ты Кирюля?",
    tagColor: "badge-purple",
    bgClass: "bg-purple",
    cover: "assets/img/What Kiryalya's are you.png",
    path: "assets/games/What Kiryalya's are you/index.html",
  },
  {
    id: 3,
    title: "Кирюля против монстров",
    tagColor: "badge-emerald",
    bgClass: "bg-teal",
    cover: "assets/img/Kiryulu vs Monstr.png",
    path: "assets/games/Kiryulu vs Monstr/index.html",
  },
  {
    id: 4,
    title: "Найди Кирилю",
    bgClass: "bg-blue",
    cover: "assets/img/Find a Couple Kiryulu.png",
    path: "assets/games/Find a Couple Kiryulu/index.html",
  },
  {
    id: 5,
    title: "Кликер Кирюля",
    tagColor: "badge-blue",
    bgClass: "bg-rose",
    cover: "assets/img/Kiryulu Clicker.png",
    path: "assets/games/Kiryulu Clicker/index.html",
  },
  {
    id: 6,
    title: "Пятнашки с Кирюлей",
    bgClass: "bg-yellow",
    cover: "assets/img/Kiryulya's Tag.png",
    path: "assets/games/Kiryulya's Tag/index.html",
  },
  {
    id: 7,
    title: "Побег Кирюли",
    bgClass: "bg-green",
    cover: "assets/img/Kiryulya's Escape.png",
    path: "assets/games/Kiryulya's Escape/index.html",
  },
  {
    id: 8,
    title: "Пенальти Кирюля",
    bgClass: "bg-violet",
    cover: "assets/img/Kiryulu Penalty.png",
    path: "assets/games/Kiryulu Penalty/index.html",
  },
];

function renderCards() {
  const grid = document.getElementById("gamesGrid");
  grid.innerHTML = games
    .map(
      (game) => `
        <div class="game-card ${game.bgClass}" onclick="openGame(${game.id})">
          ${game.cover ? `<img src="${game.cover}" class="game-cover" alt="${game.title}">` : ""}
          <div class="game-card-content">
            <div>
              ${game.tag ? `<span class="badge ${game.tagColor}">${game.tag}</span>` : ""}
            </div>
            ${!game.cover ? `<div class="game-icon">${game.icon}</div>` : "<div></div>"}
            <div class="game-title">${game.title}</div>
          </div>
        </div>
      `,
    )
    .join("");
}

function isMobileDevice() {
  return (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    ) || window.innerWidth <= 768
  );
}

function openGame(id) {
  const game = games.find((g) => g.id === id);
  if (!game || !game.path) {
    console.log("Игра в разработке или не найден путь");
    return;
  }

  const iframe = document.getElementById("gameIframe");
  const overlay = document.getElementById("gameOverlay");

  iframe.src = game.path;
  overlay.classList.add("active");

  document.body.style.overflow = "hidden";

  if (isMobileDevice() && overlay.requestFullscreen) {
    overlay
      .requestFullscreen()
      .then(() => {
        if (screen.orientation && screen.orientation.lock) {
          screen.orientation.lock("landscape").catch(() => {});
        }
      })
      .catch(() => {});
  }
}

function closeGame() {
  const iframe = document.getElementById("gameIframe");
  const overlay = document.getElementById("gameOverlay");

  iframe.src = "";
  overlay.classList.remove("active");
  document.body.style.overflow = "";

  if (document.fullscreenElement) {
    document.exitFullscreen().catch(() => {});
  }
}
window.addEventListener("DOMContentLoaded", () => {
  renderCards();

  const progressBar = document.getElementById("progressBar");
  const splashScreen = document.getElementById("splashScreen");

  setTimeout(() => {
    progressBar.style.width = "100%";
  }, 50);

  setTimeout(() => {
    splashScreen.classList.add("hidden");
  }, 1300);
});
