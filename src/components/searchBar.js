import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import { postSummonerName } from "../api";
import "./searchBar.css";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      summonerName: ""
    };
  }

  genericOnChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const summSearch = this.state.summonerName;

    postSummonerName(summSearch).then(response => {
      console.log("Summoner name search : ", response.data);
      this.setState({ summonerName: "" });
    });
  }

  render() {
    console.log(this.state.summonerName);

    return (
      <Form onSubmit={event => this.handleSubmit(event)}>
        <Form.Control
          className="summ-bar"
          size="lg"
          type="text"
          placeholder="Summoner Name"
          id="Searchbar"
          name="summonerName"
          value={this.state.summonerName}
          onChange={event => this.genericOnChange(event)}
        />
      </Form>
    );
  }
}

export default SearchBar;
