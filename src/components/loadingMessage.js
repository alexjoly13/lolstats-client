import React, { Component } from "react";
import "./loadingMessage.css";

class LoadingMessage extends Component {
  render() {
    return (
      <div className="h-100 loading-banner">
        <div className="d-flex justify-content-center">
          <img
            className="loading-picture"
            src="https://media.giphy.com/media/gIHn0t7PNSzF7Xiw2b/giphy.gif"
            alt="braum-dancing"
          />
        </div>
        <div className="d-flex justify-content-center">
          <h2>Please wait while we're retrieving data</h2>
        </div>
      </div>
    );
  }
}

export default LoadingMessage;
