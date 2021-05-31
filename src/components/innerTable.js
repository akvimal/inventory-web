import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import axios from "axios";

export const InnerTable = (props) => {
  const [state, setstate] = useState([]);

  const getTokenFromStorage = () => localStorage.getItem("token");
  useEffect(() => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/dashboard/device/history`,
        {
          machine: props.machine,
        },
        {
          headers: {
            Accept: "application/json",
            "auth-token": getTokenFromStorage(),
          },
        }
      )
      .then((e) => setstate(e.data))
      .catch((e) => console.log(e));
  }, [props.machine]);

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

  const dynamicColumns3 = props.columns2.map((col) => {
    return (
      <Column
        key={col.field}
        field={col.field}
        header={nameBodyTemplate(col.header)}
      />
    );
  });
  return (
    <div className="test">
      <DataTable className="inner-table" value={state}>
        {dynamicColumns3}
      </DataTable>
    </div>
  );
};
