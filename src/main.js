let activePiece = {};
const modal = document.querySelector("#modal");
const promoBlocks = document.querySelectorAll(".piece-img");

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

const isValid = (pos) => {
  if (pos.x < 0 || pos.x > 7 || pos.y > 7 || pos.y < 0) return false;
  return true;
};

const move = (cell, pos) => {
  if (get(pos).name != "empty") {
    taken.push(get(pos));
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
  if (cell.name == "Pawn" && (pos.x == 0 || pos.x == 7)) {
    modal.classList.add("modal-open");
    promoBlocks.forEach((block) => {
      block.style.backgroundImage = `url(images/${cell.color}/${block.id}.svg)`;
    });
  }
  const moveSound = document.querySelector("#move-sound");
  moveSound.play();
  activePiece = get(pos);
  displayBoard();
};

const getMoves = (cell) => {
  let moves = [];
  let pieceMet = false;
  switch (cell.name) {
    case "Pawn":
      let pos = {};
      if (cell.color == "black" && cell.x != 0 && cell.x != 7) {
        pos = { x: cell.x - 1, y: cell.y };
        if (get(pos).name == "empty") moves.push(pos);
        pos = { x: cell.x - 2, y: cell.y };
        if (cell.x == 6 && get(pos).name == "empty") moves.push(pos);
        for (let i = -1; i <= 1; i += 2) {
          pos = { x: cell.x - 1, y: cell.y + i };
          if (get(pos).color == "white") moves.push(pos);
        }
      }
      if (cell.color == "white" && cell.x != 0 && cell.x != 7) {
        pos = { x: cell.x + 1, y: cell.y };
        if (get(pos).name == "empty") moves.push(pos);
        pos = { x: cell.x + 2, y: cell.y };
        if (cell.x == 1 && get(pos).name == "empty") moves.push(pos);
        for (let i = -1; i <= 1; i += 2) {
          pos = { x: cell.x + 1, y: cell.y + i };
          if (get(pos).color == "black") moves.push(pos);
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
  }
  return moves;
};

const clearBoard = () => {
  cells.forEach((cell) => {
    if (cell.classList.contains("can")) cell.classList.remove("can");
  });
};

cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    if (cell.classList.contains("can")) {
      move(activePiece, { x: cell.x, y: cell.y });
      clearBoard();
      return;
    } else {
      clearBoard();
      activePiece = null;
    }
    let c = getWithCoordinates(cell.x, cell.y);
    if (c.name == "empty") return;
    getMoves(c).forEach((move) => {
      cells[(7 - move.x) * 8 + move.y].classList.add("can");
    });
  });
});
