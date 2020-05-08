import React, { Component } from "react";

import { getLeagueLocation } from "../helpers/esport-helper";

import "./LeaguesFilter.css";

class LeaguesFilter extends Component {
  static getDerivedStateFromProps(props, state) {
    if (props.filtersState !== state.filtersState) {
      return { filtersState: props.filtersState };
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      leagues: this.props.leaguesData,
      buttonClick: this.props.handleLeagueClick,
    };
  }

  render() {
    const filters = this.state.filtersState;
    const leagues = this.state.leagues;
    const functionClick = this.state.buttonClick;
    return (
      <div className="sidebar-filters h-100 d-inline-flex">
        <div>
          {leagues.map((oneLeague) => {
            return (
              <div className="league-filter-item mb-2 h-100 d-flex align-items-center">
                {filters[oneLeague.name] ? (
                  <button
                    className="league-filter-button button-active"
                    onClick={() => functionClick(oneLeague.name)}
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
                    onClick={() => functionClick(oneLeague.name)}
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
    );
  }
}

export default LeaguesFilter;
