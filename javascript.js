const gameBoard = (() => {

    const board = {
        y1 : ['_', 'X', 'X'],
        y2 : ['_', '_', 'X'],
        y3 : ['X', '_', 'X'],
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
    
    return { displayGameBoard, placeX, placeO, winThreeInARowX, winVerticalThreeInARow };
})();

// console.log(gameBoard.placeX(2,1));
// console.log(gameBoard.winThreeInARowX())
console.log(gameBoard.winVerticalThreeInARow())