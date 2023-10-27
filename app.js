const board = document.querySelector("#cells");

const createBoard = () => {
  for (let i = 0; i < 8; i++) {
    let whiteStart = i % 2 == 0;
    for (let j = 0; j < 8; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      if (whiteStart) {
        if (j % 2 != 0) cell.classList.add("cell-black");
      } else {
        if (j % 2 == 0) cell.classList.add("cell-black");
      }
      cell.x = 8 - i;
      cell.y = String.fromCharCode(j + 65);
      board.appendChild(cell);
    }
  }
};

const getWithCoordinates = (x, y) => {
  return cells[8 * x + y];
};

const initPiece = (x, y, path, name, color) => {
  getWithCoordinates(x, y).style.backgroundImage = `url(${path})`;
  getWithCoordinates(x, y).pieceName = name;
  getWithCoordinates(x, y).pieceColor = color;
};

const setPieces = () => {
  // Pawns
  for (let i = 0; i < 8; i++) {
    initPiece(1, i, "images/black/Pawn.svg", "Pawn", "Black");
    initPiece(6, i, "images/white/Pawn.svg", "Pawn", "White");
  }

  // Rooks
  initPiece(0, 0, "images/black/Rook.svg", "Rook", "Black");
  initPiece(0, 7, "images/black/Rook.svg", "Rook", "Black");
  initPiece(7, 0, "images/white/Rook.svg", "Rook", "White");
  initPiece(7, 7, "images/white/Rook.svg", "Rook", "White");

  // Knights
  initPiece(0, 1, "images/black/Knight.svg", "Knight", "Black");
  initPiece(0, 6, "images/black/Knight.svg", "Knight", "Black");
  initPiece(7, 1, "images/white/Knight.svg", "Knight", "White");
  initPiece(7, 6, "images/white/Knight.svg", "Knight", "White");

  // Bishops
  initPiece(0, 2, "images/black/Bishop.svg", "Bishop", "Black");
  initPiece(0, 5, "images/black/Bishop.svg", "Bishop", "Black");
  initPiece(7, 2, "images/white/Bishop.svg", "Bishop", "White");
  initPiece(7, 5, "images/white/Bishop.svg", "Bishop", "White");

  // Queens
  initPiece(0, 3, "images/black/Queen.svg", "Queen", "Black");
  initPiece(7, 3, "images/white/Queen.svg", "Queen", "White");

  // Kings
  initPiece(0, 4, "images/black/King.svg", "King", "Black");
  initPiece(7, 4, "images/white/King.svg", "King", "White");
};

createBoard();

const cells = document.querySelectorAll(".cell");

setPieces();

cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    console.log(`${cell.x}:${cell.y}:${cell.pieceName}:${cell.pieceColor}`);
  });
});
