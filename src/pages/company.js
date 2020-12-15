import React, { useEffect } from "react";
import DataCard from "../components/DataCard";
import Table from "../components/table";
import Band from "../components/band";
import { useDispatch } from "react-redux";
import { fetchDataCard } from "../redux/action";

export default function Company() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDataCard("company"));
  }, []);

  return (
    <>
      <div id="scroll-cards">
        <div className="mt-3 ml-4 mr-4">
          <DataCard name="Company" />
        </div>
      </div>
      <div id="table">
        <div className="mt-3 ml-4 mr-4">
          <Band name="Company Name" location="location" status="status" />
          <Table />
        </div>
      </div>
    </>
  );
}
