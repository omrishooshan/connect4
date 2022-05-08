import Cell from "../Slot/Slot"
import { IColumnProps } from '../../../ts/interfaces/interfaces';
import './Column.scss'

export default function Column({ column, onClick }: IColumnProps) {
    return (
        <div className="Column" onClick={onClick}>
            {column.map((slot, i) => (
                <Cell key={i} Slot={slot} />
            ))}
        </div>
    )
}

