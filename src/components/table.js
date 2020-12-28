import React, { useEffect, useRef, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useDispatch, useSelector } from "react-redux";
import { fetchTable } from "../redux/action";
import { useHistory } from "react-router-dom";

export default function Table(props) {
  const table = [
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

  const history = useHistory();

  const dispatch = useDispatch();

  const data = useSelector((state) => state.table.data);
  const data2 = useSelector((state) => state.table.data2);

  // const [filter, setFilter] = useState(false);

  const [state, setstate] = useState([]);

  const nameBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="p-column-title">
          {rowData}
          {props.filtericon}
        </span>
      </React.Fragment>
    );
  };
  const dynamicColumns = props.columns.map((col, i) => {
    return (
      <Column
        key={col.field}
        field={col.field}
        header={nameBodyTemplate(col.header)}
        filter={col.filter}
        filterElement={col.filterElement}
      />
    );
  });

  const dynamicColumns2 = props.columns.map((col, i) => {
    return (
      <Column
        key={col.field}
        field={col.field}
        header={nameBodyTemplate(col.header)}
        filter={col.filter}
        filterElement={col.filterElement}
      />
    );
  });
  console.log(props);
  const dynamicColumns3 = props.columns2.map((col, i) => {
    return (
      <Column
        key={col.field}
        field={col.field}
        header={nameBodyTemplate(col.header)}
      />
    );
  });

  const rowExpansionTemplate = (data) => {
    return (
      <div>
        <DataTable className="information" value={data.history}>
          {dynamicColumns3}
        </DataTable>
      </div>
    );
  };

  const ex = localStorage.getItem("device name");

  const onRowSelect = (e) => {
    console.log(e);
    history.push(`${props.match.url}/${e.data.device_name}`);
    dispatch(
      fetchTable("dashboard/device/location", {
        company: e.data.name || ex,
        device: "BaconBit" || e.data.device_name,
      })
    );
    props.select(e);
  };

  return (
    <>
      <DataTable
        value={data}
        ref={props.refs}
        header="INVENTORY LIST"
        paginator
        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} "
        rows={5}
        expandedRows={state}
        onRowToggle={(e) => setstate(e.data)}
        rowExpansionTemplate={rowExpansionTemplate}
        selectionMode={props.type}
        onRowSelect={(e) => onRowSelect(e)}
      >
        {dynamicColumns}
        {props.rowExpander}
      </DataTable>
    </>
  );
}
