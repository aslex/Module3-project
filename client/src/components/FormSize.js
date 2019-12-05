import React, { Component } from "react";

export default class FormSize extends Component {
  handleChange = event => {
    console.log("handlechange");
    this.props.updateState(event);
  };

  handleSubmit = e => {
    console.log("handlesubmit");
    e.preventDefault();
    return this.props.history.push("/form3");
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>FORM 2</h1>
        <h1>minimum size requirements</h1>
        <label htmlFor="size">Total area: </label>
        <input
          onChange={this.handleChange}
          type="number"
          id="size"
          name="size"
          min="10"
        />
        sqm
        <br />
        <label htmlFor="rooms">rooms: </label>
        <input
          onChange={this.handleChange}
          type="number"
          id="rooms"
          name="rooms"
          min="1"
          step=".5"
        />
        <label htmlFor="bathrooms">bathrooms: </label>
        <input
          onChange={this.handleChange}
          type="number"
          name="bathrooms"
          id="bathrooms"
        ></input>
        <button className="hide" type="submit"></button>
      </form>
    );
  }
}
