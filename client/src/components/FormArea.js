import React, { Component } from "react";

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
      <div>
        <form onSubmit={this.handleSubmit}>
          <h1>Neighborhoods:</h1>

          <button
            onClick={this.handleClick}
            className="button"
            name="friedrichshain"
          >
            Friedrichshain
          </button>
          <button
            onClick={this.handleClick}
            className="button"
            name="kreuzberg"
          >
            Kreuzberg
          </button>
          <button
            onClick={this.handleClick}
            className="button"
            name="prenzlauer berg"
          >
            Prenzlauer Berg
          </button>
          <button onClick={this.handleClick} className="button" name="mitte">
            Mitte
          </button>
          <button
            onClick={this.handleClick}
            className="button"
            name="shoeneberg"
          >
            Schöneberg
          </button>
          <button
            onClick={this.handleClick}
            className="button"
            name="charlottenburg"
          >
            Charlottenburg
          </button>
          <button
            onClick={this.handleClick}
            className="button"
            name="neukoelln"
          >
            Neukölln
          </button>
          <button onClick={this.handleClick} className="button" name="wedding">
            Wedding
          </button>
          <br />
          <button onClick={this.loadMore} className="button" name="loadMore">
            ...
          </button>
          <button
            onClick={this.handleClick}
            className="extra button hide"
            name="lichtenberg"
          >
            Lichtenberg
          </button>
          <button
            onClick={this.handleClick}
            className="extra button hide"
            name="marzahn"
          >
            Marzahn
          </button>
          <button
            onClick={this.handleClick}
            className="extra button hide"
            name="reinickendorf"
          >
            Reinickendorf
          </button>
          <button type="submit">Next</button>
          <button onClick={this.props.history.goBack}>Back</button>
        </form>
        <ul id="progressbar">
          <li>
            <img src="./images/logo.png" alt="" width="30px"></img>
          </li>
          <li>
            <img src="./images/logo.png" alt="" width="30px"></img>
          </li>
          <li>
            <img src="./images/logo.png" alt="" width="30px"></img>
          </li>
          <li>
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
