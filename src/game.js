let board = [];
let taken = [];
let white_taken = 0,
  black_taken = 0;
let plays = "white";
let whiteKing = {},
  blackKing = {};
const cells = document.querySelectorAll(".cell");
const promo = document.querySelectorAll(".piece-img");

promo.forEach((block) => {
  block.addEventListener("click", () => {
    let piece = getWithCoordinates(activePiece.x, activePiece.y);
    board[activePiece.x][activePiece.y].name = block.id;
    board[activePiece.x][
      activePiece.y
    ].path = `images/${piece.color}/${block.id}.svg`;
    modal.classList.remove("modal-open");
    displayBoard();
  });
});

const getArmenianName = (name) => {
  switch (name) {
    case "King":
      return "Արքա";
    case "Knight":
      return "Ձի";
    case "Queen":
      return "Թագուհի";
    case "Bishop":
      return "Փիղ";
    case "Rook":
      return "Նավակ";
    case "Pawn":
      return "Զինվոր";
    default:
      return "Error";
  }
};

const displayTaken = () => {
  const whites = document.querySelector("#white-pieces");
  const blacks = document.querySelector("#black-pieces");
  const white_count = document.querySelector("#white-taken-count");
  const black_count = document.querySelector("#black-taken-count");

  taken.forEach((piece) => {
    const takenPiece = document.createElement("div");
    takenPiece.title = getArmenianName(piece.name);
    takenPiece.classList.add("taken-piece");
    takenPiece.style.backgroundImage = `url(images/${piece.color}/${piece.name}.svg)`;

    if (piece.color == "white") {
      whites.appendChild(takenPiece);
      white_taken++;
    } else {
      blacks.appendChild(takenPiece);
      black_taken++;
    }
  });
  taken = [];
  white_count.textContent = white_taken;
  black_count.textContent = black_taken;
};

const initBoard = () => {
  for (let i = 0; i < 8; i++) {
    let arr = [];
    for (let j = 0; j < 8; j++) {
      arr.push({
        x: i,
        y: j,
        name: "empty",
        path: "null",
        color: "none",
      });
    }
    board.push(arr);
  }
};

const getInitial = (name) => {
  switch (name) {
    case "Rook":
      return "R";
    case "Knight":
      return "Kn";
    case "Bishop":
      return "B";
    case "King":
      return "K";
    case "Queen":
      return "Q";
    case "Pawn":
      return "P";
    default:
      return "E";
  }
};

const printCell = (cell) => {
  console.log(cell.x + 1, String.fromCharCode(cell.y + 65));
};

const get = (pos) => {
  return board[pos.x][pos.y];
};

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

  initPiece(7, 3, "images/black/Queen.svg", "Queen", "black");

  // Kings
  initPiece(0, 4, "images/white/King.svg", "King", "white");
  whiteKing = getWithCoordinates(0, 4);

  initPiece(7, 4, "images/black/King.svg", "King", "black");
  blackKing = getWithCoordinates(7, 4);
};

const displayBoard = () => {
  cells.forEach((cell) => {
    let c = getWithCoordinates(cell.x, cell.y);
    if (c.path == "null") {
      cell.style.backgroundImage = "";
      return;
    }
    cell.style.backgroundImage = `url(${c.path})`;
  });
};

const getColorArmenian = () => {
  if (plays == "white") return "Սպիտակ";
  else return "Սև";
};

const switchColor = () => {
  const playingColor = document.querySelector("#playing-color");
  if (plays == "white") plays = "black";
  else plays = "white";
  playingColor.textContent = getColorArmenian(plays) + "ը";
};

const startGame = () => {
  cells.forEach((cell) => {
    cell.addEventListener("click", () => {
      if (cell.classList.contains("can")) {
        move(activePiece, { x: cell.x, y: cell.y });
        clearBoard();
        switchColor();
        return;
      } else {
        clearBoard();
        activePiece = null;
      }
      let c = getWithCoordinates(cell.x, cell.y);
      if (c.name == "empty") return;
      if (c.color == plays) {
        getMoves(c).forEach((move) => {
          cells[(7 - move.x) * 8 + move.y].classList.add("can");
        });
      }
    });
  });
};

initBoard();
setPieces();
displayBoard();
startGame();
