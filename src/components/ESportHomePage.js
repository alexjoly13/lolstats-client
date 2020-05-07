import React, { Component } from "react";
import "./ESportHomePage.css";
import { getLeaguesList } from "../api";
import { getLeagueLocation } from "../helpers/esport-helper";

class EsportHomepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leagues: [],
      matches: [],
      matchesByLeague: {},
      dataLoaded: false,
      filters: {
        LCS: true,
        LEC: true,
        LCK: true,
        LPL: true,
        "European Masters": true,
      },
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(leaguetoFilter) {
    switch (leaguetoFilter) {
      case "LCS":
        return this.setState((state) => ({
          filters: { ...state.filters, LCS: !state.filters.LCS },
        }));
      case "LEC":
        return this.setState((state) => ({
          filters: { ...state.filters, LEC: !state.filters.LEC },
        }));
      case "LCK":
        return this.setState((state) => ({
          filters: { ...state.filters, LCK: !state.filters.LCK },
        }));
      case "LPL":
        return this.setState((state) => ({
          filters: { ...state.filters, LPL: !state.filters.LPL },
        }));
      case "European Masters":
        return this.setState((state) => ({
          filters: {
            ...state.filters,
            "European Masters": !state.filters["European Masters"],
          },
        }));
    }
  }

  isMatchLive(gameToCheck) {
    const actualDate = new Date();

    if (
      new Date(gameToCheck.begin_at) < actualDate &&
      gameToCheck.end_at === null
    ) {
      return <span>LIVE</span>;
    }
  }

  scrollToTodaysGame(matchArray) {
    const date = new Date();

    let gameToScrollTo;

    const mostRecentGame = this.state.matches.length - 1;

    if (mostRecentGame > 1) {
      gameToScrollTo = document.getElementById(matchArray[mostRecentGame].id);

      gameToScrollTo.scrollIntoView({
        behavior: "auto",
        block: "start",
      });
    } else {
      return;
    }
  }

  componentDidMount() {
    getLeaguesList()
      .then(async (result) => {
        let LCS,
          LEC,
          LCK,
          LPL,
          EM = [];

        const tempArray = [];
        result.data.matchList.forEach((element) => {
          element.forEach((el) => {
            tempArray.push(el);
            if (el.league.name === "LCS") {
              LCS = element;
            } else if (el.league.name === "LEC") {
              LEC = element;
            } else if (el.league.name === "LCK") {
              LCK = element;
            } else if (el.league.name === "European Masters") {
              EM = element;
            } else {
              LPL = element;
            }
          });
        });
        const sorted = tempArray.sort(
          (a, b) => new Date(a.begin_at) - new Date(b.begin_at)
        );
        this.setState({
          leagues: result.data.leaguesList,
          matchesByLeague: {
            ...this.state.matchesByLeague,
            LCS: LCS,
            LEC: LEC,
            LCK: LCK,
            LPL: LPL,
            "European Masters": EM,
          },
          matches: sorted,
          dataLoaded: true,
        });

        const matches = this.state.matches;

        await this.scrollToTodaysGame(matches);
      })
      .catch((err) => console.log(err));
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.filters !== this.state.filters) {
      const particularMatches = [];

      const filtersState = this.state.filters;
      const identifiers = Object.keys(this.state.filters);

      const active = identifiers.filter(function (id) {
        return filtersState[id];
      });

      active.forEach((oneActiveFilter) => {
        this.state.matchesByLeague[oneActiveFilter].forEach((oneGame) => {
          particularMatches.push(oneGame);
        });
      });

      const sorted = particularMatches.sort(
        (a, b) => new Date(a.begin_at) - new Date(b.begin_at)
      );

      this.setState({ matches: sorted });
    }
    this.scrollToTodaysGame(this.state.matches);
  }

  render() {
    const leagues = this.state.leagues;
    const matchList = this.state.matches;
    const filters = this.state.filters;
    console.log(leagues);
    return this.state.dataLoaded ? (
      <section>
        <div className="esport-intro mt-4 mb-3 d-flex justify-content-center">
          <div className="esport-banner"></div>
        </div>

        <div className="d-flex justify-content-center mb-4">
          <div className="events d-inline-flex">
            <div className="container">
              <div className="row">
                <div id="events" className="event-container">
                  {matchList.map((oneMatch, i) => {
                    return (
                      <div
                        id={oneMatch.id}
                        className="row match-row d-flex justify-content-center"
                      >
                        <span>{oneMatch.scheduled_at.slice(0, 10)}</span>

                        <div className="match-infos d-flex align-items-center">
                          <div className="league-logo-match-container d-flex align-items-center justify-content-center">
                            <img
                              src={oneMatch.league.image_url}
                              className="match-league-logo"
                            />
                          </div>
                          <div>{this.isMatchLive(oneMatch)}</div>
                          <div className="team-infos-container d-flex justify-content-center">
                            {oneMatch.opponents.length > 0 ? (
                              <div className="displayed-match-infos d-flex align-items-center">
                                <div className="in-match-team-logo-container">
                                  <img
                                    src={
                                      oneMatch.opponents[0].opponent.image_url
                                    }
                                    className="in-match-team-logo"
                                  />
                                </div>
                                <span className="team-acronym font-weight-bold">
                                  {oneMatch.opponents[0].opponent.name}
                                </span>{" "}
                                {new Date(oneMatch.begin_at) < new Date() &&
                                oneMatch.status !== "not_started" ? (
                                  <div>
                                    <span className="team-1-score">
                                      {oneMatch.results[0].score}
                                    </span>
                                    <span className="versus-mention"> VS </span>
                                    <span className="team-2-score">
                                      {oneMatch.results[1].score}
                                    </span>
                                  </div>
                                ) : (
                                  <div>
                                    <span className="versus-mention"> VS </span>
                                  </div>
                                )}
                                <span className="team-acronym font-weight-bold">
                                  {oneMatch.opponents[1].opponent.name}
                                </span>
                                <div className="in-match-team-logo-container">
                                  <img
                                    src={
                                      oneMatch.opponents[1].opponent.image_url
                                    }
                                    className="in-match-team-logo"
                                  />
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
                          <div className="game-schedule h-100 d-flex align-items-center justify-content-center">
                            <div className="game-time-indicator pl-2 d-flex align-items-center">
                              <span>{oneMatch.scheduled_at.slice(11, 16)}</span>
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

          <div className="sidebar-filters h-100 d-inline-flex">
            <div>
              {leagues.map((oneLeague) => {
                return (
                  <div className="league-filter-item mb-2 h-100 d-flex align-items-center">
                    {filters[oneLeague.name] ? (
                      <button
                        className="league-filter-button button-active"
                        onClick={() => this.handleClick(oneLeague.name)}
                      >
                        <div className="active-mark"></div>
                        <div>
                          <img
                            className="league-logo"
                            src={oneLeague.image_url}
                            alt={oneLeague.name}
                          ></img>
                          <span>
                            <strong>{oneLeague.name}</strong>{" "}
                            {getLeagueLocation(oneLeague.id)}
                          </span>
                        </div>
                      </button>
                    ) : (
                      <button
                        className="league-filter-button"
                        onClick={() => this.handleClick(oneLeague.name)}
                      >
                        <div>
                          <img
                            className="league-logo"
                            src={oneLeague.image_url}
                            alt={oneLeague.name}
                          ></img>
                          <span>
                            <strong>{oneLeague.name}</strong>{" "}
                            {getLeagueLocation(oneLeague.id)}
                          </span>
                        </div>
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    ) : (
      <section>
        <div className="container">
          <div className="row">
            {leagues.map((oneLeague) => {
              return (
                <div className="col-3">
                  <div>
                    <img
                      className="league-logo"
                      src={oneLeague.image_url}
                      alt={oneLeague.name}
                    ></img>
                    <p>
                      <strong>{oneLeague.name}</strong>{" "}
                      {getLeagueLocation(oneLeague.id)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div>
              <p>No matches upcoming !</p>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default EsportHomepage;
