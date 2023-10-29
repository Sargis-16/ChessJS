let board = [];

const initBoard = () => {
  for (let i = 0; i < 8; i++) {
    let arr = [];
    for (let j = 0; j < 8; j++) {
      arr.push({ x: i, y: j, name: "Empty", path: "null", color: "None" });
    }
    board.push(arr);
  }
};

initBoard();

const getWithCoordinates = (x, y) => {
  return board[x][y];
};

const initPiece = (x, y, path, name, color) => {
  getWithCoordinates(x, y).x = x;
  getWithCoordinates(x, y).y = y;
  getWithCoordinates(x, y).path = path;
  getWithCoordinates(x, y).name = name;
  getWithCoordinates(x, y).color = color;
};

const setPieces = () => {
  // Pawns
  for (let i = 0; i < 8; i++) {
    initPiece(1, i, "images/white/Pawn.svg", "Pawn", "white");

    initPiece(6, i, "images/black/Pawn.svg", "Pawn", "black");
  }

  // Rooks
  initPiece(0, 0, "images/white/Rook.svg", "Rook", "white");
  initPiece(0, 7, "images/white/Rook.svg", "Rook", "white");

  initPiece(7, 0, "images/black/Rook.svg", "Rook", "black");
  initPiece(7, 7, "images/black/Rook.svg", "Rook", "black");

  // Knights
  initPiece(0, 1, "images/white/Knight.svg", "Knight", "white");
  initPiece(0, 6, "images/white/Knight.svg", "Knight", "white");

  initPiece(7, 1, "images/black/Knight.svg", "Knight", "black");
  initPiece(7, 6, "images/black/Knight.svg", "Knight", "black");

  // Bishops
  initPiece(0, 2, "images/white/Bishop.svg", "Bishop", "white");
  initPiece(0, 5, "images/white/Bishop.svg", "Bishop", "white");

  initPiece(7, 2, "images/black/Bishop.svg", "Bishop", "black");
  initPiece(7, 5, "images/black/Bishop.svg", "Bishop", "black");

  // Queens
  initPiece(0, 3, "images/white/Queen.svg", "Queen", "white");

  initPiece(7, 3, "images/black/Queen.svg", "Queen", "White");

  // Kings
  initPiece(0, 4, "images/white/King.svg", "King", "white");

  initPiece(7, 4, "images/black/King.svg", "King", "black");
};

const cells = document.querySelectorAll(".cell");

setPieces();

cells.forEach((cell) => {
  let c = getWithCoordinates(cell.x, cell.y);
  if (c.path == "null") return;
  cell.style.backgroundImage = `url(${c.path})`;
});
