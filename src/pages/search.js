import React from "react";
import DataCard from "../components/DataCard";
import Table from "../components/table";
import Band from "../components/band";

export default function search() {
  return (
    <>
      <div id="scroll-cards">
        <div className="mt-3 ml-4 mr-4">search</div>
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
