import React, { useEffect, useState } from "react";
import {
  getDeviceVersion,
  getDeviceTypes,
  addDeviceVersion,
  deleteDeviceVersion,
} from "../setupService";
import { Modal, Button, Card } from "react-bootstrap";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import MasterTable from "../table.js";
import DeleteAlert from "../Master/deleteAlert";
function DeviceVersion() {
  useEffect(() => {
    findAll();
    findTypes();
  }, []);
  const [version, setVersion] = useState({
    id: 0,
    name: "",
    launch: "",
    type_id: 0,
  });
  const [versions, setVersions] = useState([]);
  const [types, setTypes] = useState([]);
  const [data, setData] = useState();
  const [show, setShow] = useState({ add: false, delete: false });
  const onHandleModal = () => setShow({ add: true });

  const handleClose = () => {
    return (
      setShow(false),
      setVersion({ id: 0, name: "", launch: "", type_id: 0 }),
      setShow({ delete: false })
    );
  };
  function findAll() {
    getDeviceVersion().then((result) => {
      const copy = [];
      result.data.forEach((element) => {
        copy.push({
          id: element.id,
          name: element.name,
          launch: element.launch_date,
          type_id: element.type_id,
          type_name: element.type_name,
        });
      });
      setVersions(copy);
    });
  }

  function findTypes() {
    getDeviceTypes().then((result) => {
      const copy = [];
      result.data.forEach((element) => {
        copy.push({ id: element.id, name: element.name });
      });
      setTypes(copy);
    });
  }

  function add() {
    addDeviceVersion(
      version.id,
      version.name,
      version.launch,
      version.type_id
    ).then((result) => {
      result.data.inserted ? findAll() : alert(result.message);
    });
    setShow(false);
    setVersion({
      id: 0,
      name: "",
      launch: "",
      type_id: 0,
    });
  }

  const deleteHandler = (e) => {
    const id = e.id;
    // eslint-disable-next-line
    return (
      deleteDeviceVersion(id)
        .then((result) => {
          result.data.removed ? findAll() : alert(result.message);
        })
        .catch((err) => alert(err)),
      setShow(false)
    );
  };
 const onDeleteClick = (e) => {
   // eslint-disable-next-line
   return setShow({ delete: true }), setData(e);
 };
  const actionColumnTemplate = (e) => {
    return (
      <>
        <DeleteOutlineIcon onClick={() => onDeleteClick(e)} />
      </>
    );
  };

  const columns = [
    { field: "type_name", header: "Type" },
    { field: "name", header: "Name" },
    { field: "launch", header: "Launch" },
    { field: "action", header: "Action" },
  ];
  return (
    <>
      <Card className="table-card">
        <Card.Title className="setup-title">
          Device Versions
          <Button className="add-info" onClick={onHandleModal}>
            Add
          </Button>
        </Card.Title>

        <MasterTable
          data={versions}
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
            Add Device Version
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="info-modal-body">
          <p>Name</p>
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            value={version.country}
            onChange={(e) => setVersion({ ...version, name: e.target.value })}
          />
          <p>Type</p>

          <select
            className="form-control"
            onChange={(e) =>
              setVersion({ ...version, type_id: e.target.value })
            }
          >
            <option value="">Select</option>
            {types.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
          <p>Launch Date</p>
          <input
            className="form-control"
            type="date"
            value={version.launch}
            placeholder="Name"
            onChange={(e) => setVersion({ ...version, launch: e.target.value })}
          ></input>
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

export default DeviceVersion;
