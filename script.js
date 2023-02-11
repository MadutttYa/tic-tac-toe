const X_CLASS = "x";
const CIRCLE_CLASS = "circle";
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
];
const cellElm = document.querySelectorAll("[data-cell]");
const winningMessageElement = document.getElementById("winning-msg");
const winningMessageTextElement = document.querySelector(
  "[data-winning-msg-text]",
);
const restartBtn = document.getElementById("restart-btn");
let circleTurn;

startGame();

function startGame() {
  circleTurn = false;
  cellElm.forEach((cell) => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.addEventListener("click", handleClick, { once: true });
  });
  winningMessageElement.classList.remove("show");
}

restartBtn.addEventListener("click", startGame);

function handleClick(e) {
  const cell = e.target;
  const curClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  //place mark
  placeMark(cell, curClass);
  //check for win
  if (checkWin(curClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurn();
  }
  //check for draw
  //switch turn
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = "Draw";
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`;
  }

  winningMessageElement.classList.add("show");
}

function isDraw() {
  return [...cellElm].every((cell) => {
    return (
      cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    );
  });
}

function placeMark(cell, curClass) {
  cell.classList.add(curClass);
}

function swapTurn() {
  circleTurn = !circleTurn;
}

function checkWin(curClass) {
  return WINNING_COMBINATIONS.some((combinations) => {
    return combinations.every((index) => {
      return cellElm[index].classList.contains(curClass);
    });
  });
}
