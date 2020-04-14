import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./champions.css";

class ChampionsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      championsArray: this.props.allChampions,
    };
  }

  oneImg(patch, key) {
    return `https://cdn.communitydragon.org/${patch}/champion/${key}/square`;
  }

  render() {
    const champions = this.state.championsArray;
    return (
      <div className="container my-5">
        <div className="row">
          {champions.map((oneChampion, index) => {
            return (
              <Link to={`/champions/${oneChampion.name}`}>
                <div className="col-2" key={index}>
                  <img
                    className="champ-icon"
                    key={oneChampion.title}
                    src={this.oneImg(oneChampion.version, oneChampion.key)}
                    alt={oneChampion.id}
                  />
                  <p className="text-align-center" key={oneChampion.key}>
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
