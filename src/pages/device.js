import React, { useEffect } from "react";
import DataCard from "../components/DataCard";
import Table from "../components/table";
import Band from "../components/band";
import { useDispatch } from "react-redux";
import { fetchDataCard } from "../redux/action";
import { Route, Switch,  } from "react-router-dom";

export default function Device() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDataCard("device"));
  }, [dispatch]);


  return (
    <>
      <div id="scroll-cards">
        <div className="mt-3 ml-4 mr-4">
          <DataCard name="device" />
        </div>
      </div>
      <div id="table">
        <div className=" mt-3 ml-4 mr-4">
          <Band name="Company Name" location="location" status="status" />
          <Switch>
          <Route path="/device" component={Table} />
        </Switch>
        </div>
      </div>
    </>
  );
}
