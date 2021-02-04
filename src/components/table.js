import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useDispatch } from "react-redux";
import { fetchTable } from "../redux/action";
import { useHistory, useLocation } from "react-router-dom";

export default function Table(props) {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

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
  const dynamicColumns = props.columns.map((col) => {
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
  const dynamicColumns3 = props.columns2.map((col) => {
    return (
      <Column
        key={col.field}
        field={col.field}
        header={nameBodyTemplate(col.header)}
      />
    );
  });

  const rowExpansionTemplate = (d) => {
    return (
      <>
        <div className="test">
          <DataTable className="inner-table" value={props.row}>
            {dynamicColumns3}
          </DataTable>
        </div>
      </>
    );
  };

  const onRowSelect = (e) => {
    history.push(`${props.match.url}/${e.data.name}`);
    const pathItems = location.pathname.split("/");
    const value =
      pathItems[1] !== "company"
        ? {
            status: e.data.status,
            org_location_id: e.data.org_location_id,
            device: pathItems[2],
          }
        : {
            org_location_id: e.data.org_location_id,
            status: e.data.status,
            device: e.data.name,
          };
    dispatch(fetchTable("dashboard/device/location", value));
    props.select(e);
  };

  const onRowExpand = (e) => {
    console.log(e);
    dispatch(
      fetchTable("dashboard/device/history", {
        machine: e.data.machine_id,
      })
    );
  };
  const handleToggle = (e) => {
    console.log(e);
    setstate(e.data);
  };
  return (
    <>
      <DataTable
        className="maintable"
        value={props.tableData}
        ref={props.refs}
        header="INVENTORY LIST"
        paginator={props.page}
        paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="Page {first} of {totalRecords} "
        paginatorLeft
        rows={5}
        expandedRows={state}
        onRowToggle={(e) => handleToggle(e)}
        onRowExpand={(e) => onRowExpand(e)}
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
