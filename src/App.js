import { useEffect, useState } from 'react';
import { Legend, Bar, Donut } from 'britecharts-react';
import { fetchStatus,fetchSource } from './api/Status.js';
import './App.css';

function App() {
  const [legendState, setLegendState] = useState([]);
  const [barState, setBarState] = useState([]);

  useEffect(() => {
    fetchStatus().then((data) => {
      let results = []

      data.records.forEach(element => {
        let item = {id:element.fields.id,quantity:element.fields.Totals,name:element.fields.Name};
        results.push(item);
      });

      setLegendState(results);
      console.log(results);
    })

    fetchSource().then((data) => {
      let results = []
      
      data.records.forEach(element => {
        let item = {value:element.fields.Totals,name:element.fields.Name};
        results.push(item);
      })

      setBarState(results);
    });
  }, []);

  return (
    <div className="App">
      <Legend
        data={legendState}
        height={250}
        width={400}
      />
      <Bar
        data={barState}
        height={400}
        betweenBarsPadding={0.3}
        isAnimated={true}
        margin={{
            left: 100,
            right: 40,
            top: 30,
            bottom: 40
        }}
      />
    </div>
  );
}

export default App;
