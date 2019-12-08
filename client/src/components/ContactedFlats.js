import React from "react";

const ContactedFlats = props => {
  return (
    <div>
      <img src={props.flatData.imageURL} alt="flat" width="300px" />
      <p>Price: {props.flatData.prize}</p>
      <p>Size: {props.flatData.size}</p>
    </div>
  );
};

export default ContactedFlats;
