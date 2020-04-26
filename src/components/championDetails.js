import React, { Component } from "react";
import { getChampionDetails } from "../api";
import { champIconProvider } from "../helpers/images-helper";
import { getFrameStyle } from "../helpers/images-helper";

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

  render() {
    const champInfos = Object.values(this.state.championInfos);
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
                      <img
                        src={champIconProvider(oneInfo.image.full)}
                        alt={oneInfo.name}
                      />
                    </div>
                    <div className="col-3 align-self-center">
                      <div>
                        <h3>{oneInfo.name}</h3>
                      </div>
                      <div>
                        {oneInfo.tags.map((oneTag, index) => {
                          return (
                            <div key={index}>
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
