const COLOR_LOOKUP = {
  '1': 'purple',
  '-1': 'orange',
  'null': 'white'
};


const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];


let board, turn, winner;

const message = document.querySelector('h1');
const playAgainBtn = document.querySelector('button');

document.getElementById('board').addEventListener('click', handleMove);
playAgainBtn.addEventListener('click', initialize);

initialize();

function initialize() {
  board = [null, null, null, null, null, null, null, null, null];
  turn = 1;
  winner = null;
  render();
}

function handleMove(evt) {
  const idx = parseInt(evt.target.id.replace('sq-', ''));
  if (
    isNaN(idx) ||
    board[idx] ||
    winner
  ) return;
  board[idx] = turn;
  winner = getWinner();
  turn *= -1;
  render();
}

function getWinner() {
  for (let winArr of winningCombos) {
    if (Math.abs(board[winArr[0]] + board[winArr[1]] + board[winArr[2]]) === 3) return turn;
  }
  if (board.includes(null)) return null;
  return 'T';
}

function render() {
  renderBoard();
  renderMessage();
  playAgainBtn.disabled = !winner;
}

function renderBoard() {
  board.forEach(function(sqVal, idx) {
    const squareEl = document.getElementById(`sq-${idx}`);
    squareEl.style.backgroundColor = COLOR_LOOKUP[sqVal];
    squareEl.className = !sqVal ? 'avail' : '';
  });
}

function renderMessage() {
  if (winner === 'T') {
    message.innerHTML = "It's a tie";
  } else if (winner) {
    message.innerHTML = `<span style="color: ${COLOR_LOOKUP[winner]}">${COLOR_LOOKUP[winner].toUpperCase()}</span> the winner!`;
  } else {
    message.innerHTML = `<span style="color: ${COLOR_LOOKUP[turn]}">${COLOR_LOOKUP[turn].toUpperCase()}</span>'s turn`;
  }
}