let player1 = new Player("Player1", "player1");
let player2 = new Player("Player2", "player2");

let board = new Board(6,6, [player1, player2]);
const container = document.getElementById('table')
board.renderMap(container)

const modalSpan = document.getElementsByClassName("modal-close")[0];
modalSpan.addEventListener("click", () => {
  const modal = document.getElementsByClassName("modal")[0];
  modal.style.display = "none";
});