const TRANSLATIONS = {
  ru: {
    tabBoosts: "Инструменты",
    tabHeroes: "Скины",
    selected: "Выбрано",
    selectedHero: "Выбран",
    equip: "Надеть",
    lockedHero: "Закрыто",
    boosts: {
      0: "Обычный клик",
      1: "Пятёрочка",
      2: "Хомяк",
      3: "Ответы на ОГЭ",
      4: "???",
      5: "СССР",
      6: "Ред Булл",
      7: "ЕГЭ...",
      8: "Макс",
    },
    heroes: {
      0: "Новичок",
      1: "Исследователь",
      2: "Охотник",
      3: "Стальной рыцарь",
      4: "Золотой рыцарь",
      5: "Кристальный страж",
      6: "Темный рыцарь",
      7: "Призрак",
      8: "Страж подземелья",
      9: "Древний дракон",
    },
  },
  en: {
    tabBoosts: "Tools",
    tabHeroes: "Skins",
    selected: "Selected",
    selectedHero: "Selected",
    equip: "Equip",
    lockedHero: "Locked",
    boosts: {
      0: "Default Click",
      1: "Wooden Hammer",
      2: "Stone Hammer",
      3: "Steel Blade",
      4: "Crystal Blade",
      5: "Dark Blade",
      6: "Enchanted Blade",
      7: "Power Potion",
      8: "Sacred Crystal",
    },
    heroes: {
      0: "Beginner",
      1: "Explorer",
      2: "Hunter",
      3: "Steel Knight",
      4: "Golden Knight",
      5: "Crystal Guard",
      6: "Dark Knight",
      7: "Ghost",
      8: "Dungeon Guard",
      9: "Ancient Dragon",
    },
  },
};

let currentLang = "ru";

const SoundManager = {
  activeAudioInstances: new Set(),

  registerAudio(audio) {
    this.activeAudioInstances.add(audio);
  },

  unregisterAudio(audio) {
    this.activeAudioInstances.delete(audio);
  },

  mute() {
    document.querySelectorAll("audio, video").forEach((el) => {
      el.muted = true;
    });
    this.activeAudioInstances.forEach((audio) => {
      audio.muted = true;
    });
    if (window.audioCtx && window.audioCtx.state === "running") {
      window.audioCtx.suspend();
    }
  },

  unmute() {
    document.querySelectorAll("audio, video").forEach((el) => {
      el.muted = false;
    });
    this.activeAudioInstances.forEach((audio) => {
      audio.muted = false;
    });
    if (window.audioCtx && window.audioCtx.state === "suspended") {
      window.audioCtx.resume();
    }
  },
};

document.addEventListener("contextmenu", function (event) {
  event.preventDefault();
});

document.addEventListener("selectstart", function (event) {
  event.preventDefault();
});

let hero = document.getElementById("hero");
let h3 = document.getElementById("h3");
let progress = document.getElementById("progress");
let progress_bar = document.getElementById("progress-bar");
let list = document.getElementById("list");
let ads = document.getElementById("ads");
let progress_ads = document.getElementById("progress_ads");
let h2 = document.getElementById("h2");
let heroButton = document.getElementById("hero-b");

var selectedColor = "#10b981";
var defaultColor = "#DB1E2C";
var disabledColor = "#475569";

var score = 0;
var maxScore = 0; // Трекинг максимально достигнутого количества кристаллов
var click = 1;
var data = null;

let currentTab = "boosts";

let x2Interval = null;
let isX2Active = false;
let baseClick = 1;
let x2EndTime = 0;

class Hero {
  constructor(icon, max, price, name, id) {
    this.icon = icon;
    this.max = max;
    this.price = price;
    this.name = name;
    this.id = id;
  }
}

class Boost {
  constructor(icon, price, click, name, id, isReward = false) {
    this.icon = icon;
    this.price = price;
    this.click = click;
    this.name = name;
    this.id = id;
    this.isReward = isReward;
  }
}

var listH = [
  new Hero("1.png", 100, 0, "Новичок", 0),
  new Hero("2.png", 500, 100, "Исследователь", 1),
  new Hero("3.png", 5000, 500, "Охотник", 2),
  new Hero("4.png", 15000, 5000, "Стальной рыцарь", 3),
  new Hero("5.png", 25000, 15000, "Золотой рыцарь", 4),
  new Hero("6.png", 35000, 25000, "Кристальный страж", 5),
  new Hero("7.png", 50000, 35000, "Темный рыцарь", 6),
  new Hero("8.png", 70000, 50000, "Призрак", 7),
  new Hero("9.png", 100000, 70000, "Страж подземелья", 8),
  new Hero("10.png", 120000, 100000, "Древний дракон", 9),
];

var listB = [
  new Boost("cursor.png", 0, 1, "Обычный клик", 0),
  new Boost("19.png", 500, 5, "Пяторочка", 1),
  new Boost("18.png", 1000, 10, "Хомяк", 2),
  new Boost("15.png", 5000, 50, "Ответы на ОГЭ", 3),
  new Boost("11.png", 10000, 150, "???", 4),
  new Boost("16.png", 15000, 500, "СССР", 5),
  new Boost("12.png", 30000, 1000, "Футбольный мячик", 6),
  new Boost("17.png", 50000, 2000, "ЕГЭ...", 7),
  new Boost("13.png", 100000, 5000, "Макс", 8),
];

var h = listH[0];
var b = listB[0];
var heroes = [0];
var boosts = [0];

function applyLanguageToUI() {
  const lang = TRANSLATIONS[currentLang] || TRANSLATIONS.ru;
  const tabBoosts = document.getElementById("tab-boosts");
  const tabHeroes = document.getElementById("tab-heroes");

  if (tabBoosts) tabBoosts.textContent = lang.tabBoosts;
  if (tabHeroes) tabHeroes.textContent = lang.tabHeroes;
}

function changeText() {
  if (h3) h3.innerText = `${score}`;
}

function updateProgressBar() {
  if (!progress) return;
  let percent = Math.min((score / h.max) * 100, 100);
  progress.style.display = "block";
  progress.style.width = percent + "%";
}

// Проверка и разблокировка скинов при кликах или покупках
function checkUnlockedHeroes() {
  listH.forEach((heroItem) => {
    // Если достигли нужного порога кристаллов и этот скин ещё не открыт
    if (score >= heroItem.price && !heroes.includes(heroItem.id)) {
      heroes.push(heroItem.id);
      selectHero(heroItem); // Автоматически переключаем активный скин
      if (currentTab === "heroes") {
        renderShop();
      }
    }
  });
}

function onHeroClick(event) {
  score += click;
  if (score > maxScore) {
    maxScore = score;
  }

  changeText();
  updateProgressBar();
  checkUnlockedHeroes();

  let clickX = event ? event.clientX : window.innerWidth / 2;
  let clickY = event ? event.clientY : window.innerHeight / 2;

  if (!event && heroButton) {
    const rect = heroButton.getBoundingClientRect();
    clickX = rect.left + rect.width / 2;
    clickY = rect.top + rect.height / 2;
  }

  const diamond = document.createElement("div");
  diamond.className = "flying-diamond";

  const offsetX = (Math.random() - 0.5) * 40;
  const offsetY = (Math.random() - 0.5) * 40;
  const startX = clickX + offsetX;
  const startY = clickY + offsetY;

  diamond.style.left = `${startX}px`;
  diamond.style.top = `${startY}px`;

  const targetImg = document.getElementById("diamond");
  let targetX = 0;
  let targetY = 0;

  if (targetImg) {
    const targetRect = targetImg.getBoundingClientRect();
    targetX = targetRect.left + targetRect.width / 2 - startX;
    targetY = targetRect.top + targetRect.height / 2 - startY;
  } else {
    targetX = window.innerWidth / 2 - startX;
    targetY = 50 - startY;
  }

  diamond.style.setProperty("--target-x", `${targetX}px`);
  diamond.style.setProperty("--target-y", `${targetY}px`);

  document.body.appendChild(diamond);

  setTimeout(() => {
    diamond.remove();
    if (progress_bar) {
      progress_bar.style.transform = "scale(1.03)";
      setTimeout(() => {
        progress_bar.style.transform = "scale(1)";
      }, 80);
    }
  }, 600);

  const clickText = document.createElement("div");
  clickText.className = "click-text";
  clickText.innerText = `+${click}`;
  clickText.style.left = `${startX}px`;
  clickText.style.top = `${startY - 20}px`;

  document.body.appendChild(clickText);

  setTimeout(() => {
    clickText.remove();
  }, 500);
}

function initHero(h_) {
  h = h_;
  if (hero) hero.src = `res/heroes/${h.icon}`;
  updateProgressBar();
}

function selectHero(heroItem) {
  h = heroItem;
  initHero(h);
}

function selectBoost(boostItem) {
  b = boostItem;
  baseClick = b.click;
  click = isX2Active ? baseClick * 2 : baseClick;
}

function switchTab(tabName) {
  currentTab = tabName;
  document
    .getElementById("tab-boosts")
    ?.classList.toggle("active", tabName === "boosts");
  document
    .getElementById("tab-heroes")
    ?.classList.toggle("active", tabName === "heroes");
  renderShop();
}

function renderShop() {
  if (!list) return;
  list.innerHTML = "";
  const lang = TRANSLATIONS[currentLang] || TRANSLATIONS.ru;

  if (currentTab === "boosts") {
    listB.forEach((item) => {
      const li = document.createElement("li");
      li.classList.add("list-item");

      const info = document.createElement("div");
      info.classList.add("list-item-info");

      const img = document.createElement("img");
      img.src = `res/boosts/${item.icon}`;

      const itemTitle = lang.boosts[item.id] || item.name;

      const h4 = document.createElement("h4");
      h4.textContent = `${itemTitle} (+${item.click})`;

      info.appendChild(img);
      info.appendChild(h4);
      li.appendChild(info);

      const button = document.createElement("button");

      if (boosts.includes(item.id)) {
        if (b.id === item.id) {
          button.textContent = lang.selected;
          button.style.backgroundColor = selectedColor;
        } else {
          button.textContent = lang.equip;
          button.style.backgroundColor = defaultColor;
        }

        button.addEventListener("click", () => {
          selectBoost(item);
          renderShop();
        });
      } else {
        button.textContent = item.price;
        button.style.backgroundColor = defaultColor;

        button.addEventListener("click", () => {
          if (score >= item.price) {
            score -= item.price;
            boosts.push(item.id);
            changeText();
            selectBoost(item);
            renderShop();
          }
        });
      }
      li.appendChild(button);
      list.appendChild(li);
    });
  } else {
    listH.forEach((item) => {
      const li = document.createElement("li");
      li.classList.add("list-item");

      const info = document.createElement("div");
      info.classList.add("list-item-info");

      const img = document.createElement("img");
      img.src = `res/heroes/${item.icon}`;

      const heroTitle = lang.heroes[item.id] || item.name;

      const h4 = document.createElement("h4");
      h4.textContent = heroTitle;

      info.appendChild(img);
      info.appendChild(h4);
      li.appendChild(info);

      const button = document.createElement("button");

      if (heroes.includes(item.id)) {
        if (h.id === item.id) {
          button.textContent = lang.selectedHero;
          button.style.backgroundColor = selectedColor;
        } else {
          button.textContent = lang.equip;
          button.style.backgroundColor = defaultColor;
        }

        button.addEventListener("click", () => {
          selectHero(item);
          renderShop();
        });
      } else {
        button.textContent = item.price;
        button.style.backgroundColor = disabledColor;
        button.disabled = true;
      }
      li.appendChild(button);
      list.appendChild(li);
    });
  }
}
function doubleClick() {
  isX2Active = true;
  click = baseClick * 2;
  hide_doubleClick();
  x2EndTime = Date.now() + 10000;
  if (h2) h2.innerText = `x2 (10)`;

  if (x2Interval) clearInterval(x2Interval);
  x2Interval = setInterval(() => {
    let remaining = Math.ceil((x2EndTime - Date.now()) / 1000);
    if (remaining <= 0) {
      clearInterval(x2Interval);
      x2Interval = null;
      isX2Active = false;
      click = baseClick;
      show_doubleClick();
    } else {
      if (h2) h2.innerText = `x2 (${remaining})`;
    }
  }, 200);
}

function hide_doubleClick() {
  if (ads) ads.style.display = "none";
  if (h2) h2.style.display = "flex";
}

function show_doubleClick() {
  if (ads) ads.style.display = "flex";
  if (h2) h2.style.display = "none";
}

function setDefaultState() {
  b = listB[0];
  h = listH[0];
  heroes = [0];
  boosts = [0];
  maxScore = score;
  applyLanguageToUI();
  selectHero(h);
  selectBoost(b);
  checkUnlockedHeroes();
  switchTab("boosts");
  changeText();
}

document.addEventListener("DOMContentLoaded", () => {
  setDefaultState();
});
