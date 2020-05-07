import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Cookies from "js-cookie";
import "./App.css";
import NavigationBar from "./components/navigationBar";
import SearchContainer from "./components/searchContainer";
import ChampionsList from "./components/championsList";
import ChampionDetails from "./components/championDetails";
import SummonerResume from "./components/summonerResume";
import GameDetails from "./components/gameDetails";
import Footer from "./components/footer";
import { checkLastVersion } from "./api";
import EsportHomepage from "./components/ESportHomePage";
import LeagueHomePage from "./components/LeagueHomePage";

let versionCookie = Cookies.get("version");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      championsArray: [],
    };
  }

  // componentDidMount() {
  //   if (versionCookie === undefined) {
  //     checkLastVersion().then((response) => {
  //       Cookies.set("version", response.data, { expires: 1 });
  //     });
  //   }
  // }

  render() {
    return (
      <section id="App">
        <div className="content">
          <NavigationBar />
          <Switch>
            <Route exact path="/" component={SearchContainer} />
            <Route exact path="/champions" render={() => <ChampionsList />} />

            <Route
              path="/champions/:championName"
              render={(props) => <ChampionDetails match={props.match} />}
            />
            <Route
              exact
              path="/summoner/:summonerName"
              component={SummonerResume}
            />
            <Route
              path="/summoner/:summonerName/:gameId"
              component={GameDetails}
            />
            <Route exact path="/esport" component={EsportHomepage} />
            <Route path="/esport/:leagueName" component={LeagueHomePage} />
          </Switch>
        </div>
        <Footer />
      </section>
    );
  }
}

export default App;
