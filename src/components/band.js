import React from "react";

export default function band(props) {
  return (
    <div className="band mb-3">
      <div className="band-text band-highlight ">showing results</div>
      <div className="band-text-1 band-flex ">
        {props.name}:{" "}
        <p> &nbsp; {props.selectedName ? props.selectedName : "All"} </p>
      </div>
      <div className="band-text-1 band-flex">
        {props.location}:{" "}
        <p> &nbsp; {props.selectedLocation ? props.selectedLocation : "All"}</p>
      </div>
      <div className="band-text-1">
        {props.status}:{" "}
        <p> &nbsp; {props.selectedStatus ? props.selectedStatus : "All"}</p>
      </div>
    </div>
  );
}
