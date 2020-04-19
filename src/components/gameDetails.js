import React, { Component } from "react";
import {
  getGameDuration,
  getGameQueue,
  getTeamsSide,
} from "../helpers/game-infos-helper";
import { getTeamStats, winOrLose } from "../helpers/stats-helper";
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
            <div className="row">
              <div className="col-2">
                {getTeamsSide(
                  match.participants,

                  100
                )}
              </div>
              <div className="col-2">
                {getTeamsSide(
                  match.participants,

                  200
                )}
              </div>
            </div>
          </div>
        </section>
      </section>
    );
  }
}

export default GameDetails;
