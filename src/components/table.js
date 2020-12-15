import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from 'primereact/button';

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
    },{
      name: "company3",
      location: "Lorain",
      status: "BioClean",
      count: 20,
    },{
      name: "company3",
      location: "Lorain",
      status: "BioClean",
      count: 20,
    },{
      name: "company3",
      location: "Lorain",
      status: "BioClean",
      count: 20,
    },{
      name: "company3",
      location: "Lorain",
      status: "BioClean",
      count: 20,
    },{
      name: "company3",
      location: "Lorain",
      status: "BioClean",
      count: 20,
    },{
      name: "company3",
      location: "Lorain",
      status: "BioClean",
      count: 20,
    },{
      name: "company3",
      location: "Lorain",
      status: "BioClean",
      count: 20,
    },{
      name: "company3",
      location: "Lorain",
      status: "BioClean",
      count: 20,
    },{
      name: "company3",
      location: "Lorain",
      status: "BioClean",
      count: 20,
    },{
      name: "company3",
      location: "Lorain",
      status: "BioClean",
      count: 20,
    },{
      name: "company3",
      location: "Lorain",
      status: "BioClean",
      count: 20,
    },
  ];

  const [rows, setRows] = useState(null);

  const columns = [
    { field: "name", header: "Name" },
    { field: "location", header: "Location" },
    { field: "status", header: "Status" },
    { field: "count", header: "Count" },
  ];

  const dynamicColumns = columns.map((col, i) => {
    return <Column key={col.field} field={col.field} header={col.header} />;
  });

  const rowExpansionTemplate= (data)=> { 
    return (
        <div className="orders-subtable">
            <DataTable value={data.orders}>
                <Column field="id" header="Installation ID" sortable></Column>
                <Column field="customer" header="Installation Date" sortable></Column>
                <Column field="date" header="Location" sortable></Column>
                <Column field="amount" header="Status"  sortable></Column>
                <Column field="status" header="Uninstalation Date"  sortable></Column>
                <Column field="status" header="Company"  sortable></Column>
            </DataTable>
        </div>
    );
}

  return (
    <>
      <DataTable value={data} 
     header="INVENTORY LIST" paginator paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
     currentPageReportTemplate="{first} to {last} " rows={5} expandedRows={rows} onRowToggle={(e) => setRows(e.data)} rowExpansionTemplate={rowExpansionTemplate} >
        {dynamicColumns}
        <Column expander style={{ width: '3em' }} />
      </DataTable>
    </>
  );
}
