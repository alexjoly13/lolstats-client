import React, { Component } from "react";
import { Link } from "react-router-dom";
import { champIconProvider } from "../helpers/images-helper";
import { getChampionsList } from "../api";
import "./championsList.css";

class ChampionsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      championsArray: [],
    };
  }

  componentDidMount() {
    getChampionsList().then((response) => {
      this.setState({
        championsArray: Object.values(response.data[0]),
      });
    });
  }

  render() {
    const champions = this.state.championsArray;
    return (
      <div className="container my-5">
        <div className="row">
          {champions.map((oneChampion, index) => {
            return (
              <Link
                to={`/champions/${oneChampion.id}`}
                className="col text-decoration-none"
                key={oneChampion.id}
              >
                <div className="" key={index}>
                  <img
                    className="champ-icon"
                    key={oneChampion.title}
                    src={champIconProvider(oneChampion.image.full)}
                    alt={oneChampion.id}
                  />
                  <p className="text-center" key={oneChampion.key}>
                    {oneChampion.name}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    );
  }
}

export default ChampionsList;
