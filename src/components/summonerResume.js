import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleRight } from "@fortawesome/free-solid-svg-icons";
import { rankImgProvider } from "../helpers/images-helper";
import { profileIconProvider } from "../helpers/images-helper";
import { champImg } from "../helpers/images-helper";
import { summonerSpellShower } from "../helpers/images-helper";
import { itemImgGetter } from "../helpers/images-helper";
import { gameCreatedAt } from "../helpers/game-infos-helper";
import { getGameDuration } from "../helpers/game-infos-helper";
import { winrateCalculator } from "../helpers/stats-helper";
import { kdaCalculator } from "../helpers/stats-helper";
import LastGamesStatistics from "./lastGamesStats";
import "./summonerResume.css";

class SummonerResume extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patchVersion: this.props.location.state.summsInfo.version,
      summonerName: this.props.location.state.summsInfo.summoner.name,
      summDetails: [this.props.location.state.summsInfo.summoner],
      summMatches: [this.props.location.state.summsInfo.lastGames],
      summStats: this.props.location.state.summsInfo.lastGamesStats,
    };
  }

  // typeOfQueue(queueId) {}

  // killParticipationCalculator(kills, assists, totalTeamKills) {
  //   return (
  //     Math.floor((kills + assists) / totalTeamKills) + "% Kill Participation"
  //   );
  // }

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
                            {winrateCalculator(
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
                    <div className="col-3 player-items">
                      <div className="container h-100">
                        <div className="row h-100 align-content-center">
                          {oneGame.summonerGameDetails.playerItems.map(
                            (oneItem, index) => {
                              return (
                                <div className="col-4 mb-1" key={index}>
                                  {itemImgGetter(oneItem)}
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
                                  src={champImg(
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
