import React, { Component } from "react";
import "./championDetails.css";

class GameDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameResultInfos: this.props.location.state.specificGameDetails,
    };
  }
  render() {
    const info = this.state.gameResultInfos;
    console.log(info);
    return <p>Hello Friend</p>;
  }
}

export default GameDetails;
