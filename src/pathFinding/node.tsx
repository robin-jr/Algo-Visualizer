import React, { useState } from 'react'
import './node.css';
import { NodeI } from './pathFinding';
interface Props{
    nodeC:NodeI
}
export default function NodeC({nodeC}:Props) {
    const [change, setchange] = useState(0);
    const handleMouseClick=()=>{
        nodeC.isWall=true;
        setchange(Math.random());
    }
    return (
        <div 
         onClick={handleMouseClick} className={`node ${nodeC.isSrc? 'source':''} ${nodeC.isVisited? 'visited':''} ${nodeC.isDest? 'dest':''} ${nodeC.isPath? 'path':''} ${nodeC.isWeight? 'weight':''} ${nodeC.isWall? 'wall':''}`}>
        </div>
    )
}
