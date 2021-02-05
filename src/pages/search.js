import React, { useEffect, useState } from "react";
import Table from "../components/table";
import Band from "../components/band";
import { Dropdown } from "primereact/dropdown";
import { Route, Switch } from "react-router-dom";
import { Column } from "primereact/column";
import { useDispatch, useSelector } from "react-redux";
import { fetchTable } from "../redux/action";
import { Button } from "primereact/button";
import getUnique from "../pages/utils/removeDuplicates";

export default function Search(props) {
  const dispatch = useDispatch();
  const [selectedType, setSelectedType] = useState({});
  const [list, setList] = useState("");
  const data = useSelector((state) => state.table.data);
  const innerTableData = useSelector((state) => state.table.data2);

  const columns = [
    { field: "machine_id", header: "Machine Id" },
    { field: "installation_id", header: "Installation ID" },
    { field: "installation_date", header: "Installation Date" },
    { field: "location", header: "Location" },
    { field: "uninstallation_date", header: "Uninstallation Date" },
  ];

  const columns2 = [
    { field: "installed_id", header: "Installation ID" },
    { field: "installed_date", header: "Installation Date" },
    { field: "location", header: "Location" },
    { field: "status", header: "Status" },
    { field: "uninstallation_date", header: "Uninstallation Date" },
    { field: "name", header: "Company" },
  ];

  const columns3 = [
    { field: "model", header: "Model" },
    { field: "manufacturer", header: "Manufacturer" },
    { field: "hardware_version", header: "Hardware Version" },
    { field: "commision_date", header: "Commission Date" },
    { field: "decommision_date", header: "Decommission Date" },
    { field: "cycle", header: "Cycle" },
  ];

  const properties = [
    { name: "Machine ID", code: "machine" },
    { name: "Device Type", code: "device" },
    { name: "Organisation", code: "company" },
  ];

  const uniqueDevice = getUnique(data, "device_name");

  const uniqueOrganisation = getUnique(data, "organization");

  const uniqueMachine = getUnique(data, "machine_id");

  const deviceName = uniqueDevice.map((d) => {
    return d.device_name;
  });

  const orgName = uniqueOrganisation.map((o) => {
    return o.organization;
  });

  const machineId = uniqueMachine.map((m) => {
    return m.machine_id;
  });

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
      : null;

  const onSearchClick = () => {
    const value =
      selectedType.code === "machine"
        ? { machine: list.name }
        : selectedType.code === "device"
        ? { device: list.name }
        : selectedType.code === "company"
        ? { company: list.name }
        : null;
    dispatch(fetchTable("dashboard/device/location", value, [dispatch]));
  };

  useEffect(() => {
    dispatch(fetchTable("dashboard/device/location"));
  }, [dispatch]);

  const expander = <Column expander style={{ width: "3em" }} />;

  return (
    <>
      <div id="scroll-cards">
        <div className=" search-text mt-3 ml-4 mr-4">
          {" "}
          Search By <br />
          <Dropdown
            value={selectedType}
            options={properties}
            onChange={onTypeChange}
            optionLabel="name"
            placeholder="Search"
          />
          {/* <InputText
            className="input-value"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          /> */}
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
          <Band name="Company Name" location="location" status="status" />
          <Switch>
            <Route
              path="/search"
              render={(props) => (
                <Table
                  {...props}
                  columns={columns}
                  columns2={columns2}
                  columns3={columns3}
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
