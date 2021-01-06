import React from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";

import { Link, useLocation } from "react-router-dom";

export default function SideNav() {
  const location = useLocation();
  const paths = [{ path: "device" }, { path: "company" }, { path: "search" }];
  const active = paths.map((d) => {
    return location.pathname.split("/")[1] === d.path
      ? "sidenav-buttons-active"
      : "sidenav-buttons";
  });
  return (
    <>
      <Sidebar visible={true} onHide={() => true} showCloseIcon={false}>
        <div className="logo  mb-4">
          <img
            src="assests\Porklogiclogo.svg"
            alt="Porklogic logo"
            className="ml-5"
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
          {/* <Link to="/search" className="link"> */}
          <Button label="Search" className={active[2]} />
          {/* </Link> */}
        </div>
      </Sidebar>
    </>
  );
}
