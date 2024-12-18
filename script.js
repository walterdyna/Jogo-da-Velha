const buttons = document.querySelectorAll(".game button");
const currentPlayerDisplay = document.querySelector(".currentPlayer");
const messageDisplay = document.querySelector(".message");
const resetButton = document.querySelector(".reset");
const victoryLine = document.querySelector(".victory-line");

let currentPlayer = 'X';
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function handleButtonClick(event) {
  const clickedButton = event.target;
  const clickedIndex = Array.from(buttons).indexOf(clickedButton);

  if (gameState[clickedIndex] !== "" || !gameActive) {
    return;
  }

  gameState[clickedIndex] = currentPlayer;
  clickedButton.textContent = currentPlayer;
  checkResult();
}

function checkResult() {
  let roundWon = false;

  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (gameState[a] === "" || gameState[b] === "" || gameState[c] === "") {
      continue;
    }
    if (gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      roundWon = true;
      drawVictoryLine(winningConditions[i]);
      break;
    }
  }

  if (roundWon) {
    messageDisplay.textContent = `Jogador ${currentPlayer} ganhou!`;
    gameActive = false;
    resetButton.style.display = "block";
    return;
  }

  if (!gameState.includes("")) {
    messageDisplay.textContent = "Empate!";
    resetButton.style.display = "block";
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  currentPlayerDisplay.textContent = `Turno do jogador: ${currentPlayer}`;
}

function drawVictoryLine(pos) {
  const startButton = buttons[pos[0]];
  const endButton = buttons[pos[2]];

  // Calcula as coordenadas do centro dos botões
  const startX = startButton.offsetLeft + startButton.offsetWidth / 2;
  const startY = startButton.offsetTop + startButton.offsetHeight / 2;
  const endX = endButton.offsetLeft + endButton.offsetWidth / 2;
  const endY = endButton.offsetTop + endButton.offsetHeight / 2;

  // Calcula o comprimento e o ângulo da linha
  const lineLength = Math.hypot(endX - startX, endY - startY);
  const angle = Math.atan2(endY - startY, endX - startX);

  // Define a linha de vitória
  victoryLine.style.display = "block";
  victoryLine.style.width = `${lineLength}px`;

  // Calcula o ponto médio entre os botões
  const midX = (startX + endX) / 2;
  const midY = (startY + endY) / 2;

  // Adiciona um deslocamento para centralizar a linha
  const totalOffset = currentPlayerDisplay.offsetHeight + messageDisplay.offsetHeight + resetButton.offsetHeight + 40; // Ajuste o valor conforme necessário

  victoryLine.style.transform = `translate(${midX - lineLength / 2}px, ${midY + totalOffset}px) rotate(${angle}rad)`;
}

function handleResetButton() {
  gameActive = true;
  resetButton.style.display = "none";
  gameState = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = 'X';
  currentPlayerDisplay.textContent = `Turno do jogador: ${currentPlayer}`;
  messageDisplay.textContent = "";
  buttons.forEach(button => {
    button.textContent = "";
  });
  victoryLine.style.display = "none"; // Esconder a linha de vitória
}

buttons.forEach(button => button.addEventListener("click", handleButtonClick));
resetButton.addEventListener("click", handleResetButton);
currentPlayerDisplay.textContent = `Turno do jogador: ${currentPlayer}`;