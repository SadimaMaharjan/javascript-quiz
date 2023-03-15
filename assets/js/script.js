//getting the elements from HTML and assigning them to variables

var startButton = document.getElementById("startQuiz");
var landingContainer = document.getElementById("landing-container");
var quizContainer = document.getElementById("quiz-container");
var questionEl = document.getElementById("question");
var optionsEl = document.getElementById("options");
var answerCheckContainer = document.querySelector(".answer-check-container");
var scoreContainer = document.getElementById("score-container");
var scoreFinal = document.getElementById("score");
var submitScoreButton = document.getElementById("submit-score");
var userInitials = document.getElementById("initials");
var highscoresContainer = document.getElementById("highscores-container");
var scoreBoard = document.getElementById("score-board");
var goBackButton = document.getElementById("go-back");
var clearHighscoresButton = document.getElementById("clear-highscores");
var viewScoresLink = document.getElementById("view-scores");

// create variables that captures the element

var timerInterval;
var timerCount = 60;
var score = 0;
var currentQuestionNumber = 0;
var answerCheck = "";
var scoreCheck = "";
var highScores = [];

var quizQuestions = [
  {
    questionNumber: 0,
    question: "Commonly used data types DO NOT include:",
    answers: {
      1: "strings",
      2: "booleans",
      3: "alerts",
      4: "numbers",
    },
    correctAnswer: "3",
  },
  {
    questionNumber: 1,
    question:
      "The condition in an if/else statement is enclosed within ______.",
    answers: {
      1: "quotes",
      2: "curly brackets",
      3: "parentheses",
      4: "square brackets",
    },
    correctAnswer: "3",
  },
  {
    questionNumber: 2,
    question: "Arrays in JavaScript can be used to store ______.",
    answers: {
      1: "numbers and strings",
      2: "other arrays",
      3: "booleans",
      4: "all of the above",
    },
    correctAnswer: "4",
  },
  {
    questionNumber: 3,
    question:
      "String values must be enclosed within  ______ when being assigned to variables.",
    answers: {
      1: "commas",
      2: "curly brackets",
      3: "quotes",
      4: "parentheses",
    },
    correctAnswer: "3",
  },
  {
    questionNumber: 4,
    question:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    answers: {
      1: "JavaScript",
      2: "terminal/bash",
      3: "For loops",
      4: "console.log",
    },
    correctAnswer: "4",
  },
];

// Attach event listener to start button to call startQuiz function on click
startButton.addEventListener("click", startQuiz);
var timeEl = document.querySelector(".timer-display");

// Start Quiz function

function startQuiz() {
  landingContainer.classList.add("hide-section");
  quizContainer.classList.add("show-section");
  scoreContainer.classList.add("hide-section");
  highscoresContainer.classList.add("hide-section");
  startTimer();
  askQuestion();
}

// Starts timer
function startTimer() {
  // Sets interval in variable
  timerInterval = setInterval(function () {
    timerCount--;
    timeEl.textContent = "Time: " + timerCount;
    //console.log(timerCount);
    if (timerCount === 0) {
      // Stops execution of action at set interval
      stopTimer();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

// Function to display Multiple Choice Questions

function askQuestion() {
  // getting the question
  questionEl.textContent = quizQuestions[currentQuestionNumber].question;

  // loop through options for each question
  for (var i = 0; i < optionsEl.children.length; i++) {
    optionsEl.children[i].textContent = `${i + 1}. ${
      quizQuestions[currentQuestionNumber].answers[i + 1]
    } `;
  }
}
// handle option click event
optionsEl.addEventListener("click", function (event) {
  if (event.target.matches(".option")) {
    checkAnswer(event.target);
    nextQuestion();
  }
});

function checkAnswer(answer) {
  var selectedOption = answer.getAttribute("data-number");
  if (selectedOption === quizQuestions[currentQuestionNumber].correctAnswer) {
    score += 10;
    answerCheck = `<span class="check-answer"> Correct! </span>`;
  } else {
    timerCount -= 10;
    answerCheck = `<span class="check-answer"> Wrong! </span>`;
  }
  answerCheckContainer.innerHTML = answerCheck;
}

function nextQuestion() {
  currentQuestionNumber++;
  if (currentQuestionNumber < quizQuestions.length) {
    askQuestion();
  } else {
    stopTimer();
    quizContainer.classList.remove("show-section");
    quizContainer.classList.add("hide-section");
    answerCheckContainer.classList.add("hide-section");
    displayScore();
  }
}

function displayScore() {
  scoreContainer.classList.remove("hide-section");
  scoreContainer.classList.add("show-section");
  scoreFinal.textContent = score;
  submitScoreButton.addEventListener("click", function () {
    if (userInitials.value.trim()) {
      var userScores = {
        username: userInitials.value.trim(),
        score: scoreFinal.textContent,
      };
      highScores.push(userScores);
      localStorage.setItem("scores", JSON.stringify(highScores));
      //console.log(highScores);
      displayHighscores();
    }
  });
}

viewScoresLink.addEventListener("click", function () {
  displayHighscores();
});

function displayHighscores() {
  landingContainer.classList.add("hide-section");
  scoreContainer.classList.add("hide-section");
  scoreContainer.classList.remove("show-section");
  highscoresContainer.classList.remove("hide-section");
  highscoresContainer.classList.add("show-section");
  highScores = JSON.parse(localStorage.getItem("scores"));

  for (var i = 0; i < highScores.length; i++) {
    var individualScore = document.createElement("div");
    individualScore.textContent = `${i + 1}. ${highScores[i].username}- ${
      highScores[i].score
    }`;
    console.log(individualScore);
    scoreBoard.appendChild(individualScore);
  }
}

goBackButton.addEventListener("click", function () {
  highscoresContainer.classList.remove("show-section");
  landingContainer.classList.remove("hide-section");
  landingContainer.classList.add("show-section");
});

clearHighscoresButton.addEventListener("click", function () {});
