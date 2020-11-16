import { useEffect, useState } from "react";
import { fetchProgress } from "./api/Status.js";

export default function InterviewStats() {
  const [progressState, setProgressState] = useState([]);

  useEffect(() => {
    let results = [];
    fetchProgress().then((data) => {
      data.records.forEach((element) => {
        let item = {
          id: element.fields.id,
          quantity: element.fields.Totals,
          name: element.fields.Name,
        };
        results.push(item);
        setProgressState(results);
      });
    });
  }, []);

  return (
    <div>
      <ul className="Progress">
        {progressState.map((element) => {
          return (
            <li key={Math.random()}>
              <h3>{element.quantity}</h3>
              <p>{element.name}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
