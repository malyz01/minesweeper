document.addEventListener("DOMContentLoaded", startGame);
document.addEventListener("click", checkForWin);
document.addEventListener("contextmenu", checkForWin);

// Define your `board` object here!
var board = {
  cells: [
    { row: 1, col: 1, isMine: false, hidden: true },
    { row: 1, col: 2, isMine: false, hidden: true },
    { row: 1, col: 3, isMine: true, hidden: true },
    { row: 1, col: 4, isMine: false, hidden: true },
    { row: 2, col: 1, isMine: false, hidden: true },
    { row: 2, col: 2, isMine: true, hidden: true },
    { row: 2, col: 3, isMine: false, hidden: true },
    { row: 2, col: 4, isMine: true, hidden: true },
    { row: 3, col: 1, isMine: true, hidden: true },
    { row: 3, col: 2, isMine: false, hidden: true },
    { row: 3, col: 3, isMine: false, hidden: true },
    { row: 3, col: 4, isMine: false, hidden: true },
    { row: 4, col: 1, isMine: false, hidden: true },
    { row: 4, col: 2, isMine: true, hidden: true },
    { row: 4, col: 3, isMine: true, hidden: true },
    { row: 4, col: 4, isMine: false, hidden: true }
  ]
};

function generateRandomBool() {
  return Math.random() >= 0.3;
}

// function generateBoard(num = 2) {
//   if (num <= 1) {
//     num = 2;
//   }
//   const boardSize = num * num;
//   const boardRow = [];
//   const boardCol = [];
//   let countRow = 1;
//   for (var i = 0; boardRow.length < boardSize; i++) {
//     boardRow.push(countRow);
//     if (boardRow.filter(r => r === countRow).length >= num) {
//       countRow++;
//     }
//   }

//   for (var i = 0; i < num; i++) {
//     boardCol.push(i + 1);
//   }

//   for (var i = 0; i < boardSize; i++) {
//     board.cells[i] = {
//       row: boardRow[i],
//       cell: i,
//       isMine: true,
//       hidden: true
//     };
//   }
// }

function startGame() {
  // Don't remove this function call: it makes the game work!
  // generateBoard(4);
  console.log(board);
  board.cells.forEach(x => (x.surroundingMines = countSurroundingMines(x)));
  lib.initBoard();
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin() {
  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
  const { cells } = board;
  const markedAllBombs =
    cells.map(c => c.isMine && c.isMarked).filter(c => c).length ===
    cells.map(c => c.isMine).filter(c => c).length;
  const showingAllCell =
    cells.map(c => !c.hidden).filter(c => c).length ===
    cells.map(c => !c.isMine).filter(c => c).length;
  if (showingAllCell && markedAllBombs) lib.displayMessage("You win!");
}

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`:
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines(cell) {
  var surrounding = lib.getSurroundingCells(cell.row, cell.col);
  return surrounding.map(bombs => bombs.isMine).filter(b => b).length;
}
