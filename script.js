// Elements
const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const gameOverScreen = document.getElementById("game-over-screen");
const playerNameInput = document.getElementById("player-name");
const questionText = document.getElementById("question-text");
const questionImage = document.getElementById("question-image");
const optionsContainer = document.getElementById("options-container");
const feedback = document.getElementById("feedback");
const finalScore = document.getElementById("final-score");
const playMusicBtn = document.getElementById("play-music");
const pauseMusicBtn = document.getElementById("pause-music");
const backgroundMusic = document.getElementById("background-music");

// Variables
let playerName = "";
let score = 0;
let questionIndex = 0;

// Questions
const questions = [
  {
    text: "What climate is known for hot, humid conditions year-round?",
    image: "tropical.webp",
    options: ["Desert", "Tropical", "Polar", "Temperate"],
    correct: "Tropical"
  },
  {
    text: "Which climate has very little rainfall and is known for extreme dryness?",
    image: "desert.webp",
    options: ["Mediterranean", "Desert", "Rainforest", "Polar"],
    correct: "Desert"
  },
  {
    text: "What climate is characterized by cold temperatures and ice all year?",
    image: "polar.webp",
    options: ["Temperate", "Desert", "Polar", "Tropical"],
    correct: "Polar"
  },
  {
    text: "Which climate has four distinct seasons, including warm summers and cold winters?",
    image: "temperate.webp",
    options: ["Tropical", "Mediterranean", "Temperate", "Polar"],
    correct: "Temperate"
  },
  {
    text: "What climate is found along coasts and has mild, wet winters and hot, dry summers?",
    image: "mediterranean.webp",
    options: ["Mediterranean", "Tundra", "Tropical", "Desert"],
    correct: "Mediterranean"
  },
  {
    text: "Which climate is known for having dry seasons with short bursts of rain?",
    image: "savanna.webp",
    options: ["Rainforest", "Savanna", "Polar", "Desert"],
    correct: "Savanna"
  },
  {
    text: "What type of climate is found in high mountain areas and has cooler temperatures year-round?",
    image: "alpine.webp",
    options: ["Tropical", "Desert", "Alpine", "Temperate"],
    correct: "Alpine"
  },
  {
    text: "Which climate experiences intense rainfall and has dense vegetation year-round?",
    image: "rainforest.webp",
    options: ["Polar", "Rainforest", "Temperate", "Savanna"],
    correct: "Rainforest"
  },
  {
    text: "What climate is found in the far northern areas with freezing temperatures most of the year?",
    image: "tundra.webp",
    options: ["Tundra", "Mediterranean", "Desert", "Temperate"],
    correct: "Tundra"
  },
  {
    text: "Which climate has short summers and is known for its permafrost?",
    image: "arctic.webp",
    options: ["Desert", "Tropical", "Arctic", "Mediterranean"],
    correct: "Arctic"
  }
];

// Functions
function startGame() {
  playerName = playerNameInput.value.trim();
  if (playerName === "") {
    alert("Please enter your name.");
    return;
  }
  score = 0;
  questionIndex = 0;
  startScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");
  loadQuestion();
}

function loadQuestion() {
  if (questionIndex < questions.length) {
    const currentQuestion = questions[questionIndex];
    questionText.textContent = currentQuestion.text;
    questionImage.src = currentQuestion.image;
    optionsContainer.innerHTML = "";
    feedback.textContent = "";
    
    currentQuestion.options.forEach(option => {
      const button = document.createElement("button");
      button.textContent = option;
      button.classList.add("option-btn");
      button.onclick = () => checkAnswer(option, button);
      optionsContainer.appendChild(button);
    });
  } else {
    endGame();
  }
}

function checkAnswer(selectedOption, button) {
  const correctOption = questions[questionIndex].correct;
  const optionButtons = optionsContainer.getElementsByClassName("option-btn");

  if (selectedOption === correctOption) {
    button.classList.add("correct");
    feedback.textContent = "Correct!";
    feedback.style.color = "green";
    score++;
  } else {
    button.classList.add("incorrect");
    feedback.textContent = "Incorrect!";
    feedback.style.color = "red";
    
    Array.from(optionButtons).forEach(btn => {
      if (btn.textContent === correctOption) {
        btn.classList.add("correct");
      }
    });
  }

  setTimeout(() => {
    questionIndex++;
    loadQuestion();
  }, 2000);
}

function endGame() {
  gameScreen.classList.add("hidden");
  gameOverScreen.classList.remove("hidden");
  finalScore.textContent = `${playerName}, your score is ${score}/${questions.length}.`;
}

function restartGame() {
  gameOverScreen.classList.add("hidden");
  startScreen.classList.remove("hidden");
  playerNameInput.value = "";
}

function playMusic() {
  backgroundMusic.play();
  playMusicBtn.classList.add("hidden");
  pauseMusicBtn.classList.remove("hidden");
}

function pauseMusic() {
  backgroundMusic.pause();
  playMusicBtn.classList.remove("hidden");
  pauseMusicBtn.classList.add("hidden");
}

// Event Listeners
document.getElementById("start-game").addEventListener("click", startGame);
document.getElementById("restart-game").addEventListener("click", restartGame);
playMusicBtn.addEventListener("click", playMusic);
pauseMusicBtn.addEventListener("click", pauseMusic);
