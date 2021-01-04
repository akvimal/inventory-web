import React, { useEffect, useRef, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useDispatch, useSelector } from "react-redux";
import { fetchTable } from "../redux/action";
import { useHistory } from "react-router-dom";

export default function Table(props) {
  const history = useHistory();

  const dispatch = useDispatch();

  // const data = useSelector((state) => state.table.data);
  // const data2 = useSelector((state) => state.table.data2);

<<<<<<< HEAD
  // const rowExpansionTemplate = (data) => {
  //   return (
  //     <div>
  //       <DataTable className="information" value={information}>
  //         {dynamicColumns2}
  //       </DataTable>
  //       <DataTable className="data-table" value={data.history}>
  //         {dynamicColumns1}
  //       </DataTable>
  //     </div>
  //   );
  // };
  // const [row, setRows] = useState(null);
  const [filter, setFilter] = useState(false);
=======
  // const [filter, setFilter] = useState(false);

  const [state, setstate] = useState([]);
>>>>>>> dev-vimalesh

  const nameBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="p-column-title">
          {rowData}
<<<<<<< HEAD
          {/* <i
            className="pi pi-filter"
            style={{
              fontSize: "10px",
              cursor: "pointer",
              paddingLeft: "50px",
            }}
            onClick={() => setFilter(!filter)}
          ></i> */}
=======
          {props.filtericon}
>>>>>>> dev-vimalesh
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
//  const dynamicColumns1 = props.columns3.map((col, i) => {
//    return (
//      <Column
//        key={col.field}
//        field={col.field}
//        header={nameBodyTemplate(col.header)}
//      />
//    );
//  });
  const rowExpansionTemplate = (data) => {
    return (
      <div>
        {/* <DataTable className="information" value={information}>
          {dynamicColumns1}
        </DataTable> */}
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
        device: "BaconBit" ||  e.data.device_name,
      })
    );
    props.select(e);
  };

  return (
    <>
      <DataTable
        value={props.tableData}
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
