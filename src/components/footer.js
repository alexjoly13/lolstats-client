import React, { Component } from "react";
import "./footer.css";

class Footer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <footer className="site-footer">
        <p className="text-center">GL & HF</p>
        <p className="copyrights text-center">
          © 2019-2020 LoLStats. LoLStats isn’t endorsed by Riot Games and
          doesn’t reflect the views or opinions of Riot Games or anyone
          officially involved in producing or managing League of Legends. League
          of Legends and Riot Games are trademarks or registered trademarks of
          Riot Games, Inc. League of Legends © Riot Games, Inc.
        </p>
      </footer>
    );
  }
}

export default Footer;
