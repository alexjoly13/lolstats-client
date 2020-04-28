import React, { Component } from "react";
import DoughnutChart from "./doughnutChart";
import { kdaCalculator, winrateCalculator } from "../helpers/stats-helper";
import { champImg } from "../helpers/images-helper";

import "./lastGamesStats.css";

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
        <div>
          <span className="kills-text-color font-weight-bold">
            {killAverage}
          </span>{" "}
          <span> / </span>
          <span className="deaths-text-color font-weight-bold">
            {deathAverage}
          </span>{" "}
          <span> / </span>
          <span className="assists-text-color font-weight-bold">
            {assistAverage}
          </span>
        </div>

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
                <div className="total-game-recap d-flex position-absolute">
                  <span className="mr-1">{stats.wins}W</span>
                  <span className="mr-1">{stats.defeats}D</span>
                  <span>{stats.totalGames} Games</span>
                </div>
                <DoughnutChart statsInfo={stats} />
                <div className="position-absolute kda-average-absolute">
                  {this.getAverageKDA(games, playerName)}
                </div>
              </div>

              <div className="col-4">
                <p>Hello Friend</p>
              </div>

              <div className="col-4">
                {championsPool.map((oneChamp) => {
                  return (
                    <div className="champ-agreg-resume d-flex mb-1 justify-content-center">
                      <div className="d-inline-flex lastGameStats-champ-icon-container">
                        <img
                          className="lastGameStats-champ-icon"
                          src={champImg(oneChamp.championId)}
                          alt="played-champ-icon"
                        />
                      </div>
                      <div className="d-inline-block ml-2">
                        <div>
                          <span>{oneChamp.championPlayedName}</span>
                        </div>
                        <div>
                          {winrateCalculator(oneChamp.wins, oneChamp.defeats)}{" "}
                          <span className="count-details">
                            ({oneChamp.wins}V {oneChamp.defeats}L)
                          </span>
                          <span className="ml-3">
                            {kdaCalculator(
                              oneChamp.kills,
                              oneChamp.assists,
                              oneChamp.deaths
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <span></span>
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
