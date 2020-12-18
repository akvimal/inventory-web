import React, { useState } from "react";
import { Card } from "primereact/card";
import { ScrollPanel } from "primereact/scrollpanel";
import { useSelector } from "react-redux";
import { Link, useRouteMatch } from "react-router-dom";

export default function DataCard(props) {
  const data = useSelector((state) => state.dataCard.data);
  let match = useRouteMatch();
  return (
    <>
      <p className="title">{props.name}</p>
      <hr className="divider-line" />
      <ScrollPanel>
        <div className="p-d-flex mt-3">
          {data.map(({ name, status }) => {
            return (
              <Link to={{pathname:`${match.url}/${name}`}} >
              <div className="p-mr-4" key={name}>
                <Card title={name}>
                  <div className="p-d-flex" key={name}>
                    {status.map((e) => {
                      return (
                        <div className="inner-content mr-2 mt-3" key={e.name}>
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
              </Link>
            );
          })}
        </div>
      </ScrollPanel>
    </>
  );
}
