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
    };
  }

  componentDidMount() {
    getLeaguesList()
      .then((result) => {
        this.setState({
          leagues: result.data.leaguesList,
          matches: result.data.matchList,
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    const leagues = this.state.leagues;
    const eSportMatches = this.state.matches;
    console.log(this.state);
    return (
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
            {eSportMatches[0].map((oneGame) => {
              return (
                <div>
                  <span>{oneGame.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }
}

export default EsportHomepage;
