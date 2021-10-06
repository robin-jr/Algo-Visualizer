async function partition(arr: any[],minIndex:number,maxIndex:number,comparator:Function,setarray:Function):Promise<number>{
    var pivot=maxIndex;
    let i=minIndex-1,j;
    for(j=i+1;j<pivot;j++){
        if(comparator(arr[j])<comparator(arr[pivot])){
            i+=1;
            await swap(arr,i,j,setarray);
        }
    }
    i+=1;
    await swap(arr,i,pivot,setarray);
    return i;
}
export async function sleep(delay : number){
    await new Promise(r => setTimeout(r, delay));
}
async function swap(arr: any[],i:number,j:number,setarray:Function):Promise<void>{
    let temp=arr[i];
    arr[i]=arr[j];
    arr[j]=temp;
    // arr[i].color="blue";
    // arr[j].color="blue";
    let t=arr.concat();
    setarray(t);
    await sleep(1);
    // arr[i].color="green";
    // arr[j].color="green";
    t=arr.concat();
    setarray(t);
    await sleep(1);
    console.log("not conas;dfoi");
}
export async function quickSort(arr:any[],minIndex:number,maxIndex:number,comparator:Function,setarray:Function):Promise<void>{
    if(maxIndex<=minIndex){
        return;
    }
    let pivot=await partition(arr,minIndex,maxIndex,comparator,setarray);
    quickSort(arr,minIndex,pivot-1,comparator,setarray);
    quickSort(arr,pivot+1,maxIndex,comparator,setarray);
}