import React, { Component } from "react";
import DoughnutChart from "./doughnutChart";

class LastGamesStatistics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastMatches: this.props.gamesInfo
    };
  }

  getTotalGames(wins, losses) {
    return wins + losses + " Games";
  }

  render() {
    const stats = this.state.lastMatches;
    console.log(stats);
    return (
      <section className="last-games-stats">
        <div>
          <div className="container">
            <div className="row">
              <div className="col-6">
                <div className="d-flex">
                  <span className="mr-1">{stats.victories}W</span>
                  <span className="mr-1">{stats.defeats}D</span>
                  <span>
                    {this.getTotalGames(stats.victories, stats.defeats)}
                  </span>
                </div>

                <DoughnutChart stats={this.state.lastMatches} />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default LastGamesStatistics;
