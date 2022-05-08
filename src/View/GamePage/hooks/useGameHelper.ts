import { useReducer } from "react"
import { IGameState } from '../../../ts/interfaces/interfaces';
import { Player, Token, TBoard, GameAction } from '../../../ts/types/types'
import { TotalColumns, TotalRows, MaxSlots } from './contants'

function canPlay(column: Token[]) {
    return column.some((cell) => cell === undefined)
}

const createEmptyBoard = (): TBoard => {
    return Array(TotalColumns)
        .fill(undefined)
        .map(() => Array(TotalRows).fill(undefined))
}


const createNewBoard = (
    board: TBoard,
    playedColumn: number,
    currentPlayer: Player
): TBoard => {
    return board.map((column, i) => {
        if (i === playedColumn) {
            const newColumn = [...column]
            for (let index = newColumn.length - 1; index >= 0; index--) {
                if (newColumn[index] === undefined) {
                    newColumn[index] = currentPlayer
                    break
                }
            }
            return newColumn
        }
        return column
    })
}

function initState(player: Player): IGameState {

    return {
        currentPlayer: player,
        winner: null,
        tie: null,
        board: createEmptyBoard(),
        moves: {
            "red": 0,
            "yellow": 0
        }
    }
}

function checkIfTie(moves: any) {
    if (moves["red"] + moves["yellow"] === MaxSlots) return true
    else return false

}
function checkIfWinner(board: TBoard, player: Player) {
    // vertical check
    for (let j = 0; j < TotalColumns; j++) {
        const column = board[j]
        for (let i = 0; i < 3; i++) {
            if (
                column[i] == player &&
                column[i + 1] == player &&
                column[i + 2] == player &&
                column[i + 3] == player
            ) {
                return true
            }
        }
    }

    // horizontal check
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < TotalColumns; j++) {
            if (
                board[i][j] == player &&
                board[i + 1][j] == player &&
                board[i + 2][j] == player &&
                board[i + 3][j] == player
            ) {
                return true
            }
        }
    }

    // diagonal going up
    for (let i = 0; i < 4; i++) {
        for (let j = 5; j > 2; j--) {
            if (
                board[i][j] == player &&
                board[i + 1][j - 1] == player &&
                board[i + 2][j - 2] == player &&
                board[i + 3][j - 3] == player
            ) {
                return true
            }
        }
    }

    // diagonal going down
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 3; j++) {
            if (
                board[i][j] == player &&
                board[i + 1][j + 1] == player &&
                board[i + 2][j + 2] == player &&
                board[i + 3][j + 3] == player
            ) {
                return true
            }
        }
    }

    return false
}

function reducer(state: IGameState, action: GameAction): IGameState {


    switch (action.type) {
        case 'turn':
            if (!canPlay(state.board[action.payload])) {
                return state
            }
            const newBoard = createNewBoard(
                state.board,
                action.payload,
                state.currentPlayer
            )
            state.moves[state.currentPlayer]++

            const checkTie = checkIfTie(state.moves)
            if (checkTie) {
                return {
                    ...state,
                    tie: true
                }
            }

            const currentPlayerWins = checkIfWinner(newBoard, state.currentPlayer)
            if (currentPlayerWins) {
                return {
                    ...state,
                    winner: state.currentPlayer,
                    board: newBoard
                }
            } else {
                return {
                    ...state,
                    currentPlayer: state.currentPlayer === 'red' ? 'yellow' : 'red',
                    board: newBoard
                }
            }
        case 'reset':
            return initState(action.payload)
        default:
            throw new Error()
    }
}

const red: Player = "red"
const yellow: Player = "yellow"

const randonArr = [
    red,
    yellow
]

const randomPlayer = randonArr[Math.floor(Math.random() * randonArr.length)];

export default function useGameHelper() {

    const initialPlayer = randomPlayer

    const [state, dispatch] = useReducer(reducer, initState(initialPlayer))

    return { state, dispatch }
}
