import { Player, TBoard, Token } from '../types/types'

export interface IGameState {
    currentPlayer: Player
    winner: Player | null
    tie: Boolean | null
    board: TBoard
    moves: {
        red: number
        yellow: number
    }
}

export interface IColumnProps {
    column: Token[]
    onClick: () => void
}