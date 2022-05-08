import { Player } from '../../ts/types/types'
import Column from './Column/Column';
import './GamePage.scss'
import ModalFinish from './ModalFinish/ModalFinish'
import useGameHelper from './hooks/useGameHelper';
import { useStopwatch } from 'react-timer-hook';
import { writeStorage } from '@rehooks/local-storage';
import { useEffect } from 'react';
import { v4 as uuid } from 'uuid';

export default function GamePage() {
    console.log("gamepage")
    const { state, dispatch } = useGameHelper()
    const { seconds, minutes, reset, pause } = useStopwatch({ autoStart: true });

    function resetGame(player: Player) {
        reset()
        dispatch({ type: 'reset', payload: player })
    }

    const players = JSON.parse(localStorage.getItem("players") || "")

    useEffect(() => {
        if (state.winner) {
            pause()

            const unique_id = uuid();

            const small_id = unique_id.slice(0, 8)

            const jsonObjWinner = JSON.stringify({
                "id": small_id,
                "winner": players[`${state.winner}Nickname`],
                "age": players[`${state.winner}Age`],
                "time": `${minutes} : ${seconds}`,
                "moves": state.moves[state.winner || "red"]
            });

            let gameSummary: any = localStorage.getItem("gameSummary")

            gameSummary = gameSummary ? JSON.parse(gameSummary.split(',')) : []

            gameSummary.push(jsonObjWinner)

            writeStorage("gameSummary", gameSummary)
        }
    }, [state.winner])

    return (
        <div className="GameWrapper">
            {state.winner && (
                <ModalFinish winner={players[`${state.winner}Nickname`]} winnerColor={state.winner} resetGame={resetGame} />
            )}
            {state.tie && (
                <ModalFinish tie={state.tie} resetGame={resetGame} />
            )}
            <h1 className="Title">Connect 4</h1>
            <div className="Turn">
                <div className="TurnText">Player turn:</div>
                <span> {players[`${state.currentPlayer}Nickname`]}  </span>
                <span style={{ color: `${state.currentPlayer}` }}>{state.currentPlayer}</span>
            </div>
            <div className="Board">
                {state.board.map((column, i) => (
                    <Column
                        key={i}
                        column={column}
                        onClick={() => dispatch({ type: 'turn', payload: i })}
                    />
                ))}
            </div>
        </div>
    );
}
