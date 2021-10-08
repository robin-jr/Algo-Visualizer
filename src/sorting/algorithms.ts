const delay=1;
async function partition(arr: any[],minIndex:number,maxIndex:number,setchange:Function):Promise<number>{
    var pivot=maxIndex;
    let i=minIndex-1,j;
    for(j=i+1;j<pivot;j++){
        if(arr[j].value<arr[pivot].value){
            i+=1;
            await swap(arr,i,j,setchange);
        }
    }
    i+=1;
    await swap(arr,i,pivot,setchange);
    return i;
}
export async function sleep(delay : number){
    await new Promise(r => setTimeout(r, delay));
}
async function swap(arr: any[],i:number,j:number,setchange:Function):Promise<void>{
    let temp=arr[i];
    arr[i]=arr[j];
    arr[j]=temp;
    setchange(Math.random());
    await sleep(delay);
}
export async function quickSort(arr:any[],minIndex:number,maxIndex:number,setchange:Function):Promise<void>{
    if(maxIndex<=minIndex){
        return;
    }
    let pivot=await partition(arr,minIndex,maxIndex,setchange);
    await quickSort(arr,minIndex,pivot-1,setchange);
    await quickSort(arr,pivot+1,maxIndex,setchange);
}

export async function mergeSort(arr:any[],low:number,high:number,setchange:Function) {
    let m= Math.floor((low+high)/2);
    if(high<=low){
        return;
    }
    await mergeSort(arr,low,m,setchange);
    await mergeSort(arr,m+1,high,setchange);

    let j=m+1,i=low,k=0;
    let t=[];
    for (; i <= m && j<=high;) {
            if(arr[i].value<arr[j].value){
                t[k]=arr[i];
                i++;
            }else{
                t[k]=arr[j];
                j++;
            }
            k++;
    }
    for(;i<=m;){
        t[k]=arr[i];
        i++;
        k++;
    }
    for(;j<=high;){
        t[k]=arr[j];
        j++;
        k++;
    }
    for(i=low,k=0;i<=high;i++){
        arr[i]=t[k++];
        await sleep(delay);
        setchange(Math.random());
    }
}

export async function bubbleSort(arr:any[],setchange:Function) {
    let i,j;
    for(i=0;i<arr.length-1;i++){
        for(j=i;j<arr.length;j++){
            if(arr[i].value>arr[j].value){
                await swap(arr,i,j,setchange);
            }
        }
    }
    
}