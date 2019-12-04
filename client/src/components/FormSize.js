import React, { Component } from "react";

export default class FormSize extends Component {
  state = {
    size: 10,
    rooms: 1
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
    return this.props.history.push("/form3");  
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>FORM 2</h1>
        <h1>Size</h1>
        <label htmlFor="size">Minimum size (in sqm): </label>
        <input
          onChange={this.handleChange}
          type="number"
          id="size"
          name="size"
          min="10"
          
        />

        <label htmlFor="rooms">Minimum number of rooms: </label>
        <input
          onChange={this.handleChange}
          type="number"
          id="rooms"
          name="rooms"
          min="1"
          step=".5"
        />
        <button className="hide" type="submit"></button>
      </form>
    );
  }
}
