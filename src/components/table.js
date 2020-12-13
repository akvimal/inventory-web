import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

export default function Table() {
  const data = [
    {
      name: "company1",
      location: "Beavercreek",
      status: "installed",
      count: 20,
    },
    {
      name: "company2",
      location: "Marengo",
      status: "Available",
      count: 20,
    },
    {
      name: "company3",
      location: "Lorain",
      status: "BioClean",
      count: 20,
    },
  ];

  const columns = [
    { field: "name", header: "Name" },
    { field: "location", header: "Location" },
    { field: "status", header: "Status" },
    { field: "count", header: "Count" },
  ];

  const dynamicColumns = columns.map((col, i) => {
    return <Column key={col.field} field={col.field} header={col.header} />;
  });

  return (
    <>
      <DataTable value={data} header="Header">
        {dynamicColumns}
      </DataTable>
    </>
  );
}
