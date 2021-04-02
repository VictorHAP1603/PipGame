'use strict';
// Players

const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');

// Scores

let score = 0;

// Every Fields Importants

const scorePlayer1 = document.querySelector('.player--0 .score');
const currentScorePlayer1 = document.querySelector('.player--0 .current-score');

const scorePlayer2 = document.querySelector('.player--1 .score');
const currentScorePlayer2 = document.querySelector('.player--1 .current-score');

// CurrentValue
let currentValue = 0;

// Buttons
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

// IMG
const dice = document.querySelector('.dice');

function currentPlayer() {
  const playerActive = document.querySelector('.player--active');
  const current = playerActive.querySelector('.current-score');
  const scorePlayer = playerActive.querySelector('.score');

  return { playerActive, current, scorePlayer };
}

function changePlayer() {
  const classActive = 'player--active';
  currentPlayer();

  currentValue = 0;
  score = 0;

  if (player1.classList.contains(classActive)) {
    player2.classList.add(classActive);
    player1.classList.remove(classActive);
  } else {
    player2.classList.remove(classActive);
    player1.classList.add(classActive);
  }
}

function numberOfTheDice() {
  const numberDice = Math.floor(Math.random() * (7 - 1) + 1);

  return numberDice;
}

function rollTheDice() {
  const numberDice = numberOfTheDice();
  const img = `dice-${numberDice}.png`;

  dice.style.display = 'block';
  dice.src = img;

  calculateCurrentActive(numberDice);
}

function calculateCurrentActive(numberDice) {
  const { current } = currentPlayer();
  currentValue += numberDice;

  if (numberDice === 1) {
    currentValue = 0;
    current.innerHTML = '0';
    changePlayer();
    return;
  }

  current.innerHTML = `${currentValue}`;
}

function holdTheValue() {
  const { current, scorePlayer } = currentPlayer();

  let valueScore = +scorePlayer.innerHTML;
  let valueAtual = +current.innerHTML;
  valueScore += valueAtual;

  scorePlayer.innerHTML = valueScore;

  if (valueScore >= 100) {
    finishGame();
  } else {
    changePlayer();
  }

  current.innerHTML = '0';
  currentValue = 0;
}

function finishGame() {
  const classWinner = 'player--winner';
  let { playerActive } = currentPlayer();

  playerActive.classList.add(classWinner);

  btnHold.disabled = true;
  btnRoll.disabled = true;
}

function resetGame() {
  const classWinner = 'player--winner';
  const classActive = 'player--active';
  let { playerActive } = currentPlayer();

  playerActive.classList.remove(classWinner);
  playerActive.classList.remove(classActive);

  player1.classList.add(classActive);

  btnHold.disabled = false;
  btnRoll.disabled = false;

  currentValue = 0;
  score = 0;

  scorePlayer1.innerHTML = '0';
  currentScorePlayer1.innerHTML = '0';
  scorePlayer2.innerHTML = '0';
  currentScorePlayer2.innerHTML = '0';
}

btnRoll.addEventListener('click', rollTheDice);
btnHold.addEventListener('click', holdTheValue);
btnNew.addEventListener('click', resetGame);
