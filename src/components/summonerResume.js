import React, { Component } from "react";
import moment from "moment";
import "./summonerResume.css";

class SummonerResume extends Component {
  constructor(props) {
    super(props);
    this.state = {
      summDetails: [this.props.summsInfo[0]],
      summMatches: [this.props.summsInfo[1]]
    };
  }

  oneImg(key) {
    return `https://cdn.communitydragon.org/10.2.1/profile-icon/${key}`;
  }

  champImg(key) {
    return `https://cdn.communitydragon.org/10.2.1/champion/${key}/square`;
  }

  gameDuration(time) {
    let minutes = Math.floor(time / 60);
    let seconds = time - minutes * 60;

    if (time < 241) {
      return minutes + ":" + seconds + " Remake";
    } else {
      return minutes + ":" + seconds;
    }
  }

  gameCreatedAt(date) {
    let x = date.toString().slice(0, -3);
    let y = parseInt(x);
    let z = moment.unix(y).format("YYYYMMDD HH:mm:ss");
    return moment(z, "YYYYMMDD HH:mm:ss").fromNow();
  }

  render() {
    const player = this.state.summDetails;
    const games = this.state.summMatches[0];
    console.log("previous games", games);
    return (
      <section>
        <section className="summoner-resume m-5">
          <div className="container">
            {player.map(oneSummoner => {
              return (
                <div className="row">
                  <div className="col-1">
                    <img
                      className="summoner-icon"
                      src={this.oneImg(oneSummoner.profileIconId)}
                      alt="summ icon"
                    />
                  </div>
                  <div className="col-6 align-self-center">
                    <h1>{oneSummoner.name}</h1>
                    <span className="d-block">
                      Level {oneSummoner.summonerLevel}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="games-list">
          <h4>Last Games</h4>
          {games.map(oneGame => {
            return (
              <div className="game-resume my-4">
                <div className="container">
                  <div className="row">
                    <div className="col-1 d-flex">
                      <span className="align-self-center">
                        Duration : {this.gameDuration(oneGame.gameDuration)}
                      </span>
                      <div className="col-1">
                        <span className="align-self-center">
                          {this.gameCreatedAt(oneGame.gameCreation)}
                        </span>
                      </div>
                    </div>
                    <div className="col-5">
                      <div className="container">
                        <div className="row">
                          {oneGame.participantIdentities.map((oneId, index) => {
                            return (
                              <div className="player-champion col-6">
                                <img
                                  className="inGame-champs-img"
                                  src={this.champImg(
                                    oneGame.participants[index].championId
                                  )}
                                />
                                <span>{oneId.player.summonerName}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </section>
      </section>
    );
  }
}

export default SummonerResume;
