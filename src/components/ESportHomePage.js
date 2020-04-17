import React, { Component } from "react";
import "./ESportHomePage.css";
import { getLeaguesList } from "../api";
import { getLeagueLocation } from "../helpers/esport-helper";

class EsportHomepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leagues: [],
    };
  }

  componentDidMount() {
    getLeaguesList()
      .then((result) => {
        this.setState({
          leagues: result.data,
        });
        console.log(this.state.leagues);
      })
      .catch((err) => console.log(err));
  }

  render() {
    const leagues = this.state.leagues;
    return (
      <section>
        <div className="container">
          <div className="row">
            {leagues.map((oneLeague) => {
              return (
                <div className="col-3">
                  <img className="league-logo" src={oneLeague.image_url}></img>
                  <p>
                    <strong>{oneLeague.name}</strong>{" "}
                    {getLeagueLocation(oneLeague.id)}
                  </p>
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
