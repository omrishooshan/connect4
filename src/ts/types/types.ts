export type Player = 'red' | 'yellow'
export type Slot = undefined | Player
export type TBoard = Slot[][]
export type winnerInfo = {
    id?: string
    winner: string
    age: number
    time: string
    moves: number
}
export type GameAction =
    | {
        type: 'turn'
        payload: number
    }
    | {
        type: 'reset'
        payload: Player
    }