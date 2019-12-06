import React, { Component } from "react";

export default class FormCity extends Component {
  handleChange = event => {
    console.log("handlechange");
    this.props.updateState(event);
  };

  handleSubmit = e => {
    console.log("handlesubmit");
    e.preventDefault();
    this.props.finalSubmit(e);
    // return this.props.history.push("/finalSubmit");
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>When would you like to move in?</h1>
        <label htmlFor="startDate">from: </label>
        <input
          onChange={this.handleChange}
          name="startDate"
          type="date"
          id="startDate"
        ></input>
        <button type="submit" className="hide"></button>
      </form>
    );
  }
}
