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

  handleSubmit = e => {
    e.preventDefault();
    return this.props.history.push("/form6");
  };

  handleClick = event => {
    event.preventDefault();
    // console.log(event.target);
    event.target.classList.toggle("active");
    this.props.updateState(event);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Neighborhoods:</h1>

        <button onClick={this.handleClick} className="button" name="fhain">
          Friedrichshain
        </button>
        <button onClick={this.handleClick} className="button" name="xberg">
          Kreuzberg
        </button>
        <button onClick={this.handleClick} className="button" name="pberg">
          Prenzlauer Berg
        </button>
        <button onClick={this.handleClick} className="button" name="mitte">
          Mitte
        </button>
        <button onClick={this.handleClick} className="button" name="shoneberg">
          Schöneberg
        </button>
        <button
          onClick={this.handleClick}
          className="button"
          name="charlottenberg"
        >
          Charlottenberg
        </button>
        <button onClick={this.handleClick} className="button" name="neuk">
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
          name="marzan"
        >
          Marzan
        </button>
        <button
          onClick={this.handleClick}
          className="extra button hide"
          name="reinickendorf"
        >
          Reinickendorf
        </button>
        <button type="submit">Next</button>
      </form>
    );
  }
}
