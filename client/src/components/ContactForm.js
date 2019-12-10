import React, { Component } from "react";
import { Alert, Form, Button, Col } from "react-bootstrap";

export default class ContactForm extends Component {
  handleChange = event => {
    console.log("handlechange");
    this.props.updateState(event);
  };

  handleSubmit = e => {
    console.log("handlesubmit");
    e.preventDefault();
    this.props.finalSubmit();
    return this.props.history.push("/finalSubmit");
  };

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
        <h3>Contact Form</h3>
        <Form onSubmit={this.handleSubmit}>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                onChange={this.handleChange}
                name="firstName"
                type="text"
                placeholder="First Name"
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                onChange={this.handleChange}
                name="lastName"
                type="text"
                placeholder="Last Name"
              />
            </Form.Group>
          </Form.Row>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              onChange={this.handleChange}
              name="phoneNumber"
              type="text"
              placeholder="Enter phone"
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onChange={this.handleChange}
              name="emailAddress"
              type="email"
              placeholder="Enter email"
            />
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Example textarea</Form.Label>
            <Form.Control
              onChange={this.handleChange}
              name="message"
              as="textarea"
              rows="3"
              placeholder="Hello, I am interested in your apartment..."
            />
          </Form.Group>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label>Street</Form.Label>
              <Form.Control
                name="street"
                onChange={this.handleChange}
                placeholder="1234 Main St"
              />
            </Form.Group>

            <Form.Group controlId="formGridAddress2">
              <Form.Label>Number</Form.Label>
              <Form.Control name="houseNumber" placeholder="123" />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label>Zip</Form.Label>
              <Form.Control
                onChange={this.handleChange}
                name="postcode"
                placeholder="12345"
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                name="city"
                placeholder="Berlin"
                onChange={this.handleChange}
              />
            </Form.Group>
          </Form.Row>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}
