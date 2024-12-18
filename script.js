const currentPlayer = document.querySelector(".currentPlayer");
const victoryLine = document.querySelector(".victory-line");
const message = document.querySelector(".message");
let selected;
let player = "X";

// Combinações vencedoras
let positions = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

// Inicializa o jogo
function init() {
  selected = [];
  player = "X";
  currentPlayer.innerHTML = `JOGADOR DA VEZ: ${player}`;
  message.innerHTML = ""; // Limpa mensagens anteriores
  victoryLine.style.display = "none"; // Esconde linha de vitória

  document.querySelectorAll(".game button").forEach((item) => {
    item.innerHTML = "";
    item.disabled = false;
    item.style.background = "#1a1a1a"; // Restaura o estilo inicial
    item.addEventListener("click", newMove);
  });
}

init();

// Função chamada ao clicar em um botão
function newMove(e) {
  const index = e.target.getAttribute("data-i");
  e.target.innerHTML = player;
  e.target.disabled = true; // Evita múltiplos cliques
  selected[index] = player;

  // Verifica o jogo após um pequeno atraso
  setTimeout(() => {
    check();
  }, 100);

  // Alterna entre os jogadores
  player = player === "X" ? "O" : "X";
  currentPlayer.innerHTML = `JOGADOR DA VEZ: ${player}`;
}

// Função para verificar a vitória ou empate
function check() {
  let playerLastMove = player === "X" ? "O" : "X";

  const items = selected
    .map((item, i) => [item, i])
    .filter((item) => item[0] === playerLastMove)
    .map((item) => parseInt(item[1]));

  for (const pos of positions) {
    if (pos.every((item) => items.includes(item))) {
      drawVictoryLine(pos); // Desenha a linha da vitória
      message.innerHTML = `O JOGADOR '${playerLastMove}' GANHOU!`;
      disableButtons();
      return;
    }
  }

  if (selected.filter((item) => item).length === 9) {
    message.innerHTML = "DEU EMPATE!";
    return;
  }
}

// Desabilita os botões ao final do jogo
function disableButtons() {
  document.querySelectorAll(".game button").forEach((item) => {
    item.disabled = true;
  });
}

// Função para desenhar a linha de vitória
function drawVictoryLine(pos) {
  const buttons = document.querySelectorAll(".game button");

  // Coordenadas do botão inicial e final
  const startButton = buttons[pos[0] - 1];
  const endButton = buttons[pos[2] - 1];

  const startX = startButton.offsetLeft + startButton.offsetWidth / 2;
  const startY = startButton.offsetTop + startButton.offsetHeight / 2;
  const endX = endButton.offsetLeft + endButton.offsetWidth / 2;
  const endY = endButton.offsetTop + endButton.offsetHeight / 2;

  // Configura a linha de vitória
  victoryLine.style.display = "block";
  victoryLine.style.width = `${Math.hypot(endX - startX, endY - startY)}px`;
  victoryLine.style.transform = `rotate(${Math.atan2(
    endY - startY,
    endX - startX
  )}rad)`;
  victoryLine.style.left = `${startX}px`;
  victoryLine.style.top = `${startY}px`;
}
