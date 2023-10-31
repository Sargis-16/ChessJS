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

const getMoves = (cell) => {
  let moves = [];
  switch (cell.name) {
    case "Pawn":
      if (cell.color == "black") {
        if (getWithCoordinates(cell.x - 1, cell.y).name == "empty")
          moves.push({ x: cell.x - 1, y: cell.y });
        if (
          cell.x == 6 &&
          getWithCoordinates(cell.x - 2, cell.y).name == "empty"
        )
          moves.push({ x: cell.x - 2, y: cell.y });
      }
      if (cell.color == "white") {
        if (getWithCoordinates(cell.x + 1, cell.y).name == "empty")
          moves.push({ x: cell.x + 1, y: cell.y });
        if (
          cell.x == 1 &&
          getWithCoordinates(cell.x + 2, cell.y).name == "empty"
        )
          moves.push({ x: cell.x + 2, y: cell.y });
      }
      return moves;
    case "Rook":
      // Vertical
      let pieceMet = false;
      for (let i = 1; cell.x + i < 8; i++) {
        let pos = { x: cell.x + i, y: cell.y };
        if (canTake(get(pos).color, cell.color) && !pieceMet) moves.push(pos);
        if (get(pos).name != "empty") pieceMet = true;
        else continue;
      }
      for (let i = 1; cell.x - i >= 0; i++) {
        let pos = { x: cell.x - i, y: cell.y };
        if (get(pos).name == "empty")
          if (canTake(get(pos).color, cell.color)) moves.push(pos);
          else continue;
        else break;
      }

      //   // Horizontal
      for (let i = 1; cell.y + i < 8; i++) {
        let pos = { x: cell.x, y: cell.y + i };
        if (get(pos).name == "empty")
          if (canTake(get(pos).color, cell.color)) moves.push(pos);
          else continue;
        else break;
      }
      for (let i = 1; cell.y - i >= 0; i++) {
        let pos = { x: cell.x, y: cell.y - i };
        if (get(pos).name == "empty")
          if (canTake(get(pos).color, cell.color)) moves.push(pos);
          else continue;
        else break;
      }
      return moves;
    case "Bishop":
      // Vertical
      for (let i = 1; cell.x + i < 8 && cell.y + i < 8; i++) {
        if (getWithCoordinates(cell.x + i, cell.y + i).name == "empty")
          moves.push({ x: cell.x + i, y: cell.y + i });
        else break;
      }
      for (let i = 1; cell.x - i >= 0 && cell.y - i >= 0; i++) {
        if (getWithCoordinates(cell.x - i, cell.y - i).name == "empty")
          moves.push({ x: cell.x - i, y: cell.y - i });
        else break;
      }

      // Horizontal
      for (let i = 1; cell.y - i >= 0 && cell.x + i < 8; i++) {
        if (getWithCoordinates(cell.x + i, cell.y - i).name == "empty")
          moves.push({ x: cell.x + i, y: cell.y - i });
        else break;
      }
      for (let i = 1; cell.y + i < 8 && cell.x - i >= 0; i++) {
        if (getWithCoordinates(cell.x - i, cell.y + i).name == "empty")
          moves.push({ x: cell.x - i, y: cell.y + i });
        else break;
      }
      return moves;
    case "Queen":
      // Vertical
      for (let i = 1; cell.x + i < 8; i++) {
        if (getWithCoordinates(cell.x + i, cell.y).name == "empty")
          moves.push({ x: cell.x + i, y: cell.y });
        else break;
      }
      for (let i = 1; cell.x - i >= 0; i++) {
        if (getWithCoordinates(cell.x - i, cell.y).name == "empty")
          moves.push({ x: cell.x - i, y: cell.y });
        else break;
      }

      //   // Horizontal
      for (let i = 1; cell.y + i < 8; i++) {
        if (getWithCoordinates(cell.x, cell.y + i).name == "empty")
          moves.push({ x: cell.x, y: cell.y + i });
        else break;
      }
      for (let i = 1; cell.y - i >= 0; i++) {
        if (getWithCoordinates(cell.x, cell.y - i).name == "empty")
          moves.push({ x: cell.x, y: cell.y - i });
        else break;
      }

      // Vertical
      for (let i = 1; cell.x + i < 8 && cell.y + i < 8; i++) {
        if (getWithCoordinates(cell.x + i, cell.y + i).name == "empty")
          moves.push({ x: cell.x + i, y: cell.y + i });
        else break;
      }
      for (let i = 1; cell.x - i >= 0 && cell.y - i >= 0; i++) {
        if (getWithCoordinates(cell.x - i, cell.y - i).name == "empty")
          moves.push({ x: cell.x - i, y: cell.y - i });
        else break;
      }

      // Horizontal
      for (let i = 1; cell.y - i >= 0 && cell.x + i < 8; i++) {
        if (getWithCoordinates(cell.x + i, cell.y - i).name == "empty")
          moves.push({ x: cell.x + i, y: cell.y - i });
        else break;
      }
      for (let i = 1; cell.y + i < 8 && cell.x - i >= 0; i++) {
        if (getWithCoordinates(cell.x - i, cell.y + i).name == "empty")
          moves.push({ x: cell.x - i, y: cell.y + i });
        else break;
      }
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
      return moves;
    case "King":
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          let isSame = i == 0 && j == 0;
          let pos = { x: cell.x + i, y: cell.y + j };
          if (
            isValid(pos) &&
            !isSame &&
            get(pos).name == "empty" &&
            canTake(get(pos).color, cell.color)
          )
            moves.push(pos);
        }
      }
      return moves;
  }
  return moves;
};

cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    cells.forEach((cell) => {
      if (cell.classList.contains("can")) cell.classList.remove("can");
    });
    let c = getWithCoordinates(cell.x, cell.y);
    if (c.name == "empty") return;
    getMoves(c).forEach((move) => {
      cells[(7 - move.x) * 8 + move.y].classList.add("can");
    });
  });
});
