import React, { Component } from "react";
import DoughnutChart from "./doughnutChart";
import { kdaCalculator } from "../helpers/stats-helper";
import { champImg } from "../helpers/images-helper";

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
      champsPlayed: [],
      statsLoaded: false,
    };
  }

  getAverageKDA(lastGamesArray, searchedSummonerName) {
    let globalKills = 0;
    let globalDeaths = 0;
    let globalAssists = 0;
    lastGamesArray.map((oneGame) => {
      oneGame.participants.map((oneParticipant) => {
        return oneParticipant.summonerName === searchedSummonerName
          ? ((globalKills += oneParticipant.stats.kills),
            (globalDeaths += oneParticipant.stats.deaths),
            (globalAssists += oneParticipant.stats.assists))
          : ((globalKills += 0), (globalDeaths += 0), (globalAssists += 0));
      });
    });
    const killAverage = globalKills / 10;
    const deathAverage = globalDeaths / 10;
    const assistAverage = globalAssists / 10;
    return (
      <div>
        <span>
          {killAverage} / {deathAverage} / {assistAverage}
        </span>
        <div>
          <span>{kdaCalculator(killAverage, assistAverage, deathAverage)}</span>
        </div>
      </div>
    );
  }

  getChampionsCount(lastGamesArray, searchedSummonerName) {
    let playerGames = [];
    lastGamesArray.map((oneGame) => {
      oneGame.participants.map((oneParticipant) => {
        return oneParticipant.summonerName === searchedSummonerName
          ? playerGames.push(oneParticipant)
          : false;
      });
    });
    playerGames = Object.values(
      playerGames.reduce((r, { championId, championPlayedName, stats }) => {
        r[championId] = r[championId] || {
          championId,
          championPlayedName,
          timesPlayed: 0,
          wins: 0,
          defeats: 0,
          kills: 0,
          deaths: 0,
          assists: 0,
        };
        r[championId].timesPlayed++;
        r[championId].kills += stats.kills;
        r[championId].deaths += stats.deaths;
        r[championId].assists += stats.assists;
        stats.win === true ? r[championId].wins++ : r[championId].defeats++;
        return r;
      }, {})
    );
    const sorted = playerGames.sort((a, b) => b.timesPlayed - a.timesPlayed);

    sorted.length > 3
      ? this.setState({ champsPlayed: sorted.slice(0, 3) })
      : this.setState({ champsPlayed: sorted });
  }

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
    const leNom = this.state.summonerName;
    this.getWinLossRatio(lastGames);
    this.getChampionsCount(lastGames, leNom);
  }

  render() {
    const playerName = this.state.summonerName;
    const games = this.state.lastGames;
    const stats = this.state.stats;
    const championsPool = this.state.champsPlayed;

    console.log("Le State :", this.state);

    return this.state.statsLoaded ? (
      <section className="last-games-stats">
        <div>
          <div className="container">
            <div className="row">
              <div className="col-4">
                <div className="d-flex">
                  <span className="mr-1">{stats.wins}W</span>
                  <span className="mr-1">{stats.defeats}D</span>
                  <span>{stats.totalGames} Games</span>
                </div>
                <DoughnutChart statsInfo={stats} />
                <div>{this.getAverageKDA(games, playerName)}</div>
              </div>
              <div className="col-4">
                <p>Hello Friend</p>
              </div>
              <div className="col-4">
                <div>
                  {championsPool.map((oneChamp) => {
                    return (
                      <div className="row">
                        <img
                          className="inGame-champs-img"
                          src={champImg(oneChamp.championId)}
                          alt="played-champ-icon"
                        />
                        <p>{oneChamp.championPlayedName}</p>
                        <p>
                          ({oneChamp.wins}V {oneChamp.defeats}L)
                        </p>
                      </div>
                    );
                  })}
                  <span></span>
                </div>
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
