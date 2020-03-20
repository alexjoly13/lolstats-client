import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import NavigationBar from "./components/navigationBar";
import SearchContainer from "./components/searchContainer";
import ChampionsList from "./components/champions";
import Footer from "./components/footer";

function App() {
  return (
    <section id="App">
      <div className="content">
        <NavigationBar />
        <Switch>
          <Route exact path="/" component={SearchContainer} />
          <Route path="/champions" component={ChampionsList} />
        </Switch>
      </div>
      <Footer />
    </section>
  );
}

export default App;
