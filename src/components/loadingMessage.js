import React, { Component } from "react";
import "./loadingMessage.css";

class LoadingMessage extends Component {
  render() {
    return (
      <div className="d-flex h-100 justify-content-center">
        <img src="https://media.giphy.com/media/gIHn0t7PNSzF7Xiw2b/giphy.gif" />
        <h2 className="align-self-center h-25">
          Please wait while we're retrieving data
        </h2>
      </div>
    );
  }
}

export default LoadingMessage;
