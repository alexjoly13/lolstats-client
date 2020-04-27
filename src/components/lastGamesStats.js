import React, { Component } from "react";
import DoughnutChart from "./doughnutChart";

class LastGamesStatistics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastGames: this.props.gamesArray,
      summonerName: this.props.playerName,
      stats: {
        wins: 0,
        defeats: 0,
        totalGames: this.props.gamesArray.length,
        winrate: 0,
      },
      statsLoaded: false,
    };
  }

  // getAverageKDA(lastGamesArray, searchedSummonerName) {
  //   let globalKills = 0;
  //   let globalDeaths = 0;
  //   let globalAssists = 0;
  //   lastGamesArray.map((oneGame, i) => {
  //     console.log(oneGame.participants[i]);
  //     return oneGame.participants[i].summonerName === searchedSummonerName
  //       ? (globalKills += oneGame.participants[i].stats.kills)
  //       : (globalKills += 0);
  //   });
  //   console.log(globalKills);
  // }

  getWinLossRatio(lastGamesArray) {
    let w = 0;
    let d = 0;
    let wR = 0;
    lastGamesArray.map((oneGame) => {
      oneGame.summonerGameDetails.stats.win === true ? (w += 1) : (d += 1);

      wR = Math.floor((w / (w + d)) * 100);
    });
    this.setState({
      stats: {
        ...this.state.stats,
        wins: w,
        defeats: d,
        winrate: wR,
      },
      statsLoaded: true,
    });
  }

  componentDidMount() {
    const lastGames = this.state.lastGames;
    this.getWinLossRatio(lastGames);
  }

  render() {
    const playerName = this.state.summonerName;
    const games = this.state.lastGames;
    const stats = this.state.stats;
    console.log(this.state);

    return this.state.statsLoaded ? (
      <section className="last-games-stats">
        <div>
          <div className="container">
            <div className="row">
              <div className="col-6">
                <div className="d-flex">
                  <span className="mr-1">{stats.wins}W</span>
                  <span className="mr-1">{stats.defeats}D</span>
                  <span>{stats.totalGames} Games</span>
                </div>
                <DoughnutChart statsInfo={stats} />
              </div>
            </div>
          </div>
        </div>
      </section>
    ) : (
      <section className="last-games-stats">
        <div>
          <div className="container">
            <div className="row">
              <div className="col-6">
                <div className="d-flex">
                  <span className="mr-1">{stats.wins}W</span>
                  <span className="mr-1">{stats.defeats}D</span>
                  <span>{stats.totalGames} Games</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default LastGamesStatistics;
