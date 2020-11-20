import { useEffect, useState } from "react";
import { Legend, Bar, Donut } from "britecharts-react";
import { fetchStatus, fetchSource } from "./api/Status.js";
import InterviewStats from "./InterviewStats.js";
import "./App.css";

function App() {
  const [legendState, setLegendState] = useState([]);
  const [barState, setBarState] = useState([]);
  const [totalApps, setTotalApps] = useState();
  const colors = [
    "#998ce3", //purple
    "#ffa71a", //orange
    "#6aedc7", //green
    "#ffce00", //yellow
  ];
  const britecharts = [
    "#6aedc7", //green
    "#39c2c9", //blue
    "#ffce00", //yellow
    "#ffa71a", //orange
    "#f866b9", //pink
    "#998ce3", //purple
  ];

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
        <Donut data={legendState} colorSchema={colors} internalRadius={60} />
        <Legend
          data={legendState}
          height={250}
          width={300}
          numberFormat={"G"}
          colorSchema={colors}
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
          colorSchema={britecharts}
        />
      </div>
    </div>
  );
}

export default App;
