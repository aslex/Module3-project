import React from "react";
import { Redirect } from "react-router-dom";
import { Alert, Form, Button, Col, ProgressBar } from "react-bootstrap";

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
  // IF User has already filled out this form -> check user object
  // redirect to profile
  componentDidMount = () => {
    console.log(this.props);
    const { user } = this.props;
    if (user.preferences.city) {
      this.props.history.push("/");
    }
  };

  render() {
    return (
      <div className="form-bg">
        <Form onSubmit={this.handleSubmit}>
          <h3>Select your city</h3>
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
          <Button className="mb-1" variant="info" type="submit">
            Next
          </Button>
        </Form>
        <ProgressBar now={20} variant="info" className="mt-3" />
      </div>
    );
  }
}
