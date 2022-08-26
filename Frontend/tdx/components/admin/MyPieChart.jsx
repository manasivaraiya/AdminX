import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function MyPieChart({ registeredUsers, activeUsers, loading }) {
  console.log(registeredUsers, activeUsers, loading);
  const data = {
    labels: ["Available and Registered Users in Network"],
    datasets: [
      {
        label: "Available  Users",
        data: [registeredUsers],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
      {
        label: "Registered Users",
        data: [activeUsers],
        backgroundColor: ["rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };
  return (
    <>
      <Bar data={data} />
    </>
  );
}

export default MyPieChart;
