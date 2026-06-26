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
        x0 : ['_', '_', '_'],
        x1 : ['_', '_', '_'],
        x2 : ['_', '_', '_'],
    }

    const displayGameBoard = () => {
            let myBoard = '';
            for (boardLine in board) {
                myBoard += `${board[boardLine]}\n`
            }
            return myBoard;
    };

    return { displayGameBoard };
})();

console.log(gameBoard.displayGameBoard());