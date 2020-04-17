import React, { Component } from "react";
import { getGameDuration, getGameQueue } from "../helpers/game-infos-helper";
import { getTeamStats } from "../helpers/stats-helper";
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
          <div className="container">
            <div className="row">
              <div>
                <p>
                  <strong>Match</strong> ({getGameDuration(match.gameDuration)})
                </p>
                <p>{getTeamStats(match.participants)}</p>
              </div>
            </div>
          </div>
        </section>
      </section>
    );
  }
}

export default GameDetails;
