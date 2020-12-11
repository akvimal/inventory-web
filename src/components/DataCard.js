import React, { useState } from "react";
import { Card } from "primereact/card";

export default function DataCard() {
  const [data, setData] = useState([
    {
      name: "BaconBit",
      status: [
        {
          Installed: 100,
          Available: 25,
          BioClean: 25,
          Reapir: 25,
          Disconnected: 25,
        },
      ],
    },
    {
      name: "RasperryPig",
      status: [
        {
          Installed: 100,
          Available: 25,
          BioClean: 25,
          Reapir: 25,
          Disconnected: 25,
        },
      ],
    },
    {
      name: "Category1",
      status: [
        {
          Installed: 100,
          Available: 25,
          BioClean: 25,
          Reapir: 25,
          Disconnected: 25,
        },
      ],
    },
    {
      name: "Device",
      status: [
        {
          Installed: 100,
          Available: 25,
          BioClean: 25,
          Reapir: 25,
          Disconnected: 25,
        },
      ],
    },
  ]);

  return (
    <>
      <div className="p-d-flex">
        {data.map(({ name, status }) => {
          return (
            <div className="p-mr-2" key={name}>
              <Card title={name} className="outer-card">
                {status.map(
                  ({
                    Available,
                    BioClean,
                    Disconnected,
                    Installed,
                    Reapir,
                  }) => {
                    return (
                      <div className="p-d-flex">
                        <Card className="inner-card">{Available}</Card>
                        <Card className="inner-card">{BioClean}</Card>
                        <Card className="inner-card">{Disconnected}</Card>
                        <Card className="inner-card">{Installed}</Card>
                        <Card className="inner-card">{Reapir}</Card>
                      </div>
                    );
                  }
                )}
              </Card>
            </div>
          );
        })}
      </div>
    </>
  );
}
