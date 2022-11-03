import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React from "react";
function MasterTable(props) {
  const dynamicColumns = props.column.map((c) => {
    return (
      <Column
        key={c.field}
        field={c.field}
        header={c.header}
        body={
          c.field === "action"
            ? props.action
            : c.field === "delink"
            ? props.delink
            : c.field === "barn"? props.barn: null
        }
        
      />
    );
  });
  return (
    <>
      <DataTable
        className="info-table"
        value={props.data || props.data2}
      >
        {dynamicColumns}
      </DataTable>
    </>
  );
}

export default MasterTable;
