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

    postSummonerName(this.props.value).then(response => {
      console.log("Add Tasklist", response.data);
    });
  }

  render() {
    return (
      <Form onSubmit={event => this.handleSubmit(event)}>
        <Form.Group>
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
        </Form.Group>
      </Form>
    );
  }
}

export default SearchBar;
