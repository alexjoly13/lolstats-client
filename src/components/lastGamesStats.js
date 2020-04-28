import React, { Component } from "react";
import DoughnutChart from "./doughnutChart";
import {
  kdaCalculator,
  winrateCalculator,
  getAverageKDA,
} from "../helpers/stats-helper";
import { champImg, rankImgProvider } from "../helpers/images-helper";

import "./lastGamesStats.css";

class LastGamesStatistics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      summonerID: this.props.summonerInfos,
      lastGames: this.props.gamesArray,
      summonerName: this.props.playerName,
      stats: this.props.lastGamesStats,
      champsPlayed: this.props.championsPlayedArray,
      statsLoaded: false,
    };
  }

  render() {
    const summoner = this.state.summonerID;
    const playerName = this.state.summonerName;
    const games = this.state.lastGames;
    const stats = this.state.stats;
    const championsPool = this.state.champsPlayed;
    const formattedRank = summoner.ranks.tier + summoner.ranks.rank.toString();
    console.log("CHILD STATE", this.state);

    return (
      <section className="last-games-stats">
        <div>
          <div className="container">
            <div className="row">
              <div className="col-4">
                {summoner.summonerLevel >= 30 ? (
                  <div className="row">
                    <div className="col-6">
                      <img
                        src={rankImgProvider(formattedRank)}
                        className="rank-logo"
                        alt="rank-icon"
                      />
                    </div>

                    <div className="col-6">
                      <p>
                        {summoner.ranks.tier} {summoner.ranks.rank}
                      </p>
                      <p>{summoner.ranks.leaguePoints} LP</p>
                      <p>
                        {summoner.ranks.wins} Wins / {summoner.ranks.losses}{" "}
                        Losses
                      </p>
                      <p>
                        {winrateCalculator(
                          summoner.ranks.wins,
                          summoner.ranks.losses
                        )}{" "}
                        Winrate
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="d-flex justify-content-center">
                    <span>Unranked</span>
                  </div>
                )}
              </div>

              <div className="col-4">
                <div className="total-game-recap d-flex position-absolute">
                  <span className="mr-1">{stats.wins}W</span>
                  <span className="mr-1">{stats.defeats}D</span>
                  <span>{stats.totalGames} Games</span>
                </div>
                <DoughnutChart statsInfo={stats} />
                <div className="position-absolute kda-average-absolute">
                  {getAverageKDA(games, playerName)}
                </div>
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
                      <div className="d-inline-block ml-2 specific-champ-numbers-container">
                        <div>
                          <span>{oneChamp.championPlayedName}</span>
                        </div>
                        <div>
                          {winrateCalculator(oneChamp.wins, oneChamp.defeats)}{" "}
                          <span className="count-details">
                            ({oneChamp.wins}W {oneChamp.defeats}D)
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
    );
    // ) : (
    //   <section className="last-games-stats">
    //     <div>
    //       <div className="container">
    //         <div className="row">
    //           <div className="col-6">
    //             <div className="d-flex">
    //               <span className="mr-1">{stats.wins}W</span>
    //               <span className="mr-1">{stats.defeats}D</span>
    //               <span>{stats.totalGames} Games</span>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </section>
    // );
  }
}

export default LastGamesStatistics;
