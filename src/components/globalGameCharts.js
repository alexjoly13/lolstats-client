import React, { Component } from "react";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from "victory";
import { champImg } from "../helpers/images-helper";
import "./globalGameCharts.css";

class GlobalCharts extends Component {
  constructor(props) {
    super(props);
    this.state = { matchInfos: this.props.gameInfos };
  }

  render() {
    const matchStats = this.state.matchInfos;
    console.log(matchStats);
    const data = [
      {
        quarter: 1,
        damage: matchStats.teams[0].teamMembers[0].stats.totalDamageDealt,
        fill: "blue",
      },
      {
        quarter: 2,
        damage: matchStats.teams[0].teamMembers[1].stats.totalDamageDealt,
        fill: "blue",
      },
      {
        quarter: 3,
        damage: matchStats.teams[0].teamMembers[2].stats.totalDamageDealt,
        fill: "blue",
      },
      {
        quarter: 4,
        damage: matchStats.teams[0].teamMembers[3].stats.totalDamageDealt,
        fill: "blue",
      },
      {
        quarter: 5,
        damage: matchStats.teams[0].teamMembers[4].stats.totalDamageDealt,
        fill: "blue",
      },
      {
        quarter: 6,
        damage: matchStats.teams[1].teamMembers[0].stats.totalDamageDealt,
        fill: "red",
      },
      {
        quarter: 7,
        damage: matchStats.teams[1].teamMembers[1].stats.totalDamageDealt,
        fill: "red",
      },
      {
        quarter: 8,
        damage: matchStats.teams[1].teamMembers[2].stats.totalDamageDealt,
        fill: "red",
      },
      {
        quarter: 9,
        damage: matchStats.teams[1].teamMembers[3].stats.totalDamageDealt,
        fill: "red",
      },
      {
        quarter: 10,
        damage: matchStats.teams[1].teamMembers[4].stats.totalDamageDealt,
        fill: "red",
      },
    ];

    const ImgLabel = () => {
      return (
        <foreignObject
          style={{
            width: "420px",
            height: "24px",
          }}
          x="60"
          y="250"
        >
          {
            <span className="hekler">
              {matchStats.teams[0].teamMembers.map((oneMember) => {
                return (
                  <img
                    src={champImg(oneMember.championId)}
                    style={{
                      maxWidth: "23px",
                      maxLength: "23px",
                      marginRight: "10px",
                    }}
                    alt="Some champ"
                    key={oneMember.participantId}
                  />
                );
              })}
              {matchStats.teams[1].teamMembers.map((oneMember) => {
                return (
                  <img
                    src={champImg(oneMember.championId)}
                    style={{
                      maxWidth: "23px",
                      maxLength: "23px",
                      marginRight: "10px",
                    }}
                    alt="Some champ"
                    key={oneMember.participantId}
                  />
                );
              })}
            </span>
          }
        </foreignObject>
      );
    };

    return (
      <div className="container">
        <div className="row">
          <div className="col-6">
            <h3 className="m-0">Damage Dealt</h3>
            <div className="damage-graph-container">
              <VictoryChart domainPadding={20} theme={VictoryTheme.grayscale}>
                <VictoryAxis tickLabelComponent={<ImgLabel />} />
                <VictoryAxis dependentAxis tickFormat={(x) => `${x / 1000}k`} />
                <VictoryBar
                  style={{
                    data: {
                      fill: ({ datum }) => datum.fill,
                      fillOpacity: 0.5,
                      strokeWidth: 1,
                    },
                  }}
                  data={data}
                  x="quarter"
                  y="damage"
                />
              </VictoryChart>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GlobalCharts;
