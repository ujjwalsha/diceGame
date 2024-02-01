'use strict';
const playBtn = document.querySelector('.btn');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const playerInfo = document.querySelector('.player-info');
const knowBtn = document.querySelector('.know');
const submitButton = document.querySelector('.submitBtn');
const popupMenu = document.querySelector('.popup-menu');
const closePopup = document.querySelector('.close-popup');
const headContainer = document.querySelector('.head-container');
const playerOne = document.querySelector('[player-1]');
const playerTwo = document.querySelector('[player-2]');
let GameDisplay = document.querySelector('.window');
const backBtn = document.querySelector('.back');
const moreInfo = document.querySelector('[moreInfo]');
const container = document.getElementById('wrapper');
const helpAndFaq = document.querySelector('.help-and-faq');
const btnRoll = document.querySelector('.roll');
const resetBtn = document.querySelector('.reset');
const diceEl = document.querySelector('.dice');

setInterval(animate, 1000);
setInterval(startAnimate, 8000);
GameDisplay.classList.add('hidden');

let playing = true;

function animate() {
  playBtn.style.animation = 'none';
}
function startAnimate() {
  playBtn.style.animation = 'shake 0.5s linear infinite';
}

//--------function for play button ---------///

playBtn.addEventListener('click', function () {
  console.log('this is play button');
  playBtn.classList.add('hidden');
  playerInfo.style.display = 'flex';
});

//--------------function for know how to play the game---------//

knowBtn.addEventListener('click', function () {
  popupMenu.style.display = 'flex';
  popupMenu.style.transition = 'transform 0.7s ease-in-out';
});

//------------close the popup menu---------------//

closePopup.addEventListener('click', function () {
  popupMenu.classList.add('hidden');
  popupMenu.style.display = 'none';
});

function closeAll() {
  headContainer.classList.add('hidden');
  playerInfo.style.display = 'none';
  GameDisplay.classList.add('hidden');
}

function openAll() {
  headContainer.classList.remove('hidden');
  playerInfo.style.display = 'flex';
  GameDisplay.classList.add('hidden');
}

const div = document.createElement('div');
div.classList.add('more-info-detail');

function moreInfoDetail() {
  div.innerHTML = `
  <ul>
    <li class = "help-and-faq"><i class="fa-solid fa-info"></i>Help and FAQ</li>
    <li class = "report- bug"><i class="fa-solid fa-bug"></i>Report Bug</li>
    <li class = "keyboard-shortcut"><i class="fa-solid fa-keyboard"></i>keyboard Shortcut</li>
    <li class = "about-me"><i class="fa-solid fa-user"></i>About me</li>
  </ul>
 `;

  container.appendChild(div);
}

let cnt = 0;

//-----------moreinfo button--------------
moreInfo.addEventListener('click', function () {
  cnt++;
  console.log('your count is ', cnt);
  div.innerHTML = '';

  if (cnt % 2 == 0) {
    div.classList.remove('more-info-detail');
    // div.innerHTML = '';
    // div.style.display = 'none';
  } else {
    moreInfoDetail();
    div.classList.add('more-info-detail');
  }
});

const dataCurrent = document.querySelector('[data-currentscore]');

// -----------rendering game window--------------//
function renderingGame() {
  GameDisplay.classList.remove('hidden');
  const player1 = document.querySelector('[data-name]');
  const player2 = document.querySelector('[data-name0]');

  const dataCurrent0 = document.querySelector('[data-currentscore0]');
  player1.innerHTML = playerOne.value;
  player2.innerHTML = playerTwo.value;
}

const popupError = document.querySelector('.popup-error');
const closeError = document.querySelector('.close-error');
closeError.addEventListener('click', function () {
  popupError.style.display = 'none';
  playerOne.value = '';
  playerTwo.value = '';
});

//submit the game for entering in original game------------//

submitButton.addEventListener('click', function () {
  if (playerOne.value == '' || playerTwo == '') {
    playerOne.classList.add('error');
    playerTwo.classList.add('error');

    setTimeout(() => {
      console.log('this is shake');
      playerOne.classList.remove('error');
      playerTwo.classList.remove('error');
    }, 1000);
  } else if (playerOne.value == playerTwo.value) {
    console.log('this is same');
    popupError.style.display = 'flex';
  } else {
    closeAll();
    renderingGame();
  }
});

function emptyValue() {
  playerOne.value = '';
  playerTwo.value = '';
}

emptyValue();

backBtn.addEventListener('click', function () {
  console.log('this is ujjwal');
  openAll();
  emptyValue();
});

document.addEventListener('keydown', e => {
  // console.log(e);
  if (e.keyCode == 13) {
    closeAll();
    renderingGame();
  }
});

diceEl.classList.add('hidden');
let currentScore = 0;
let activePlayer = 0;
let mainScore = 0;
const score = [0, 0];

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// roll the dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    // generate random number
    const random = Math.trunc(Math.random() * 6) + 1;
    console.log(random);

    diceEl.classList.remove('hidden');
    diceEl.src = `assets/dice-${random}.svg`;

    if (random !== 1) {
      currentScore += random;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

const btnHold = document.querySelector('.hold');
const overlay = document.querySelector('.overlay');
const winnerLos = document.querySelector('.winner--loser');
btnHold.addEventListener('click', function () {
  console.log('Hii there!😊');

  score[activePlayer] += currentScore;
  // console.log(score[activePlayer]);
  // store the value on main score

  document.getElementById(`score--${activePlayer}`).innerHTML =
    score[activePlayer];

  if (score[activePlayer] >= 20) {
    playing = false;
    diceEl.classList.add('hidden');
    overlay.classList.remove('hidden');
    winnerLos.classList.remove('hidden');
    let name = document.getElementById(`name--${activePlayer}`).innerHTML;
    // document.querySelector('.player--active').style.backgroundColor = 'blue';
    // console.log('name of player', name);
    document.querySelector('[winner-name]').innerHTML =
      name + ' ' + 'winner! 🥇';

    console.log('player is win');
  } else {
    switchPlayer();
  }
});

const resetGame = function () {
  playing = true;
  diceEl.classList.remove('hidden');
  currentScore = 0;
  score[activePlayer] = 0;

  document.getElementById(`score--1`).textContent = 0;
  document.getElementById(`current--1`).textContent = 0;
  document.getElementById(`score--0`).textContent = 0;
  document.getElementById(`current--0`).textContent = 0;
};

resetBtn.addEventListener('click', function () {
  resetGame();
});

const playAgain = document.querySelector('.again-play');
const goToHome = document.querySelector('.home');

playAgain.addEventListener('click', function () {
  resetGame();
});

goToHome.addEventListener('click', function () {
  winnerLos.classList.add('hidden');
  overlay.classList.add('hidden');
  openAll();
  emptyValue();
  playerInfo.style.display = 'none';
  playBtn.classList.remove('hidden');
});
