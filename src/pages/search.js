import React from "react";
import Table from "../components/table";
import Band from "../components/band";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Route, Switch } from "react-router-dom";

export default function search() {
  const columns = [
    { field: "machine_id", header: "Machine Id" },
    { field: "installation_id", header: "Installation ID" },
    { field: "installation_date", header: "Installation Date" },
    { field: "location", header: "Location" },
    { field: "uninstallation_date", header: "Uninstallation Date" },
  ];
  const columns2 = [];
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
                <Table {...props} columns={columns} columns2={columns2} />
              )}
            />
          </Switch>
        </div>
      </div>
    </>
  );
}
