import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleRight } from "@fortawesome/free-solid-svg-icons";

import {
  profileIconProvider,
  champImg,
  summonerSpellShower,
  getFrameStyle,
} from "../helpers/images-helper";
import {
  gameCreatedAt,
  getGameDuration,
  getGameQueue,
} from "../helpers/game-infos-helper";
import { kdaCalculator } from "../helpers/stats-helper";

import LastGamesStatistics from "./lastGamesStats";
import ItemsContainer from "./ItemsContainer";

import "./summonerResume.css";

class SummonerResume extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patchVersion: this.props.location.state.summsInfo.version,
      summonerName: this.props.location.state.summsInfo.summoner.name,
      summDetails: [this.props.location.state.summsInfo.summoner],
      summMatches: [this.props.location.state.summsInfo.lastGames],
      stats: {
        wins: 0,
        defeats: 0,
        totalGames: this.props.location.state.summsInfo.lastGames.length,
        winrate: 0,
      },
      champsPlayed: [],
      statsLoaded: false,
    };
  }

  ///////////////////////////////////////

  getChampionsCount(lastGamesArray, searchedSummonerName) {
    let playerGames = [];
    lastGamesArray.map((oneGame) => {
      return oneGame.participants.map((oneParticipant) => {
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
    const lastGames = this.state.summMatches[0];
    const leNom = this.state.summonerName;
    this.getWinLossRatio(lastGames);
    this.getChampionsCount(lastGames, leNom);
  }

  ////////////////////////////////////////////////

  render() {
    const player = this.state.summDetails;
    const games = this.state.summMatches[0];
    const propsStats = this.state.stats;
    const last10ChampsArray = this.state.champsPlayed;

    console.log("STATE", this.state);

    return this.state.statsLoaded ? (
      <section className="mb-5">
        <section className="summoner-resume">
          <div
            style={getFrameStyle(last10ChampsArray[0].championId)}
            className="container d-flex"
          >
            {player.map((oneSummoner) => {
              return (
                <div className="row ml-2" key={oneSummoner.puuid}>
                  <div className="d-inline-flex summoner-icon-container align-self-center">
                    <img
                      className="summoner-icon"
                      src={profileIconProvider(oneSummoner.profileIconId)}
                      alt="summ icon"
                    />
                  </div>
                  <div className="align-self-center ml-4">
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

        <LastGamesStatistics
          summonerInfos={player[0]}
          gamesArray={games}
          playerName={this.state.summonerName}
          lastGamesStats={propsStats}
          championsPlayedArray={last10ChampsArray}
        />

        <section className="games-list">
          <div className="container p-0">
            <h3>Recent Games</h3>
          </div>

          {games.map((oneGame) => {
            return (
              <div className="game-resume my-2" key={oneGame.gameId}>
                <div className="container game-card">
                  <div className="row justify-content-between">
                    <div className="col-2 game-timing-infos align-self-center h-100">
                      {oneGame.summonerGameDetails.stats.win ? (
                        <div className="result-indicator victory"></div>
                      ) : (
                        <div className="result-indicator defeat"></div>
                      )}
                      <div className="result-indicator"></div>
                      <div className="row justify-content-center">
                        <p className="queue-indicator">
                          {getGameQueue(oneGame.queueId)}
                        </p>
                      </div>
                      <div className="row justify-content-center">
                        <p className="">
                          {getGameDuration(oneGame.gameDuration)}
                        </p>
                      </div>

                      <div className="row justify-content-center">
                        <p className="">
                          {gameCreatedAt(oneGame.gameCreation)}
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
                              src={champImg(
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
                                  src={summonerSpellShower(
                                    oneGame.summonerGameDetails.spell1Id
                                  )}
                                  className="summoner-spell-image"
                                  alt="summSpell-1"
                                />
                              </div>
                              <div>
                                <img
                                  src={summonerSpellShower(
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
                            {kdaCalculator(
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

                    <div className="col-2 d-flex  justify-content-center align-items-center">
                      <ItemsContainer
                        itemsData={oneGame.summonerGameDetails.stats}
                      />
                    </div>

                    <div className="col-5">
                      <div className="container">
                        <div className="row participants-identities">
                          {oneGame.participants.map((oneParticipant) => {
                            return (
                              <div
                                className="player-champion d-flex align-items-center col-6 mb-1"
                                key={oneParticipant.summonerName}
                              >
                                <img
                                  className="inGame-champs-img"
                                  src={champImg(oneParticipant.championId)}
                                  alt="all-players-champ-icon"
                                />
                                <span className="ml-1">
                                  {oneParticipant.summonerName}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="col-1 d-flex">
                      <div className="d-flex align-items-center">
                        <Link
                          to={{
                            pathname: `/summoner/${this.state.summonerName}/${oneGame.gameId}`,
                            state: {
                              specificGameDetails: oneGame,
                            },
                          }}
                        >
                          <div className="d-flex justify-content-center">
                            <FontAwesomeIcon
                              icon={faChevronCircleRight}
                              size="2x"
                              color="#495057"
                            />
                          </div>
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
    ) : (
      ////////////////////////////////////////////////////////// CONDITION SWITCH //////////////////////////////////////////////////////////////

      <section className="mb-5">
        <section className="summoner-resume">
          <div className="container d-flex summId-bg">
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
                </div>
              );
            })}
          </div>
        </section>

        <section className="games-list">
          <div className="container p-0">
            <h3>Recent Games</h3>
          </div>

          {games.map((oneGame) => {
            return (
              <div className="game-resume my-2" key={oneGame.gameId}>
                <div className="container game-card">
                  <div className="row justify-content-between">
                    <div className="col-2 game-timing-infos align-self-center h-100">
                      {oneGame.summonerGameDetails.stats.win ? (
                        <div className="result-indicator victory"></div>
                      ) : (
                        <div className="result-indicator defeat"></div>
                      )}
                      <div className="result-indicator"></div>
                      <div className="row justify-content-center">
                        <p className="queue-indicator">
                          {getGameQueue(oneGame.queueId)}
                        </p>
                      </div>
                      <div className="row justify-content-center">
                        <p className="">
                          {getGameDuration(oneGame.gameDuration)}
                        </p>
                      </div>

                      <div className="row justify-content-center">
                        <p className="">
                          {gameCreatedAt(oneGame.gameCreation)}
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
                              src={champImg(
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
                                  src={summonerSpellShower(
                                    oneGame.summonerGameDetails.spell1Id
                                  )}
                                  className="summoner-spell-image"
                                  alt="summSpell-1"
                                />
                              </div>
                              <div>
                                <img
                                  src={summonerSpellShower(
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
                            {kdaCalculator(
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

                    <div className="col-2 d-flex  justify-content-center align-items-center">
                      <ItemsContainer
                        itemsData={oneGame.summonerGameDetails.stats}
                      />
                    </div>

                    <div className="col-5">
                      <div className="container">
                        <div className="row participants-identities">
                          {oneGame.participants.map((oneParticipant) => {
                            return (
                              <div
                                className="player-champion d-flex align-items-center col-6 mb-1"
                                key={oneParticipant.summonerName}
                              >
                                <img
                                  className="inGame-champs-img"
                                  src={champImg(oneParticipant.championId)}
                                  alt="all-players-champ-icon"
                                />
                                <span className="ml-1">
                                  {oneParticipant.summonerName}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="col-1 align-self-center">
                      <div className="d-flex justify-content-center">
                        <div>
                          <Link
                            to={{
                              pathname: `/summoner/${this.state.summonerName}/${oneGame.gameId}`,
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
                            <p className="see-more-link">Match Details</p>
                          </Link>
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
