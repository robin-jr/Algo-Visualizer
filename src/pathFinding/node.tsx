import React, { useState } from 'react'
import './node.css';
import { NodeI } from './pathFinding';
interface Props {
    nodeC: NodeI,
    isMouseDown:boolean,
    obstacle:number,
}
export default function NodeC({ nodeC,isMouseDown ,obstacle}: Props) {
    const [change, setchange] = useState(0);
    const handleMouseClick = () => {
        if(isMouseDown){
            if(obstacle==1){
                nodeC.isWeight = true;
                nodeC.weight=2;
            }else if(obstacle==2){
                nodeC.isWall = true;
            }
            setchange(Math.random());
        }
    }
    return (
        <div draggable={false}
            onMouseEnter={handleMouseClick} className={`node ${nodeC.isSrc ? 'source' : ''} 
            ${nodeC.isVisited ? 'visited' : ''} ${nodeC.isDest ? 'dest' : ''} 
            ${nodeC.isPath ? 'path' : ''} ${nodeC.isWeight ? 'weight' : ''} 
            ${nodeC.isWall ? 'wall' : ''}`}>
                <div className={`${nodeC.isVisited ? 'visitedIn' : ''}`}>
                    {nodeC.isDest && <strong style={{ position:'absolute',left: '0'}}>End</strong>}
                    {nodeC.isSrc && <strong style={{ position:'absolute',left: '0',top:'-0.25em',fontSize: '2em'}}>{">"}</strong>}
                </div>
        </div>
    )
}
