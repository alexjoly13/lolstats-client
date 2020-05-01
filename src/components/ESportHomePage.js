import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./ESportHomePage.css";
import { getLeaguesList } from "../api";
import { getLeagueLocation } from "../helpers/esport-helper";

class EsportHomepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leagues: [],
      matches: [],
      dataLoaded: false,
    };
  }

  componentDidMount() {
    getLeaguesList()
      .then((result) => {
        this.setState({
          leagues: result.data.leaguesList,
          matches: result.data.matchList,
          dataLoaded: true,
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    const leagues = this.state.leagues;
    const matchList = this.state.matches;
    console.log(this.state);
    return this.state.dataLoaded ? (
      <section>
        <div className="esport-intro mt-4 mb-3">
          <div className="container">
            <div className="esport-banner"></div>
          </div>
        </div>

        <div className="d-flex justify-content-around">
          <div className="events d-inline-flex">
            <div className="container">
              <div className="row">
                <div className="webkit-event-container">
                  {matchList.map((oneLeague) => {
                    return oneLeague.map((oneMatch) => {
                      return (
                        <div className="row match-row">
                          <div className="match-infos d-flex align-items-center">
                            <div className="league-logo-match-container d-flex align-items-center justify-content-center">
                              <img
                                src={oneMatch.league.image_url}
                                className="match-league-logo"
                              />
                            </div>
                            <div className="team-infos-container d-flex justify-content-center">
                              <div className="displayed-match-infos d-flex align-items-center justify-content-around">
                                <div className="in-match-team-logo-container">
                                  <img
                                    src={
                                      oneMatch.opponents[0].opponent.image_url
                                    }
                                    className="in-match-team-logo"
                                  />
                                </div>
                                <span className="team-acronym font-weight-bold">
                                  {oneMatch.opponents[0].opponent.acronym}
                                </span>{" "}
                                <span className="versus-mention"> VS </span>
                                <span className="team-acronym font-weight-bold">
                                  {oneMatch.opponents[1].opponent.acronym}
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
                            </div>
                            <div className="game-schedule h-100 d-flex align-items-center justify-content-center">
                              <div className="game-time-indicator pl-2 d-flex align-items-center">
                                <span>20:00</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    });
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="sidebar-filters h-100 d-inline-flex">
            <div>
              {leagues.map((oneLeague) => {
                return (
                  <div className="league-filter-item d-flex align-items-center">
                    <Link to={`esport/${oneLeague.name.toLowerCase()}`}>
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
                    </Link>
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
                  <Link to={`esport/${oneLeague.name.toLowerCase()}`}>
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
                  </Link>
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
