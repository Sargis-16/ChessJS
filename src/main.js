const modal = document.querySelector("#modal");
const promoBlocks = document.querySelectorAll(".piece-img");
const takeSound = document.querySelector("#take-sound");
const moveSound = document.querySelector("#move-sound");
let check = false;
let checkedPiece = {};

const canTake = (color1, color2) => {
  if (
    (color1 == "black" && color2 == "white") ||
    (color1 == "white" && color2 == "black") ||
    color1 == "none" ||
    color2 == "none"
  )
    return true;
  return false;
};

const areOppositeColors = (color1, color2) => {
  if (
    (color1 == "black" && color2 == "white") ||
    (color1 == "white" && color2 == "black")
  )
    return true;
  return false;
};

const isValid = (pos) => {
  if (pos.x < 0 || pos.x > 7 || pos.y > 7 || pos.y < 0) return false;
  return true;
};

const move = (cell, pos) => {
  check = false;
  let isTaken = false;
  if (get(pos).name != "empty") {
    taken.push(get(pos));
    takeSound.play();
    isTaken = true;
    displayTaken();
  }
  board[pos.x][pos.y] = {
    x: pos.x,
    y: pos.y,
    name: cell.name,
    path: cell.path,
    color: cell.color,
  };
  board[cell.x][cell.y] = {
    x: cell.x,
    y: cell.y,
    name: "empty",
    path: "null",
    color: "none",
  };
  activePiece = get(pos);
  if (cell.name == "Pawn" && (pos.x == 0 || pos.x == 7)) {
    modal.classList.add("modal-open");
    promoBlocks.forEach((block) => {
      block.style.backgroundImage = `url(images/${cell.color}/${block.id}.svg)`;
      let temp = activePiece; // ADDING FUCKING TEMP VARIBALE CUZ JAVASCRIPT DECIDED THAT IN EVENTLISTENER CALLBACK FUNCTION THE ACTIVE PIECE VALUE SHOULD CHANGE FOR WHATEVER THE FUCK REASON !!!!!
      block.addEventListener("click", () => {
        promote(block.id, temp);
      });
    });
  }
  if (!isTaken) moveSound.play();

  if (cell.name == "King") {
    if (cell.color == "black") blackKing = get(pos);
    else whiteKing = get(pos);
  }

  isCheck();
  if (check) {
    cells[(7 - checkedPiece.x) * 8 + checkedPiece.y].classList.add("checked");
  }
  if (!check) {
    cells.forEach((cell) => {
      if (cell.classList.contains("checked")) {
        cell.classList.remove("checked");
      }
    });
  }
  displayBoard();
};

const getMoves = (cell, callplace = null) => {
  let moves = [];
  let pieceMet = false;
  switch (cell.name) {
    case "Pawn":
      let pos = {};
      let canGoBig = true;
      if (cell.color == "black" && cell.x != 0 && cell.x != 7) {
        pos = { x: cell.x - 1, y: cell.y };
        if (get(pos).name == "empty") moves.push(pos);
        else canGoBig = false;
        pos = { x: cell.x - 2, y: cell.y };
        if (cell.x == 6 && get(pos).name == "empty" && canGoBig)
          moves.push(pos);
        for (let i = -1; i <= 1; i += 2) {
          pos = { x: cell.x - 1, y: cell.y + i };
          if (isValid(pos)) {
            if (get(pos).color == "white") moves.push(pos);
          }
        }
      }
      if (cell.color == "white" && cell.x != 0 && cell.x != 7) {
        pos = { x: cell.x + 1, y: cell.y };
        if (get(pos).name == "empty") moves.push(pos);
        else canGoBig = false;
        pos = { x: cell.x + 2, y: cell.y };
        if (cell.x == 1 && get(pos).name == "empty" && canGoBig)
          moves.push(pos);
        for (let i = -1; i <= 1; i += 2) {
          pos = { x: cell.x + 1, y: cell.y + i };
          if (isValid(pos)) {
            if (get(pos).color == "black") moves.push(pos);
          }
        }
      }
      activePiece = cell;
      return moves;
    case "Rook":
      // Vertical
      pieceMet = false;
      for (let i = 1; cell.x + i < 8; i++) {
        let pos = { x: cell.x + i, y: cell.y };
        if (canTake(get(pos).color, cell.color) && !pieceMet) moves.push(pos);
        if (get(pos).name != "empty") pieceMet = true;
        else continue;
      }
      pieceMet = false;
      for (let i = 1; cell.x - i >= 0; i++) {
        let pos = { x: cell.x - i, y: cell.y };
        if (canTake(get(pos).color, cell.color) && !pieceMet) moves.push(pos);
        if (get(pos).name != "empty") pieceMet = true;
        else continue;
      }

      pieceMet = false;
      // Horizontal
      for (let i = 1; cell.y + i < 8; i++) {
        let pos = { x: cell.x, y: cell.y + i };
        if (canTake(get(pos).color, cell.color) && !pieceMet) moves.push(pos);
        if (get(pos).name != "empty") pieceMet = true;
        else continue;
      }
      pieceMet = false;
      for (let i = 1; cell.y - i >= 0; i++) {
        let pos = { x: cell.x, y: cell.y - i };
        if (canTake(get(pos).color, cell.color) && !pieceMet) moves.push(pos);
        if (get(pos).name != "empty") pieceMet = true;
        else continue;
      }
      activePiece = cell;
      return moves;
    case "Bishop":
      // Vertical
      pieceMet = false;
      for (let i = 1; cell.x + i < 8 && cell.y + i < 8; i++) {
        let pos = { x: cell.x + i, y: cell.y + i };
        if (canTake(get(pos).color, cell.color) && !pieceMet) moves.push(pos);
        if (get(pos).name != "empty") pieceMet = true;
        else continue;
      }
      pieceMet = false;
      for (let i = 1; cell.x - i >= 0 && cell.y - i >= 0; i++) {
        let pos = { x: cell.x - i, y: cell.y - i };
        if (canTake(get(pos).color, cell.color) && !pieceMet) moves.push(pos);
        if (get(pos).name != "empty") pieceMet = true;
        else continue;
      }
      pieceMet = false;
      // Horizontal
      for (let i = 1; cell.y - i >= 0 && cell.x + i < 8; i++) {
        let pos = { x: cell.x + i, y: cell.y - i };
        if (canTake(get(pos).color, cell.color) && !pieceMet) moves.push(pos);
        if (get(pos).name != "empty") pieceMet = true;
        else continue;
      }
      pieceMet = false;
      for (let i = 1; cell.y + i < 8 && cell.x - i >= 0; i++) {
        let pos = { x: cell.x - i, y: cell.y + i };
        if (canTake(get(pos).color, cell.color) && !pieceMet) moves.push(pos);
        if (get(pos).name != "empty") pieceMet = true;
        else continue;
      }
      activePiece = cell;
      return moves;
    case "Queen":
      // Vertical
      pieceMet = false;
      for (let i = 1; cell.x + i < 8; i++) {
        let pos = { x: cell.x + i, y: cell.y };
        if (canTake(get(pos).color, cell.color) && !pieceMet) moves.push(pos);
        if (get(pos).name != "empty") pieceMet = true;
        else continue;
      }
      pieceMet = false;
      for (let i = 1; cell.x - i >= 0; i++) {
        let pos = { x: cell.x - i, y: cell.y };
        if (canTake(get(pos).color, cell.color) && !pieceMet) moves.push(pos);
        if (get(pos).name != "empty") pieceMet = true;
        else continue;
      }

      // Horizontal
      pieceMet = false;
      for (let i = 1; cell.y + i < 8; i++) {
        let pos = { x: cell.x, y: cell.y + i };
        if (canTake(get(pos).color, cell.color) && !pieceMet) moves.push(pos);
        if (get(pos).name != "empty") pieceMet = true;
        else continue;
      }
      pieceMet = false;
      for (let i = 1; cell.y - i >= 0; i++) {
        let pos = { x: cell.x, y: cell.y - i };
        if (canTake(get(pos).color, cell.color) && !pieceMet) moves.push(pos);
        if (get(pos).name != "empty") pieceMet = true;
        else continue;
      }
      // Vertical
      pieceMet = false;
      for (let i = 1; cell.x + i < 8 && cell.y + i < 8; i++) {
        let pos = { x: cell.x + i, y: cell.y + i };
        if (canTake(get(pos).color, cell.color) && !pieceMet) moves.push(pos);
        if (get(pos).name != "empty") pieceMet = true;
        else continue;
      }
      pieceMet = false;
      for (let i = 1; cell.x - i >= 0 && cell.y - i >= 0; i++) {
        let pos = { x: cell.x - i, y: cell.y - i };
        if (canTake(get(pos).color, cell.color) && !pieceMet) moves.push(pos);
        if (get(pos).name != "empty") pieceMet = true;
        else continue;
      }
      pieceMet = false;
      // Horizontal
      for (let i = 1; cell.y - i >= 0 && cell.x + i < 8; i++) {
        let pos = { x: cell.x + i, y: cell.y - i };
        if (canTake(get(pos).color, cell.color) && !pieceMet) moves.push(pos);
        if (get(pos).name != "empty") pieceMet = true;
        else continue;
      }
      pieceMet = false;
      for (let i = 1; cell.y + i < 8 && cell.x - i >= 0; i++) {
        let pos = { x: cell.x - i, y: cell.y + i };
        if (canTake(get(pos).color, cell.color) && !pieceMet) moves.push(pos);
        if (get(pos).name != "empty") pieceMet = true;
        else continue;
      }
      activePiece = cell;
      return moves;
    case "Knight":
      for (let i = -2; i <= 2; i++) {
        if (i == 0) continue;
        let j = Math.abs(i) == 2 ? 1 : 2;
        let pos = { x: cell.x + i, y: cell.y + j };

        if (
          isValid(pos) &&
          (get(pos).name == "empty" || canTake(get(pos).color, cell.color))
        )
          moves.push(pos);
        pos = { x: cell.x - i, y: cell.y - j };
        if (
          isValid(pos) &&
          (get(pos).name == "empty" || canTake(get(pos).color, cell.color))
        )
          moves.push(pos);
      }
      activePiece = cell;
      return moves;
    case "King":
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          let isSame = i == 0 && j == 0;
          let pos = { x: cell.x + i, y: cell.y + j };
          if (isValid(pos)) {
            if (
              (!isSame && get(pos).name == "empty") ||
              canTake(get(pos).color, cell.color)
            )
              moves.push(pos);
          }
        }
      }
      activePiece = cell;
      return moves;
    case "PawnKing":
      let dx = cell.color == "black" ? -1 : 1;
      for (let i = -1; i <= 1; i += 2) {
        let pos = { x: cell.x + dx, y: cell.y + i };
        if (isValid(pos)) {
          moves.push(pos);
        }
      }
      return moves;
  }
  return moves;
};

const clearBoard = () => {
  cells.forEach((cell) => {
    if (cell.classList.contains("can")) cell.classList.remove("can");
  });
};

const getAllMoves = (piece) => {
  let allMoves = [];
  const pieceNames = ["Knight", "Bishop", "Rook", "PawnKing"];
  pieceNames.forEach((name) => {
    let temp = getMoves(
      {
        name: name,
        x: piece.x,
        y: piece.y,
        color: piece.color,
      },
      "king"
    );
    allMoves.push({ move: [...temp], name: name, color: piece.color });
  });
  return allMoves;
};

const isCheck = () => {
  const kings = [whiteKing, blackKing];
  let pawns = [],
    rooks = [],
    bishops = [],
    knights = [];
  let moves;

  kings.forEach((king) => {
    moves = getAllMoves(king);
    moves.forEach((move) => {
      if (move.name == "Rook") rooks.push({ move: move, king: king });
      if (move.name == "Bishop") bishops.push({ move: move, king: king });
      if (move.name == "PawnKing") pawns.push({ move: move, king: king });
      if (move.name == "Knight") knights.push({ move: move, king: king });
    });
  });
  rooks.forEach((rMove) => {
    for (let i = 0; i < rMove.move.move.length; i++) {
      if (
        getWithCoordinates(rMove.move.move[i].x, rMove.move.move[i].y).name ==
          "Rook" ||
        getWithCoordinates(rMove.move.move[i].x, rMove.move.move[i].y).name ==
          "Queen"
      ) {
        checkedPiece = rMove.king;
        check = true;
        return;
      }
    }
  });
  bishops.forEach((bMove) => {
    for (let i = 0; i < bMove.move.move.length; i++) {
      if (
        getWithCoordinates(bMove.move.move[i].x, bMove.move.move[i].y).name ==
          "Bishop" ||
        getWithCoordinates(bMove.move.move[i].x, bMove.move.move[i].y).name ==
          "Queen"
      ) {
        checkedPiece = bMove.king;
        check = true;
        return;
      }
    }
  });
  pawns.forEach((pMove) => {
    for (let i = 0; i < pMove.move.move.length; i++) {
      if (
        getWithCoordinates(pMove.move.move[i].x, pMove.move.move[i].y).name ==
          "Pawn" &&
        areOppositeColors(
          pMove.king.color,
          getWithCoordinates(pMove.move.move[i].x, pMove.move.move[i].y).color
        )
      ) {
        checkedPiece = pMove.king;
        check = true;
        return;
      }
    }
  });
  knights.forEach((kMove) => {
    for (let i = 0; i < kMove.move.move.length; i++) {
      if (
        getWithCoordinates(kMove.move.move[i].x, kMove.move.move[i].y).name ==
        "Knight"
      ) {
        checkedPiece = kMove.king;
        check = true;
        return;
      }
    }
  });
  if (check) return;
};
