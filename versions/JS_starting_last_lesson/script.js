"use strict"; 
// The purpose of "use strict" is to indicate 
// that the code should be executed in "strict mode".
// read more at https://www.w3schools.com/js/js_strict.asp



// game settings
const gameDuration = 10 * 1000; // 10 seconds
const popDuration = 0.75 * 1000; // 0.75 seconds

// reference for the game's HTML elements
const scoreBoard = document.querySelector("#score-number");
const holes = document.querySelectorAll(".hole");
const moles = document.querySelectorAll(".mole");
moles.forEach(mole => mole.addEventListener("click", bonk));

// game state
let isGameInProgress = false; 
let score = 0; // initial score is 0

function randomHole(holes) {
  const index = Math.floor(Math.random() * holes.length);
  const hole = holes[index];
  return hole;
}

function peep() {
  const hole = randomHole(holes);
  hole.classList.add("up");
  setTimeout(function() {
    hole.classList.remove("up");
    if (!isGameInProgress) {
      peep();
    }
  }, popDuration);
}

function bonk() {
  score = score + 1;
  this.parentNode.classList.remove("up");
  scoreBoard.textContent = "Score: " + score;
}

function startGame() {
  scoreBoard.textContent = "Score: " + 0;
  isGameInProgress = false;
  score = 0;
  peep();
  setTimeout(function() {
    isGameInProgress = true;
  }, gameDuration);
}

