import React, { Component } from "react";

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
      <div>
        <form onSubmit={this.handleSubmit}>
          <h1>FORM 4</h1>
          <h1>The apartment should have: </h1>
          <button
            className="features button"
            name="balcony"
            onClick={this.handleClick}
          >
            Balcony
          </button>
          <button
            className="features button"
            name="parking"
            onClick={this.handleClick}
          >
            Parking Spot
          </button>
          <button
            className="features button"
            name="wheelchairfriendly"
            onClick={this.handleClick}
          >
            Wheelchair accessible
          </button>
          <button
            className="features button"
            name="pets"
            onClick={this.handleClick}
          >
            Pets allowed
          </button>
          <button
            className="features button"
            name="fitted_kitchen"
            onClick={this.handleClick}
          >
            Fitted kitchen
          </button>
          <button
            className="features button"
            name="fireplace"
            onClick={this.handleClick}
          >
            Fireplace
          </button>
          <button
            className="features button"
            name="furnished"
            onClick={this.handleClick}
          >
            Furnished
          </button>
          <button
            className="features button"
            name="elevator"
            onClick={this.handleClick}
          >
            Elevator
          </button>
          <br />
          <button type="submit">Next</button>
          <button onClick={this.props.history.goBack}>Back</button>
        </form>
        <ul id="progressbar">
          <li>
            <img src="./images/logo.png" alt="" width="30px"></img>
          </li>
          <li>
            <img src="./images/logo.png" alt="" width="30px"></img>
          </li>
          <li>
            <img src="./images/logo.png" alt="" width="30px"></img>
          </li>
          <li>
            <img src="./images/logo.png" alt="" width="30px"></img>
          </li>
          <li className="hide">
            <img src="./images/logo.png" alt="" width="30px"></img>
          </li>
        </ul>
      </div>
    );
  }
}
