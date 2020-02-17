import React, { Component } from "react";
import { getChampionsList } from "../api";

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
      <div>
        <ul>
          {values.map((oneChampion, index) => {
            return (
              <div key={index}>
                <li key={oneChampion.key}>{oneChampion.name}</li>
                <img
                  key={oneChampion.title}
                  src={this.oneImg(oneChampion.version, oneChampion.key)}
                />
              </div>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default ChampionsList;
