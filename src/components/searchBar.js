import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { postSummonerName } from "../api";
import UsageInstructions from "./homepageInstructions";
import LoadingMessage from "./loadingMessage";
import MyVerticallyCenteredModal from "./CenteredModal";
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
      modalShow: false,
      serverAccronym: "EUW",
      serverValue: "EUROPE_WEST",
    };
    this.radioClick = this.radioClick.bind(this);
  }

  genericOnChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const summSearch = this.state.summonerName;
    const serverValue = this.state.serverValue;
    let objectReturned = this.state.summonerInfos;
    this.setState({ isLoading: true });

    postSummonerName(summSearch, serverValue).then((response) => {
      console.log("Summoner name search : ", response.data);
      objectReturned = Object.assign(response.data);
      this.setState({
        summonerName: "",
        isSubmitSuccessful: true,
        isLoading: false,
        summonerInfos: objectReturned,
        serverValue: "EUROPE_WEST",
        serverAccronym: "EUW",
      });
    });
  }

  radioClick = (radioValue, radioAcronym) => {
    return this.setState({
      serverValue: radioValue,
      serverAccronym: radioAcronym,
    });
  };

  render() {
    const modalShow = this.state.modalShow;
    const hideModal = () => this.setState({ modalShow: false });
    const activeServer = this.state.serverAccronym;
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
              className="summ-bar d-flex"
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

              <Button
                variant="outline-primary"
                className="ml-2"
                onClick={() => this.setState({ modalShow: true })}
              >
                {activeServer ? activeServer : "EUW"}
              </Button>
              <MyVerticallyCenteredModal
                show={modalShow}
                onHide={hideModal}
                onRadioClick={this.radioClick}
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
