import React, { useEffect, useState } from "react";
import MasterTable from "../table";
import { Modal, Button, Card } from "react-bootstrap";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import LinkOffIcon from "@material-ui/icons/LinkOff";
import DeleteAlert from "../Master/deleteAlert";
import { addOrganization, deleteOrganization, getLocation, getOrganization, linkOutLocation } from "../setupService";

function Organisation() {
  useEffect(() => {
    findAll();
    findLocations();
  }, []);
  const [org, setOrg] = useState({
    id: 0,
    name: "",
    type: "",
    location_id: "",
  });
  const [orgs, setOrgs] = useState([]);
  const [locations, setLocations] = useState([]);
  const [data, setData] = useState();
  const [show, setShow] = useState({ add: false, delete: false });
  const onHandleModal = () => setShow({add:true});

  const handleClose = () => {
    return (
      setOrg({
        id: 0,
        name: "",
        type: "",
        location_id: "",
      }),
      setShow(false),
      setShow({ delete: false })
    );
  };

  function findAll() {
    getOrganization().then((result) => {
      if(result && result.data){
      setOrgs(result.data);
      }
    });
  }

  function findLocations() {
    getLocation().then((result) => {
      const copy = [];
      if(result && result.data){
      result.data.forEach((element) => {
        copy.push({
          id: element.id,
          country: element.country,
          state: element.state,
          city: element.city,
        });
      });
    }
      setLocations(copy);
    });
  }

  function add() {
    addOrganization(org).then((result) => {
      console.log(result);
      result.data.inserted ? findAll() : alert(result.message);
    });
    setShow(false);
    setOrg({
      id: 0,
      name: "",
      type: "",
      location_id: "",
    });
  }

  const deleteHandler = (e) => {
    const id = e.org_id;
    return (deleteOrganization(id).then((result) => {
      console.log(result);
      result.data.removed ? findAll() : alert(result.message);
    }),setShow(false))
  };
const onDeleteClick = (e) => {
  // eslint-disable-next-line
  return setShow({ delete: true }), setData(e);
};
  const delinkLocation = (e) => {
    const id = e.id;
    linkOutLocation(id).then((result) => {
      console.log(result);
      result.data.removed ? findAll() : alert(result.message);
    });
  };

  const actionColumnTemplate = (e) => {
    return (
      <>
        <DeleteOutlineIcon onClick={() => onDeleteClick(e)} />
      </>
    );
  };

  const delinkColumnTemplate = (e) => {
    return <LinkOffIcon onClick={() => delinkLocation(e)} />;
  };

  const columns = [
    { field: "name", header: "Name" },
    { field: "org_type", header: "Type" },
    { field: "city", header: "Location" },
    { field: "action", header: "Action" },
    { field: "delink", header: "Delink Location" },
  ];

  return (
    <>
      <Card className="table-card">
        <Card.Title className="setup-title">
          Organizations
          <Button className="add-info" onClick={onHandleModal}>
            Add
          </Button>
        </Card.Title>
        <MasterTable
          data={orgs}
          column={columns}
          action={actionColumnTemplate}
          delink={delinkColumnTemplate}
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
            Add Organization
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="info-modal-body">
          <p>Name</p>
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            value={org.country}
            onChange={(e) => setOrg({ ...org, name: e.target.value })}
          />
          <p>Type</p>
          <select
            className="form-control"
            value={org.type}
            onChange={(e) => setOrg({ ...org, type: e.target.value })}
          >
            <option>Select</option>
            <option>MANUFACTURER</option>
            <option>WAREHOUSE</option>
            <option>CUSTOMER</option>
            <option>REFURBISHMENT</option>
            <option>BIOCLEAN</option>
          </select>
          <p>City</p>
          <select
            className="form-control"
            value={org.location_id}
            onChange={(e) => setOrg({ ...org, location_id: e.target.value })}
          >
            <option>Select</option>
            {locations.map((item) => (
              <option key={item.id} value={item.id}>
                {item.country}, {item.state}, {item.city}
              </option>
            ))}
          </select>
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

export default Organisation;
