// create variables that captures the element
var startButton = document.getElementById("start");

var timerCount;

// Start Quiz function

function startQuiz() {
  timerCount = 10;
  // Prevents start button from being clicked when round is in progress
  startButton.disabled = true;
  startTimer();
}

// Adding Timer Functionality

var timeEl = document.querySelector(".timer-display");

var timerDisplayEl = document.getElementById("timer");

function startTimer() {
  // Sets interval in variable
  var timerInterval = setInterval(function () {
    timerCount--;
    timeEl.textContent = "Time: " + timerCount;
    console.log(timerCount);
    if (timerCount === 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
    }
  }, 1000);
}

// Attach event listener to start button to call startQuiz function on click
startButton.addEventListener("click", startQuiz);
