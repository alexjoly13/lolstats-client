import React, { Component } from "react";
import "./loadingMessage.css";

class LoadingMessage extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <img src="https://media.giphy.com/media/gIHn0t7PNSzF7Xiw2b/giphy.gif" />
          <h2>Please wait while we're retrieving data</h2>
        </div>
      </div>
    );
  }
}

export default LoadingMessage;
