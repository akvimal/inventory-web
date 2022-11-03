/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import apconfig from "../../../config/apconfig";

function DeviceStatus(props) {
  const [status, setStatus] = useState({
    id: 0,
    device_id: 0,
    org_location_id: 0,
    status: "",
    begin_date: "",
    end_date: "",
    install_id: "",
    version_id: 0,
    comments: "",
  });

  const [statusses, setStatusses] = useState([]);

  const [orgLocations, setOrgLocations] = useState([]);
  const [devVersions, setDevVersions] = useState([]);
  const [statusList, setStatusList] = useState([]);

  const getTokenFromStorage = () => localStorage.getItem("token");

  const headers = {
      headers: {
          Accept: "application/json",
          "auth-token": getTokenFromStorage(),
      }
  }
  useEffect(() => {
    fetch_statuses(props.id);
    findOrgLocations();
    findDeviceVersions();
    findStatusTypes();
  }, []);

  function findStatusTypes() {
    apconfig.get(`/settings/status/types`,headers).then((result) => {
      const copy = [];
      result.data.forEach((element) => {
        copy.push({ status: element.status });
      });
      setStatusList(copy);
    });
  }

  function findDeviceVersions() {
    apconfig.get(`/settings/device/versions`,headers).then((result) => {
      const copy = [];
      result.data.forEach((element) => {
        copy.push({ id: element.id, name: element.name, type: element.type });
      });
      setDevVersions(copy);
    });
  }

  function findOrgLocations() {
    apconfig.get(`/organizations/locations`,headers).then((result) => {
      const orgsCopy = [];
      result.data.forEach((element) => {
        orgsCopy.push({
          id: element.id,
          organization: element.org,
          location: element.city,
        });
      });
      setOrgLocations(orgsCopy);
    });
  }

  function fetch_statuses(id) {
    apconfig.get(`/statuses?device=${id}`,headers).then((result) => {
      const copy = [];
      result.data.forEach((e) => {
        copy.push({
          id: e.id,
          org: e.org,
          loc: e.loc,
          status: e.status,
          start: e.start,
          end: e.end,
          installed: e.install_id,
          version: e.version,
          comments: e.comments,
        });
      });
      setStatusses(copy);
    });
  }
  return (
    <div id="statusses">
      <Table
        id="status_history"
        style={{
          backgroundColor: "#373E47",
          border: "1px solid white",
        }}
      >
        <thead style={{ color: "#f7b924", textTransform:"uppercase" }}>
          <tr>
            <th>Org/Location</th>
            <th>Date</th>
            <th>Status</th>
            <th>Install ID</th>
            <th>Version</th>
            <th>Comments</th>
          </tr>
        </thead>
        <tbody style={{ color: "white" }}>
          {statusses.map((s) => (
            <tr key={s.id}>
              <td>
                {s.org}
                <br />
                {s.loc}
              </td>
              <td>{s.start}</td>
              <td>{s.status}</td>
              <td>{s.installed}</td>
              <td>{s.version}</td>
              <td>{s.comments}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default DeviceStatus;
