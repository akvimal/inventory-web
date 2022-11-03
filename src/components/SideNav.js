import React from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { Dropdown } from "react-bootstrap";

import { Link, useLocation } from "react-router-dom";

export default function SideNav(props) {
  const location = useLocation();
  const paths = [{ path: "device" }, { path: "company" }, { path: "search" }];
  const base = location.pathname.split("/")[1];
  const basePath = [{ path: "master" }, { path: "farm" }];
  const setupActive = basePath.map((a) => {
    return a.path === base ? "menu-active" : "menu";
  });
  const active = paths.map((d) => {
    return location.pathname.split("/")[1] === d.path
      ? "sidenav-buttons-active"
      : "sidenav-buttons";
  });
  return (
    <>
      <Sidebar visible={true} onHide={() => true} showCloseIcon={false}>
        <div className="logo">
          <img
            src="\assests\Porklogic-logo-white.png"
            alt="Porklogic logo"
            className="ml-5 logo-img"
          />
        </div>
        <div>
          <Link to="/device" className="link">
            <Button label="Device" className={active[0]} />
          </Link>
        </div>
        <div>
          <Link to="/company" className="link">
            <Button label="Company" className={active[1]} />
          </Link>
        </div>
        <div>
          <Link to="/search" className="link">
            <Button label="Search" className={active[2]} />
          </Link>
        </div>
        <div>
          <Dropdown className={active[3]}>
            <label
              className="SideNav"
            >
              SETUP
            </label>
            <Dropdown.Toggle split className="SideNav" style={{
              "background": "#000",
              "border": "0",
              "color": "#f7b924",
              "margin-bottom": "13px"

            }} id="dropdown-basic" />

            <Dropdown.Menu className="dropdown-menu">
              <Link to="/master/location" style={{ textDecoration: "none" }}>
                <Button className={setupActive[0]}>Master</Button>
              </Link>
              <Link to="/farm" style={{ textDecoration: "none" }}>
                <p>
                  <Button className={setupActive[1]} >Farm</Button>
                </p>
              </Link>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Sidebar>
    </>
  );
}
