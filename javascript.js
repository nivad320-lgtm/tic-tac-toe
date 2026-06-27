const gameBoard = (() => {

    const board = {
        y1 : ['X', 'X', '_'],
        y2 : ['_', 'X', 'X'],
        y3 : ['X', 'X', 'X'],
    }

    const threeXInARow = (currentValue) => currentValue === 'X';
    
    const displayGameBoard = () => {
            let myBoard = '';
            for (boardLine in board) {
                myBoard += `${board[boardLine]}\n`
            }
            return myBoard;
    };

    const placeX = (x,y) => {
        Object.values(board)[y-1][x-1] = 'X';
        return displayGameBoard();
    };

    const placeO = (x,y) => {
        Object.values(board)[y-1][x-1] = 'O';
        return displayGameBoard();
    };
        
    // bug where it returns undefined
    const winThreeInARowX = () => {
        Object.values(board).forEach((value) => {
            if (value.every(threeXInARow)) {
                console.log(value);    
            }
        });
    }

    const winVerticalThreeInARow = () => {
        for (let i = 0; i < board.y1.length; i++) {
            if (board.y1[i] === board.y2[i] && board.y2[i] === board.y3[i]) {
                console.log('win');
            } else {
                console.log('no')
            }
        }
    }

    const winDiagonalThreeInARow = () => {
        if ((board.y2[1] === board.y1[0] && board.y2[1] === board.y3[2]) || (board.y2[1] === board.y1[2] && board.y2[1] === board.y3[0])){
            console.log('win');
        }
    }
    
    return { displayGameBoard, placeX, placeO, winThreeInARowX, winVerticalThreeInARow, winDiagonalThreeInARow };
})();

// console.log(gameBoard.placeX(2,1));
// console.log(gameBoard.winThreeInARowX())
// console.log(gameBoard.winVerticalThreeInARow())
console.log(gameBoard.winDiagonalThreeInARow())