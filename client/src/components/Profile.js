import React, { Component, Fragment } from "react";
import axios from "axios";

export class Profile extends Component {
  state = {
    apartments: []
  };

  componentDidMount() {
    axios.get(`/profile/${this.props.user._id}`).then(res => {
      console.log("component did mount", res.data);

      this.setState({
        apartments: [...res.data]
      });
    });
  }

  render() {
    if (!this.props.user || this.state.apartments.length == 0) {
      return <div></div>;
    }
    const mappedApts = this.state.apartments.map(el =>{
       return <div className="flat col-4" key={el._id}>
            <img className='row-2' src={el.imageURL} alt='flat' />
            <div className="info row-4">
            <p>Price: {el.price}</p>
            <p>Size: {el.size}sqm</p>
            <p>Rooms: {el.rooms}</p>
            <a href={el.exposeURL} target="_blank"><p>view listing</p></a>
            </div>
        </div>
    })
    return (
      <Fragment>
        <h1>Welcome {this.props.user.username}</h1>
        {mappedApts}
      </Fragment>
    );
  }
}

export default Profile;
