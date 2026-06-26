// const gameBoard = {
//     x0: ['_', '_', '_'],
//     x1: ['_', '_', '_'],
//     x2: ['_', '_', '_'],
// }

// for (const boardLine in gameBoard) {
//     console.log(gameBoard[boardLine]);
// }

const gameBoard = (() => {

    const board = {
        y1 : ['_', '_', '_'],
        y2 : ['_', '_', '_'],
        y3 : ['_', '_', '_'],
    }

    const displayGameBoard = () => {
            let myBoard = '';
            for (boardLine in board) {
                myBoard += `${board[boardLine]}\n`
            }
            return myBoard;
    };

    const placeX = () => {
        Object.values(board)[0][0] = 'X';
        return displayGameBoard();
    };
        
    return { displayGameBoard, placeX };
})();

console.log(gameBoard.displayGameBoard());
console.log(gameBoard.placeX());