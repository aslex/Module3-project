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
    console.log(this.props.user);

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
      <Fragment>
        <h1>Welcome {this.props.user.username}</h1>
        {mappedApts}
      </Fragment>
    );
  }
}

export default Profile;
