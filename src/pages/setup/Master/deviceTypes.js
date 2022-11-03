import React, { useEffect, useState } from "react";
import {
  addDeviceTypes,
  getDeviceTypes,
  deleteDeviceTypes,
} from "../setupService";
import { Modal, Button, Card } from "react-bootstrap";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import MasterTable from "../table.js";
import DeleteAlert from "../Master/deleteAlert";
function DeviceTypes() {
  useEffect(() => {
    findAll();
  }, []);
  const [types, setTypes] = useState([]);
  const [data, setData] = useState();
  const [type, setType] = useState({ id: 0, name: "" });
  const [show, setShow] = useState({ add: false, delete: false });
  const onHandleModal = () => setShow({ add: true });

  const handleClose = () => {
    return (
      setType({ id: 0, name: "" }), setShow(false), setShow({ delete: false })
    );
  };

  function findAll() {
    getDeviceTypes().then((result) => {
      const copy = [];
      result.data.forEach((element) => {
        copy.push({ id: element.id, name: element.name });
      });
      setTypes(copy);
    });
  }

  function add() {
    addDeviceTypes(type.id, type.name).then((result) => {
      result.data.inserted ? findAll() : alert(result.message);
    });
    setShow(false);
    setType({ id: 0, name: "" });
  }

  const onDeleteClick = (e) => {
    // eslint-disable-next-line
    return setShow({ delete: true }), setData(e);
  };

  const deleteHandler = (e) => {
    const id = e.id;
    return (
     ( deleteDeviceTypes(id).then((result) => {
        result.data.removed ? findAll() : alert(result.message);
      }),
      setShow(false))
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
    { field: "name", header: "Name" },
    { field: "action", header: "Action" },
  ];

  return (
    <>
      <Card className="table-card">
        <Card.Title className="setup-title">
          Device Types
          <Button className="add-info" onClick={onHandleModal}>
            Add
          </Button>
        </Card.Title>
        <MasterTable
          data={types}
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
          <Modal.Title className="info-modal-title">
            Add Device Type
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="info-modal-body">
          <p>Name</p>
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            value={type.country}
            onChange={(e) => setType({ ...type, name: e.target.value })}
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

export default DeviceTypes;
