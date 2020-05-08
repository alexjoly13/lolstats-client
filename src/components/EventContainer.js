import React, { Component } from "react";

import { isMatchLive } from "../helpers/esport-helper";

import "./EventContainer.css";

class EventContainer extends Component {
  static getDerivedStateFromProps(props, state) {
    if (props.eventsList !== state.eventsList) {
      return { eventsList: props.eventsList };
    }
    return null;
  }

  constructor({ eventsList }) {
    super();
    this.state = {
      eventsList,
    };
  }

  render() {
    const matchList = this.state.eventsList;

    return (
      <div className="events d-inline-flex">
        <div className="container">
          <div className="row">
            <div id="events" className="event-container">
              {matchList.map((oneMatch, i) => {
                // if (matchList[i + 1] !== undefined) {
                //   if (
                //     matchList[i].scheduled_at.slice(0, 10) !=
                //     matchList[i + 1].scheduled_at.slice(0, 10)
                //   ) {
                //     return (
                //       <span>{matchList[i].scheduled_at.slice(0, 10)}</span>
                //     );
                //   }
                // }

                return (
                  <div>
                    <span>{oneMatch.scheduled_at.slice(0, 10)}</span>
                    <div
                      id={oneMatch.id}
                      className="row match-row d-flex justify-content-center"
                    >
                      <div className="match-infos d-flex align-items-center">
                        <div className="league-logo-match-container d-flex align-items-center justify-content-center">
                          <img
                            src={oneMatch.league.image_url}
                            className="match-league-logo"
                            alt=""
                          />
                        </div>
                        <div className="live-mention-indicator d-flex align-items-center justify-content-center">
                          {isMatchLive(oneMatch)}
                        </div>
                        <div className="team-infos-container d-flex justify-content-center">
                          {oneMatch.opponents.length > 0 ? (
                            <div className="displayed-match-infos d-flex align-items-center">
                              <div className="team-presentation d-flex justify-content-center align-items-center">
                                <div className="in-match-team-logo-container mr-2">
                                  <img
                                    src={
                                      oneMatch.opponents[0].opponent.image_url
                                    }
                                    className="in-match-team-logo"
                                    alt=""
                                  />
                                </div>
                                <span className="team-acronym font-weight-bold">
                                  {oneMatch.opponents[0].opponent.name}
                                </span>{" "}
                              </div>
                              {new Date(oneMatch.begin_at) < new Date() &&
                              oneMatch.status !== "not_started" ? (
                                <div className="score-container d-flex align-items-center">
                                  <div className="score-container-column d-flex justify-content-around">
                                    <span className="team-score">
                                      {oneMatch.results[0].score}
                                    </span>
                                  </div>
                                  <div className="score-container-column d-flex justify-content-around">
                                    <span className="versus-mention"> VS </span>
                                  </div>
                                  <div className="score-container-column d-flex justify-content-around">
                                    <span className="team-score">
                                      {oneMatch.results[1].score}
                                    </span>
                                  </div>
                                </div>
                              ) : (
                                <div className="score-container d-flex align-items-center">
                                  <div className="w-100 d-flex justify-content-center">
                                    <span className="versus-mention"> VS </span>
                                  </div>
                                </div>
                              )}
                              <div className="team-presentation d-flex justify-content-center align-items-center">
                                <span className="team-acronym font-weight-bold">
                                  {oneMatch.opponents[1].opponent.name}
                                </span>
                                <div className="in-match-team-logo-container ml-2">
                                  <img
                                    src={
                                      oneMatch.opponents[1].opponent.image_url
                                    }
                                    className="in-match-team-logo"
                                    alt=""
                                  />
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="displayed-match-infos d-flex align-items-center">
                              <span className="team-acronym font-weight-bold">
                                TBD
                              </span>{" "}
                              <span className="versus-mention"> VS </span>
                              <span className="team-acronym font-weight-bold">
                                TBD
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="game-schedule d-flex align-items-center justify-content-center">
                          <div className="game-time-indicator d-flex align-items-center">
                            <span>{oneMatch.scheduled_at.slice(11, 16)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EventContainer;
