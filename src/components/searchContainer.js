import React, { Component } from "react";
import "./searchContainer.css";
import SearchBar from "./searchBar";

class SearchContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { searchString: "" };
  }

  updateSearch(event) {
    event.preventDefault();
    this.setState({ searchString: event.target.value });
  }

  render() {
    return (
      <SearchBar
        searchString={this.state.searchString}
        handleSearch={event => this.updateSearch(event)}
      />
    );
  }
}

export default SearchContainer;
