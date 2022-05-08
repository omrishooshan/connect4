import Cell from "../Slot/Slot"
import { ColumnProps } from '../../../ts/interfaces/interfaces';
import './Column.scss'

export default function Column({ column, onClick }: ColumnProps) {
    return (
        <div className="Column" onClick={onClick}>
            {column.map((token, i) => (
                <Cell key={i} token={token} />
            ))}
        </div>
    )
}

