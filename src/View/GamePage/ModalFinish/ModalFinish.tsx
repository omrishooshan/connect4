import { Player } from '../../../ts/types/types'
import "./ModalFinish.scss";
import { useNavigate } from "react-router-dom";

function ModalFinish({
    winner,
    winnerColor,
    tie,
    resetGame
}: {
    winner?: String,
    winnerColor?: Player,
    tie?: Boolean,
    resetGame: (player: Player) => void,
}) {

    const navigate = useNavigate()

    return (
        <div className="Overlay">
            <div className="Modal">
                <h1>
                    {winner &&
                        <span>{winner} wins!</span>
                    }
                    {tie &&
                        <span>There Was A Tie</span>
                    }
                </h1>
                <button onClick={() => resetGame(winnerColor === 'red' ? 'yellow' : 'red')}>
                    Rematch
                </button>
                <button onClick={() => navigate('/scoreboard')}>
                    Go to Score Board
                </button>
            </div>
        </div>
    )
}
export default ModalFinish;
