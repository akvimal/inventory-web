import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useDispatch } from "react-redux";
import { fetchTable } from "../redux/action";
import { useHistory } from "react-router-dom";

export default function Table(props) {
  const history = useHistory();

  const dispatch = useDispatch();

  // const data = useSelector((state) => state.table.data);
  // const data2 = useSelector((state) => state.table.data2);

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

  const dynamicColumns1 = props.columns3.map((col) => {
    return (
      <Column
        key={col.field}
        field={col.field}
        header={nameBodyTemplate(col.header)}
      />
    );
  });
  const rowExpansionTemplate = () => {
    return (
      <div>
        <DataTable value={state[0].properties}>
          {dynamicColumns1}
        </DataTable>
        <DataTable className="information" value={props.row}>
          {dynamicColumns3}
        </DataTable>
      </div>
    );
  };

  // const ex = localStorage.getItem("device name");

  const onRowSelect = (e) => {
    console.log(e);
    history.push(`${props.match.url}/${e.data.name}`);
    dispatch(
      fetchTable("dashboard/device/location", {
        company: "AUBURN UNIVERSITY",
        device: "BaconBit",
      })
    );
    props.select(e);
  };

  const onRowExpand = (e) => {
    setstate(e.data);
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
        onRowToggle={(e) => onRowExpand(e)}
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
