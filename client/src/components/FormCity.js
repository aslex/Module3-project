import React from "react";
import { Redirect } from "react-router-dom";

export default class FormCity extends React.Component {


  handleChange = event => {
    console.log("handlechange");
    this.props.updateState(event);
  };

  handleSubmit = e => {
    e.preventDefault();
    return this.props.history.push("/form2");
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>FORM 1</h1>
        <label htmlFor="city">enter your city:</label>
        <input
          onChange={this.handleChange}
          type="text"
          name="city"
          id="city"
        ></input>
      </form>
    );
  }
}
