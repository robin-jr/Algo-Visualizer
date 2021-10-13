import { sleep } from "../sorting/algorithms";
import { NodeI } from "./pathFinding";
const delay=10;

function minDistance(grid:NodeI[][]) {
    let min=Number.MAX_VALUE+1;
    let index:number[]=[];
    grid.forEach(row => {
        row.forEach(node => {
            if (node.distance<min && !node.isVisited && !node.isWall) {
                min=node.distance;
                index=[node.row,node.col];
            }
        });
    });
    return index;
}
function minAstarDistance(grid:NodeI[][],destNode:NodeI) {
    let min=Number.MAX_VALUE+1;
    let index:number[]=[];
    grid.forEach(row => {
        row.forEach(node => {
            let aStarDistance=node.distance+Math.abs(node.row-destNode.row)+Math.abs(node.col-destNode.col);
            if (aStarDistance<min && !node.isVisited && !node.isWall) {
                min=aStarDistance;
                index=[node.row,node.col];
            }
        });
    });
    return index;
}
export async function djikstra(grid:NodeI[][],setchange:Function) {
    while (true) {
        let index=minDistance(grid);
        if(index.length<1){
            console.log("not success");
            return;
        }
        let i=index[0],j=index[1];
        grid[i][j].isVisited=true;
        setchange(Math.random());
        await sleep(delay);

        let neighbors=[];
        if(i+1<grid.length && !grid[i+1][j].isVisited){
            neighbors.push(grid[i+1][j]);
        }
        if(i-1>=0 && !grid[i-1][j].isVisited){
            neighbors.push(grid[i-1][j]);
        }
        if(j+1<grid[0].length && !grid[i][j+1].isVisited){
            neighbors.push(grid[i][j+1]);
        }
        if(j-1>=0 && !grid[i][j-1].isVisited){
            neighbors.push(grid[i][j-1]);
        }
        if(grid[i][j].isDest){
            let prev=grid[i][j].previous;
            while(prev && !prev.isSrc){
                prev.isPath=true;
                prev=prev.previous;
                await sleep(100);
                setchange(Math.random());
            }
            console.log("Success");
            return;
        }
        neighbors.forEach(node => {
            let newDistance=grid[i][j].distance+node.weight;
            if(node.distance>newDistance && !node.isWall){
                node.distance=newDistance;
                node.previous=grid[i][j];
            }
        });
        
    }
}

export async function aStar(grid:NodeI[][],setchange:Function) {
    let destNode:NodeI|null=null;
    grid.forEach(row => {
        row.forEach(node => {
            if (node.isDest) {
                destNode=node;
            }
        });
    });
    if(!destNode){
        console.log("not success 2");
        return;
    }
    while (true) {
        let index=minAstarDistance(grid,destNode);
        if(index.length<1){
            console.log("not success");
            return;
        }
        let i=index[0],j=index[1];
        grid[i][j].isVisited=true;
        setchange(Math.random());
        await sleep(delay);

        let neighbors=[];
        if(i+1<grid.length && !grid[i+1][j].isVisited){
            neighbors.push(grid[i+1][j]);
        }
        if(i-1>=0 && !grid[i-1][j].isVisited){
            neighbors.push(grid[i-1][j]);
        }
        if(j+1<grid[0].length && !grid[i][j+1].isVisited){
            neighbors.push(grid[i][j+1]);
        }
        if(j-1>=0 && !grid[i][j-1].isVisited){
            neighbors.push(grid[i][j-1]);
        }
        if(grid[i][j].isDest){
            let prev=grid[i][j].previous;
            while(prev && !prev.isSrc){
                prev.isPath=true;
                prev=prev.previous;
                await sleep(100);
                setchange(Math.random());
            }
            console.log("Success");
            return;
        }
        neighbors.forEach(node => {
            let newDistance=grid[i][j].distance+node.weight;
            if(node.distance>newDistance && !node.isWall){
                node.distance=newDistance;
                node.previous=grid[i][j];
            }
        });
        
    }
}