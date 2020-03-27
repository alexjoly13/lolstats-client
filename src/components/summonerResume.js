import React, { Component } from "react";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleDown } from "@fortawesome/free-solid-svg-icons";
import { rankImgProvider } from "../helpers/summoner-helper";
import "./summonerResume.css";

class SummonerResume extends Component {
  constructor(props) {
    super(props);
    this.state = {
      summonerName: this.props.summsInfo.summoner.name,
      summDetails: [this.props.summsInfo.summoner],
      summMatches: [this.props.summsInfo.lastGames]
    };
  }

  oneImg(key) {
    return `https://cdn.communitydragon.org/10.2.1/profile-icon/${key}`;
  }

  champImg(key) {
    return `https://cdn.communitydragon.org/10.2.1/champion/${key}/square`;
  }

  winrateCalculator(wins, loss) {
    return Math.floor((wins / (wins + loss)) * 100) + "%";
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

  typeOfQueue(queueId) {}

  render() {
    const player = this.state.summDetails;
    const games = this.state.summMatches[0];

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
                  <div className="col-2 align-self-center">
                    <img
                      src={rankImgProvider(oneSummoner.ranks.tier)}
                      className="rank-logo"
                    />
                  </div>
                  <div className="col-2">
                    <p>
                      {oneSummoner.ranks.tier} {oneSummoner.ranks.rank}
                    </p>
                    <p>{oneSummoner.ranks.leaguePoints} LP</p>
                    <p>
                      {oneSummoner.ranks.wins} Wins / {oneSummoner.ranks.losses}{" "}
                      Losses
                    </p>
                    <p>
                      {this.winrateCalculator(
                        oneSummoner.ranks.wins,
                        oneSummoner.ranks.losses
                      )}{" "}
                      Winrate
                    </p>
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
                    <div className="col-2 game-timing-infos align-self-center">
                      <div className="row justify-content-center">
                        <p className="">
                          {this.gameDuration(oneGame.gameDuration)}
                        </p>
                      </div>

                      <div className="row justify-content-center">
                        <p className="">
                          {this.gameCreatedAt(oneGame.gameCreation)}
                        </p>
                      </div>
                    </div>
                    <div className="col-2">
                      <div className="container">
                        <div className="row">
                          <div className="highlight-summoner-champion">
                            <img
                              className="highligh-champ-img"
                              src={this.champImg(
                                oneGame.summonerGameDetails.championId
                              )}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div>
                            <p>
                              {oneGame.summonerGameDetails.stats.kills} /{" "}
                              {oneGame.summonerGameDetails.stats.deaths} /{" "}
                              {oneGame.summonerGameDetails.stats.assists}
                            </p>
                            <p>
                              Level{" "}
                              {oneGame.summonerGameDetails.stats.champLevel}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-5">
                      <div className="container">
                        <div className="row">
                          {oneGame.participantIdentities.map((oneId, index) => {
                            return (
                              <div className="player-champion d-flex align-items-center col-6 mb-1">
                                <img
                                  className="inGame-champs-img"
                                  src={this.champImg(
                                    oneGame.participants[index].championId
                                  )}
                                />
                                <span className="ml-1">
                                  {oneId.player.summonerName}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="col-1">
                      <FontAwesomeIcon
                        icon={faChevronCircleDown}
                        size="2x"
                        color="#495057"
                      />
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
