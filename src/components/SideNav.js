import React from "react";
import { Sidebar } from "primereact/sidebar";

export default function SideNav() {
  return (
    <>
      <Sidebar visible={true} onHide={() => true} showCloseIcon={false} />
    </>
  );
}
