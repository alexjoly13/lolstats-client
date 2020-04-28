import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleRight } from "@fortawesome/free-solid-svg-icons";

import {
  rankImgProvider,
  profileIconProvider,
  champImg,
  summonerSpellShower,
} from "../helpers/images-helper";
import {
  gameCreatedAt,
  getGameDuration,
  getGameQueue,
} from "../helpers/game-infos-helper";
import { winrateCalculator, kdaCalculator } from "../helpers/stats-helper";

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
    };
  }

  render() {
    const player = this.state.summDetails;
    const games = this.state.summMatches[0];
    const formattedRank =
      player[0].ranks.tier + player[0].ranks.rank.toString();
    return (
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
                  <div className="col-4 align-self-center">
                    {oneSummoner.summonerLevel >= 30 ? (
                      <div className="row">
                        <div className="col-6">
                          <img
                            src={rankImgProvider(formattedRank)}
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

        <LastGamesStatistics
          gamesArray={games}
          playerName={this.state.summonerName}
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
