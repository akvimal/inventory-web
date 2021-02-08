import React from "react";
import { Card } from "primereact/card";
import { ScrollPanel } from "primereact/scrollpanel";
import { useDispatch } from "react-redux";
import { Link, useLocation, useRouteMatch } from "react-router-dom";
import { fetchTable } from "../redux/action";

export default function DataCard(props) {
  const dispatch = useDispatch();

  let match = useRouteMatch();
  const location = useLocation();
  const pathItems = location.pathname.split("/");
  const currentCard = pathItems.length ? pathItems[2] : "";

  const handleClick = (e, check) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(fetchTable(props.url, check));
    props.click();
  };

  return (
    <>
      <p className="title">{props.name}</p>
      <hr className="divider-line" />
      <ScrollPanel>
        <div className="p-d-flex mt-3">
          {props.data.map(({ name, status }) => {
            const check =
              props.name === "device"
                ? {
                    device: name,
                  }
                : {
                    company: name,
                  };
            return (
              <Link
                to={{ pathname: `${match.url}/${name}` }}
                className="link"
                key={name}
                onClick={() => {
                  dispatch(fetchTable(props.url, check));
                  props.click(name);
                }}
              >
                <div className="p-mr-4" key={name}>
                  <Card
                    title={name}
                    className={currentCard === name ? "card-active" : "p-card"}
                  >
                    <div className="p-d-flex" key={name}>
                      {status.map((e) => {
                        const check1 =
                          props.name === "device"
                            ? {
                                device: name,
                                status: e.name,
                              }
                            : {
                                company: name,
                                status: e.name,
                              };
                        return (
                          <div
                            className="inner-content mr-2 mt-3"
                            onClick={(v) => handleClick(v, check1)}
                            key={e.name}
                          >
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
