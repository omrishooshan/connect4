
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { winnerInfo } from '../../ts/types/types';
import "./ScoreBoard.scss";


const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'winner', headerName: 'Winner', width: 90 },
    {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        width: 90,
    },
    {
        field: 'time',
        headerName: 'Game Duration',
        type: 'number',
        width: 130,
    },
    {
        field: 'moves',
        headerName: 'Counter Of Moves',
        type: 'number',
        width: 150,
    },

];

export default function ScoreBoard() {

    let gameSummary: string = localStorage.getItem("gameSummary") || ""
    let newArr = JSON.parse(gameSummary)
    let parsedItemsArr = newArr.map((item: string) => JSON.parse(item))
        .sort((a: winnerInfo, b: winnerInfo) => a.moves - b.moves)
        .map((item: winnerInfo, index: number) => {
            item.id = index.toString()
            return item
        })


    if (!parsedItemsArr) return <h1>Loading...</h1>
    return (
        <div className='scoreboardWrapper'>
            <h1 className='scoreboardTitle'>GAME SCOREBOARD</h1>
            <div className="tableWrapper">
                <DataGrid
                    rows={parsedItemsArr}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                />
            </div>
        </div>
    );

}