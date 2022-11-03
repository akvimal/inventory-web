import React, { useEffect, useState } from "react";
import {
  getLocation,
  addLocation,
  deleteLocation,
} from "../setupService";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { Modal, Button, Card } from "react-bootstrap";
import MasterTable from "../table.js";
import DeleteAlert from "../Master/deleteAlert";

function Location() {
  useEffect(() => {
    findAll();
  }, []);

  const [show, setShow] = useState({ add: false, delete: false });
  const [locations, setLocations] = useState([]);
  const [data, setData] = useState();
  const [loc, setLoc] = useState({ id: 0, country: "", state: "", city: "" });

  function findAll() {
    getLocation().then((result) => {
      const locCopy = [];
      if( result && result.data){
      result.data.forEach((element) => {
        locCopy.push({
          id: element.id,
          country: element.country,
          state: element.state,
          city: element.city,
        });
      });
    }
      setLocations(locCopy);
    });
  }

  function add() {
    addLocation(loc.id, loc.country, loc.state, loc.city).then((result) => {
      result.data.inserted ? findAll() : alert(result.message);
    });
    setShow(false);
    setLoc({ id: 0, country: "", state: "", city: "" });
  }

  const deleteHandler = (e) => {
    const id = e.id;
    // eslint-disable-next-line
    return (
      deleteLocation(id)
        .then((result) => {
          result.data.removed ? findAll() : alert(result.message);
        })
        .catch((err) => alert(err)),
      setShow(false)
    );
  };

  const actionColumnTemplate = (e) => {
    return (
      <>
        <DeleteOutlineIcon onClick={() => onDeleteClick(e)} />
      </>
    );
  };

  const columns = [
    { field: "country", header: "Country" },
    { field: "state", header: "State" },
    { field: "city", header: "City" },
    { field: "action", header: "Action" },
  ];

  const onHandleModal = () => setShow({add:true});

  const handleClose = () => {
    return (
      setLoc({ id: 0, country: "", state: "", city: "" }),
      setShow(false),
      setShow({ delete: false })
    );
  };
const onDeleteClick = (e) => {
  // eslint-disable-next-line
  return setShow({ delete: true }), setData(e);
};
  return (
    <>
      <Card className="table-card">
        <Card.Title className="setup-title">
          Locations
          <Button className="add-info" onClick={onHandleModal}>
            Add
          </Button>
        </Card.Title>
        {/* <hr style={{borderTop:"2px solid gray"}}/> */}
        <MasterTable
          data={locations}
          column={columns}
          action={actionColumnTemplate}
        />
      </Card>
      <DeleteAlert
        data={data}
        show={show.delete}
        close={handleClose}
        delete={deleteHandler}
      />
      <Modal className="info-modal" show={show.add} onHide={handleClose}>
        <Modal.Header className="info-modal-header" closeButton>
          <Modal.Title className="info-modal-title">Add Location</Modal.Title>
        </Modal.Header>
        <Modal.Body className="info-modal-body">
          <p>Country</p>
          <input
            type="text"
            className="form-control"
            placeholder="Country"
            value={loc.country}
            onChange={(e) => setLoc({ ...loc, country: e.target.value })}
          />
          <p>State</p>
          <input
            type="text"
            className="form-control"
            placeholder="State"
            value={loc.state}
            onChange={(e) => setLoc({ ...loc, state: e.target.value })}
          />
          <p>City</p>
          <input
            type="text"
            className="form-control"
            placeholder="City"
            value={loc.city}
            onChange={(e) => setLoc({ ...loc, city: e.target.value })}
          />
        </Modal.Body>
        <Modal.Footer className="info-modal-footer">
          <Button className="add-info" onClick={handleClose}>
            Cancel
          </Button>
          <Button className="add-info" onClick={add}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Location;
