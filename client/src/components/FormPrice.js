import React, { Component } from "react";

export default class FormPrice extends Component {
    state={
        minPrice: 0,
        maxPrice: 0
    }
  render() {
    return (
   
      
        <form>
          <h1>FORM 3</h1>
          <h1>Rent:</h1>
          <label htmlFor="minPrice">min: </label>
          <input type="number" step='50' id="minPrice" name="minPrice" min="0" max="3000+" />
          <label htmlFor="maxPrice">max: </label>
          <input type="number" step='50' id="maxPrice" name="maxPrice" min={this.state.minPrice} ></input>
        </form>
     
    );
  }
}
