import React, {useState} from 'react';
import './TicTacToe.css';

const TicTacToe = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isXTurn, setIsXTurn] = useState(true);
    const winner = calculateWinner(board);

    const handleClick = (index) => {
        if(board[index] || winner) return;

        const newBoard =  [...board];
        newBoard[index] = isXTurn ? 'X' : 'O';
        setBoard(newBoard);
        setIsXTurn(!isXTurn);
    };

    const handleReset = () => {
        setBoard(Array(9).fill(null));
        setIsXTurn(true);
    };

    const renderSquare = (index) => (
       <button className = "square" onClick = {() => handleClick(index)}>
        {board[index]}
       </button>
    );

    const status = winner 
    ? `Winner: ${winner}`
    : board.every(Boolean)
    ? "Match Tied!"
    : `Next Player: ${isXTurn ? 'X' : 'O'}`;

    return (
        <div className = "game">
            <h1>TIC-TAC-TOE</h1>
            <h2>{status}</h2>

            <div className = "board">
                {[0, 1, 2].map(row => (
                    <div key = {row} className = "board-row">
                        {renderSquare(row * 3)}
                        {renderSquare(row * 3 + 1)}
                        {renderSquare(row * 3 + 2)}
                    </div>
                ))}
            </div>
            <button onClick = {handleReset}>Reset</button>
        </div>
    )
};

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], //for rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], //for cols
        [0, 4, 8], [2, 4, 6] //for diagonals
    ];

    for(let [a, b, c] of lines) {
        if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

export default TicTacToe;