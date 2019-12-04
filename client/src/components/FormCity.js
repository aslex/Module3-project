import React from "react";
import { Redirect } from "react-router-dom";

export default class FormCity extends React.Component {
  state = {
    city: ""
  };

  handleChange = event => {
    console.log("handlechange");
    const city = event.target.value;
    this.setState({
      city: city
    });
  };

  handleSubmit = e => {
    console.log("handlesubmit");
    e.preventDefault();
    // return <Redirect to="/form2" />;
    return this.props.history.push("/form2");
    // this.props.navigate();
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
        <button className="hide" type="submit"></button>
      </form>
    );
  }
}
