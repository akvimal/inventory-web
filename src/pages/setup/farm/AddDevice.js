import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import apconfig from "../../../config/apconfig";
import { BulkUpload } from "./Upload/BulkUpload";
function AddDevice(props) {
  const [device, setDevice] = useState({
    id: 0,
    type: "",
    version: 0,
    org_location_id: 0,
    custom_id: "",
    alternate_id: "",
    comm_date: "",
    begin_date: "",
    comments: "",
    decomm_date: "",
    cost: 1,
    status: "",
    cycle: 0,
    type_id: 0,
  });

  const [devTypes, setDevTypes] = useState([]);
  const [devVersions, setDevVersions] = useState([]);
  const [orgLocations, setOrgLocations] = useState([]);
  const getTokenFromStorage = () => localStorage.getItem("token");

  const headers = {
      headers: {
          Accept: "application/json",
          "auth-token": getTokenFromStorage(),
      }
  }
  useEffect(() => {
    findDevTypes();
    findDeviceVersions();
    findOrgLocations();
  }, []);

  function findDevTypes() {
    apconfig.get("/settings/device/types",headers).then((result) => {
      const copy = [];
      result.data.forEach((element) => {
        copy.push({ id: element.id, name: element.name });
      });
      setDevTypes(copy);
    });
  }

  function add() {
    apconfig.post(`/devices`, { data: [device] },headers).then((result) => {
      result.data.inserted ? props.findDevice() : alert(result.message);
    });
  }

  function findDeviceVersions() {
    apconfig.get(`/settings/device/versions`,headers).then((result) => {
      const copy = [];
      result.data.forEach((element) => {
        copy.push({
          version_id: element.id,
          name: element.name,
          type: element.type_name,
        });
      });
      setDevVersions(copy);
    });
  }
  function findOrgLocations() {
    apconfig
      .get(`/organizations/locations`, { params: { types: ["WAREHOUSE"] } })
      .then((result) => {
        const orgsCopy = [];
        result.data.forEach((element) => {
          orgsCopy.push({
            id: element.id,
            organization: element.name,
            location: element.city,
          });
        });
        setOrgLocations(orgsCopy);
      });
  }
  return (
    <div id="add-form" className="AddDevice">
      <Form>
        <Form.Group>
          <Form.Label className="status-label">Type</Form.Label>
          <Form.Control
            as="select"
            required
            className="form-control search-value"
            value={device.type_id}
            onChange={(e) => {
              console.log(e.target.value);
              setDevice({ ...device, type_id: e.target.value });
            }}
          >
            <option>Select</option>
            {devTypes.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label className="status-label">Version</Form.Label>
          <Form.Control
            as="select"
            className="form-control search-value"
            value={device.version_id}
            onChange={(e) => {
              setDevice({ ...device, version: e.target.value });
            }}
          >
            <option>Select</option>
            {devVersions.map((item) => (
              <option key={item.version_id} value={item.version_id}>
                {item.type} - {item.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label className="status-label">Organization</Form.Label>
          <Form.Control
            as="select"
            className="form-control search-value"
            value={device.org_location_id}
            onChange={(e) =>
              setDevice({ ...device, org_location_id: e.target.value })
            }
          >
            <option>Select</option>
            {orgLocations.map((item) => (
              <option key={item.id} value={item.id}>
                {item.organization} - {item.location}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label className="status-label">Custom ID</Form.Label>
          <Form.Control
            type="text"
            className="form-control search-value"
            value={device.custom_id}
            onChange={(e) =>
              setDevice({ ...device, custom_id: e.target.value })
            }
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label className="status-label">Alternate ID</Form.Label>
          <Form.Control
            type="text"
            className="form-control search-value"
            value={device.alternate_id}
            onChange={(e) =>
              setDevice({ ...device, alternate_id: e.target.value })
            }
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label className="status-label">Date</Form.Label>
          <Form.Control
            type="date"
            className="form-control search-value"
            value={device.comm_date}
            onChange={(e) =>
              setDevice({ ...device, comm_date: e.target.value })
            }
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label className="status-label">Comments</Form.Label>
          <Form.Control
            type="text"
            className="form-control search-value"
            value={device.comments}
            onChange={(e) => setDevice({ ...device, comments: e.target.value })}
          />
        </Form.Group>
        <Button
          style={{
            backgroundColor: "#545A61",
            border: "none",
            boxShadow: "none",
          }}
          onClick={add}
          disabled={device.type_id === 0 || device.type_id === "Select"}
        >
          Add
        </Button>
      </Form>
      <br />
      <BulkUpload
        url="http://localhost:5000/devices"
        devTypes={devTypes}
        orgLocations={orgLocations}
        toUpload="device"
        template={[
          {
            deviceType: "",
          },
          { version: "" },
          { organization: "" },
          { location: "" },
          { customId: "" },
          { alternateId: "" },
          { commisionDate: "" },
          { comments: "" },
        ]}
      />
      <br />
    </div>
  );
}

export default AddDevice;
