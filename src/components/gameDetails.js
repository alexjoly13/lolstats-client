import React, { Component } from "react";
import {
  getGameDuration,
  getGameQueue,
  getTeamsSide,
} from "../helpers/game-infos-helper";
import {
  winOrLose,
  kdaCalculator,
  getTotalKills,
  getTotalDeaths,
  getTotalAssists,
  KPCalculator,
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
                  <span>{getTotalKills(match.participants, 100)}</span>{" "}
                  <span> / </span>
                  <span>{getTotalDeaths(match.participants, 100)}</span>{" "}
                  <span> / </span>
                  <span>{getTotalAssists(match.participants, 100)}</span>
                </div>
                <div>
                  <span>
                    <strong>Match</strong> (
                    {getGameDuration(match.gameDuration)})
                  </span>
                </div>

                <div>
                  <span>{getTotalKills(match.participants, 200)}</span>{" "}
                  <span> / </span>
                  <span>{getTotalDeaths(match.participants, 200)}</span>{" "}
                  <span> / </span>
                  <span>{getTotalAssists(match.participants, 200)}</span>
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
                              <div className="col-3 d-flex justify-content-center">
                                <div>
                                  <div>
                                    <span>
                                      {onePlayer.stats.kills} /
                                      {onePlayer.stats.deaths} /
                                      {onePlayer.stats.assists}
                                    </span>
                                  </div>
                                  <div>
                                    <span>
                                      {onePlayer.stats.totalMinionsKilled} CS
                                    </span>
                                  </div>
                                  <div>
                                    <span>
                                      {KPCalculator(
                                        getTotalKills(match.participants, 100),
                                        onePlayer.stats.kills,
                                        onePlayer.stats.assists
                                      )}
                                      % Kills P.
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="col-5 d-flex align-items-center">
                                <div className="d-inline-block items-container">
                                  <div className="item-display-row mb-1">
                                    <div className="item-holder d-inline-flex mr-2">
                                      {itemImgGetter(
                                        onePlayer.stats.item0,
                                        "item-details-icon"
                                      )}
                                    </div>
                                    <div className="item-holder d-inline-flex mr-2">
                                      {itemImgGetter(
                                        onePlayer.stats.item1,
                                        "item-details-icon"
                                      )}
                                    </div>
                                    <div className="item-holder d-inline-flex">
                                      {itemImgGetter(
                                        onePlayer.stats.item2,
                                        "item-details-icon"
                                      )}
                                    </div>
                                  </div>
                                  <div className="item-display-row">
                                    <div className="item-holder d-inline-flex mr-2">
                                      {itemImgGetter(
                                        onePlayer.stats.item3,
                                        "item-details-icon"
                                      )}
                                    </div>
                                    <div className="item-holder d-inline-flex mr-2">
                                      {itemImgGetter(
                                        onePlayer.stats.item4,
                                        "item-details-icon"
                                      )}
                                    </div>
                                    <div className="item-holder d-inline-flex">
                                      {itemImgGetter(
                                        onePlayer.stats.item5,
                                        "item-details-icon"
                                      )}
                                    </div>
                                  </div>
                                </div>

                                <div className="d-inline-block">
                                  <div className="item-holder">
                                    {itemImgGetter(
                                      onePlayer.stats.item6,
                                      "item-details-icon"
                                    )}
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
                              <div className="col-5 d-flex align-items-center">
                                <div className="d-inline-block items-container">
                                  <div className="item-display-row mb-1">
                                    <div className="item-holder d-inline-flex mr-2">
                                      {itemImgGetter(
                                        onePlayer.stats.item0,
                                        "item-details-icon"
                                      )}
                                    </div>
                                    <div className="item-holder d-inline-flex mr-2">
                                      {itemImgGetter(
                                        onePlayer.stats.item1,
                                        "item-details-icon"
                                      )}
                                    </div>
                                    <div className="item-holder d-inline-flex">
                                      {itemImgGetter(
                                        onePlayer.stats.item2,
                                        "item-details-icon"
                                      )}
                                    </div>
                                  </div>
                                  <div className="item-display-row">
                                    <div className="item-holder d-inline-flex mr-2">
                                      {itemImgGetter(
                                        onePlayer.stats.item3,
                                        "item-details-icon"
                                      )}
                                    </div>
                                    <div className="item-holder d-inline-flex mr-2">
                                      {itemImgGetter(
                                        onePlayer.stats.item4,
                                        "item-details-icon"
                                      )}
                                    </div>
                                    <div className="item-holder d-inline-flex">
                                      {itemImgGetter(
                                        onePlayer.stats.item5,
                                        "item-details-icon"
                                      )}
                                    </div>
                                  </div>
                                </div>

                                <div className="d-inline-block">
                                  <div className="item-holder">
                                    {itemImgGetter(
                                      onePlayer.stats.item6,
                                      "item-details-icon"
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="col-3 d-flex justify-content-center">
                                <div>
                                  <div>
                                    <span>
                                      {onePlayer.stats.kills} /
                                      {onePlayer.stats.deaths} /
                                      {onePlayer.stats.assists}
                                    </span>
                                  </div>
                                  <div>
                                    <span>
                                      {onePlayer.stats.totalMinionsKilled} CS
                                    </span>
                                    <div>
                                      <span>
                                        {KPCalculator(
                                          getTotalKills(
                                            match.participants,
                                            100
                                          ),
                                          onePlayer.stats.kills,
                                          onePlayer.stats.assists
                                        )}
                                        % Kills P.
                                      </span>
                                    </div>
                                  </div>
                                </div>
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
