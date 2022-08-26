import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Incidents Reported",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: [1, 2, 3, 4, 5, 6, 7],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};
export default function App() {
  return <Line options={options} data={data} />;
}

// function MyLineChart() {
//   return (
//     <VictoryChart theme={VictoryTheme.material}>
//       <VictoryLine
//         style={{
//           data: { stroke: "royalblue" },
//           parent: { border: "1px solid #ccc" },
//         }}
//         data={[
//           { x: 1, y: 2 },
//           { x: 2, y: 3 },
//           { x: 3, y: 5 },
//           { x: 4, y: 4 },
//           { x: 5, y: 7 },
//         ]}
//       />
//     </VictoryChart>
//   );
// }

// export default MyLineChart;
