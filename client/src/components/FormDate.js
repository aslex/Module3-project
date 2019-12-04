import React from "react";

export default function FormCity(props) {
  return (
    <form>
      <label></label>
      <input></input>
      <button className="hide" onSubmit={props.navigateNext()}></button>
    </form>
  );
}
