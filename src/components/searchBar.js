import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import { Redirect, Switch, Route } from "react-router-dom";
import { postSummonerName } from "../api";
import SummonerResume from "./summonerResume";
import "./searchBar.css";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      summonerName: "",
      summonerInfos: {},
      isSubmitSuccessful: false
    };
  }

  genericOnChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const summSearch = this.state.summonerName;
    let objectReturned = this.state.summonerInfos;

    postSummonerName(summSearch).then(response => {
      console.log("Summoner name search : ", response.data);
      objectReturned = Object.assign(response.data);
      this.setState({
        summonerName: "",
        isSubmitSuccessful: true,
        summonerInfos: objectReturned
      });
    });
  }

  render() {
    return this.state.isSubmitSuccessful ? (
      <div>
        {/* <Redirect
          to={{
            pathname: "/summoner/" + this.state.summonerInfos.name,
            state: this.state.summonerInfos
          }}
        /> */}
        <SummonerResume summsInfo={this.state.summonerInfos} />
      </div>
    ) : (
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
