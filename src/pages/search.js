import React, { useEffect, useState } from "react";
import Table from "../components/table";
// import Band from "../components/band";
import { Dropdown } from "primereact/dropdown";
import { Route, Switch } from "react-router-dom";
import { Column } from "primereact/column";
import { useDispatch, useSelector } from "react-redux";
import { fetchTable } from "../redux/action";
import { Button } from "primereact/button";
import getUnique from "../pages/utils/removeDuplicates";
import apconfig from "../config/apconfig";

export default function Search(props) {
  const dispatch = useDispatch();
  const [selectedType, setSelectedType] = useState({});
  const [list, setList] = useState("");
  const data = useSelector((state) => state.table.data);

  const [search, setSearch] = useState([]);

  const innerTableData = useSelector((state) => state.table.data2);
  const getTokenFromStorage = () => localStorage.getItem("token");

  useEffect(() => {
    apconfig
      .post(`dashboard/device/location`, null, {
        headers: {
          Accept: "application/json",
          "auth-token": getTokenFromStorage(),
        },
      })
      .then((e) => setSearch(e.data))
      .catch((e) => console.log(e));
  }, []);

  const columns = [
    { field: "machine_id", header: "MACHINE ID", filter: false },
    { field: "installation_id", header: "CUSTOM ID", filter: false },
    {
      field: "installation_date",
      header: "UPDATE DATE",
      filter: false,
    },
    { field: "location", header: "LOCATION", filter: false },
    { field: "version", header: "VERSION" },
    { field: "cycle", header: "CYCLE" },
  ];

  const columns2 = [
    { field: "installed_id", header: " CUSTOM ID" },
    { field: "installed_date", header: "UPDATE DATE" },
    { field: "name", header: "COMPANY" },
    { field: "location", header: "LOCATION" },
    { field: "status", header: "STATUS" },
    { field: "version", header: "VERSION" },
    { field: "comments", header: "COMMENTS" },
  ];

  const properties = [
    { name: "Machine ID", code: "machine" },
    { name: "Device Type", code: "device" },
    { name: "Organisation", code: "company" },
    { name: "Install ID", code: "install_id" },
  ];

  const uniqueDevice = getUnique(search, "device_name");

  const uniqueOrganisation = getUnique(search, "organization");

  const uniqueMachine = getUnique(search, "machine_id");

  const uniqueInstallId = getUnique(search, "installation_id");

  const deviceName = uniqueDevice.map((d) => {
    return d.device_name;
  });

  const orgName = uniqueOrganisation.map((o) => {
    return o.organization;
  });

  const machineId = uniqueMachine.map((m) => {
    return m.machine_id;
  });

  const installId = uniqueInstallId.map((i) => i.installation_id);

  const machineOps = machineId.map((machineId) => ({
    name: machineId,
    code: machineId,
  }));

  const organisationOps = orgName.map((orgName) => ({
    name: orgName,
    code: orgName,
  }));

  const deviceOps = deviceName.map((device) => ({
    name: device,
    code: device,
  }));

  const installOps = installId.map((i) => ({
    name: i,
    code: i,
  }));

  const onTypeChange = (e) => {
    setSelectedType(e.value);
  };

  const onChange = (e) => {
    setList(e.value);
  };

  const options =
    selectedType.code === "machine"
      ? machineOps
      : selectedType.code === "company"
      ? organisationOps
      : selectedType.code === "device"
      ? deviceOps
      : selectedType.code === "install_id"
      ? installOps
      : null;
  const onSearchClick = () => {
    const value =
      selectedType.code === "machine"
        ? { machine: list.name }
        : selectedType.code === "device"
        ? { device: list.name }
        : selectedType.code === "company"
        ? { company: list.name }
        : selectedType.code === "install_id"
        ? { install_id: list.name}
        : null;
    dispatch(
      fetchTable(
        "dashboard/device/location",
        value,
        {
          headers: {
            Accept: "application/json",
            "auth-token": getTokenFromStorage(),
          },
        }, [dispatch]
      )
    );
  };

  useEffect(() => {
    dispatch(
      fetchTable("dashboard/device/location", null, {
        headers: {
          Accept: "application/json",
          "auth-token": getTokenFromStorage(),
        },
      })
    );
  }, [dispatch]);

  const expander = <Column expander style={{ width: "3em" }} />;

  return (
    <>
      <div id="scroll-cards">
        <p className="title ml-4 ">SEARCH</p>
        <hr className="search-divider-line ml-4 mr-4" />
        <div className=" search-text mt-4 ml-4 mr-4">
          {" "}
          Search By <br />
          <Dropdown
            value={selectedType}
            options={properties}
            onChange={onTypeChange}
            optionLabel="name"
            placeholder="Search"
          />
          <Dropdown
            value={list}
            options={options}
            onChange={onChange}
            optionLabel="name"
            placeholder="Search"
            filter={true}
          />
          <Button
            label="Search"
            className="p-button-info"
            onClick={onSearchClick}
          />
        </div>
      </div>
      <div id="table">
        <div className=" mt-3 ml-4 mr-4">
          {/* <Band name="Company Name" location="location" status="status" /> */}
          <Switch>
            <Route
              path="/search"
              render={(props) => (
                <Table
                  {...props}
                  columns={columns}
                  columns2={columns2}
                  // columns3={columns3}
                  rowExpander={expander}
                  tableData={data}
                  row={innerTableData}
                />
              )}
            />
          </Switch>
        </div>
      </div>
    </>
  );
}
