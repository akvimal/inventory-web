import React, { useEffect } from "react";
import DataCard from "../components/DataCard";
import Table from "../components/table";
import Band from "../components/band";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataCard } from "../redux/action";
import { Route, Switch,  } from "react-router-dom";
import { fetchTable } from "../redux/action"

export default function Device() {

   const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDataCard("device"));
    dispatch(fetchTable("company","BaconBit"))
  }, [dispatch]);

  const data = useSelector((state) =>state.table.data)

 const columns= [
    { field: "name", header: "Name" },
    { field: "location", header: "Location" },
    { field: "status", header: "Status" },
    { field: "count", header: "Count" },
  ]

  return (
    <>
      <div id="scroll-cards">
        <div className="mt-3 ml-4 mr-4">
          <DataCard name="device" id="company" />
        </div>
      </div>
      <div id="table">
        <div className=" mt-3 ml-4 mr-4">
          <Band name="Company Name" location="location" status="status" />
          <Switch>
          <Route path="/device" render={props=><Table {...props} columns={columns}/>} />
        </Switch>
        </div>
      </div>
    </>
  );
}
