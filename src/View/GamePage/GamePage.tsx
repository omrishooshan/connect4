import { Player, winnerInfo } from '../../ts/types/types'
import Column from './Column/Column';
import './GamePage.scss'
import ModalFinish from './ModalFinish/ModalFinish'
import useGameHelper from './hooks/useGameHelper';
import { useStopwatch } from 'react-timer-hook';
import { writeStorage } from '@rehooks/local-storage';
import { useEffect } from 'react';

export default function GamePage() {
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

            const jsonObjWinner: winnerInfo = {
                "winner": players[`${state.winner}Nickname`],
                "age": players[`${state.winner}Age`],
                "time": `${minutes} : ${seconds}`,
                "moves": state.moves[state.winner || "red"]
            };

            let gameSummary: string = localStorage.getItem("gameSummary") || "[]"

            const parsedGameSummary = JSON.parse(gameSummary)

            parsedGameSummary.push(JSON.stringify(jsonObjWinner))

            writeStorage("gameSummary", parsedGameSummary)
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
                <strong style={{ color: `${state.currentPlayer}` }}> {players[`${state.currentPlayer}Nickname`]}  </strong>

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
