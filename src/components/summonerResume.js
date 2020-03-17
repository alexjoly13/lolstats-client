import React, { Component } from "react";

class SummonerResume extends Component {
  constructor(props) {
    super(props);
    this.state = {
      summDetails: [this.props.summsInfo[0]],
      summMatches: [this.props.summsInfo[1]]
    };
  }

  oneImg(key) {
    return `https://cdn.communitydragon.org/10.2.1/profile-icon/${key}`;
  }

  render() {
    const player = this.state.summDetails;
    const games = this.state.summMatches[0];
    console.log("previous games", games);
    return (
      <div>
        {player.map(oneSummoner => {
          return (
            <div>
              <p>{oneSummoner.name}</p>
              <img
                className="summoner-icon"
                src={this.oneImg(oneSummoner.profileIconId)}
                alt="summ icon"
              />
              <p>{oneSummoner.summonerLevel}</p>
            </div>
          );
        })}
        <div>
          {games.map(oneGame => {
            return (
              <section>
                <div>
                  <p>{oneGame.gameType}</p>
                  <p>{oneGame.gameDuration / 60}</p>
                  <p>
                    {oneGame.participantIdentities.map(oneId => {
                      return <p>{oneId.player.summonerName}</p>;
                    })}
                  </p>
                </div>
                {/* <div>
                  {oneGame.participantIdentities.map(oneparticipant => {
                    return <p>{oneparticipant.participantId}</p>;
                  })}
                </div> */}
              </section>
            );
          })}
        </div>
      </div>
    );
  }
}

export default SummonerResume;
