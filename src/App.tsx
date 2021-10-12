import { useState } from 'react';
import './App.css';
import PathFinding from './pathFinding/pathFinding';
import Sorting from './sorting/sorting';

function App() {
  const [type, settype] = useState(1);
  return (
    <div className="">
      {type == 0 ?
        <Sorting handleTypeChange={settype} type={type} ></Sorting> :
        <PathFinding handleTypeChange={settype} type={type}></PathFinding>}
    </div>
  );
}

export default App;
