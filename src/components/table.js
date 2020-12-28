import React, { useEffect, useRef, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useDispatch, useSelector } from "react-redux";
import { fetchTable } from "../redux/action";
import { useHistory } from "react-router-dom";


export default function Table(props) {

  const history = useHistory();

  const dispatch = useDispatch();

  const data = useSelector((state) => state.table.data);
  const data2= useSelector((state) => state.table.data2);

  const [filter, setFilter] = useState(false);

  const [state, setstate] = useState([])

  const nameBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="p-column-title">
          {rowData}
          <i
            className="pi pi-filter"
            style={{
              fontSize: "10px",
              cursor: "pointer",
              paddingLeft: "50px",
            }}
            onClick={() => setFilter(!filter)}
          ></i>
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

  const rowExpansionTemplate = (data) => {
  
    return (
      <div>
        <DataTable className="information" value={data}>
          {dynamicColumns2}
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
        onRowToggle={(e) => setstate(data2)}
        rowExpansionTemplate={rowExpansionTemplate}
        selectionMode={props.type}
        onRowSelect={(e) => onRowSelect(e)}
      >
        {dynamicColumns}
        <Column expander style={{ width: "3em" }} />
      </DataTable>
    </>
  );
}
