import React, { Component } from "react";

import KaynLogo from "../assets/images/homepage/kayn.png";
import SummonerSearch from "../assets/images/homepage/summ-search.png";
import ChampionsInfo from "../assets/images/homepage/champion-page.png";
import EsportSchedule from "../assets/images/homepage/esport-section.png";

import "./homepageInstructions.css";

class UsageInstructions extends Component {
  render() {
    return (
      <div className="container position-relative mt-5">
        <img className="kayn-logo" src={KaynLogo} alt="kayn-homepage-logo" />
        <div className="row p-5 instructions-bg">
          <div className="col-4">
            <img
              className="search-screenshot"
              src={SummonerSearch}
              alt="summ-instructions"
            />
            <h4 className="mt-3 text-center">Player Statistics</h4>
            <p className="text-center">
              Look for a player by its summoner's name, and get detailed
              statistics such as last games results and more ..
            </p>
          </div>
          <div className="col-4">
            <img
              className="search-screenshot"
              src={ChampionsInfo}
              alt="champ-instructions"
            />
            <h4 className="mt-3 text-center">Champion Informations</h4>{" "}
          </div>
          <div className="col-4">
            <img
              className="search-screenshot"
              src={EsportSchedule}
              alt="stats-instructions"
            />
            <h4 className="mt-3 text-center">Pro Games Schedule</h4>{" "}
            <p className="text-center">
              Never ever miss a pro game again ! Check all the events planned in
              the major leagues.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default UsageInstructions;
