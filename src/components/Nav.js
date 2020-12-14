import React from "react";
import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
// import SideNav from "./SideNav";

export default function Nav() {
  const end = (
    <>
      <Button
        icon="pi pi-question"
        className="p-button-rounded p-button-warning p-button-outlined mr-1"
      />
      <Button
        icon="pi pi-bell"
        className="p-button-rounded p-button-warning p-button-outlined mr-1"
      />
      <Button
        icon="pi pi-user"
        className="p-button-rounded p-button-warning p-button-outlined"
      />
    </>
  );
  // const start = (
  //   <>
  //     <SideNav />
  //   </>
  // );
  return (
    <>
      <Menubar start={"Inventory Management"} end={end} />
    </>
  );
}
