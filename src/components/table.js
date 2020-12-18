import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

export default function Table() {
  const data = [
    {
      machine_id: "F4:5A:5C:F8:59:BC",
      installation_id: "AU-T0001",
      installation_date: "18-09-2020",
      location: "Auburn",
      uninstallation_date: "18-09-2020",
      // name: "company1",
      // location: "Beavercreek",
      // status: "installed",
      // count: 20,
      history: [
        {
          installation_id: 1,
          installation_date: "20/10/2020",
          location: "Rio De Janeiro",
          status: "Installed",
          uninstallation_date: "30/10/2020",
          company: "Nulla Tempor Odio",
        },
        {
          installation_id: 2,
          installation_date: "20/10/2020",
          location: "Tokiyo",
          status: "Installed",
          uninstallation_date: "30/10/2020",
          company: "Nulla Tempor Odio",
        },
        {
          installation_id: 3,
          installation_date: "20/10/2020",
          location: "Manila",
          status: "Installed",
          uninstallation_date: "30/10/2020",
          company: "Nulla Tempor Odio",
        },
      ],
    },
    {
      machine_id: "B4:5A:5C:F8:59:BC",
      installation_id: "AU-T0002",
      installation_date: "13-09-2020",
      location: "Auburn",
      uninstallation_date: "19-09-2020",
      // name: "company1",
      // location: "Beavercreek",
      // status: "installed",
      // count: 20,
      history: [
        {
          installation_id: 4,
          installation_date: "20/10/2020",
          location: "Rio De Janeiro",
          status: "Installed",
          uninstallation_date: "30/10/2020",
          company: "Nulla Tempor Odio",
        },
        {
          installation_id: 5,
          installation_date: "20/10/2020",
          location: "Tokiyo",
          status: "Installed",
          uninstallation_date: "30/10/2020",
          company: "Nulla Tempor Odio",
        },
        {
          installation_id: 6,
          installation_date: "20/10/2020",
          location: "Manila",
          status: "Installed",
          uninstallation_date: "30/10/2020",
          company: "Nulla Tempor Odio",
        },
      ],
    },
    {
      machine_id: "P4:5A:5C:F8:59:BC",
      installation_id: "AU-T0003",
      installation_date: "18-09-2020",
      location: "Auburn",
      uninstallation_date: "18-09-2020",
      // name: "company1",
      // location: "Beavercreek",
      // status: "installed",
      // count: 20,
      history: [
        {
          installation_id: 7,
          installation_date: "20/10/2020",
          location: "Rio De Janeiro",
          status: "Installed",
          uninstallation_date: "30/10/2020",
          company: "Nulla Tempor Odio",
        },
        {
          installation_id: 8,
          installation_date: "20/10/2020",
          location: "Tokiyo",
          status: "Installed",
          uninstallation_date: "30/10/2020",
          company: "Nulla Tempor Odio",
        },
        {
          installation_id: 9,
          installation_date: "20/10/2020",
          location: "Manila",
          status: "Installed",
          uninstallation_date: "30/10/2020",
          company: "Nulla Tempor Odio",
        },
      ],
    },
    {
      machine_id: "A4:5A:5C:F8:59:BC",
      installation_id: "AU-T0001",
      installation_date: "18-09-2020",
      location: "Auburn",
      uninstallation_date: "18-09-2020",
      // name: "company1",
      // location: "Beavercreek",
      // status: "installed",
      // count: 20,
      history: [
        {
          installation_id: 10,
          installation_date: "20/10/2020",
          location: "Rio De Janeiro",
          status: "Installed",
          uninstallation_date: "30/10/2020",
          company: "Nulla Tempor Odio",
        },
        {
          installation_id: 11,
          installation_date: "20/10/2020",
          location: "Tokiyo",
          status: "Installed",
          uninstallation_date: "30/10/2020",
          company: "Nulla Tempor Odio",
        },
        {
          installation_id: 12,
          installation_date: "20/10/2020",
          location: "Manila",
          status: "Installed",
          uninstallation_date: "30/10/2020",
          company: "Nulla Tempor Odio",
        },
      ],
    },
    {
      machine_id: "Q4:5A:5C:F8:59:BC",
      installation_id: "AU-T0001",
      installation_date: "18-09-2020",
      location: "Auburn",
      uninstallation_date: "18-09-2020",
      // name: "company1",
      // location: "Beavercreek",
      // status: "installed",
      // count: 20,
      history: [
        {
          installation_id: 13,
          installation_date: "20/10/2020",
          location: "Rio De Janeiro",
          status: "Installed",
          uninstallation_date: "30/10/2020",
          company: "Nulla Tempor Odio",
        },
        {
          installation_id: 14,
          installation_date: "20/10/2020",
          location: "Tokiyo",
          status: "Installed",
          uninstallation_date: "30/10/2020",
          company: "Nulla Tempor Odio",
        },
        {
          installation_id: 15,
          installation_date: "20/10/2020",
          location: "Manila",
          status: "Installed",
          uninstallation_date: "30/10/2020",
          company: "Nulla Tempor Odio",
        },
      ],
    },
  ];

  const information = [
    {
      model: "Model No.",
      manufacturer: "manufacturer",
      hardware_version: "Hardware Version",
      commission_date: "Commission Date",
      decommission_date: "Decommission Date",
      cost: "$900",
    },
  ];

  const [rows, setRows] = useState(null);

  const columns = [
    { field: "machine_id", header: "Machine id" },
    { field: "installation_id", header: "Installation id" },
    { field: "installation_date", header: "Installation date" },
    { field: "location", header: "Location" },
    { field: "uninstallation_date", header: "Uninstallation date" },
  ];

  const dynamicColumns = columns.map((col, i) => {
    return (
      <Column key={col.field} field={col.field} header={col.header}  />
    );
  });

  const columns1 = [
    { field: "installation_id", header: "Installation ID" },
    { field: "installation_date", header: "Installation Date" },
    { field: "location", header: "Location" },
    { field: "status", header: "Status"},
    { field: "uninstallation_date", header: "Uninstallation date" },
    { field: "company", header: "Company" },
  ];

  const dynamicColumns1 = columns1.map((col, i) => {
    return (
      <Column
        className="data-column"
        key={col.field}
        field={col.field}
        header={col.header}
      />
    );
  });

  const columns2 = [
    { field: "model", header: "Model" },
    { field: "manufacturer", header: "Manufacturer" },
    { field: "hardware_version", header: "Hardware Version" },
    { field: "commission_date", header: "Commission Date" },
    { field: "decommission_date", header: "Decommission Date" },
    { field: "cost", header: "Cost" },
  ];

  const dynamicColumns2 = columns2.map((col, i) => {
    return <Column key={col.field} field={col.field} header={col.header} />;
  });

  const rowExpansionTemplate = (data) => {
    return (
      <div>
        <DataTable className="information" value={information}>
          {dynamicColumns2}
        </DataTable>
        <DataTable className="data-table" value={data.history}>
          {dynamicColumns1}
        </DataTable>
      </div>
    );
  };

  return (
    <>
      <DataTable
        value={data}
        header="INVENTORY LIST"
        paginator
        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} "
        rows={5}
        expandedRows={rows}
        onRowToggle={(e) => setRows(e.data)}
        rowExpansionTemplate={rowExpansionTemplate}
      >
        {dynamicColumns}
        <Column expander style={{ width: "3em" }} />
      </DataTable>
    </>
  );
}
