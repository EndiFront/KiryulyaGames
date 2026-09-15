const questions = [
  {
    q: "Твой будильник звонит в 7:00 утра. Твои действия?",
    options: [
      {
        text: "Отдаю приказ дворцовой страже выключить этот дьявольский прибор",
        targets: ["Царь Кирилл 1", "Король Англии Кириллио"],
      },
      {
        text: "Разбиваю будильник одним ударом мизинца",
        targets: ["Скала Кирюля", "Кирюля Терминатор"],
      },
      {
        text: "Поворачиваюсь на другой бок и сплю до 15:00. Жизнь - это сон",
        targets: ["Кирюля-патрик", "Обычный Кирилл"],
      },
      {
        text: "Делаю подкат к тумбочке и забиваю будильник головой в угол комнаты",
        targets: ["Кирюля Футболист", "Ганве-Кирюля"],
      },
    ],
  },
  {
    q: "В магазине тебе недодали 5 рублей сдачи. Что предпримешь?",
    options: [
      {
        text: "Отказываюсь от этих грошей, чтобы не светить миллиардным состоянием",
        targets: ["Кирюля Эпштейн", "Король Англии Кириллио"],
      },
      {
        text: "Сканирую кассира инфракрасным зрением и требую возврат энергии",
        targets: ["Кирюля Терминатор", "Скала Кирюля"],
      },
      {
        text: "Дарю кассирше розу и говорю, что 5 рублей - это плата за её улыбку",
        targets: ["Кирюля Ромео"],
      },
      {
        text: "Вздыхаю, стесняюсь сказать и грустно ухожу домой",
        targets: ["Обычный Кирилл", "Кирюля-патрик"],
      },
    ],
  },
  {
    q: "Чем питается настоящий Кирюля?",
    options: [
      {
        text: "Омарами под соусом из слёз моих врагов",
        targets: ["Царь Кирилл 1", "Кирюля Эпштейн"],
      },
      {
        text: "Сырыми куриными яйцами вместе со скорлупой и протеином",
        targets: ["Скала Кирюля", "Кирюля Терминатор"],
      },
      {
        text: "Пельменями из пачки, приготовленными в микроволновке",
        targets: ["Обычный Кирилл", "Кирюля-патрик"],
      },
      {
        text: "Семечками на лавочке перед важнейшим дворовым матчем",
        targets: ["Кирюля Футболист", "Ганве-Кирюля"],
      },
    ],
  },
  {
    q: "Как ты добираешься до работы или колледжа?",
    options: [
      {
        text: "Меня везёт карета, запряженная четвёркой породистых коней",
        targets: ["Король Англии Кириллио", "Царь Кирилл 1"],
      },
      {
        text: "Иду пешком, продавливая асфальт каждым шагом",
        targets: ["Скала Кирюля"],
      },
      {
        text: "Лечу на частном джете, избегая налоги",
        targets: ["Кирюля Эпштейн"],
      },
      {
        text: "Еду в забитой маршрутке и надеюсь, что меня никто не тронет",
        targets: ["Обычный Кирилл", "Кирюля-патрик"],
      },
    ],
  },
  {
    q: "Ты видишь перед собой подозрительную лужу. Что сделаешь?",
    options: [
      {
        text: "Осушу её своим авторитетным взглядом",
        targets: ["Скала Кирюля", "Кирюля Терминатор"],
      },
      {
        text: "Прыгну в неё с разбегу, потому что жизнь одна",
        targets: ["Кирюля-патрик", "Ганве-Кирюля"],
      },
      {
        text: "Перепрыгну элегантным финтом «Радуга»",
        targets: ["Кирюля Футболист"],
      },
      {
        text: "Напишу в ней пальцем имя любимой девушки",
        targets: ["Кирюля Ромео"],
      },
    ],
  },
  {
    q: "Какую музыку ты слушаешь, когда никто не видит?",
    options: [
      {
        text: "Звук работающего двигателя танка или тяжелого пресса",
        targets: ["Кирюля Терминатор", "Скала Кирюля"],
      },
      {
        text: "Фанк и бассбустед гимн Лиги Чемпионов",
        targets: ["Кирюля Футболист", "Ганве-Кирюля"],
      },
      {
        text: "Грустные треки про неразделённую любовь в 3 часа ночи",
        targets: ["Кирюля Ромео", "Обычный Кирилл"],
      },
      { text: "Шум океана и звуки спанья", targets: ["Кирюля-патрик"] },
    ],
  },
  {
    q: "Твоё главное оружие в споре:",
    options: [
      {
        text: "Приказ о ссылке оппонента в Сибирь",
        targets: ["Царь Кирилл 1"],
      },
      {
        text: "Фраза «I'll be back» и тяжелый взгляд",
        targets: ["Кирюля Терминатор"],
      },
      { text: "Поэтический монолог на 40 минут", targets: ["Кирюля Ромео"] },
      {
        text: "Фраза «Ну ладно, ты прав» и уход в туман",
        targets: ["Обычный Кирилл", "Кирюля-патрик"],
      },
    ],
  },
  {
    q: "Какой у тебя идеальный отпуск?",
    options: [
      {
        text: "На секретном острове в компании мировой элиты",
        targets: ["Кирюля Эпштейн"],
      },
      {
        text: "На качалке под открытым небом в Венеции",
        targets: ["Скала Кирюля"],
      },
      {
        text: "Под камнем на дне океана, где нет интернета",
        targets: ["Кирюля-патрик"],
      },
      {
        text: "Сборы в Подмосковье с двухразовыми тренировками",
        targets: ["Кирюля Футболист", "Ганве-Кирюля"],
      },
    ],
  },
  {
    q: "Твой главный жизненный страх:",
    options: [
      {
        text: "Забыть купить майонез к макаронам",
        targets: ["Обычный Кирилл"],
      },
      { text: "Пропустить день ног в тренажёрке", targets: ["Скала Кирюля"] },
      {
        text: "Потерять корону во время коронации",
        targets: ["Король Англии Кириллио", "Царь Кирилл 1"],
      },
      {
        text: "Забить гол в свои ворота на 90-й минуте",
        targets: ["Кирюля Футболист"],
      },
    ],
  },
  {
    q: "Если бы ты мог изменить один закон физики, что бы ты сделал?",
    options: [
      {
        text: "Отменил гравитацию, чтобы мяч летел вечно",
        targets: ["Кирюля Футболист", "Ганве-Кирюля"],
      },
      {
        text: "Сделал бы так, чтобы лень вырабатывала электричество",
        targets: ["Кирюля-патрик"],
      },
      {
        text: "Запретил бы старение для себя и своей любимой",
        targets: ["Кирюля Ромео"],
      },
      {
        text: "Увеличил бы массу своих бицепсов в два раза",
        targets: ["Скала Кирюля", "Кирюля Терминатор"],
      },
    ],
  },
];

const characterDetails = {
  "Кирюля Эпштейн": {
    desc: "Тайный кукловод, владелец секретных островов и просто человек, у которого слишком много связей.",
    img: "images/epstein.png",
  },
  "Царь Кирилл 1": {
    desc: "Повелитель земель и диванов. Твой указ - закон, а кто не согласен - отправляется мыть посуду.",
    img: "images/tsar.png",
  },
  "Кирюля-патрик": {
    desc: "Гений лени и мастер лежания. Твой дом - под камнем, твоя цель - выспаться.",
    img: "images/patrick.png",
  },
  "Король Англии Кириллио": {
    desc: "Изысканный аристократ. Пьёшь чай с оттопыренным мизинцем даже если это растворимый 3-в-1.",
    img: "images/king.png",
  },
  "Скала Кирюля": {
    desc: "Чистый гранит и харизма. Твои мышцы настолько суровы, что одежда рвётся сама.",
    img: "images/rock.png",
  },
  "Кирюля Футболист": {
    desc: "Звезда дворового футбола. Мечтаешь о Золотом мяче, но пока получаешь только по ногам.",
    img: "images/footballer.png",
  },
  "Кирюля Терминатор": {
    desc: "Машина без эмоций. Твой процессор настроен только на выполнение задач и поедание белка.",
    img: "images/terminator.png",
  },
  "Кирюля Ромео": {
    desc: "Главный романтик района. Пишешь стихи в заметках и влюбляешься по 5 раз в день.",
    img: "images/romeo.png",
  },
  "Ганве-Кирюля": {
    desc: "Пепе Шнеле Ватафа",
    img: "images/gunway.png",
  },
  "Обычный Кирилл": {
    desc: "Просто нормальный парень. Самый редкий вид Кирюли в этой галактике.",
    img: "images/ordinary.png",
  },
};

let currentQuestion = 0;
let scores = {};
let activeQuestions = [];

const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const stepCounter = document.getElementById("step-counter");
const progress = document.getElementById("progress");

const resultOverlay = document.getElementById("result-overlay");
const resultTitle = document.getElementById("result-title");
const resultDesc = document.getElementById("result-desc");
const resultImg = document.getElementById("result-img");
const resultPlaceholder = document.getElementById("result-placeholder");
const restartBtn = document.getElementById("restart-btn");

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function getRandomItem(arr) {
  const cryptoArr = new Uint32Array(1);
  window.crypto.getRandomValues(cryptoArr);
  return arr[cryptoArr[0] % arr.length];
}

function initQuiz() {
  currentQuestion = 0;
  scores = {};
  activeQuestions = shuffleArray(questions);
  resultOverlay.classList.add("hidden");
  renderQuestion();
}

function renderQuestion() {
  const qData = activeQuestions[currentQuestion];
  questionText.textContent = qData.q;
  stepCounter.textContent = `Вопрос ${currentQuestion + 1} из ${activeQuestions.length}`;
  progress.style.width = `${((currentQuestion + 1) / activeQuestions.length) * 100}%`;

  optionsContainer.innerHTML = "";

  const shuffledOptions = shuffleArray(qData.options);

  shuffledOptions.forEach((opt) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = opt.text;
    btn.addEventListener("click", () => handleSelect(opt.targets));
    optionsContainer.appendChild(btn);
  });
}

function handleSelect(targets) {
  const chosenTarget = getRandomItem(targets);
  scores[chosenTarget] = (scores[chosenTarget] || 0) + 1;

  currentQuestion++;

  if (currentQuestion < activeQuestions.length) {
    renderQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  let maxScore = -1;
  let topCandidates = [];

  for (const [character, count] of Object.entries(scores)) {
    if (count > maxScore) {
      maxScore = count;
      topCandidates = [character];
    } else if (count === maxScore) {
      topCandidates.push(character);
    }
  }

  const winner = getRandomItem(topCandidates);
  const details = characterDetails[winner] || { desc: "", img: "" };

  resultTitle.textContent = winner;
  if (resultDesc) {
    resultDesc.textContent = details.desc;
  }

  if (details.img && details.img.trim() !== "") {
    resultImg.src = details.img;
    resultImg.classList.remove("hidden");
    resultPlaceholder.classList.add("hidden");
  } else {
    resultImg.classList.add("hidden");
    resultPlaceholder.classList.remove("hidden");
  }

  resultOverlay.classList.remove("hidden");
}

restartBtn.addEventListener("click", initQuiz);

initQuiz();