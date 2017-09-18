const generatePlayerBoard = (numberofRows,numberofColumns) => {
  let board = [];
  for (let  i= 0; i < numberofRows; i++) {
   let row = []
    for (let i = 0 ; i < numberofColumns; i++) {
      row.push('  ');
  }
  board.push(row);
 }
  return board;
}

let generateBombBoard = (numberofRows,numberofColumns,numberofBombs) => {
  let board = [];
  for (let  i= 0; i < numberofRows; i++) {
   let row = [];
    for (let i = 0 ; i < numberofColumns; i++) {
      row.push(null);
  }
  board.push(row);
 }
 let numberofBombsPlaced = 0
 while (numberofBombsPlaced < numberofBombs) {
   let randomRowIndex = Math.floor(Math.random() * numberofRows);
   let randomColumnIndex = Math.floor(Math.random() * numberofColumns);
   if (board[randomRowIndex] != "B" || board[randomColumnIndex] != "B") {
     board[randomRowIndex][randomColumnIndex] = 'B';
     numberofBombsPlaced++;
   }
 }
  return board;
}

const getNumberOfNeighborBombs = (bombBoard,rowIndex,columnIndex) => {
  let neighborOffsets =
  [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
  const numberOfRows = bombBoard.length;
  const numberOfColumns = bombBoard[0].length;
  let numberOfBombs = 0;
  neighborOffsets.forEach(offset => {
    const neighborRowIndex = rowIndex + offset[0];
    const neighborColumnIndex = columnIndex + offset[1];
    if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows &&
      neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
        if (bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
          numberOfBombs++;
        }
      }
  });
  return numberOfBombs;
};

const flipTile = (playerBoard,bombBoard,rowIndex,columnIndex) => {
  if (playerBoard[rowIndex][columnIndex] !== ' ') {
    console.log('This tile has already been flipped!');
return;
  } else if (bombBoard[rowIndex][columnIndex] === 'B') {
      playerBoard[rowIndex][columnIndex] = 'B';
    } else { playerBoard[rowIndex][columnIndex] =
      getNumberOfNeighborBombs(bombBoard,rowIndex,columnIndex);
    }
}

const printBoard = board => {
  console.log(board.map(row => row.join(' | ')).join('\n'));
};

let playerBoard = generatePlayerBoard(6,6);
let bombBoard = generateBombBoard(6,6,5);

console.log('Player Board: ')
printBoard(playerBoard);
console.log('Bomb Board: ');
printBoard(bombBoard);

flipTile(playerBoard,bombBoard,6,1);
console.log('Updated Player Board: ');
printBoard(playerBoard);
