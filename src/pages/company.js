import React, { useEffect, useState } from "react";
import DataCard from "../components/DataCard";
import Table from "../components/table";
import Band from "../components/band";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataCard } from "../redux/action";
import { Route, Switch, useHistory } from "react-router-dom";
import { fetchTable } from "../redux/table/action";
import _ from "lodash";

export default function Company() {
  const [cname, setCname] = useState(null);
  const [clocation, setClocation] = useState(null);
  const [cstatus, setCstatus] = useState(null);
  const deviceClick = (e) => {
    return (
      setCname(e.data.device_name),
      setClocation(e.data.location),
      setCstatus(e.data.status)
    );
  };
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDataCard("dashboard/company/devices"));
  }, [dispatch]);

  const cardData = useSelector((state) => state.dataCard.data);

  useEffect(() => {
    if (_.isEmpty(cardData)) {
      return null
    } else {
      dispatch(
        fetchTable("dashboard/device/status", { company: cardData[0].name })
      );
      history.push(`/company/${cardData[0].name}`);
    }
  }, [cardData]);

  const columns = [
    { field: "location", header: "Location" },
    { field: "device_name", header: "Device Name" },
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
          <DataCard name="company" id="device" url="dashboard/device/status" />
        </div>
      </div>
      <div id="table">
        <div className="mt-3 ml-4 mr-4">
          <Band
            name="Device Name"
            location="location"
            status="status"
            selectedName={cname}
            selectedLocation={clocation}
            selectedStatus={cstatus}
          />
          <Switch>
            <Route
              exact
              path="/company/:companyname"
              render={(props) => (
                <Table
                  {...props}
                  columns={columns}
                  type="single"
                  select={deviceClick}
                />
              )}
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
