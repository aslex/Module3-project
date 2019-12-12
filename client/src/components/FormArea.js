import React, { Component } from "react";
import { Alert, Form, Button, Col } from "react-bootstrap";

export default class FormArea extends Component {
  loadMore = e => {
    e.preventDefault();
    const buttons = document.querySelectorAll(".extra");
    console.log(buttons);
    buttons.forEach(el => {
      el.classList.toggle("hide");
    });
  };

  // handleSubmit = e => {
  //   e.preventDefault();
  //   return this.props.history.push("/form6");
  // };

  handleSubmit = e => {
    console.log("handlesubmit");
    e.preventDefault();
    return this.props.history.push("/form6");
  };

  handleClick = event => {
    event.preventDefault();
    // console.log(event.target);
    event.target.classList.toggle("active");
    this.props.updateState(event);
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
        <form onSubmit={this.handleSubmit}>
          <h3>Select your preferred neighborhoods:</h3>

          <button
            onClick={this.handleClick}
            className="features-button"
            name="friedrichshain"
          >
            Friedrichshain
          </button>
          <button
            onClick={this.handleClick}
            className="features-button"
            name="kreuzberg"
          >
            Kreuzberg
          </button>
          <button
            onClick={this.handleClick}
            className="features-button"
            name="prenzlauer berg"
          >
            Prenzlauer Berg
          </button>
          <button
            onClick={this.handleClick}
            className="features-button"
            name="mitte"
          >
            Mitte
          </button>
          <button
            onClick={this.handleClick}
            className="features-button"
            name="shoeneberg"
          >
            Schöneberg
          </button>
          <button
            onClick={this.handleClick}
            className="features-button"
            name="charlottenburg"
          >
            Charlottenburg
          </button>
          <button
            onClick={this.handleClick}
            className="features-button"
            name="neukoelln"
          >
            Neukölln
          </button>
          <button
            onClick={this.handleClick}
            className="features-button"
            name="wedding"
          >
            Wedding
          </button>
          <br />
          <Button
            onClick={this.loadMore}
            className="mb-1"
            variant="outline-info"
            name="loadMore"
          >
            ...
          </Button>
          <br></br>
          <button
            onClick={this.handleClick}
            className="extra button hide features-button"
            name="lichtenberg"
          >
            Lichtenberg
          </button>
          <button
            onClick={this.handleClick}
            className="extra button hide features-button"
            name="marzahn"
          >
            Marzahn
          </button>
          <button
            onClick={this.handleClick}
            className="extra button hide features-button"
            name="reinickendorf"
          >
            Reinickendorf
          </button>
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
        </form>
      </div>
    );
  }
}
