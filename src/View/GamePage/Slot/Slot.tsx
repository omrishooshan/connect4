import { Token } from '../../../ts/types/types'
import './Slot.scss'

export default function Cell({
    token,
}: {
    token: Token
}) {

    const classProperties = {
        "red": "Slot-red",
        "yellow": "Slot-yellow",
    }

    return (
        <div
            className={token ? classProperties[token] : "Slot"}
        />
    )
}

