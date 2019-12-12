import React, { Component } from "react";
import { Alert, Form, Button, Col } from "react-bootstrap";

export default class FormPrice extends Component {
  handleChange = event => {
    console.log("handlechange");
    this.props.updateState(event);
  };

  handleSubmit = e => {
    e.preventDefault();
    return this.props.history.push("/form4");
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
          <h3>FORM 3</h3>

          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Min price</Form.Label>
              <Form.Control
                onChange={this.handleChange}
                type="number"
                id="minPrice"
                name="minPrice"
                min="50"
                placeholder="0"
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Max price</Form.Label>
              <Form.Control
                onChange={this.handleChange}
                type="number"
                id="maxPrice"
                name="maxPrice"
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
