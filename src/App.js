import { useEffect, useState } from "react";
import { Legend, Bar, Donut } from "britecharts-react";
import { fetchStatus, fetchSource } from "./api/Status.js";
import InterviewStats from "./InterviewStats.js";
import "./App.css";

function App() {
  const [legendState, setLegendState] = useState([]);
  const [barState, setBarState] = useState([]);
  const [totalApps, setTotalApps] = useState();

  useEffect(() => {
    fetchStatus().then((data) => {
      let results = [];
      let sum = 0;

      data.records.forEach((element) => {
        let item = {
          id: element.fields.id,
          quantity: element.fields.Totals,
          name: element.fields.Name,
        };
        sum += element.fields.Totals;
        results.push(item);
      });

      setLegendState(results);
      setTotalApps(sum);
    });

    fetchSource().then((data) => {
      let results = [];

      data.records.forEach((element) => {
        let item = { value: element.fields.Totals, name: element.fields.Name };
        results.push(item);
      });

      setBarState(results);
    });
  }, []);

  return (
    <div className="App">
      <div className="Donut">
        <div className="Total">
          <h1 className="TotalNumber">{totalApps}</h1>
          <p>Applications</p>
        </div>
        <Donut data={legendState} />
        <Legend
          data={legendState}
          height={250}
          width={300}
          numberFormat={"G"}
        />
      </div>
      <InterviewStats />
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
            bottom: 40,
          }}
        />
      </div>
    </div>
  );
}

export default App;
