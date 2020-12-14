import React from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";

import { Link } from "react-router-dom";

export default function SideNav() {
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
          <Link to="/device">
            <Button
              label="device"
              className="p-button-warning m-1 mb-4 sidenav-buttons"
            />
          </Link>
        </div>
        <div>
          <Link to="/company">
            <Button
              label="company"
              className="p-button-warning m-1 mb-4 sidenav-buttons"
            />
          </Link>
        </div>
        <div>
          <Link to="/search">
            <Button
              label="search"
              className="p-button-warning m-1 mb-4 sidenav-buttons"
            />
          </Link>
        </div>
      </Sidebar>
    </>
  );
}
