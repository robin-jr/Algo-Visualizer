import React, { useState } from 'react'

export default function PathFinding(props:any) {
    const {handleTypeChange,type}=props;
    enum Algorithms{
        djikstra='Djikstra',
        aStar='A*',
    }
    const [algo, setalgo] :any= useState(Algorithms.djikstra);
    function handleAlgoChange(e:any){
        setalgo(e.currentTarget.value);
    }
    return (
        <>
        <div className="nav">
            <h3>Path Finding Algorithm: {algo}</h3>
            <label>Type: </label>
            <select onChange={(e)=>handleTypeChange(e.currentTarget.value)} value={type}>
                <option value={0}>Sorting</option>
                <option value={1}>Path Finding</option>
            </select>
            <label>Algorithm: </label>
            <select onChange={handleAlgoChange}>
                <option>{Algorithms.djikstra}</option>
                <option>{Algorithms.aStar}</option>
            </select>
            <button onClick={()=>{}}>Reset</button>
            <button onClick={()=>{}}>Start</button>

        </div>
        <div className="container">
            <div className="frame">
                <div className="boundary">
                    {console.log("rebuilding")}
                    Find Path
                </div>
            </div>
        </div>
    </>
    )
}
