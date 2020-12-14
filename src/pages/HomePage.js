import React from "react";
import SideNav from "../components/SideNav";
import Nav from "../components/Nav";
const HomePage = (props) => {
  return (
    <>
      <div id="nav">
        <Nav />
      </div>
      <div id="sidebar">
        <SideNav />
      </div>
    </>
  );
};

export default HomePage;
