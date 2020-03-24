import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import { postSummonerName } from "../api";
import SummonerResume from "./summonerResume";
import LoadingMessage from "./loadingMessage";
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
      return <LoadingMessage />;
    } else {
      return (
        <div className="mt-5">
          <div>
            <Form
              onSubmit={event => this.handleSubmit(event)}
              className="summ-bar"
            >
              <Form.Control
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
        </div>
      );
    }
  }
}

export default SearchBar;
