import React, { useEffect, useState } from 'react';
import {quickSort as alQuickSort, sleep} from './algorithms';
import './sorting.css';
export default function Sorting() {
    interface Bar{
        value :number,
        color :string
    }
    const [array, setarray] = useState<Bar[]>([]);
    const size=80;
    useEffect(() => {
        resetArray();
    }, [])
    function resetArray(){
        let temp:Bar[]=[];
        for (let i = 0; i < size; i++) {
            let min=20,max=500;
            temp.push({value: Math.floor(Math.random() * (max - min + 1) + min),color:"purple"});
        }
        setarray(temp);
    }
    async function quickSort(){
        let arr=array.concat();
        alQuickSort(arr,0,arr.length-1,(e:any)=>e.value,setarray);
    }
    return (
        <>
        <div className="nav">
            <select>
                <option>Sorting</option>
                <option>Path Finding</option>
            </select>
            <button onClick={resetArray}>Reset Array</button>
            <button onClick={quickSort}>Sort</button>

            <div>Quick Sort</div>
            <button>Quick Sort</button>
            <button>Merge Sort</button>
            <button>Heap Sort</button>
            <button>Bubble Sort</button>
        </div>
        <div className="container">
            <div className="frame">
                <div className="boundary">{console.log("called again")}
                {array.map((e:Bar,idx)=><div className="bar" key={idx} style={{height:e.value,background:e.color,width:(window.innerWidth*0.6)/size}}></div>)}
                </div>
            </div>
        </div>
        </>
    )
}
