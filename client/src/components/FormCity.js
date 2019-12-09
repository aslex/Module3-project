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
      <div>
        <form onSubmit={this.handleSubmit}>
          <h3>FORM 1</h3>
          <label htmlFor="city">enter your city:</label>
          <input
            onChange={this.handleChange}
            type="text"
            name="city"
            id="city"
            required
          ></input>
          <br></br>
          <button onClick={this.props.history.goBack}>Back</button>
          <button type="Submit">Next</button>
        </form>
        <ul id="progressbar">
          <li class="on">City</li>
          <li>Prize</li>
          <li>Size</li>
          <li>Area</li>
          <li>++++</li>
          <li>Text</li>
        </ul>
      </div>
    );
  }
}
