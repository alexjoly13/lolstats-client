import React, { Component } from "react";
import "./doughnutChart.css";
import CanvasJSReact from "../assets/canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class DoughnutChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameStats: this.props.stats,
    };
  }

  render() {
    const stats = this.state.gameStats;
    console.log(stats);
    const options = {
      animationEnabled: true,
      width: 100,
      height: 180,
      subtitles: [
        {
          text: stats.winrate,
          verticalAlign: "center",
          fontSize: 16,
          dockInsidePlotArea: true,
        },
      ],
      data: [
        {
          type: "doughnut",
          dataPoints: [
            { name: "Wins", y: stats.victories },
            { name: "Losses", y: stats.defeats },
          ],
        },
      ],
    };

    return (
      <div className="win-loss-chart">
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
