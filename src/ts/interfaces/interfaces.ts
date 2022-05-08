import { Player, TBoard, Token } from '../types/types'

export interface GameState {
    currentPlayer: Player
    winner: Player | null
    tie: Boolean | null
    board: TBoard
    moves: {
        red: number
        yellow: number
    }
}

export interface ColumnProps {
    column: Token[]
    onClick: () => void
}