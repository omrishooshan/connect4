import { Slot } from '../../../ts/types/types'
import './Slot.scss'

export default function Cell({
    Slot,
}: {
    Slot: Slot
}) {

    const classProperties = {
        "red": "Slot-red",
        "yellow": "Slot-yellow",
    }

    return (
        <div
            className={Slot ? classProperties[Slot] : "Slot"}
        />
    )
}

