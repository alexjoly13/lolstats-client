import React, { Component } from "react";

class LastGamesStatistics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastMatches: [this.props.gamesInfo]
    };
  }

  getWinLossRatio() {}

  render() {
    return (
      <section className="last-games-stats">
        <div>
          <div className="container">
            <div className="row">
              <div className="col-6">
                <p>HELLO FRIEND;</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default LastGamesStatistics;
