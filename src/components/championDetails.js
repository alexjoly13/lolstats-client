import React, { Component } from "react";
import { getChampionDetails } from "../api";

class ChampionDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      championName: this.props.match.params.championName,
      championInfos: [],
      patch: {},
    };
  }

  componentDidMount() {
    const champName = this.state.championName;
    getChampionDetails(champName).then((response) => {
      this.setState({
        championInfos: response.data.data,
        patch: response.data.version,
      });
    });
  }

  oneImg(patch, key) {
    return `https://cdn.communitydragon.org/${patch}/champion/${key}/square`;
  }

  render() {
    const champInfos = Object.values(this.state.championInfos);
    const version = this.state.patch;
    console.log(champInfos);
    return (
      <section className="champion-detailed-infos">
        {champInfos.map((oneInfo) => {
          return (
            <div>
              <img src={this.oneImg(version, oneInfo.key)} />
              <h1>{oneInfo.name}</h1>
              <h5>{oneInfo.title}</h5>
            </div>
          );
        })}
      </section>
    );
  }
}

export default ChampionDetails;
