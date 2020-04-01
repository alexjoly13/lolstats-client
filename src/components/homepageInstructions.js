import React, { Component } from "react";
import "./homepageInstructions.css";

class UsageInstructions extends Component {
  render() {
    return (
      <div className="container position-relative mt-5">
        <img className="kayn-logo" src="/images/homepage/kayn.png" />
        <div className="row p-5 instructions-bg">
          <div className="col-4">
            <img
              className="search-screenshot"
              src="/images/homepage/summ-search.png"
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
              src="/images/homepage/summ-search.png"
            />
            <h4 className="mt-3 text-center">Champion Informations</h4>{" "}
          </div>
          <div className="col-4">
            <img
              className="search-screenshot"
              src="/images/homepage/summ-search.png"
            />
            <h4 className="mt-3 text-center">General Statistics</h4>{" "}
          </div>
        </div>
      </div>
    );
  }
}

export default UsageInstructions;
