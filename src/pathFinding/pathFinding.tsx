import { useEffect, useRef, useState } from 'react'
import { aStar, djikstra } from './algorithms';
import NodeC from './node';
import './node.css';

export interface NodeI {
    distance: number,
    col: number,
    row: number,
    isSrc: boolean,
    isDest: boolean,
    isVisited: boolean,
    isPath:boolean,
    isWeight:boolean,
    isWall:boolean,
    weight: number,
    previous: NodeI | null,
}
export default function PathFinding(props: any) {
    const { handleTypeChange, type } = props;
    const rows = 15, cols = 25;
    enum Algorithms {
        djikstra = 'Dijkstra',
        aStar = 'A*',
    }
    const [algo, setalgo]: any = useState(Algorithms.djikstra);
    const [grid, setgrid] = useState<NodeI[][]>([...Array(rows)].map(x => Array(cols)));
    // const grid:NodeI[][] = [...Array(rows)].map(x => Array(cols));
    const [change, setchange] = useState(0);
    const [obstacle,setobstacle]=useState(0);
    const [isMouseDown, setisMouseDown] = useState(false);

    useEffect(() => {
        resetGrid();
    }, []);
    async function search(){
        switch (algo) {
            case Algorithms.djikstra:
                await djikstra(grid,setchange);
                break;
            case Algorithms.aStar:
                await aStar(grid,setchange);
                break;
            default:
                break;
        }
    }
    function resetGrid() {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                grid[i][j] = { row: i, col: j, distance: Number.MAX_VALUE, isSrc: false, isDest: false, isVisited: false,isPath:false, previous: null, weight: 1,isWeight:false,isWall:false};
            }
        }
        grid[3][4].isSrc = true;
        grid[3][4].distance = 0;

        grid[5][9].isDest = true;

        // grid[3][6].isWall = true;
        // grid[3][7].isWall = true;
        // grid[4][7].isWall = true;
        // grid[4][6].isWall = true;
        // grid[5][6].isWall = true;

        // grid[3][7].weight = 3;
        // grid[3][7].isWeight = true;
        setchange(9);
    }
    function handleAlgoChange(e: any) {
        setalgo(e.currentTarget.value);
    }
    const ref = useRef<HTMLDivElement>(null);
    return (
        <div  onMouseEnter={()=>{
            if(null != ref.current){console.log("mouse entred");ref.current.focus();}}} ref={ref}  onKeyPressCapture={(e)=>{console.log(e.key); if(e.ctrlKey){console.log("ctrl pressed")}}}>
            <div className="nav">
                <h3>Path Finding Algorithm: {algo}</h3>
                <label>Type: </label>
                <select onChange={(e) => handleTypeChange(e.currentTarget.value)} value={type}>
                    <option value={0}>Sorting</option>
                    <option value={1}>Path Finding</option>
                </select>
                <label>Algorithm: </label>
                <select onChange={handleAlgoChange}>
                    <option>{Algorithms.djikstra}</option>
                    <option>{Algorithms.aStar}</option>
                </select>
                <button className="obstacle-btn" disabled={obstacle==1} onClick={()=>setobstacle(1)} >Add Weight</button>
                <button className="obstacle-btn" disabled={obstacle==2} onClick={()=>setobstacle(2)}>Add Wall</button>
                <button onClick={resetGrid}>Reset Grid</button>
                <button onClick={search}>Start</button>

            </div>
            <div className=""  onMouseDown={()=>{setisMouseDown(true);console.log("pressed")}} onMouseUp={()=>{setisMouseDown(false);console.log("up")}}>
                <div className="frame">
                    <div className="boundary" >
                        {console.log("rebuilding")}
                        {grid.map(function (row, idx) {
                            return <div key={idx} className="row" draggable={false}>
                                {row[0] ?
                                    [...row].map((node: NodeI, idx) => <NodeC nodeC={node} obstacle={obstacle} isMouseDown={isMouseDown} key={idx}></NodeC>) : null}
                            </div>;
                        }
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
