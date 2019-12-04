import React, { Component } from "react";

export default class FormPrice extends Component {
  state = {
    minPrice: 0,
    maxPrice: 0
  };
  handleChange = event => {
    console.log("handlechange");

    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = e => {
    console.log("handlesubmit");
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
          step="50"
          id="minPrice"
          name="minPrice"
          min="0"
          max="5000+"
        />
        <label htmlFor="maxPrice">max: </label>
        <input
          onChange={this.handleChange}
          type="number"
          step="50"
          id="maxPrice"
          name="maxPrice"
          min={this.state.minPrice}
        ></input>
        <button className="hide" type="submit"></button>
      </form>
    );
  }
}
