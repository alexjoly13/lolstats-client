import React, { Component } from "react";
import { getChampionDetails } from "../api";

let frameStyle;

class ChampionDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      championName: this.props.match.params.championName,
      championInfos: [],
      patch: {},
    };
  }

  frame(patch, key) {
    return (frameStyle = {
      width: "80%",
      height: "300px",
      color: "white",
      backgroundImage: `url(https://cdn.communitydragon.org/${patch}/champion/${key}/splash-art/centered)`,
      backgroundPositionY: "-100px",
    });
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
      <section className="champion-detailed-infos d-flex justify-content-center">
        {champInfos.map((oneInfo) => {
          return (
            <div style={this.frame(version, oneInfo.key)}>
              <div>
                <img src={this.oneImg(version, oneInfo.key)} />
                <h1>{oneInfo.name}</h1>
                <h5>{oneInfo.title}</h5>
              </div>
              <div>
                {oneInfo.tags.map((oneTag) => {
                  return (
                    <div>
                      <span>{oneTag}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </section>
    );
  }
}

export default ChampionDetails;
