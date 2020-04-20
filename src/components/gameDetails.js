import React, { Component } from "react";
import {
  getGameDuration,
  getGameQueue,
  getTeamsSide,
} from "../helpers/game-infos-helper";
import {
  getTeamStats,
  winOrLose,
  kdaCalculator,
} from "../helpers/stats-helper";
import { champImg, itemImgGetter } from "../helpers/images-helper.js";
import "./gameDetails.css";

class GameDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameResultInfos: this.props.location.state.specificGameDetails,
    };
  }
  render() {
    const match = this.state.gameResultInfos;
    console.log(match);
    return (
      <section className="match-details">
        <section className="m-5 match-banner">
          <div className="container match-presentation">
            <div className="row">
              <div className="col-3 d-flex align-items-center ml-5 generic-match-info">
                <div>
                  <h1>Match</h1>
                  <p>{getGameQueue(match.queueId)}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="container match-scoreboard">
            <div className="row">
              <div className="w-100 d-flex justify-content-around">
                <div>{winOrLose(match.teams[0])}</div>

                <div>
                  <span>{getTeamStats(match.participants, 100)}</span>
                </div>
                <div>
                  <span>
                    <strong>Match</strong> (
                    {getGameDuration(match.gameDuration)})
                  </span>
                </div>

                <div>
                  <span>{getTeamStats(match.participants, 200)}</span>
                </div>
                <div>{winOrLose(match.teams[1])}</div>
              </div>
            </div>

            <hr></hr>

            <div className="row">
              <div className="col-12">
                <div className="row">
                  {match.teams.map((oneTeam) => {
                    return oneTeam.teamId === 100 ? (
                      <div className="col-6">
                        {oneTeam.teamMembers.map((onePlayer) => {
                          return (
                            <div className="row mb-2">
                              <div className="col-4">
                                <img
                                  src={champImg(onePlayer.championId)}
                                  className="matchdetails-champ-icon mr-1"
                                />
                                <span>{onePlayer.summonerName}</span>
                              </div>
                              <div className="col-2">
                                <span>
                                  {onePlayer.stats.kills} /
                                  {onePlayer.stats.deaths} /
                                  {onePlayer.stats.assists}
                                </span>
                              </div>
                              <div className="col-6">
                                <div className="row mb-1">
                                  <div className="item-holder mr-2">
                                    {itemImgGetter(onePlayer.stats.item0)}
                                  </div>
                                  <div className="item-holder mr-2">
                                    {itemImgGetter(onePlayer.stats.item1)}
                                  </div>
                                  <div className="item-holder">
                                    {itemImgGetter(onePlayer.stats.item2)}
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="item-holder mr-2">
                                    {itemImgGetter(onePlayer.stats.item3)}
                                  </div>
                                  <div className="item-holder mr-2">
                                    {itemImgGetter(onePlayer.stats.item4)}
                                  </div>
                                  <div className="item-holder">
                                    {itemImgGetter(onePlayer.stats.item5)}
                                  </div>
                                </div>
                                <div className="d-flex">
                                  <div className="item-holder">
                                    {itemImgGetter(onePlayer.stats.item6)}
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="col-6">
                        {oneTeam.teamMembers.map((onePlayer) => {
                          return (
                            <div className="row mb-2">
                              <div className="col-6">
                                <div className="row mb-1">
                                  <div className="item-holder mr-2">
                                    {itemImgGetter(onePlayer.stats.item0)}
                                  </div>
                                  <div className="item-holder mr-2">
                                    {itemImgGetter(onePlayer.stats.item1)}
                                  </div>
                                  <div className="item-holder">
                                    {itemImgGetter(onePlayer.stats.item2)}
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="item-holder mr-2">
                                    {itemImgGetter(onePlayer.stats.item3)}
                                  </div>
                                  <div className="item-holder mr-2">
                                    {itemImgGetter(onePlayer.stats.item4)}
                                  </div>
                                  <div className="item-holder">
                                    {itemImgGetter(onePlayer.stats.item5)}
                                  </div>
                                </div>
                              </div>
                              <div className="col-2">
                                <span>
                                  {onePlayer.stats.kills} /
                                  {onePlayer.stats.deaths} /
                                  {onePlayer.stats.assists}
                                </span>
                              </div>
                              <div className="col-4">
                                <div className="d-flex justify-content-end">
                                  <span>{onePlayer.summonerName}</span>
                                  <img
                                    src={champImg(onePlayer.championId)}
                                    className="matchdetails-champ-icon ml-1"
                                  />
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    );
  }
}

export default GameDetails;
