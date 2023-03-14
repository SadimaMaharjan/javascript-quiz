// create variables that captures the element
var startButton = document.getElementById("start");
var landingPageSection = document.getElementById("landing-content");
var quizSection = document.getElementById("question-content");
var question = document.getElementById("question");
var optionContainer = document.querySelector(".option-container");
var answerCheckContainer = document.querySelector(".answer-check-container");

var timerCount;
var score = 0;
//var questionCounter = 0;
var availableQuestions = [];
var currentQuestion = {};
var htmlOptionContent = "";
var answerCheck = "";

var quizQuestions = [
  {
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

// Start Quiz function

function startQuiz() {
  timerCount = 60;
  // Prevents start button from being clicked when round is in progress
  startButton.disabled = true;
  startTimer();
  askMCQs();
}

// Adding Timer Functionality

var timeEl = document.querySelector(".timer-display");

var timerDisplayEl = document.getElementById("timer");

function startTimer() {
  // Sets interval in variable
  var timerInterval = setInterval(function () {
    timerCount--;
    timeEl.textContent = "Time: " + timerCount;
    //console.log(timerCount);
    if (timerCount === 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
    }
  }, 1000);
}

// Function to display Multiple Choice Questions

function askMCQs() {
  landingPageSection.classList.add("hide-section");
  quizSection.classList.add("show-section");

  for (var i = 0; i < quizQuestions.length - 1; i++) {
    currentQuestion = quizQuestions[i];

    question.innerText = currentQuestion.question;

    htmlOptionContent += `<button class="option" data-number="${i + 1}">${
      i + 1
    }. ${currentQuestion.answers[i + 1]}</button>`;

    optionContainer.innerHTML = htmlOptionContent;

    optionContainer.addEventListener("click", function (event) {
      if (event.target.matches(".option")) {
        var selectedOption = event.target.getAttribute("data-number");

        if (selectedOption === currentQuestion.correctAnswer) {
          score += 10;
          answerCheck += `<span class="check-answer"> Correct! </span>`;
          answerCheckContainer.innerHTML = answerCheck;
        } else {
          score += 0;
          timerCount -= 10;
          answerCheck += `<span class="check-answer"> Wrong! </span>`;
          answerCheckContainer.innerHTML = answerCheck;
        }
      }
    });
  }

  //questionCounter++;

  //var questionIndex = Math.floor(Math.random() * availableQuestions.length);

  //currentQuestion = availableQuestions[questionIndex];
}

// Attach event listener to start button to call startQuiz function on click
startButton.addEventListener("click", startQuiz);
