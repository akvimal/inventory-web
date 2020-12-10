import React from "react";
import { ScrollPanel } from "primereact/scrollpanel";
import BaconBit from "../pages/BaconBit";
import RasperryPig from "../pages/RasperryPig";
import Category1 from "../pages/Category1";
import Device from "../pages/device";
export default function Scrollbar() {
  return (
    <div className="scrollpanel-demo">
      <div className="p-grid">
        <div className="p-col-12 p-md-4">
          <ScrollPanel
            style={{ width: "325%", height: "160px" }}
            className="custombar2"
          >
            <div style={{ lineHeight: "1.5", width: "1525px" }}>
              <div className="p-grid p-align-center ">
                <div className="p-col">
                  <BaconBit />
                </div>
                <div className="p-col">
                  <RasperryPig />
                </div>
                <div className="p-col">
                  <Category1 />
                </div>
                <div className="p-col">
                  <Device />
                </div>
              </div>
            </div>
          </ScrollPanel>
        </div>
      </div>
    </div>
  );
}
