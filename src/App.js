import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import NavigationBar from "./components/navigationBar";
import SearchContainer from "./components/searchContainer";
import ChampionsList from "./components/champions";
import ChampionDetails from "./components/championDetails";
import SummonerResume from "./components/summonerResume";
import GameDetails from "./components/gameDetails";
import Footer from "./components/footer";
import { getChampionsList } from "./api";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      championsArray: [],
      isSubmitSuccessful: false,
    };
  }

  componentDidMount() {
    getChampionsList().then((response) => {
      this.setState({
        championsArray: Object.values(response.data[0]),
        isSubmitSuccessful: true,
      });
    });
  }

  render() {
    const champsList = this.state.championsArray;
    return (
      <section id="App">
        <div className="content">
          <NavigationBar />
          <Switch>
            <Route exact path="/" component={SearchContainer} />
            {this.state.isSubmitSuccessful ? (
              <Route
                exact
                path="/champions"
                render={() => <ChampionsList allChampions={champsList} />}
              />
            ) : (
              <div></div>
            )}

            <Route
              path="/champions/:championName"
              render={(props) => <ChampionDetails match={props.match} />}
            />
            <Route exact path="/:summonerName" component={SummonerResume} />
            <Route path="/:summonerName/:gameId" component={GameDetails} />
          </Switch>
        </div>
        <Footer />
      </section>
    );
  }
}

export default App;
