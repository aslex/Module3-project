import React from "react";
import { Redirect } from "react-router-dom";
import { Alert, Form, Button, Col } from "react-bootstrap";

export default class FormCity extends React.Component {
  handleChange = event => {
    console.log("handlechange");
    this.props.updateState(event);
  };

  handleSubmit = e => {
    e.preventDefault();
    return this.props.history.push("/form2");
  };

  // componentDidMount -> get user Info
  // IF User has already filled out this form -> check user obkect
  // redirect to profile
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
        <Form onSubmit={this.handleSubmit}>
          <h3>FORM 1</h3>
          <Form.Group as={Col}>
            <Form.Label>City</Form.Label>
            <Form.Control
              onChange={this.handleChange}
              type="text"
              name="city"
              id="city"
              required
            />
          </Form.Group>
          <button type="submit">Next</button>
        </Form>

        <ul id="progressbar">
          <li className="hide">
            <img src="./images/logo.png" alt="" width="30px"></img>
          </li>
          <li className="hide">
            <img src="./images/logo.png" alt="" width="30px"></img>
          </li>
          <li className="hide">
            <img src="./images/logo.png" alt="" width="30px"></img>
          </li>
          <li className="hide">
            <img src="./images/logo.png" alt="" width="30px"></img>
          </li>
          <li>
            <img src="./images/logo.png" alt="" width="30px"></img>
          </li>
        </ul>
      </div>
    );
  }
}
