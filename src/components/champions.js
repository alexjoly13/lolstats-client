import React, { Component } from "react";
import { getChampionsList } from "../api";
import "./champions.css";

class ChampionsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      championsArray: []
    };
  }

  componentDidMount() {
    getChampionsList().then(response => {
      this.setState({
        championsArray: response.data[0]
      });
    });
  }

  oneImg(patch, key) {
    return `https://cdn.communitydragon.org/${patch}/champion/${key}/square`;
  }

  render() {
    const { championsArray } = this.state;
    const values = Object.values(championsArray);
    console.log(values);
    return (
      <div className="container my-5">
        <div className="row">
          {values.map((oneChampion, index) => {
            return (
              <div className="col-2" key={index}>
                <img
                  className="champ-icon"
                  key={oneChampion.title}
                  src={this.oneImg(oneChampion.version, oneChampion.key)}
                  alt={oneChampion.title}
                />
                <p className="text-align-center" key={oneChampion.key}>
                  {oneChampion.name}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default ChampionsList;
