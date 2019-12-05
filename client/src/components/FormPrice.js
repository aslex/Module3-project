import React, { Component } from "react";

export default class FormPrice extends Component {
  handleChange = event => {
    console.log("handlechange");
    this.props.updateState(event);
  };

  handleSubmit = e => {
    e.preventDefault();
    return this.props.history.push("/form4");
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>FORM 3</h1>
        <h1>Rent:</h1>
        <label htmlFor="minPrice">min: </label>
        <input
          onChange={this.handleChange}
          type="number"
          id="minPrice"
          name="minPrice"
        />
        <label htmlFor="maxPrice">max: </label>
        <input
          onChange={this.handleChange}
          type="number"
          id="maxPrice"
          name="maxPrice"
        ></input>
        <button className="hide" type="submit"></button>
      </form>
    );
  }
}
