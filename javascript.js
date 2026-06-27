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

    const boardCheck = (x,y) => {
        if (Object.values(board)[y-1][x-1] === '_') {
            return true;
        } else {return false;}
    }

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
        function threeXInARow(value) {
            return value === 'X'
        }
        if (board.y1.every(threeXInARow) || board.y2.every(threeXInARow) || board.y3.every(threeXInARow)) {
            return true;
        }
    }

    const winThreeInARowO = () => {
        function threeOInARow(value) {
            return value === 'O'
        }
        if (board.y1.every(threeOInARow) || board.y2.every(threeOInARow) || board.y3.every(threeOInARow)) {
            return true;
        }
    }    

    const winVerticalThreeInARow = () => {
        for (let i = 0; i < board.y1.length; i++) {
            if ((board.y1[i]==='X' && board.y2[i] === 'X' && board.y3[i] === 'X') ||
             (board.y1[i]==='O' && board.y2[i] === 'O' && board.y3[i] === 'O')
            ) {
                return true;
            } 
        }
    }

    const winDiagonalThreeInARow = () => {
        if ((board.y2[1] === 'X' && board.y1[0] === 'X' && board.y3[2] === 'X') ||
            (board.y2[1] === 'X' && board.y1[2] === 'X' && board.y3[0] === 'X') ||
            (board.y2[1] === 'O' && board.y1[2] === 'O' && board.y3[0] === 'O') ||
            (board.y2[1] === 'O' && board.y1[0] === 'O' && board.y3[2] === 'O')) {
            return true;
        } 
    }

    const tie = () => {
        let tieCount = 0;
        for(let i = 0; i < Object.values(board).length; i++){
            for(let j = 0; j < Object.values(board)[i].length; j++){

            if(Object.values(board)[i][j] === '_') {
                tieCount++;
                };
            }
        }
        if(tieCount === 0) {
            return true;
        };
    }
    
    return { displayGameBoard, boardCheck, placeX, placeO, winThreeInARowX, winThreeInARowO, winVerticalThreeInARow, winDiagonalThreeInARow, tie };
})();


const ticTacToe = (() => {
    let turn = 'home';
    let win = 0
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
            
            while (!gameBoard.boardCheck(inputX,inputY)) {
                console.log("Same Place!")
                inputX = prompt("X");
                inputY = prompt("Y");
            }
                        
            if (turn === 'home') {
                gameBoard.placeX(inputX, inputY);
            } else if (turn === 'away') {
                gameBoard.placeO(inputX, inputY)
            }
            
            if (gameBoard.winVerticalThreeInARow() || gameBoard.winDiagonalThreeInARow() || gameBoard.winThreeInARowX() || gameBoard.winThreeInARowO()) {
                console.log(`Game Over! ${turn.toUpperCase()} win!`);
                console.log(gameBoard.displayGameBoard());

                win++;
                break
            };

            if(gameBoard.tie()) {
                console.log(`Draw!`);
                console.log(gameBoard.displayGameBoard());
                break;
            }

            
            console.log(gameBoard.displayGameBoard());
            if (turn === 'home') {
                turn = 'away'
            } else if (turn === 'away') {
                turn = 'home'
            }
        }
    }

    return { playGame }
})();

console.log(ticTacToe.playGame())
// console.log(gameBoard.winVerticalThreeInARow())