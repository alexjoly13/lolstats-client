import React, { Component } from "react";
import "./doughnutChart.css";
import CanvasJSReact from "../assets/canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class DoughnutChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameStats: this.props.statsInfo,
    };
  }

  render() {
    const stats = this.state.gameStats;
    const options = {
      animationEnabled: true,
      width: 120,
      height: 140,
      subtitles: [
        {
          text: stats.winrate + "%",
          verticalAlign: "center",
          fontSize: 16,
          dockInsidePlotArea: true,
        },
      ],
      data: [
        {
          type: "doughnut",
          dataPoints: [
            { name: "Wins", y: stats.wins },
            { name: "Losses", y: stats.defeats },
          ],
        },
      ],
    };

    return (
      <div className="win-loss-chart ml-2 position-relative">
        <CanvasJSChart
          options={options}
          /* onRef={ref => this.chart = ref} */
        />
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
      </div>
    );
  }
}

export default DoughnutChart;
