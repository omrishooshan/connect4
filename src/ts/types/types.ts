export type Player = 'red' | 'yellow'
export type Token = undefined | Player
export type TBoard = Token[][]
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