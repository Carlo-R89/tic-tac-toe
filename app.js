// Variables
const gameboard = ['', '', '', '', '', '', '', '', ''];
const board = document.querySelector('.gameboard');
const messCont = document.querySelector('.message');
const playerWrapper = document.querySelectorAll('.player');
const submitName = document.querySelectorAll('.player-btn');
const input = document.querySelectorAll('.player-input');
const reset = document.querySelector('#reset-btn');
const startBtn = document.getElementById('start-game');
let gameCells = document.querySelectorAll('.gameboard-cell');
let turn = 0;
let plNames = ['', ''];

// Functions
function checkBoard(a) {
  if (a[0] === a[1] && a[0] === a[2] && a[0] === 'x') return 'x';
  if (a[3] === a[4] && a[3] === a[5] && a[3] === 'x') return 'x';
  if (a[6] === a[7] && a[6] === a[8] && a[6] === 'x') return 'x';
  if (a[0] === a[3] && a[0] === a[6] && a[0] === 'x') return 'x';
  if (a[1] === a[4] && a[1] === a[7] && a[1] === 'x') return 'x';
  if (a[2] === a[5] && a[2] === a[8] && a[2] === 'x') return 'x';
  if (a[0] === a[4] && a[0] === a[8] && a[0] === 'x') return 'x';
  if (a[2] === a[4] && a[2] === a[6] && a[2] === 'x') return 'x';

  if (a[0] === a[1] && a[0] === a[2] && a[0] === 'o') return 'o';
  if (a[3] === a[4] && a[3] === a[5] && a[3] === 'o') return 'o';
  if (a[6] === a[7] && a[6] === a[8] && a[6] === 'o') return 'o';
  if (a[0] === a[3] && a[0] === a[6] && a[0] === 'o') return 'o';
  if (a[1] === a[4] && a[1] === a[7] && a[1] === 'o') return 'o';
  if (a[2] === a[5] && a[2] === a[8] && a[2] === 'o') return 'o';
  if (a[0] === a[4] && a[0] === a[8] && a[0] === 'o') return 'o';
  if (a[2] === a[4] && a[2] === a[6] && a[2] === 'o') return 'o';
}

// Event Listeners
let start = () => {
  gameCells.forEach(cell => {
    cell.addEventListener('click', function handleClick() {
      if (messCont.innerText !== '') {
        gameCells.forEach(cell =>
          cell.removeEventListener('click', handleClick)
        );
      } else if (turn % 2 === 0) {
        let x_icon = document.createElement('img');
        x_icon.src = 'img/x-icon.png';
        cell.appendChild(x_icon);
        gameboard.splice(parseInt(cell.id), 1, 'x');
        cell.removeEventListener('click', handleClick);
        turn++;
        if (checkBoard(gameboard) === 'x') {
          const messX = document.createElement('h2');
          messCont.appendChild(messX);
          messX.textContent = `${plNames[0]} Wins!`;
        }
      } else if (turn % 2 !== 0) {
        let o_icon = document.createElement('img');
        o_icon.src = 'img/o-icon.png';
        cell.appendChild(o_icon);
        gameboard.splice(parseInt(cell.id), 1, 'o');
        cell.removeEventListener('click', handleClick);
        turn++;
        if (checkBoard(gameboard) === 'o') {
          const messO = document.createElement('h2');
          messCont.appendChild(messO);
          messO.textContent = `${plNames[1]} Wins!`;
        }
      }
      if (turn === 9 && messCont.innerText === '') {
        const messD = document.createElement('h2');
        messCont.appendChild(messD);
        messD.textContent = 'Draw';
      }
    });
  });
};

start();

reset.addEventListener('click', () => {
  board.innerHTML = '';
  turn = 0;
  let ids = 0;
  for (let i = 0; i < gameboard.length; i++) {
    gameboard[i] = '';
    let cell = document.createElement('div');
    cell.setAttribute('id', ids);
    cell.classList.add('gameboard-cell');
    board.appendChild(cell);
    ids++;
  }
  gameCells = document.querySelectorAll('.gameboard-cell');
  messCont.innerText = '';
  playerWrapper.forEach(el => el.removeChild(el.lastChild));
  for (let i = 0; i < 2; i++) {
    input[i].style.display = 'inline-block';
    input[i].value = '';
    submitName[i].style.display = 'inline-block';
  }
  board.style.display = 'none';
  startBtn.style.display = 'flex';
  reset.style.display = 'none';
  start();
});

for (let i = 0; i < 2; i++) {
  submitName[i].addEventListener('click', () => {
    if (input[i].value === '') {
      throw new Error(alert('Enter Player Name!'));
    }
    plNames[i] = input[i].value;
    let plName = document.createElement('h3');
    playerWrapper[i].appendChild(plName);
    plName.classList.add('pl-name');
    plName.textContent = plNames[i];
    input[i].style.display = 'none';
    submitName[i].style.display = 'none';
  });
}

startBtn.addEventListener('click', () => {
  board.style.display = 'grid';
  startBtn.style.display = 'none';
  reset.style.display = 'inline-block';
});
