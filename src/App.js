import React from "react";
import Nav from "./components/Nav";
import "./App.css";
import SideNav from "./components/SideNav";

export default function App() {
  return (
    <>
      <div className="p-grid">
        <div className="p-col-12">
          <Nav />
        </div>
      </div>
    </>
  );
}
