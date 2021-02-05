import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchTable } from "../redux/action";

export default function Band(props) {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleRoute = (e) => {
    dispatch(fetchTable(props.url, props.id));
    history.goBack();
  };

  return (
    <div className="band mb-3">
      <div className="band-text band-highlight ">showing results</div>
      <div className="band-text-1 band-flex ">
        {props.name}:<p> &nbsp; {props.selectedName} </p>
      </div>
      <div className="band-text-1 band-flex">
        {props.location}:<p> &nbsp; {props.selectedLocation}</p>
      </div>
      <div className="band-text-1 band-flex">
        {props.status}:<p> &nbsp; {props.selectedStatus}</p>
      </div>

      <button onClick={(e) => handleRoute(e)}>Back</button>
    </div>
  );
}
