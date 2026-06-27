const gameBoard = (() => {

    const board = {
        y1 : ['_', '_', '_'],
        y2 : ['_', '_', '_'],
        y3 : ['_', '_', '_'],
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
        if ((board.y2[1] === board.y1[0] && board.y2[1] === board.y3[2]) ||
         (board.y2[1] === board.y1[2] && board.y2[1] === board.y3[0])) {
            console.log('win');
        }
    }
    
    return { displayGameBoard, placeX, placeO, winThreeInARowX, winVerticalThreeInARow, winDiagonalThreeInARow };
})();

const ticTacToe = (() => {
    let turn = 'home';
    const win = 0;

    const playGame = () => {
        
        console.log(gameBoard.displayGameBoard())
        
        while (!win) {
            if (turn === 'home') {
                console.log(`Home Team's Turn!`);
            } else if (turn === 'away') {
                console.log(`Away Team's Turn!`);
            }
            
            let inputX = prompt("X");
            let inputY = prompt("Y");
            
            if (turn === 'home') {
                gameBoard.placeX(inputX, inputY);
            } else if (turn === 'away') {
                gameBoard.placeO(inputX, inputY)
            }

            console.log(gameBoard.displayGameBoard())
            if (turn === 'home') {
                turn = 'away'
            } else if (turn === 'away') {
                turn = 'home'
            }
        }
    }

    return { playGame }
})();

// console.log(gameBoard.placeX('2','1'));
// console.log(gameBoard.winThreeInARowX())
// console.log(gameBoard.winVerticalThreeInARow())
// console.log(gameBoard.winDiagonalThreeInARow())

console.log(ticTacToe.playGame())