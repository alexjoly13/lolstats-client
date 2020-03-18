import React, { Component, useState } from "react";
import Form from "react-bootstrap/Form";
import { Redirect, Switch, Route } from "react-router-dom";
import { Roller } from "react-awesome-spinners";
import { postSummonerName } from "../api";
import SummonerResume from "./summonerResume";
import "./searchBar.css";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      summonerName: "",
      summonerInfos: {},
      isLoading: false,
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
    this.setState({ isLoading: true });

    postSummonerName(summSearch).then(response => {
      console.log("Summoner name search : ", response.data);
      objectReturned = Object.assign(response.data);
      this.setState({
        summonerName: "",
        isSubmitSuccessful: true,
        isLoading: false,
        summonerInfos: objectReturned
      });
    });
  }

  render() {
    if (this.state.isSubmitSuccessful) {
      return <SummonerResume summsInfo={this.state.summonerInfos} />;
    } else if (this.state.isLoading) {
      return <Roller />;
    } else {
      return (
        <div>
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
        </div>
      );
    }

    // return this.state.isSubmitSuccessful ? (
    //   <div>
    //     {/* <Redirect
    //       to={{
    //         pathname: "/summoner/" + this.state.summonerInfos.name,
    //         state: this.state.summonerInfos
    //       }}
    //     /> */}
    //     <SummonerResume summsInfo={this.state.summonerInfos} />
    //   </div>
    // ) : (
    //   <div>
    //     <Form onSubmit={event => this.handleSubmit(event)}>
    //       <Form.Control
    //         className="summ-bar"
    //         size="lg"
    //         type="text"
    //         placeholder="Summoner Name"
    //         id="Searchbar"
    //         name="summonerName"
    //         value={this.state.summonerName}
    //         onChange={event => this.genericOnChange(event)}
    //       />
    //     </Form>
    //     <Roller />
    //   </div>
    // );
  }
}

export default SearchBar;
