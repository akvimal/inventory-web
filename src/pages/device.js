import React, { useEffect } from "react";
import DataCard from "../components/DataCard";
import Table from "../components/table";
import Band from "../components/band";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataCard } from "../redux/action";
import { Route, Switch, useHistory } from "react-router-dom";
import { fetchTable } from "../redux/action";
import _ from "lodash"

export default function Device() {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchDataCard("dashboard/device/inventory"));
  }, [dispatch]);

  const data = useSelector((state) => state.table.data);
  const cardData = useSelector((state) => state.dataCard.data);

  useEffect(() => {
    if (_.isEmpty(cardData)) {
      
    } else {
      dispatch(fetchTable("dashboard/company/status",{device:cardData[0].name}))
      history.push(`/device/${cardData[0].name}`)
    }
  
  }, [cardData])

  const columns = [
    { field: "name", header: "Name" },
    { field: "location", header: "Location" },
    { field: "status", header: "Status" },
    { field: "count", header: "Count" },
  ];

  const columns1 = [
    { field: "machine_id", header: "Machine Id" },
    { field: "installation_id", header: "Installation Id" },
    { field: "installation_date", header: "Uninstallation Date" },
    { field: "location", header: "Location" },
    { field: "uninstallation_date", header: "Uninstallation Date" },
  ];

  return (
    <>
      <div id="scroll-cards">
        <div className="mt-3 ml-4 mr-4">
          <DataCard name="device" id="company" url="dashboard/company/status"/>
        </div>
      </div>
      <div id="table">
        <div className=" mt-3 ml-4 mr-4">
          <Band name="Company Name" location="location" status="status" />
          <Switch>
            <Route
              exact
              path="/device/:BaconBit"
              render={(props) => <Table {...props}  columns={columns} />}
            />
            <Route
              path="/:device/:innertable"
              render={(props) => <Table {...props} columns={columns1} />}
            />
          </Switch>
        </div>
      </div>
    </>
  );
}
