import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";

class MyVerticallyCenteredModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedServerAccronym: "EUW",
      selectedServerValue: "EUROPE_WEST",
      serversList: [
        {
          name: "Europe West",
          accronym: "EUW",
          value: "EUROPE_WEST",
          checked: true,
        },
        {
          name: "Europe North & East",
          accronym: "EUNE",
          value: "EUROPE_NORTH",
        },
        { name: "North America", accronym: "NA", value: "NORTH_AMERICA" },
        { name: "Korea", accronym: "KR", value: "KOREA" },
      ],
      onClick: this.props.onRadioClick,
    };
  }

  handleRadioChange = (event) => {
    this.setState({
      selectedServerValue: event.target.value,
      selectedServerAccronym: event.target.name,
    });
  };

  saveInfosAndHideModal = (event) => {
    this.props.onHide();
    this.state.onClick(
      this.state.selectedServerValue,
      this.state.selectedServerAccronym
    );
  };

  render() {
    const servers = this.state.serversList;
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Server Location Parameters
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <FormGroup>
              {servers.map((oneServer) => {
                return (
                  <div>
                    <Form.Check
                      type={"radio"}
                      label={oneServer.name}
                      value={oneServer.value}
                      checked={
                        this.state.selectedServerValue === oneServer.value
                      }
                      onChange={this.handleRadioChange}
                      name={oneServer.accronym}
                    />
                  </div>
                );
              })}
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.saveInfosAndHideModal}>Save</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default MyVerticallyCenteredModal;
