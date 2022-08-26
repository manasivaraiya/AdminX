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
      text: "Number of Incidents Reported (last 7 days)",
    },
  },
};

// const labels = ["January", "February", "March", "April", "May", "June", "July"];
const labels = [
  "26-08-2022",
  "25-08-2022",
  "24-08-2022",
  "23-08-2022",
  "22-08-2022",
  "21-08-2022",
  "20-08-2022",
];

function getCurrentDate(diff, separator = "") {
  let newDate = new Date();
  let date = newDate.getDate() - diff;
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();

  return `${date}${separator}${
    month < 10 ? `0${month}` : `${month}`
  }${separator}${year}`;
}
const lastSevenDates = [];
for (let index = 0; index < 7; index++) {
  lastSevenDates.push(getCurrentDate(index, "-"));
}
export default function App({ pastIncidents }) {
  // console.log(0, getCurrentDate("-"));
  // console.log("last are ", lastSevenDates);
  // console.log("last are ", lastSevenDates);

  // console.log(labels);
  // console.log(pastIncidents);
  const data = {
    labels,
    datasets: [
      {
        label: "Applications",
        data: pastIncidents,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
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
