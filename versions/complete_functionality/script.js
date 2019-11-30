"use strict";

// nodes
const holes = document.querySelectorAll(".hole");
const scoreBoard = document.querySelector(".score");
const moles = document.querySelectorAll(".mole");

// game state
let lastHole;
let timeUp = false;
let score = 0;

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];
  if (hole === lastHole) {
    console.log("rolled same hole agian. rerolling...");
    return randomHole(holes);
  }
  lastHole = hole;
  return hole;
}

function rollForUnicorn() {
    return (Math.random() < 0.5);
}

function peep() {
  const time = randomTime(200, 1000);
  const hole = randomHole(holes);
  const gotUnicorn = rollForUnicorn()
  hole.classList.add("up");
  if (gotUnicorn) {
    hole.classList.add("unicorn");
  }
  setTimeout(() => {
    hole.classList.remove("up");
    if (gotUnicorn) {
        hole.classList.remove("unicorn");
      }
    if (!timeUp) peep();
  }, time);
}

function startGame() {
  scoreBoard.textContent = 0;
  timeUp = false;
  score = 0;
  peep();
  setTimeout(() => (timeUp = true), 10000);
}

function bonk(e) {
  if (!e.isTrusted) return;
  score++;
  this.parentNode.classList.remove("up");
  scoreBoard.textContent = score;
}

moles.forEach(mole => mole.addEventListener("click", bonk));
