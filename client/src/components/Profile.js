import React, { Component, Fragment } from "react";
import axios from "axios";

class Profile extends Component {
  state = {
    apartments: [],
    // preferences: {}
  };

  handleClick = event => {
    event.preventDefault();
    console.log(event.target);
    event.target.classList.toggle("active");
    this.props.updateState(event);
    // this.setState({
    //   balcony: !this.state.balcony,
    //   accessible: !this.state.accessible,
    //   park: !this.state.park,
    //   pets: !this.state.pets,
    //   kitchen: !this.state.kitchen
    // });
  };

  componentDidMount() {
    axios.get(`/profile`).then(res => {
      console.log("component did mount", res.data);
      // const { city, size, rooms, bathrooms, features, neighborhoods } = res.data.preferences;
      
      this.setState({
        apartments: [...res.data.contactedFlats],
        // preferences: {
        // city,
        // size,
        // rooms,
        // bathrooms,
        // features,
        // neighborhoods
        // }
      });
    });
  }

  render() {
    console.log(this.props);
// if(!this.state.preferences){return <div></div>}
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
        <h3>Update your preferences:</h3>
        <form onSubmit={this.props.updateUserPreferences}>
          <label htmlFor="city">City</label>
          <input name="city" type="text" onChange={this.props.updateState} value={this.props.city} onChange={this.props.updateState}></input>

          <label htmlFor="size">Size</label>
          <input name="size" type="number" onChange={this.props.updateState} value={this.props.size}></input>

          <label htmlFor="rooms">Rooms</label>
          <input name="rooms" type="number" onChange={this.props.updateState} value={this.props.rooms}></input>

          <label htmlFor="bathrooms">Bathrooms</label>
          <input
            name="bathrooms"
            type="number"
            onChange={this.props.updateState} value={this.props.bathrooms}
          ></input>

<label htmlFor="minPrice">Minimum Price</label>
          <input
            name="minPrice"
            type="number"
            onChange={this.props.updateState} value={this.props.minPrice}
          ></input>
          <label htmlFor="maxPrice">Maximum Price</label>
          <input
            name="maxPrice"
            type="number"
            onChange={this.props.updateState} value={this.props.maxPrice}
          ></input>

          <h4>Areas</h4>
          <button
            onClick={this.handleClick}
            className={ this.props.neighborhoods.includes('friedrichshain') ? ("button active") : ('button')  }
            name="friedrichshain"
          >
            Friedrichshain
          </button>

          <button
            onClick={this.handleClick}
            className={ this.props.neighborhoods.includes('kreuzberg') ? ("button active") : ('button')  }
            name="kreuzberg"
          >
            Kreuzberg
          </button>
          <button
            onClick={this.handleClick}
            className={ this.props.neighborhoods.includes('prenzlauer berg') ? ("button active") : ('button')  }
            name="prenzlauer berg"
          >
            Prenzlauer Berg
          </button>
          <button onClick={this.handleClick} className={ this.props.neighborhoods.includes('mitte') ? ("button active") : ('button')  }name="mitte">
            Mitte
          </button>
          <button
            onClick={this.handleClick}
            className={ this.props.neighborhoods.includes('shoeneberg') ? ("button active") : ('button')  }
            name="shoeneberg"
          >
            Schöneberg
          </button>
          <button
            onClick={this.handleClick}
            className={ this.props.neighborhoods.includes('charlottenburg') ? ("button active") : ('button')  }
            name="charlottenburg"
          >
            Charlottenburg
          </button>
          <br></br>
          <button
            onClick={this.handleClick}
            className={ this.props.neighborhoods.includes('neukoelln') ? ("button active") : ('button')  }
            name="neukoelln"
          >
            Neukölln
          </button>
          <button onClick={this.handleClick} className={ this.props.neighborhoods.includes('wedding') ? ("button active") : ('button')  } name="wedding">
            Wedding
          </button>

          <button
            onClick={this.handleClick}
            className={ this.props.neighborhoods.includes('lichtenberg') ? ("button active") : ('button')  }
            name="lichtenberg"
          >
            Lichtenberg
          </button>
          <button onClick={this.handleClick} className={ this.props.neighborhoods.includes('marzahn') ? ("button active") : ('button')  } name="marzahn">
            Marzahn
          </button>
          <button
            onClick={this.handleClick}
            className={ this.props.neighborhoods.includes('reinickendorf') ? ("button active") : ('button')  }
            name="reinickendorf"
          >
            Reinickendorf
          </button>

          <h4>Features</h4>
          <button
            className={ this.props.features.includes('balcony') ? ("features button active") : ('features button')  }
            name="balcony"
            onClick={this.handleClick}
          >
            Balcony
          </button>
          <button
            className={ this.props.features.includes('parking') ? ("features button active") : ('features button')  }
            name="parking"
            onClick={this.handleClick}
          >
            Parking Spot
          </button>
          <button
            className={ this.props.features.includes('wheelchairfriendly') ? ("features button active") : ('features button')  }
            name="wheelchairfriendly"
            onClick={this.handleClick}
          >
            Wheelchair accessible
          </button>
          <button
            className={ this.props.features.includes('pets') ? ("features button active") : ('features button')  }
            name="pets"
            onClick={this.handleClick}
          >
            Pets allowed
          </button>
          <button
            className={ this.props.features.includes('fitted_kitchen') ? ("features button active") : ('features button')  }
            name="fitted_kitchen"
            onClick={this.handleClick}
          >
            Fitted kitchen
          </button>
          <br></br>
          <button
            className={ this.props.features.includes('fireplace') ? ("features button active") : ('features button')  }
            name="fireplace"
            onClick={this.handleClick}
          >
            Fireplace
          </button>
          <button
            className={ this.props.features.includes('furnished') ? ("features button active") : ('features button')  }
            name="furnished"
            onClick={this.handleClick}
          >
            Furnished
          </button>
          <button
            className={ this.props.features.includes('elevator') ? ("features button active") : ('features button')  }
            name="elevator"
            onClick={this.handleClick}
          >
            Elevator
          </button>
<br/>
          <button type='submit' className='button submit'>Save Changes</button>
        </form>
      </>
    );
  }
}

export default Profile;
