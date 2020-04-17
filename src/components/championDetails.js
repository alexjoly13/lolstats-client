import React, { Component } from "react";
import { getChampionDetails } from "../api";
import { champIconProvider } from "../helpers/images-helper";
import { getFrameStyle } from "../helpers/images-helper";

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

  // frame(patch, key) {
  //   return (frameStyle = {
  //     width: "75%",
  //     height: "300px",
  //     color: "white",
  //     backgroundImage: `url(https://cdn.communitydragon.org/10.7.1/champion/${key}/splash-art/centered)`,
  //     backgroundPositionY: "-100px",
  //   });
  // }

  componentDidMount() {
    const champName = this.state.championName;
    getChampionDetails(champName).then((response) => {
      this.setState({
        championInfos: response.data.data,
        patch: response.data.version,
      });
    });
  }

  render() {
    const champInfos = Object.values(this.state.championInfos);
    const version = this.state.patch;
    console.log(champInfos);
    return (
      <section className="champion-detailed-infos d-flex justify-content-center mt-4">
        {champInfos.map((oneInfo) => {
          return (
            <div style={getFrameStyle(oneInfo.id)}>
              <div className="h-100 d-flex align-items-center">
                <div className="container">
                  <div className="row">
                    <div className="col-2">
                      <img src={champIconProvider(oneInfo.image.full)} />
                    </div>
                    <div className="col-3 align-self-center">
                      <div>
                        <h3>{oneInfo.name}</h3>
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
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    );
  }
}

export default ChampionDetails;
