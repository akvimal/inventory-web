import React, { useEffect, useState } from "react";
import Table from "../components/table";
import Band from "../components/band";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Route, Switch } from "react-router-dom";
import { Column } from "primereact/column";
import { useDispatch, useSelector } from "react-redux";
import { fetchTable } from "../redux/action";
import { Button } from "primereact/button";

export default function Search() {
  const dispatch = useDispatch();
  const [inputText, setInputText] = useState("");
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
    { name: "Organisation", code: "company" },
    { name: "Device Type", code: "device" },
    { name: "Machine ID", code: "machine" },
  ];

  const listProperties = data.map((e) => {
    return [
      {
        name: e.machine_id,
        code: e.machine_id,
      },
    ];
  });

  // const listProperties = [
  //   { name: "E3:20:DE:D0:01:3A", code: "E3:20:DE:D0:01:3A" },
  //   { name: "D9:EE:F9:2A:87:7C", code: "D9:EE:F9:2A:87:7C" },
  //   { name: "F0:E6:C1:D3:D5:53", code: "F0:E6:C1:D3:D5:53" },
  //   { name: "C4:F7:07:22:F5:4D", code: "C4:F7:07:22:F5:4D" },
  //   { name: "C4:80:F9:BD:C7:7A", code: "C4:80:F9:BD:C7:7A" },
  // ];
  const onTypeChange = (e) => {
    setSelectedType(e.value);
  };

  const onChange = (e) => {
    setList(e.value);
  };
  const onSearchClick = () => {
    const value =
      selectedType.code === "machine"
        ? { machine: list.name }
        : selectedType.code === "device"
        ? { device: inputText }
        : selectedType.code === "company"
        ? { company: inputText }
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
            options={listProperties}
            onChange={onChange}
            optionLabel="name"
            placeholder=""
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
