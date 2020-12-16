import React from "react";
import Table from "../components/table";
import Band from "../components/band";
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';

export default function search() {
  return (
    <>
      <div id="scroll-cards">
        <div className=" search-text mt-3 ml-4 mr-4"> Search By <br/>
          <Dropdown className="dropdown-value" placeholder="Machine ID" />
          <InputText className="input-value"/>
        </div>
      </div>
      <div id="table">
        <div className=" mt-3 ml-4 mr-4">
          <Band name="Company Name" location="location" status="status" />
          <Table />
        </div>
      </div>
    </>
  );
}
