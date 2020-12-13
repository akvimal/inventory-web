import React, { useState } from "react";
import { Card } from "primereact/card";
import { ScrollPanel } from "primereact/scrollpanel";

export default function DataCard(props) {
  const [data] = useState([
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
      <p className="title">{props.name}</p>
      <hr className="divider-line" />
      <ScrollPanel>
        <div className="p-d-flex mt-3">
          {data.map(({ name, status }) => {
            return (
              <div className="p-mr-4" key={name}>
                <Card title={name}>
                  {status.map(
                    ({
                      Available,
                      BioClean,
                      Disconnected,
                      Installed,
                      Reapir,
                    }) => {
                      return (
                        <div className="p-d-flex" key={name}>
                          <div className="inner-content mr-2">
                            <p className="inner-content-title m-0">installed</p>
                            <p className="inner-content-title-1 m-1 ml-0">
                              {Installed}
                            </p>
                          </div>
                          <div className="inner-content mr-2">
                            <p className="inner-content-title m-0">Available</p>
                            <p className="inner-content-title-1 m-1 ml-0">
                              {Available}
                            </p>
                          </div>
                          <div className="inner-content mr-2">
                            <p className="inner-content-title m-0">
                              Disconnected
                            </p>
                            <p className="inner-content-title-1 m-1 ml-0">
                              {Disconnected}
                            </p>
                          </div>
                          <div className="inner-content mr-2">
                            <p className="inner-content-title m-0">bioclean</p>
                            <p className="inner-content-title-1 m-1 ml-0">
                              {BioClean}
                            </p>
                          </div>
                          <div className="inner-content mr-2">
                            <p className="inner-content-title m-0">Repair</p>
                            <p className="inner-content-title-1 m-1 ml-0">
                              {Reapir}
                            </p>
                          </div>
                        </div>
                      );
                    }
                  )}
                </Card>
              </div>
            );
          })}
        </div>
      </ScrollPanel>
    </>
  );
}
