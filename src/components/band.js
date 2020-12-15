import React from "react";

export default function band(props) {
  return (
    <div className="band mb-3">
      <div className="band-text band-highlight ">showing results</div>
      <div className="band-text-1 band-flex ">
        {props.name}: <p> ALL</p>
      </div>
      <div className="band-text-1 band-flex">
        {props.location}: <p> ALL</p>
      </div>
      <div className="band-text-1">
        {props.status}: <p> ALL</p>
      </div>
      {/* <div className="band-search-div band-flex">
        <input type="text" className="band-search" placeholder="Search" />
      </div> */}
    </div>
  );
}
