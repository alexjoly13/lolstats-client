import React, { Component } from "react";
import Loader from "react-loader-spinner";
import { getLeaguesList } from "../api";
import EventContainer from "./EventContainer";

import "./ESportHomePage.css";
import LeaguesFilter from "./LeaguesFilter";

class EsportHomepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leagues: [],
      matches: [],
      matchesByLeague: {},
      dataLoaded: false,
      filters: {
        LCS: true,
        LEC: true,
        LCK: true,
        LPL: true,
        "European Masters": true,
      },
    };
    this.handleFilterClick = this.handleFilterClick.bind(this);
  }

  handleFilterClick(leaguetoFilter) {
    return this.setState((state) => ({
      filters: {
        ...state.filters,
        [leaguetoFilter]: !state.filters[leaguetoFilter],
      },
    }));
  }

  scrollToTodaysGame(matchArray) {
    // const date = new Date();

    let gameToScrollTo;

    const mostRecentGame = this.state.matches.length - 1;

    if (mostRecentGame > 1) {
      gameToScrollTo = document.getElementById(matchArray[mostRecentGame].id);

      gameToScrollTo.scrollIntoView({
        behavior: "auto",
        block: "start",
      });
    } else {
      return;
    }
  }

  componentDidMount() {
    getLeaguesList()
      .then(async (result) => {
        let LCS,
          LEC,
          LCK,
          LPL,
          EM = [];

        const tempArray = [];
        result.data.matchList.forEach((element) => {
          element.forEach((el) => {
            tempArray.push(el);
            if (el.league.name === "LCS") {
              LCS = element;
            } else if (el.league.name === "LEC") {
              LEC = element;
            } else if (el.league.name === "LCK") {
              LCK = element;
            } else if (el.league.name === "European Masters") {
              EM = element;
            } else {
              LPL = element;
            }
          });
        });
        const sorted = tempArray.sort(
          (a, b) => new Date(a.begin_at) - new Date(b.begin_at)
        );
        this.setState({
          leagues: result.data.leaguesList,
          matchesByLeague: {
            ...this.state.matchesByLeague,
            LCS: LCS,
            LEC: LEC,
            LCK: LCK,
            LPL: LPL,
            "European Masters": EM,
          },
          matches: sorted,
          dataLoaded: true,
        });

        const matches = this.state.matches;

        await this.scrollToTodaysGame(matches);
      })
      .catch((err) => console.log(err));
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.filters !== this.state.filters) {
      const particularMatches = [];

      const filtersState = this.state.filters;
      const identifiers = Object.keys(filtersState);

      const active = identifiers.filter(function (id) {
        return filtersState[id];
      });

      active.forEach((oneActiveFilter) => {
        this.state.matchesByLeague[oneActiveFilter].forEach((oneGame) => {
          particularMatches.push(oneGame);
        });
      });

      const sorted = particularMatches.sort(
        (a, b) => new Date(a.begin_at) - new Date(b.begin_at)
      );

      this.setState({ matches: sorted });
    }
    this.scrollToTodaysGame(this.state.matches);
  }

  render() {
    const leagues = this.state.leagues;
    const matchList = this.state.matches;
    const filters = this.state.filters;
    return (
      <section>
        <div className="esport-intro mt-2 mb-3 d-flex justify-content-center">
          <div className="esport-banner"></div>
        </div>
        {this.state.dataLoaded ? (
          <div className="d-flex justify-content-center mb-4">
            <EventContainer eventsList={matchList} />

            <LeaguesFilter
              leaguesData={leagues}
              filtersState={filters}
              handleLeagueClick={this.handleFilterClick}
            />
          </div>
        ) : (
          <section>
            <div className="container">
              <div className="row">
                <div>
                  <Loader
                    type="Oval"
                    color="#80908f45"
                    height={100}
                    width={100}
                  />
                </div>
              </div>
            </div>
          </section>
        )}
      </section>
    );
  }
}

export default EsportHomepage;
