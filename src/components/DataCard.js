import React, { useState } from "react";
import { Card } from "primereact/card";
import { ScrollPanel } from "primereact/scrollpanel";

export default function DataCard(props) {
  const [data] = useState([
    {
      name: "BaconBit",
      status: [
        { name: "Installed", count: 10 },
        { name: "Available", count: 15 },
        { name: "BioClean", count: 25 },
        { name: "repair", count: 40 },
        { name: "Disconnected", count: 41 },
      ],
    },
    {
      name: "RasperryPig",
      status: [
        { name: "Installed", count: 10 },
        { name: "Available", count: 15 },
        { name: "BioClean", count: 25 },
        { name: "repair", count: 40 },
        { name: "Disconnected", count: 41 },
      ],
    },
    {
      name: "Category1",
      status: [
        { name: "Installed", count: 10 },
        { name: "Available", count: 15 },
        { name: "BioClean", count: 25 },
        { name: "repair", count: 40 },
        { name: "Disconnected", count: 41 },
      ],
    },
    {
      name: "Device",
      status: [
        { name: "Installed", count: 10 },
        { name: "Available", count: 15 },
        { name: "BioClean", count: 25 },
        { name: "repair", count: 40 },
        { name: "Disconnected", count: 41 },
      ],
    },
  ]);

  return (
    <>
      <p className="title">{props.name}</p>
      <hr className="divider-line" />
      <ScrollPanel>
        <div className="p-d-flex mt-3">
          {data.map(({ name, status }) => {
            return (
              <div className="p-mr-4" key={name}>
                <Card title={name}>
                  <div className="p-d-flex" key={name}>
                    {status.map((e) => {
                      return (
                        <div className="inner-content mr-2">
                          <p className="inner-content-title m-0">{e.name}</p>
                          <p className="inner-content-title-1 m-1 ml-0">
                            {e.count}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
      </ScrollPanel>
    </>
  );
}
