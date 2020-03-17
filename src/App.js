import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import NavigationBar from "./components/navigationBar";
import SearchContainer from "./components/searchContainer";
import ChampionsList from "./components/champions";

function App() {
  return (
    <section className="App">
      <div>
        <NavigationBar />
        <Switch>
          <Route exact path="/" component={SearchContainer} />
          <Route path="/champions" component={ChampionsList} />
        </Switch>
      </div>
      <footer>
        <p>GL & HF</p>
      </footer>
    </section>
  );
}

export default App;
