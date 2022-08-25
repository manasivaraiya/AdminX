import { VictoryPie } from "victory";

function MyPieChart() {
  return (
    <VictoryPie
      data={[
        { x: "Cats", y: 35 },
        { x: "Dogs", y: 40 },
        { x: "Birds", y: 55 },
      ]}
      colorScale="blue"
    />
  );
}

export default MyPieChart;
