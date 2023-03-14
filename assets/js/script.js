// create variables that captures the element
var startButton = document.getElementById("start");
var landingPageSection = document.getElementById("landing-content");
var quizSection = document.getElementById("question-content");
var question = document.getElementById("question");
var optionContainer = document.querySelector(".option-container");
var answerCheckContainer = document.querySelector(".answer-check-container");

var timerCount;
var score = 0;
var availableQuestions = [];
var answerCheck = "";

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

// Start Quiz function

function startQuiz() {
  timerCount = 60;
  // Prevents start button from being clicked when round is in progress
  startButton.disabled = true;
  startTimer();
  availableQuestions = [...quizQuestions];
  askMCQs("0");
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

function askMCQs(questionNumber) {
  landingPageSection.classList.add("hide-section");
  quizSection.classList.add("show-section");

  // getting the question
  question.innerText = quizQuestions[questionNumber].question;

  // getting the options
  var op1 = document.getElementById("op1");
  var op2 = document.getElementById("op2");
  var op3 = document.getElementById("op3");
  var op4 = document.getElementById("op4");

  // getting the option text

  op1.innerText = "1. " + quizQuestions[questionNumber].answers[1];
  op2.innerText = "2. " + quizQuestions[questionNumber].answers[2];
  op3.innerText = "3. " + quizQuestions[questionNumber].answers[3];
  op4.innerText = "4. " + quizQuestions[questionNumber].answers[4];

  optionContainer.addEventListener("click", function (event) {
    if (event.target.matches(".option")) {
      var selectedOption = event.target.getAttribute("data-number");
      //console.log(selectedOption);

      if (selectedOption === quizQuestions[questionNumber].correctAnswer) {
        score += 10;
        answerCheck = `<span class="check-answer"> Correct! </span>`;
      } else {
        score += 0;
        timerCount -= 10;
        answerCheck = `<span class="check-answer"> Wrong! </span>`;
      }
      answerCheckContainer.innerHTML = answerCheck;
      questionNumber++;
      askMCQs(questionNumber);
    }
  });
}

// Attach event listener to start button to call startQuiz function on click
startButton.addEventListener("click", startQuiz);
