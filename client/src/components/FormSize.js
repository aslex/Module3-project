import React, { Component } from "react";
import { Alert, Form, Button, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";

export default class FormSize extends Component {
  handleChange = event => {
    console.log("handlechange");
    this.props.updateState(event);
  };

  handleSubmit = e => {
    console.log("handlesubmit");
    e.preventDefault();
    return this.props.history.push("/form3");
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
      <div className="form-bg">
        <Form onSubmit={this.handleSubmit}>
          <h3>Size: </h3>
          <Form.Group as={Col}>
            <Form.Label>Total area in sqm</Form.Label>
            <Form.Control
              onChange={this.handleChange}
              type="number"
              id="size"
              name="size"
              min="10"
            />
          </Form.Group>

          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Rooms</Form.Label>
              <Form.Control
                onChange={this.handleChange}
                type="number"
                id="rooms"
                name="rooms"
                min="1"
                step=".5"
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Bathrooms</Form.Label>
              <Form.Control
                onChange={this.handleChange}
                type="number"
                name="bathrooms"
                id="bathrooms"
              />
            </Form.Group>
          </Form.Row>
          <Button className="mb-1" variant="info" type="submit">
            Next
          </Button>
          <br></br>
          <Button
            className="mb-1"
            variant="outline-info"
            onClick={this.props.history.goBack}
          >
            Back
          </Button>
        </Form>
      </div>
    );
  }
}
