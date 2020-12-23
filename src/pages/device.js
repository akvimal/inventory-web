import React, { useEffect } from "react";
import DataCard from "../components/DataCard";
import Table from "../components/table";
import Band from "../components/band";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataCard } from "../redux/action";
import { Route, Switch, useHistory } from "react-router-dom";
import { fetchTable } from "../redux/action";
import _ from "lodash";
import { useState } from "react";
import { Dropdown } from "primereact/dropdown";

export default function Device() {
  const [dname, setDname] = useState(null);
  const [dlocation, setDlocation] = useState(null);
  const [dstatus, setDstatus] = useState(null);

  const rowClick = (e) => {
    return (
      setDname(e.data.name),
      setDlocation(e.data.location),
      setDstatus(e.data.status)
    );
  };
  // console.log(cname, clocation, cstatus);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchDataCard("dashboard/device/inventory"));
  }, [dispatch]);

  const data = useSelector((state) => state.table.data);
  const cardData = useSelector((state) => state.dataCard.data);

  const getUnique = (arr, comp) => {
    const unique = arr
      .map((e) => e[comp])
      .map((e, i, final) => final.indexOf(e) === i && i)
      .filter((e) => arr[e])
      .map((e) => arr[e]);
    return unique;
  };

  const uniqueName = getUnique(data, "name");
  const uniqueLoc = getUnique(data, "location");
  const uniqueStatus = getUnique(data, "status");

  useEffect(() => {
    if (_.isEmpty(cardData)) {
    } else {
      dispatch(
        fetchTable("dashboard/company/status", { device: cardData[0].name })
      );
      history.push(`/device/${cardData[0].name}`);
    }
  }, [cardData]);

  const [item, setItem] = useState(null);

  const name = uniqueName.map((a) => {
    return a.name;
  });

  const location = uniqueLoc.map((loc) => {
    return loc.location;
  });

  const status = uniqueStatus.map((status) => {
    return status.status;
  });

  const count = data.map((count) => {
    return count.count;
  });

  // const statusItemTemplate = (option) => {
  //   return <span className={`customer-badge status-${option}`}>{option}</span>;
  // };
  const nameFilter = (
    <Dropdown
      value={item}
      options={name}
      onChange={(e) => setItem(e.value)}
      // itemTemplate={statusItemTemplate}
      placeholder="search"
      className="p-column-filter"
      showClear
    />
  );
  const locationFilter = (
    <Dropdown
      value={item}
      options={location}
      onChange={(e) => setItem(e.value)}
      // itemTemplate={statusItemTemplate}
      placeholder="search"
      className="p-column-filter"
      showClear
    />
  );
  const statusFilter = (
    <Dropdown
      value={item}
      options={status}
      onChange={(e) => setItem(e.value)}
      // itemTemplate={statusItemTemplate}
      placeholder="search"
      className="p-column-filter"
      showClear
    />
  );
  const countFilter = (
    <Dropdown
      value={item}
      options={count}
      onChange={(e) => setItem(e.value)}
      // itemTemplate={statusItemTemplate}
      placeholder="search"
      className="p-column-filter"
      showClear
    />
  );

  const columns = [
    { field: "name", header: "Name", filterElement: nameFilter },
    { field: "location", header: "Location", filterElement: locationFilter },
    { field: "status", header: "Status", filterElement: statusFilter },
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
          <DataCard name="device" id="company" url="dashboard/company/status" />
        </div>
      </div>
      <div id="table">
        <div className=" mt-3 ml-4 mr-4">
          <Band
            name="Company Name"
            location="location"
            status="status"
            selectedName={dname}
            selectedLocation={dlocation}
            selectedStatus={dstatus}
          />
          <Switch>
            <Route
              exact
              path="/device/:BaconBit"
              render={(props) => (
                <Table
                  {...props}
                  columns={columns}
                  type="single"
                  select={rowClick}
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
