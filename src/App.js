import {useEffect, useState} from 'react';
import {Legend} from 'britecharts-react';
import { fetchStatus } from './api/Status.js';
import './App.css';

function App() {
  const [legendState, setLegendState] = useState([]);

  useEffect(() => {
    let results = []
    
    fetchStatus().then((data) => {
      data.records.forEach(element => {
        let item = {id:element.fields.id,quantity:element.fields.Totals,name:element.fields.Name};
        results.push(item);
      });
      setLegendState(results);
      console.log(results);
    })
  }, []);

  return (
    <div className="App">
      <Legend
        data={legendState}
        height={250}
        width={400}
    />
    </div>
  );
}

export default App;
