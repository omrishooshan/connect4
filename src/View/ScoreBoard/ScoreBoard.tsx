
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
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
        width: 130,
    },

];

const rows = [
    { id: 1, winner: 'Jon', age: 35 },
    { id: 2, winner: 'Cersei', age: 42 },
    { id: 3, winner: 'Jaime', age: 45 },
    { id: 4, winner: 'Arya', age: 16 },
    { id: 7, winner: 'Ferrara', age: 44 },
    { id: 8, winner: 'Rossini', age: 36 },
    { id: 9, winner: 'Harvey', age: 65 },
];

export default function ScoreBoard() {

    let gameSummary: any = localStorage.getItem("gameSummary")
    let newArr = JSON.parse(gameSummary)
    let parsedItemsArr = newArr.map((item: any, index: number) => JSON.parse(item))
    console.log(parsedItemsArr)


    if (parsedItemsArr) return (
        <div className="tableWrapper">
            <h1 className='scoreboardTitle'>GAME SCOREBOARD</h1>
            <DataGrid
                rows={parsedItemsArr}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
            />
        </div>
    );
    else {
        return <h1>Loading...</h1>
    }
}