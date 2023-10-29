const docBoard = document.querySelector("#cells");

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
      cell.x = 8 - (i + 1);
      cell.y = j;
      docBoard.appendChild(cell);
    }
  }
};

createBoard();
