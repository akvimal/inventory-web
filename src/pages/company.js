import React, { useEffect } from "react";
import DataCard from "../components/DataCard";
import Table from "../components/table";
import Band from "../components/band";
import { useDispatch } from "react-redux";
import { fetchDataCard } from "../redux/action";
import { Route, Switch } from "react-router-dom";
import { fetchTable } from "../redux/table/action";

export default function Company() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDataCard("dashboard/company/devices"));
    dispatch(fetchTable("dashboard/device/status",{company:"AUBURN UNIVERSITY"}))
  }, [dispatch]);

  const columns= [
    { field: "location", header: "Location" },
    { field: "device_name", header: "Device Name" },
    { field: "status", header: "Status" },
    { field: "count", header: "Count" },
  ]


  return (
    <>
      <div id="scroll-cards">
        <div className="mt-3 ml-4 mr-4">
          <DataCard name="company" id="device" />
        </div>
      </div>
      <div id="table">
        <div className="mt-3 ml-4 mr-4">
          <Band name="Company Name" location="location" status="status" />
          <Switch>
          <Route path="/company" render={props=><Table {...props} columns={columns}/>} />
        </Switch>
        </div>
      </div>
    </>
  );
}
