import React, { Component, Fragment } from "react";
import axios from "axios";

class Profile extends Component {
  state = {
    apartments: []
  };

  componentDidMount() {
    axios.get(`/profile`).then(res => {
      console.log("component did mount", res.data);

      this.setState({
        apartments: [...res.data.contactedFlats]
      });
    });
  }

  render() {
    console.log(this.props.features);

    const mappedApts = this.state.apartments.map(el => {
      return (
        <div className="flat col-4" key={el._id}>
          <img className="row-2" src={el.imageURL} alt="flat" />
          <div className="info row-4">
            <p>Price: {el.price}</p>
            <p>Size: {el.size}sqm</p>
            <p>Rooms: {el.rooms}</p>
            <a href={el.exposeURL} target="_blank">
              <p>view listing</p>
            </a>
          </div>
        </div>
      );
    });
    return (
      <>
        <h1>Welcome {this.props.user.username}</h1>
        {mappedApts}
        <h3>Reset your preferences:</h3>
        <form onChange={this.props.updateState}>
          <label htmlFor="city">City</label>
          <input name="city" type="text" value={this.props.city}></input>

          <label htmlFor="size">Size</label>
          <input name="size" type="number" value={this.props.size}></input>

          <label htmlFor="rooms">Rooms</label>
          <input name="rooms" type="number" value={this.props.rooms}></input>

          <label htmlFor="bathrooms">Bathrooms</label>
          <input
            name="bathrooms"
            type="number"
            value={this.props.bathrooms}
          ></input>

          <h4>Areas</h4>
          <button
            onClick={this.props.updateButtonState}
            className="button"
            name="friedrichshain"
          >
            Friedrichshain
          </button>
          <button
            onClick={this.props.updateButtonState}
            className="button"
            name="kreuzberg"
          >
            Kreuzberg
          </button>
          <button
            onClick={this.props.updateButtonState}
            className="button"
            name="prenzlauer berg"
          >
            Prenzlauer Berg
          </button>
          <button
            onClick={this.props.updateButtonState}
            className="button"
            name="mitte"
          >
            Mitte
          </button>
          <button
            onClick={this.props.updateButtonState}
            className="button"
            name="shoeneberg"
          >
            Schöneberg
          </button>
          <button
            onClick={this.props.updateButtonState}
            className="button"
            name="charlottenburg"
          >
            Charlottenburg
          </button>
          <br></br>
          <button
            onClick={this.props.updateButtonState}
            className="button"
            name="neukoelln"
          >
            Neukölln
          </button>
          <button
            onClick={this.props.updateButtonState}
            className="button"
            name="wedding"
          >
            Wedding
          </button>

          <button
            onClick={this.props.updateButtonState}
            className="button"
            name="lichtenberg"
          >
            Lichtenberg
          </button>
          <button
            onClick={this.props.updateButtonState}
            className="button"
            name="marzahn"
          >
            Marzahn
          </button>
          <button
            onClick={this.props.updateButtonState}
            className="button"
            name="reinickendorf"
          >
            Reinickendorf
          </button>

          <h4>Features</h4>
          <button
            className="features button"
            name="balcony"
            onClick={this.props.updateButtonState}
          >
            Balcony
          </button>
          <button
            className="features button"
            name="parking"
            onClick={this.props.updateButtonState}
          >
            Parking Spot
          </button>
          <button
            className="features button"
            name="wheelchairfriendly"
            onClick={this.handleClick}
          >
            Wheelchair accessible
          </button>
          <button
            className="features button"
            name="pets"
            onClick={this.handleClick}
          >
            Pets allowed
          </button>
          <button
            className="features button"
            name="fitted_kitchen"
            onClick={this.handleClick}
          >
            Fitted kitchen
          </button>
          <br></br>
          <button
            className="features button"
            name="fireplace"
            onClick={this.handleClick}
          >
            Fireplace
          </button>
          <button
            className="features button"
            name="furnished"
            onClick={this.handleClick}
          >
            Furnished
          </button>
          <button
            className="features button"
            name="elevator"
            onClick={this.handleClick}
          >
            Elevator
          </button>
        </form>
      </>
    );
  }
}

export default Profile;
