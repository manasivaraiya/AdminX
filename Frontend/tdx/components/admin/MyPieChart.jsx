import { VictoryPie } from "victory";

function MyPieChart() {
  return (
    <VictoryPie
      data={[
        { x: "CodeCell", y: 80 },
        { x: "CSI", y: 15 },
        { x: "ISTE", y: 5 },
      ]}
      colorScale="blue"
    />
  );
}

export default MyPieChart;
