import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import { postSummonerName } from "../api";
import UsageInstructions from "./homepageInstructions";
import LoadingMessage from "./loadingMessage";
import "./searchBar.css";
import { Redirect } from "react-router-dom";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      summonerName: "",
      summonerInfos: {},
      isLoading: false,
      isSubmitSuccessful: false,
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

    postSummonerName(summSearch).then((response) => {
      console.log("Summoner name search : ", response.data);
      objectReturned = Object.assign(response.data);
      this.setState({
        summonerName: "",
        isSubmitSuccessful: true,
        isLoading: false,
        summonerInfos: objectReturned,
      });
    });
  }

  render() {
    if (this.state.isSubmitSuccessful) {
      return (
        <div>
          <Redirect
            to={{
              pathname: `/summoner/${this.state.summonerInfos.summoner.name}`,
              state: {
                summsInfo: this.state.summonerInfos,
              },
            }}
          />
        </div>
      );
    } else if (this.state.isLoading) {
      return <LoadingMessage />;
    } else {
      return (
        <div className="homepage-container">
          <div className="d-flex justify-content-center">
            <Form
              onSubmit={(event) => this.handleSubmit(event)}
              className="summ-bar"
            >
              <Form.Control
                size="lg"
                type="text"
                placeholder="Summoner Name"
                id="Searchbar"
                name="summonerName"
                value={this.state.summonerName}
                onChange={(event) => this.genericOnChange(event)}
              />
            </Form>
          </div>
          <UsageInstructions />
        </div>
      );
    }
  }
}

export default SearchBar;
