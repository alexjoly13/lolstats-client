import React, { Component } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleRight } from "@fortawesome/free-solid-svg-icons";
import { rankImgProvider } from "../helpers/summoner-helper";
import { profileIconProvider } from "../helpers/summoner-helper";
import LastGamesStatistics from "./lastGamesStats";
import summSpells from "../helpers/summoner-spells.json";
import "./summonerResume.css";
import GameDetails from "./gameDetails";

class SummonerResume extends Component {
  constructor(props) {
    super(props);
    this.state = {
      summonerName: this.props.location.state.summsInfo.summoner.name,
      summDetails: [this.props.location.state.summsInfo.summoner],
      summMatches: [this.props.location.state.summsInfo.lastGames],
      summStats: this.props.location.state.summsInfo.lastGamesStats,
    };
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

  summonerSpellShower(pickedSpell) {
    const spells = Object.values(summSpells[0].data);
    let address;
    spells.map((oneSpell) => {
      if (parseInt(oneSpell.key) === pickedSpell) {
        address =
          "http://ddragon.leagueoflegends.com/cdn/10.6.1/img/spell/" +
          oneSpell.image.full;
      }
    });
    return address;
  }

  typeOfQueue(queueId) {}

  kdaCalculator(kills, assists, deaths) {
    if (kills === 0 && assists === 0 && deaths === 0) {
      return "0:00 KDA";
    } else if (kills > 0 && assists > 0 && deaths === 0) {
      return "Perfect KDA";
    } else {
      return Math.floor(((kills + assists) / deaths) * 100) / 100 + " :1 KDA";
    }
  }

  killParticipationCalculator(kills, assists, totalTeamKills) {
    return (
      Math.floor((kills + assists) / totalTeamKills) + "% Kill Participation"
    );
  }

  itemImgGetter(itemId) {
    if (itemId > 0) {
      return (
        <img
          className="item-icon"
          src={`http://ddragon.leagueoflegends.com/cdn/10.7.1/img/item/${itemId}.png`}
          alt="item-mini"
        />
      );
    } else {
      return <div className="empty-item-block"></div>;
    }
  }

  render() {
    const player = this.state.summDetails;
    const games = this.state.summMatches[0];
    return (
      <section className="mb-5">
        <section className="summoner-resume m-5">
          <div className="container">
            {player.map((oneSummoner) => {
              return (
                <div
                  className="row justify-content-between"
                  key={oneSummoner.puuid}
                >
                  <div className="col-1 align-self-center">
                    <div>
                      <img
                        className="summoner-icon"
                        src={profileIconProvider(oneSummoner.profileIconId)}
                        alt="summ icon"
                      />
                    </div>
                  </div>
                  <div className="col-6 align-self-center">
                    <h1>{oneSummoner.name}</h1>
                    <span className="d-block">
                      Level {oneSummoner.summonerLevel}
                    </span>
                  </div>
                  <div className="col-4 align-self-center">
                    {oneSummoner.summonerLevel >= 30 ? (
                      <div className="row">
                        <div className="col-6 align-self-center">
                          <img
                            src={rankImgProvider(oneSummoner.ranks.tier)}
                            className="rank-logo"
                            alt="rank-icon"
                          />
                        </div>

                        <div className="col-6">
                          <p>
                            {oneSummoner.ranks.tier} {oneSummoner.ranks.rank}
                          </p>
                          <p>{oneSummoner.ranks.leaguePoints} LP</p>
                          <p>
                            {oneSummoner.ranks.wins} Wins /{" "}
                            {oneSummoner.ranks.losses} Losses
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
                    ) : (
                      <div className="d-flex justify-content-center">
                        <span>Unranked</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <LastGamesStatistics gamesInfo={this.state.summStats} />

        <section className="games-list">
          <h4>Last Games</h4>
          {games.map((oneGame) => {
            return (
              <div className="game-resume my-4" key={oneGame.gameId}>
                <div className="container game-card">
                  <div className="row justify-content-between">
                    <div className="col-1 game-timing-infos align-self-center">
                      {oneGame.summonerGameDetails.stats.win ? (
                        <div className="result-indicator victory"></div>
                      ) : (
                        <div className="result-indicator defeat"></div>
                      )}
                      <div className="result-indicator"></div>
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
                      <div className="row justify-content-center">
                        {oneGame.summonerGameDetails.stats.win ? (
                          <p className="victory-text m-0">VICTORY</p>
                        ) : (
                          <p className="defeat-text m-0">DEFEAT</p>
                        )}
                      </div>
                    </div>
                    <div className="col-1 player-champion-infos align-self-center">
                      <div className="container">
                        <div className="row">
                          <div className="highlight-summoner-champion mb-1">
                            <img
                              className="highligh-champ-img"
                              src={this.champImg(
                                oneGame.summonerGameDetails.championId
                              )}
                              alt="played-champ-icon"
                            />
                          </div>
                        </div>
                        <div className="row justify-content-center">
                          <span className="played-champ-name mb-1 font-weight-bold">
                            {oneGame.summonerGameDetails.championPlayedName}
                          </span>
                          <div>
                            <div className="d-flex w-100">
                              <div className="mr-1">
                                <img
                                  src={this.summonerSpellShower(
                                    oneGame.summonerGameDetails.spell1Id
                                  )}
                                  className="summoner-spell-image"
                                  alt="summSpell-1"
                                />
                              </div>
                              <div>
                                <img
                                  src={this.summonerSpellShower(
                                    oneGame.summonerGameDetails.spell2Id
                                  )}
                                  className="summoner-spell-image"
                                  alt="summSpell-2"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="player-ingame-stats col-1 align-self-center">
                      <div className="container">
                        <div className="row justify-content-center">
                          <p className="mb-1">
                            {oneGame.summonerGameDetails.stats.kills} /{" "}
                            {oneGame.summonerGameDetails.stats.deaths} /{" "}
                            {oneGame.summonerGameDetails.stats.assists}
                          </p>
                        </div>
                        <div className="row justify-content-center">
                          <p className="mb-1">
                            {this.kdaCalculator(
                              oneGame.summonerGameDetails.stats.kills,
                              oneGame.summonerGameDetails.stats.assists,
                              oneGame.summonerGameDetails.stats.deaths
                            )}
                          </p>
                        </div>
                        <div className="row justify-content-center">
                          <p className="mb-1">
                            Level {oneGame.summonerGameDetails.stats.champLevel}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-3 player-items">
                      <div className="container h-100">
                        <div className="row h-100 align-content-center">
                          {oneGame.summonerGameDetails.playerItems.map(
                            (oneItem, index) => {
                              return (
                                <div className="col-4 mb-1" key={index}>
                                  {this.itemImgGetter(oneItem)}
                                </div>
                              );
                            }
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-5">
                      <div className="container">
                        <div className="row participants-identities">
                          {oneGame.participantIdentities.map((oneId, index) => {
                            return (
                              <div
                                className="player-champion d-flex align-items-center col-6 mb-1"
                                key={oneId.player.summonerName}
                              >
                                <img
                                  className="inGame-champs-img"
                                  src={this.champImg(
                                    oneGame.participants[index].championId
                                  )}
                                  alt="all-players-champ-icon"
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
                    <div className="col-1 align-self-center">
                      <div className="d-flex justify-content-center">
                        <Link
                          to={{
                            pathname: `/${this.state.summonerName}/${oneGame.gameId}`,
                            state: {
                              specificGameDetails: oneGame,
                            },
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faChevronCircleRight}
                            size="2x"
                            color="#495057"
                          />
                        </Link>
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
