import React from "react";
import Nav from "./components/Nav";
import "./App.css";
import SideNav from "./components/SideNav";
import DataCard from "./components/DataCard";
import Table from "./components/table";
import Band from "./components/band";

export default function App() {
  return (
    <div className="app-container">
      <div id="nav">
        <Nav />
      </div>
      <div id="sidebar">
        <SideNav />
      </div>
      <div id="scroll-cards">
        <div className="mt-3 ml-4 mr-4">
          <DataCard name="device" />
        </div>
      </div>
      <div id="table">
        <div className="ml-4 mr-4">
          <Band name="Company Name" location="location" status="status" />
          <Table />
        </div>
      </div>
    </div>
  );
}
