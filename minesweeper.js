class game {
  constructor(numberOfRows,numberOfColumns,numberOfBombs) {
    this.board = new Board(numberOfRows,numberOfColumns,numberOfBombs);
  }
  playMove(rowIndex,columnIndex) {
    this.board.flipTile(rowIndex,columnIndex);
    if (this.board._playerBoard[rowIndex][columnIndex]==='B'){
      console.log('Game Over..');
      this.board.print();
    } else if (this.board.hasSafeTiles()) {
      console.log('You WIN');
    } else {
      console.log('Current Board:');
      this.board.print();
    }
  }
}

class Board {
  constructor(numberOfRows,numberOfColumns,numberOfBombs) {
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows,numberOfColumns);
    this._bombBoard =
    Board.generateBombBoard(numberOfRows,numberOfColumns,numberOfBombs);
  }
  get playerBoard() {
    return this._playerBoard;
  }

  flipTile(rowIndex, columnIndex) {
    if (this._playerBoard[rowIndex][columnIndex] != ' ') {
      console.log('This tile has already been flipped!');
      return;
    } else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
        this._playerBoard[rowIndex][columnIndex] = 'B';
      } else {
        this._playerBoard[rowIndex][columnIndex] =
        this.getNumberOfNeighborBombs(rowIndex, columnIndex);
      }
      this._numberOfTiles--;
  }

  getNumberOfNeighborBombs(rowIndex,columnIndex) {
    const neighborOffsets =
    [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
    const numberOfRows = this._bombBoard.length;
    const numberOfColumns = this._bombBoard[0].length;
    let numberOfBombs = 0;
    neighborOffsets.forEach(offset => {
      const neighborRowIndex = rowIndex + offset[0];
      const neighborColumnIndex = columnIndex + offset[1];
      if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows &&
        neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
          if (this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
            numberOfBombs++;
          }
        }
    });
    return numberOfBombs;
  };
  hasSafeTiles() {
    return this._numberOfTiles !== this.numberOfBombs;
  }
  print() {
   console.log(this._playerBoard.map(row => row.join(' | ')).join('\n'));
  };

  static generatePlayerBoard(numberOfRows,numberOfColumns) {
    let board = [];
    for (let  i= 0; i < numberOfRows; i++) {
     let row = []
      for (let i = 0 ; i < numberOfColumns; i++) {
        row.push(' ');
    } board.push(row);
   } return board;
 }

  static generateBombBoard(numberOfRows,numberOfColumns,numberOfBombs) {
   let board = [];
   for (let  i= 0; i < numberOfRows; i++) {
    let row = [];
     for (let i = 0 ; i < numberOfColumns; i++) {
       row.push(null);
   } board.push(row);
 }
  let numberOfBombsPlaced = 0
  while (numberOfBombsPlaced < numberOfBombs) {
    let randomRowIndex = Math.floor(Math.random() * numberOfRows);
    let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
    if (board[randomRowIndex][randomColumnIndex] !== "B") {
      board[randomRowIndex][randomColumnIndex] = 'B';
      numberOfBombsPlaced++;
    }
  } return board;
 }

}

const g = new game(5,5,0);
g.playMove(1,1);

/*const generatePlayerBoard = (numberofRows,numberofColumns) => {
  let board = [];
  for (let  i= 0; i < numberofRows; i++) {
   let row = []
    for (let i = 0 ; i < numberofColumns; i++) {
      row.push(' ');
  } board.push(row);
 } return board;
} */

/* let generateBombBoard = (numberofRows,numberofColumns,numberofBombs) => {
  let board = [];
  for (let  i= 0; i < numberofRows; i++) {
   let row = [];
    for (let i = 0 ; i < numberofColumns; i++) {
      row.push(null);
  } board.push(row);
}
 let numberofBombsPlaced = 0
 while (numberofBombsPlaced < numberofBombs) {
   let randomRowIndex = Math.floor(Math.random() * numberofRows);
   let randomColumnIndex = Math.floor(Math.random() * numberofColumns);
   if (board[randomRowIndex][randomColumnIndex] !== "B") {
     board[randomRowIndex][randomColumnIndex] = 'B';
     numberofBombsPlaced++;
   }
 } return board;
} */

/* const getNumberOfNeighborBombs = (bombBoard,rowIndex,columnIndex) => {
  const neighborOffsets =
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

/* const flipTile = (playerBoard, bombBoard, rowIndex, columnIndex) => {
  if (playerBoard[rowIndex][columnIndex] != ' ') {
    console.log('This tile has already been flipped!');
    return;
  } else if (bombBoard[rowIndex][columnIndex] === 'B') {
      playerBoard[rowIndex][columnIndex] = 'B';
    } else {
      playerBoard[rowIndex][columnIndex] =
      getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex);
    }
} */

 /* const printBoard = board => {
  console.log(board.map(row => row.join(' | ')).join('\n'));
}; */

/* print() {
 console.log(this.board.map(this.row => this.row.join(' | ')).join('\n'));
}; */

 /* let playerBoard = generatePlayerBoard(6,6);
let bombBoard = generateBombBoard(6,6,4);

console.log('Player Board: ')
printBoard(playerBoard);
console.log('Bomb Board: ');
printBoard(bombBoard);

flipTile(playerBoard,bombBoard,2,2);
console.log('Updated Player Board: ');
printBoard(playerBoard); */
