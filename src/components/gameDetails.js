import React, { Component } from "react";
import { getGameDuration } from "../helpers/game-infos-helper";
import { getTeamStats } from "../helpers/stats-helper";
import "./championDetails.css";

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
    );
  }
}

export default GameDetails;
