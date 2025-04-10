const boardSize = document.querySelector("#board-size");
const boardContainer = document.querySelector("#board-container");
const startBtn = document.querySelector("#start-btn");
const pauseBtn = document.querySelector("#pause-btn");
const resumeBtn = document.querySelector("#resume-btn");
const resetBtn = document.querySelector("#reset-btn");
const speedInput = document.querySelector("#speed");
const algorithmSelect = document.querySelector("#algorithm");
const solutions = document.querySelector("#solutions");
const stepsCount = document.querySelector("#steps-count");
const solutionsCount = document.querySelector("#solutions-count");
const speedSlider = document.getElementById("speed");

const speedValue = document.getElementById("speed-value");

speedSlider.addEventListener("input", function () {
  speedValue.textContent = this.value;
});

let isPaused = false;
let shouldReset = false;
let stepDelay = 100;
let totalSteps = 0;
let totalSolutions = 0;

// Delay utility function
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

boardSize.addEventListener("input", (e) => {
  const size = e.target.value;
  if (size >= 1 && size <= 16) {
    renderBoard(size);
  }
});

speedInput.addEventListener("input", () => {
  const speed = parseInt(speedInput.value);
  stepDelay = 1100 - speed * 100;
});

startBtn.addEventListener("click", async () => {
  const size = parseInt(boardSize.value);
  if (!size || size < 4 || size > 15) {
    alert("Enter a board size between 4 and 15");
    return;
  }

  totalSteps = 0;
  totalSolutions = 0;
  stepsCount.textContent = "0";
  solutionsCount.textContent = "0";
  solutions.innerHTML = "";
  boardContainer.style.display = "flex";
  shouldReset = false;
  isPaused = false;

  const matrix = Array.from({ length: size }, () =>
    Array.from({ length: size }, () => false)
  );

  await queen(0, matrix);

  boardContainer.innerHTML = "";
});

pauseBtn.addEventListener("click", () => {
  isPaused = true;
});

resumeBtn.addEventListener("click", () => {
  isPaused = false;
});

resetBtn.addEventListener("click", () => {
  shouldReset = true;
  boardContainer.innerHTML = "";
  solutions.innerHTML = "";
  stepsCount.textContent = "0";
  solutionsCount.textContent = "0";
  isPaused = false;
  renderBoard(parseInt(boardSize.value));
});

// Render board
function renderBoard(size) {
  boardContainer.innerHTML = "";
  boardContainer.style.display = "flex";

  for (let i = 0; i < size; i++) {
    const rowDiv = document.createElement("div");
    rowDiv.style.display = "flex";

    for (let j = 0; j < size; j++) {
      const cell = document.createElement("div");
      cell.id = `box-${i}-${j}`;
      cell.style.width = "35px";
      cell.style.height = "35px";
      cell.style.border = "2px solid black";
      cell.style.display = "flex";
      cell.style.alignItems = "center";
      cell.style.justifyContent = "center";
      rowDiv.appendChild(cell);
    }

    boardContainer.appendChild(rowDiv);
  }
}

async function queen(row, board) {
  const size = boardSize.value;

  if (shouldReset) return false;

  while (isPaused) await delay(100);

  if (row == size) {
    const boardClone = boardContainer.cloneNode(true);
    solutions.appendChild(boardClone);
    totalSolutions++;
    solutionsCount.textContent = totalSolutions;
    return false;
  }

  for (let col = 0; col < size; col++) {
    while (isPaused) await delay(100);
    if (shouldReset) return false;

    const isValid = await valid(row, col, board);
    const current = document.querySelector(`#box-${row}-${col}`);

    if (isValid) {
      current.innerHTML = "♛";
      board[row][col] = true;

      const found = await queen(row + 1, board);
      if (found) return true;

      board[row][col] = false;
      current.innerHTML = "";
    }
  }

  return false;
}

async function valid(row, col, matrix) {
  return new Promise((resolve) => {
    const current = document.querySelector(`#box-${row}-${col}`);
    current.innerHTML = "♛";

    const n = matrix.length;
    const m = matrix[0].length;

    const check = (condition) => {
      if (condition) {
        setTimeout(() => {
          current.innerHTML = "";
          resolve(false);
        }, stepDelay);
        return true;
      }
      return false;
    };

    for (let i = 0; i < n; i++) {
      if (check(matrix[i][col])) return;
    }

    for (let j = 0; j < m; j++) {
      if (check(matrix[row][j])) return;
    }

    for (let i = 0; i < n; i++) {
      const j = i - (row - col);
      if (j >= 0 && j < m && check(matrix[i][j])) return;
    }

    for (let i = 0; i < n; i++) {
      const j = row + col - i;
      if (j >= 0 && j < m && check(matrix[i][j])) return;
    }

    totalSteps++;
    stepsCount.textContent = totalSteps;

    setTimeout(() => {
      resolve(true);
    }, stepDelay);
  });
}
