import React, { useEffect, useState } from "react";
import {
  addNewBarn,
  deleteBarn,
  editBarn,
  getBarns,
  getFarms,
  getOrganization,
} from "../setupService";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { Modal, Button, Card } from "react-bootstrap";
import MasterTable from "../table";
import DeleteAlert from "../Master/deleteAlert";
function Barns() {
  const [barns, setBarns] = useState([]);
  const [farms, setFarms] = useState([]);
  const [orgs, setOrgs] = useState([]);
  const [data, setData] = useState();
  const [barn, setBarn] = useState({
    id: 0,
    name: "",
    category: "",
    farm: "",
    farm_id: "",
    status: "",
    organization: "",
  });
  const [show, setShow] = useState({
    add: false,
    edit: false,
    delete: false,
  });

  useEffect(() => {
    allBarns();
    // allFarms();
    allOrgs();
  }, []);
  const onHandleModal = () => {
    // eslint-disable-next-line
    return setShow({ add: true });
  };
  const handleClose = () => {
    return (
      setBarn({
        id: 0,
        name: "",
        category: "",
        farm: "",
        farm_id: "",
        status: "",
        organization: "",
      }),
      setShow(false),
      setShow({ delete: false })
    );
  };
  const editModal = (e) => {
    return (
      setShow({ edit: true }),
      setBarn({
        id: e.id,
        name: e.name,
        category: e.category,
        farm: e.farm,
        farm_id: e.farm_id,
        status: e.status,
        organization: e.organization,
      })
    );
  };

  const onDeleteClick = (e) => {
    // eslint-disable-next-line
    return setShow({ delete: true }), setData(e);
  };
  const allBarns = () => {
    getBarns()
      .then((res) => setBarns(res.data))
      .catch((error) => alert(error.message));
  };
  const allOrgs = () => {
    getOrganization()
      .then((res) => setOrgs(res.data))
      .catch((error) => alert(error));
  };
  const allFarms = (id) => {
    getFarms(id)
      .then((res) => setFarms(res.data))
      .catch((error) => alert(error.message));
  };
  const filterOrg = () => {
   return orgs.filter((o) =>
      o.org_type === "CUSTOMER"
    );
  };
  const columns = [
    { field: "name", header: "Name" },
    { field: "category", header: "Category" },
    { field: "organization", header: "Organization" },
    { field: "farm", header: "Farm" },
    { field: "status", header: "Status" },
    { field: "action", header: "Action" },
  ];
  const removeBarn = (e) => {
    const id = e.id;
    return (
      deleteBarn(id)
        .then((res) => (res.data.removed ? allBarns() : alert(res.message)))
        .catch((error) => alert(error.message)),
      setShow(false)
    );
  };
  const addBarn = () => {
    addNewBarn(barn)
      .then((res) => (res.data.inserted ? allBarns() : alert(res.message)))
      .catch((err) => alert(err.message));
    setShow(false);
    setBarn({
      id: 0,
      name: "",
      category: "",
      farm: "",
      farm_id: "",
      status: "",
      organization: "",
    })
  };
  const updateBarn = () => {
    editBarn(barn)
      .then((res) => (res.data.inserted ? allBarns() : alert(res.message)))
      .catch((err) => alert(err.message));
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
  return (
    <React.Fragment>
      <Card className="table-card">
        <Card.Title className="setup-title">
          Barns
          <Button className="add-info" onClick={onHandleModal}>
            Add
          </Button>
        </Card.Title>
        <MasterTable
          data={barns}
          column={columns}
          action={actionColumnTemplate}
        />
      </Card>
      <DeleteAlert
        data={data}
        show={show.delete}
        close={handleClose}
        delete={removeBarn}
      />
      <Modal
        className="info-modal"
        show={show.add || show.edit}
        onHide={handleClose}
        static
      >
        <Modal.Header className="info-modal-header" closeButton>
          <Modal.Title className="info-modal-title">
            {" "}
            {show.edit ? " Edit Barn " : "Add Barn"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="info-modal-body">
          <p>Name</p>
          <input
            type="text"
            required
            className="form-control"
            placeholder="Name"
            value={barn.name}
            onChange={(e) => setBarn({ ...barn, name: e.target.value })}
          />
          <p>Category</p>
          <select
            className="form-control"
            value={barn.category}
            onChange={(e) => setBarn({ ...barn, category: e.target.value })}
          >
            <option>Select</option>
            <option>NURSERY</option>
            <option>FINISH</option>
            <option>SOW</option>
          </select>
          <p>Organisations</p>
          <select
            className="form-control"
            onChange={(e) =>
              e.target.value !== "Select"
                ? allFarms({ org_id: e.target.value })
                : null
            }
          >
            {show.edit ? (
              <option disabled selected>
                {barn.organization}
              </option>
            ) : (
              <option>Select</option>
            )}
            {filterOrg().map((o) => (
              <option key={o.org_id} value={o.org_id}>
                {" "}
                {o.name}{" "}
              </option>
            ))}
          </select>
          <p>Farm</p>
          <select
            className="form-control"
            onChange={(e) => setBarn({ ...barn, farm_id: e.target.value })}
            key={barn.farm_id}
          >
            {show.edit ? <option>{barn.farm}</option> : <option>Select</option>}
            {farms.map((f) => (
              <option key={f.id} value={f.id}>
                {" "}
                {f.name}{" "}
              </option>
            ))}
          </select>
          <p>Status</p>
          <select
            className="form-control"
            onChange={(e) => setBarn({ ...barn, status: e.target.value })}
          >
            {barn.status !== "" ? (
              <option>{barn.status}</option>
            ) : (
              <option>Select</option>
            )}
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </Modal.Body>
        <Modal.Footer className="info-modal-footer">
          <Button className="add-info" onClick={handleClose}>
            Cancel
          </Button>

          {show.edit ? (
            <Button className="add-info" onClick={updateBarn}>
              Save
            </Button>
          ) : (
            <Button className="add-info" onClick={addBarn}>
              Add
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}

export default Barns;
