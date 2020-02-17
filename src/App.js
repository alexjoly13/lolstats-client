import React from "react";
import { Switch, Route, NavLink } from "react-router-dom";
import "./App.css";
import NavigationBar from "./components/navigationBar";
import Footer from "./components/footer";
import SearchContainer from "./components/searchContainer";
import ChampionsList from "./components/champions";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NavigationBar />
        <Switch>
          <Route exact path="/" component={SearchContainer} />
          <Route path="/champions" component={ChampionsList} />
        </Switch>
        <Footer />
      </header>
    </div>
  );
}

export default App;
