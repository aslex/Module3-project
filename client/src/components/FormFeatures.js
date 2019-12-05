import React, { Component } from "react";

export default class FormFeatures extends Component {
  // state = {
  //   balcony: false,
  //   accessible: false,
  //   park: false,
  //   pets: false,
  //   kitchen: false
  // };

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

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>FORM 4</h1>
        <h1>The apartment should have: </h1>
        <button className="button" name="balcony" onClick={this.handleClick}>
          Balcony
        </button>
        <button className="button" name="park" onClick={this.handleClick}>
          Parking Spot
        </button>
        <button className="button" name="accessible" onClick={this.handleClick}>
          Wheelchair accessible
        </button>
        <button className="button" name="pets" onClick={this.handleClick}>
          Pets allowed
        </button>
        <button className="button" name="kitchen" onClick={this.handleClick}>
          Built-in kitchen
        </button>
        <br />
        <button type="submit">Next</button>
      </form>
    );
  }
}
