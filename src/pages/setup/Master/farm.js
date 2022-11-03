import React, { useEffect, useState } from "react";
import { Modal, Button, Card } from "react-bootstrap";
import {
  addNewFarm,
  deleteFarms,
  editFarm,
  getFarms,
  getOrganization
} from "../setupService";
import MasterTable from "../table";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteAlert from "../Master/deleteAlert";

function Farms() {
  const [farms, setFarms] = useState([]);
  const [orgs, setOrgs] = useState([]);
  const [data, setData] = useState();
  const [farm, setFarm] = useState({
    id: 0,
    name: "",
    address: "",
    abbreviation: "",
    org_name: "",
    org_location_id: "",
  });
  const [show, setShow] = useState({
    add: false,
    edit: false,
    delete: false,
  });
  useEffect(() => {
    allFarms();
    allOrgs();
  }, []);
  const allOrgs = () => {
    getOrganization()
      .then((res) => setOrgs(res.data))
      .catch((error) => alert(error));
  };
  const allFarms = () => {
    getFarms()
      .then((res) => setFarms(res.data))
      .catch((error) => alert(error.message));
  };
  const columns = [
    { field: "name", header: "Name" },
    { field: "address", header: "Address" },
    { field: "abbreviation", header: "Abbreviation" },
    { field: "organization", header: "Organization" },
    { field: "action", header: "Action" },
  ];
  const removeFarm = (e) => {
    const id = e.id;
    return (deleteFarms(id).then((res) =>
      res.data.removed ? allFarms() : alert(res.message)
    ),setShow(false))
    
  };
  const addFarm = () => {
    addNewFarm(farm).then((res) =>
      res.data.inserted ? allFarms() : alert(res.message)
    );
    setShow(false);
    setFarm({
      id: 0,
      name: "",
      address: "",
      abbreviation: "",
      org_location_id: "",
      org_name: "",
    });
  };
  const updateFarm = () => {
    editFarm(farm).then((res) =>
      res.data.inserted ? allFarms() : alert(res.message)
    );
    setFarm({
      id: 0,
      name: "",
      address: "",
      abbreviation: "",
      org_location_id: "",
      org_name: "",
    });
    setShow(false);
  };
  const actionColumnTemplate = (e) => {
    return (
      <>
        <DeleteOutlineIcon onClick={() => onDeleteClick(e)} />
        <EditOutlinedIcon
          style={{ marginLeft: "16px" }}
          onClick={() => editModal(e)}
        />
      </>
    );
  };
  const onHandleModal = () => setShow({ add: true });
  const handleClose = () => {
    return (
      setFarm({
        id: 0,
        name: "",
        abbreviation: "",
        org_loc_id: "",
        org_name: "",
      }),
      setShow(false),
      setShow({ delete: false })
    );
  };
  const editModal = (e) => {
    return (
      setShow({ edit: true }),
      setFarm({
        id: e.id,
        name: e.name,
        address: e.address,
        abbreviation: e.abbreviation,
        org_name: e.organization,
      })
    );
  };
  const onDeleteClick = (e) => {
    // eslint-disable-next-line
    return setShow({ delete: true }), setData(e);
  };
  const filterOrg = () => {
   return orgs.filter((o) =>
      o.org_type === "CUSTOMER"
    );
  };
  console.log(filterOrg())
  return (
    <React.Fragment>
      <Card className="table-card">
        <Card.Title className="setup-title">
          Farms
          <Button className="add-info" onClick={onHandleModal}>
            Add
          </Button>
        </Card.Title>
        <MasterTable
          data={farms}
          column={columns}
          action={actionColumnTemplate}
        />
      </Card>
      <DeleteAlert
        data={data}
        show={show.delete}
        close={handleClose}
        delete={removeFarm}
      />
      <Modal
        className="info-modal"
        show={show.add || show.edit}
        onHide={handleClose}
      >
        <Modal.Header className="info-modal-header" closeButton>
          <Modal.Title className="info-modal-title">
            {" "}
            {show.edit ? " Edit Farms " : "Add Farms"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="info-modal-body">
          <p>Name</p>
          <input
            type="text"
            required
            className="form-control"
            placeholder="Name"
            value={farm.name}
            onChange={(e) => setFarm({ ...farm, name: e.target.value })}
          />
          <p>Address</p>
          <input
            type="text"
            required
            className="form-control"
            placeholder="Address"
            value={farm.address}
            onChange={(e) => setFarm({ ...farm, address: e.target.value })}
          />
          <p>Abbrevation</p>
          <input
            type="text"
            className="form-control"
            placeholder="Abbrevation"
            value={farm.abbreviation}
            onChange={(e) => setFarm({ ...farm, abbreviation: e.target.value })}
          />
          <p>organisations</p>
          <select
            className="form-control"
            onChange={(e) =>
              setFarm({ ...farm, org_location_id: e.target.value })
            }
          >
            {show.edit ? (
              <option disabled selected >{farm.org_name}</option>
            ) : (
              <option>Select</option>
            )}
            {filterOrg().map((f) => (
              <option key={f.id} value={f.id}>
                {" "}
                {f.name}{" "}
              </option>
            ))}
          </select>
        </Modal.Body>
        <Modal.Footer className="info-modal-footer">
          <Button className="add-info" onClick={handleClose}>
            Cancel
          </Button>

          {show.edit ? (
            <Button className="add-info" onClick={updateFarm}>
              Save
            </Button>
          ) : (
            <Button className="add-info" onClick={addFarm}>
              Add
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}

export default Farms;
