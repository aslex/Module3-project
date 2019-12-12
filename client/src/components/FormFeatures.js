import React, { Component } from "react";
import { Alert, Form, Button, Col, ProgressBar } from "react-bootstrap";

export default class FormFeatures extends Component {
  handleSubmit = e => {
    console.log("handlesubmit");
    e.preventDefault();
    return this.props.history.push("/form5");
  };

  handleClick = event => {
    event.preventDefault();
    console.log(event.target);
    event.target.classList.toggle("active");
    this.props.updateState(event);
    // this.setState({
    //   balcony: !this.state.balcony,
    //   accessible: !this.state.accessible,
    //   park: !this.state.park,
    //   pets: !this.state.pets,
    //   kitchen: !this.state.kitchen
    // });
  };

  componentDidMount = () => {
    console.log(this.props);
    const { user } = this.props;
    if (user.preferences.city && user) {
      this.props.history.push("/");
    }
  };

  render() {
    return (
      <div className="form-bg">
        <form onSubmit={this.handleSubmit}>
          <h3>Select amenities: </h3>
          <p>The apartment should have...</p>
          <div className="btn-container">
            <button
              className="features-button"
              name="balcony"
              onClick={this.handleClick}
            >
              Balcony
            </button>
            <button
              className="features-button"
              name="parking"
              onClick={this.handleClick}
            >
              Parking Spot
            </button>
            <button
              className="features-button"
              name="wheelchairfriendly"
              onClick={this.handleClick}
            >
              Wheelchair accessible
            </button>
            <button
              className="features-button"
              name="pets"
              onClick={this.handleClick}
            >
              Pets allowed
            </button>
            <br></br>
            <button
              className="features-button"
              name="fitted_kitchen"
              onClick={this.handleClick}
            >
              Fitted kitchen
            </button>

            <button
              className="features-button"
              name="fireplace"
              onClick={this.handleClick}
            >
              Fireplace
            </button>
            <br></br>

            <button
              className="features-button"
              name="furnished"
              onClick={this.handleClick}
            >
              Furnished
            </button>
            <button
              className="features-button"
              name="elevator"
              onClick={this.handleClick}
            >
              Elevator
            </button>
          </div>
          <br></br>
          <Button className="mb-1" variant="info" type="submit">
            Next
          </Button>
          <br></br>
          <Button
            className="mb-1"
            variant="outline-info"
            onClick={this.props.history.goBack}
          >
            Back
          </Button>
        </form>
        <ProgressBar now={80} variant="info" className="mt-3" />
      </div>
    );
  }
}
