import { useEffect, useState } from 'react';
import { Legend, Bar, Donut } from 'britecharts-react';
import { fetchStatus,fetchSource, fetchProgress } from './api/Status.js';
import './App.css';

function App() {
  const [legendState, setLegendState] = useState([]);
  const [barState, setBarState] = useState([]);
  const [donutState, setDonutState] = useState([]);

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

    fetchProgress().then((data) => {
      let results = []

      data.records.forEach(element => {
        let item = { quantity:element.fields.Totals, name:element.fields.Name};
        results.push(item);
        console.log(item);
        setDonutState(results);
      })
    })
  }, []);

  return (
    <div className="App">
      <div className="Donut">
        <Donut
          data={legendState}
        />
        <Legend
          data={legendState}
          height={250}
          width={400}
        />
      </div>
      <div className="Bar">
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
    </div>
  );
}

export default App;
