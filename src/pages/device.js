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
    dispatch(fetchDataCard("dashboard/device/inventory"));
    dispatch(fetchTable("dashboard/company/status", {device:"BaconBit"}))
  }, [dispatch]);

  const data = useSelector((state) =>state.table.data)

 const columns= [
    { field: "name", header: "Name" },
    { field: "location", header: "Location" },
    { field: "status", header: "Status" },
    { field: "count", header: "Count" },
  ]

  const columns1= [
    { field: "machineid", header: "machineid" },
    { field: "instqllationid", header: "instqllationid" },
    { field: "uninstallationdate", header: "uninstallationdate" },
    { field: "status", header: "status" },
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
          <Route exact path="/device" render={props=><Table {...props} columns={columns}/>} />
          <Route path="/device/innertable" render={props=><Table {...props}columns={columns1}/>} />
        </Switch>
        </div>
      </div>
    </>
  );
}
