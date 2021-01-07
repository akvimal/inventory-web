import React from "react";
import Table from "../components/table";
import Band from "../components/band";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Route, Switch } from "react-router-dom";
import { Column } from "primereact/column";
import { useSelector } from "react-redux";

export default function Search() {
  const tableData = useSelector((state) => state.table.data);
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
  // const table = [
  //   {
  //     machine_id: "F4:5A:5C:F8:59:BC",
  //     installation_id: "AU-T0001",
  //     installation_date: "18-09-2020",
  //     location: "Auburn",
  //     uninstallation_date: "18-09-2020",
  //     // name: "company1",
  //     // location: "Beavercreek",
  //     // status: "installed",
  //     // count: 20,
  //     history: [
  //       {
  //         installation_id: 1,
  //         installation_date: "20/10/2020",
  //         location: "Rio De Janeiro",
  //         status: "Installed",
  //         uninstallation_date: "30/10/2020",
  //         company: "Nulla Tempor Odio",
  //       },
  //       {
  //         installation_id: 2,
  //         installation_date: "20/10/2020",
  //         location: "Tokiyo",
  //         status: "Installed",
  //         uninstallation_date: "30/10/2020",
  //         company: "Nulla Tempor Odio",
  //       },
  //       {
  //         installation_id: 3,
  //         installation_date: "20/10/2020",
  //         location: "Manila",
  //         status: "Installed",
  //         uninstallation_date: "30/10/2020",
  //         company: "Nulla Tempor Odio",
  //       },
  //     ],
  //   },
  //   {
  //     machine_id: "B4:5A:5C:F8:59:BC",
  //     installation_id: "AU-T0002",
  //     installation_date: "13-09-2020",
  //     location: "Auburn",
  //     uninstallation_date: "19-09-2020",
  //     // name: "company1",
  //     // location: "Beavercreek",
  //     // status: "installed",
  //     // count: 20,
  //     history: [
  //       {
  //         installation_id: 4,
  //         installation_date: "20/10/2020",
  //         location: "Rio De Janeiro",
  //         status: "Installed",
  //         uninstallation_date: "30/10/2020",
  //         company: "Nulla Tempor Odio",
  //       },
  //       {
  //         installation_id: 5,
  //         installation_date: "20/10/2020",
  //         location: "Tokiyo",
  //         status: "Installed",
  //         uninstallation_date: "30/10/2020",
  //         company: "Nulla Tempor Odio",
  //       },
  //       {
  //         installation_id: 6,
  //         installation_date: "20/10/2020",
  //         location: "Manila",
  //         status: "Installed",
  //         uninstallation_date: "30/10/2020",
  //         company: "Nulla Tempor Odio",
  //       },
  //     ],
  //   },
  //   {
  //     machine_id: "P4:5A:5C:F8:59:BC",
  //     installation_id: "AU-T0003",
  //     installation_date: "18-09-2020",
  //     location: "Auburn",
  //     uninstallation_date: "18-09-2020",
  //     // name: "company1",
  //     // location: "Beavercreek",
  //     // status: "installed",
  //     // count: 20,
  //     history: [
  //       {
  //         installation_id: 7,
  //         installation_date: "20/10/2020",
  //         location: "Rio De Janeiro",
  //         status: "Installed",
  //         uninstallation_date: "30/10/2020",
  //         company: "Nulla Tempor Odio",
  //       },
  //       {
  //         installation_id: 8,
  //         installation_date: "20/10/2020",
  //         location: "Tokiyo",
  //         status: "Installed",
  //         uninstallation_date: "30/10/2020",
  //         company: "Nulla Tempor Odio",
  //       },
  //       {
  //         installation_id: 9,
  //         installation_date: "20/10/2020",
  //         location: "Manila",
  //         status: "Installed",
  //         uninstallation_date: "30/10/2020",
  //         company: "Nulla Tempor Odio",
  //       },
  //     ],
  //   },
  //   {
  //     machine_id: "A4:5A:5C:F8:59:BC",
  //     installation_id: "AU-T0001",
  //     installation_date: "18-09-2020",
  //     location: "Auburn",
  //     uninstallation_date: "18-09-2020",
  //     // name: "company1",
  //     // location: "Beavercreek",
  //     // status: "installed",
  //     // count: 20,
  //     history: [
  //       {
  //         installation_id: 10,
  //         installation_date: "20/10/2020",
  //         location: "Rio De Janeiro",
  //         status: "Installed",
  //         uninstallation_date: "30/10/2020",
  //         company: "Nulla Tempor Odio",
  //       },
  //       {
  //         installation_id: 11,
  //         installation_date: "20/10/2020",
  //         location: "Tokiyo",
  //         status: "Installed",
  //         uninstallation_date: "30/10/2020",
  //         company: "Nulla Tempor Odio",
  //       },
  //       {
  //         installation_id: 12,
  //         installation_date: "20/10/2020",
  //         location: "Manila",
  //         status: "Installed",
  //         uninstallation_date: "30/10/2020",
  //         company: "Nulla Tempor Odio",
  //       },
  //     ],
  //   },
  //   {
  //     machine_id: "Q4:5A:5C:F8:59:BC",
  //     installation_id: "AU-T0001",
  //     installation_date: "18-09-2020",
  //     location: "Auburn",
  //     uninstallation_date: "18-09-2020",
  //     // name: "company1",
  //     // location: "Beavercreek",
  //     // status: "installed",
  //     // count: 20,
  //     history: [
  //       {
  //         installation_id: 13,
  //         installation_date: "20/10/2020",
  //         location: "Rio De Janeiro",
  //         status: "Installed",
  //         uninstallation_date: "30/10/2020",
  //         company: "Nulla Tempor Odio",
  //       },
  //       {
  //         installation_id: 14,
  //         installation_date: "20/10/2020",
  //         location: "Tokiyo",
  //         status: "Installed",
  //         uninstallation_date: "30/10/2020",
  //         company: "Nulla Tempor Odio",
  //       },
  //       {
  //         installation_id: 15,
  //         installation_date: "20/10/2020",
  //         location: "Manila",
  //         status: "Installed",
  //         uninstallation_date: "30/10/2020",
  //         company: "Nulla Tempor Odio",
  //       },
  //     ],
  //   },
  // ];
  const expander = <Column expander style={{ width: "3em" }} />;
  return (
    <>
      <div id="scroll-cards">
        <div className=" search-text mt-3 ml-4 mr-4">
          {" "}
          Search By <br />
          <Dropdown className="dropdown-value" placeholder="Machine ID" />
          <InputText className="input-value" />
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
                  tableData={tableData}
                />
              )}
            />
          </Switch>
        </div>
      </div>
    </>
  );
}
