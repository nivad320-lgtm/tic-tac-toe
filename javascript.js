/* 
To Do:
- [x] add a display element that shows the results upon game end
- [x] interface to allow players to put in their names
- [x] include a button to start/restart the game
- [x] BugFix Displaying You Win and Tie together 
*/

function createBoard() {
    const board = {
        y1 : ['_', '_', '_'],
        y2 : ['_', '_', '_'],
        y3 : ['_', '_', '_'],
    }
    return board; 
}

const gameBoard = (() => {

    let board = createBoard();
    
    const displayGameBoard = () => {
            let myBoard = '';
            for (boardLine in board) {
                myBoard += `${board[boardLine]}\n`
            }
            return myBoard;
    };

    const boardCheck = (x,y) => {
        if (Object.values(board)[y][x] === '_') {
            return true;
        } else {return false;}
    }

    const placeX = (x,y) => {
        Object.values(board)[y][x] = 'X';
        return displayGameBoard();
    };

    const placeO = (x,y) => {
        Object.values(board)[y][x] = 'O';
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

    // There must be a better way to do this because because right now we are going through every elements in Array.
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

    const boardToArray = () => {
        const boardArray = Object.values(board).flat(Infinity);
        return boardArray;
    }

    const listenInput = (index) => {
        switch(index) {
            case 0:
                return [0, 0]
                break;
            case 1:
                return [1, 0]
                break;
            case 2:
                return [2, 0]
                break;
            case 3:
                return [0, 1]
                break;
            case 4:
                return [1, 1]
                break;
            case 5:
                return [2, 1]
                break;
            case 6:
                return [0, 2]
                break;
            case 7:
                return [1, 2]
                break;
            case 8:
                return [2, 2]
                break;            
        }
    }

    // I think what you could've done is turn this whole IIFE to factory function
    const resetBoard = () => {
        board = createBoard();
    }
    
    return { displayGameBoard, boardCheck, placeX, placeO, winThreeInARowX,
         winThreeInARowO, winVerticalThreeInARow, winDiagonalThreeInARow, tie, 
         boardToArray, listenInput, resetBoard };
})();


const ticTacToe = (() => {
    let turn = 'home';
    let win;
    const playGame = () => {
        
        console.log(gameBoard.displayGameBoard())
        
            if (turn === 'home') {
                console.log(`Home Team's Turn!`);
            } else if (turn === 'away') {
                console.log(`Away Team's Turn!`);
            }
            
            
            let inputX = displayController.printValue()[0]
            let inputY = displayController.printValue()[1]

            console.log(`X: ${inputX}`)
            console.log(`Y: ${inputY}`)

            if (!gameBoard.boardCheck(inputX,inputY)) {
                console.log("Same Place!");
                return 
            }
                        
            if (turn === 'home') {
                gameBoard.placeX(inputX, inputY);
            } else if (turn === 'away') {
                gameBoard.placeO(inputX, inputY)
            }
            
            if (gameBoard.winVerticalThreeInARow() || gameBoard.winDiagonalThreeInARow() || gameBoard.winThreeInARowX() || gameBoard.winThreeInARowO()) {
                console.log(`Game Over! ${turn.toUpperCase()} win!`);
                console.log(gameBoard.displayGameBoard());                
                win = turn;
            } else if(gameBoard.tie()) {
                console.log(`Draw!`);
                console.log(gameBoard.displayGameBoard());
                win = 'draw';
            } else {console.log(gameBoard.displayGameBoard());
            if (turn === 'home') {
                turn = 'away'
            } else if (turn === 'away') {
                turn = 'home'
            }}
    }

    const showWinner = () => {
        return win
    }

    const resetWinner = () => {
        win = undefined;
    }

    return { playGame, showWinner, resetWinner }
})();

function createPlayer(name) {
    return { name }
}

const displayController = (() => {
    
    // probably not needed anymore, used it for prototyping
    let currentValue;
    let clicked = false;
    let player1Name;
    let player2Name;
    const createCanvas = () => {
        const startDialog = document.querySelector('#startDialog');
        const startButton = document.createElement('button');
        startButton.textContent = 'Start';
        startButton.addEventListener('click', (event) => {
            event.preventDefault();
            startDialog.close(player1.value);
            startDialog.close(player2.value);
            player1Name = createPlayer(player1.value);
            player2Name = createPlayer(player2.value);
        })
        startDialog.appendChild(startButton);
        startDialog.showModal();

        const dialog = document.querySelector('#dialog');
        let container = document.createElement('div');
        container.setAttribute("class", "container");
        document.body.appendChild(container);

        const winnerText = document.createElement('p');
        dialog.appendChild(winnerText);

        const replayButton = document.createElement('button');
        replayButton.textContent = 'Replay';
        replayButton.addEventListener("click", (event) => {
            dialog.close();
            gameBoard.resetBoard();
            [...gridBoxes].forEach((item, index) => {
            item.textContent = gameBoard.boardToArray()[index];
                })
            }
        );
        dialog.appendChild(replayButton);

        for (let i = 0; i < 9; i ++) {
            let box = document.createElement('div');
            box.setAttribute("class", "gridBox");
            container.appendChild(box);
        }

        const gridBoxes = document.querySelectorAll('.gridBox');
        [...gridBoxes].forEach((item, index) => {
            item.textContent = gameBoard.boardToArray()[index];
            item.addEventListener("click", () => {
                currentValue = gameBoard.listenInput(index);
                ticTacToe.playGame();
                item.textContent = gameBoard.boardToArray()[index];
                if (ticTacToe.showWinner()) {
                    if (ticTacToe.showWinner() === 'home') {
                        winnerText.textContent = `${player1Name.name} Win!`;
                    } else if (ticTacToe.showWinner() === 'away') {
                        winnerText.textContent = `${player2Name.name} Win!`;
                    } else if (ticTacToe.showWinner() === 'draw') {
                        winnerText.textContent = `Draw!`;
                    }
                    dialog.showModal();
                    ticTacToe.resetWinner();
                    item.textContent = gameBoard.boardToArray()[index];
                }
            });
        });
    }

    // probably not needed anymore, used it for prototyping
    const printValue = () => {
        return currentValue;
    }

    // probably not needed anymore
    const didTheyClick = () => {
        return clicked;
    }

    return { createCanvas, printValue, didTheyClick }

})();

// ticTacToe.playGame()
// console.log(gameBoard.winVerticalThreeInARow())
displayController.createCanvas()