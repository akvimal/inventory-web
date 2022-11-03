import React, { useEffect, useState } from "react";
import {
  addNewPen,
  deletePen,
  editPens,
  getBarns,
  getFarms,
  getOrganization,
  getPens,
} from "../setupService";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { Modal, Button, Card } from "react-bootstrap";
import MasterTable from "../table";
import DeleteAlert from "./deleteAlert";
function Pens() {
  const [pens, setPens] = useState([]);
  const [barns, setBarns] = useState([]);
  const [farms, setFarms] = useState([]);
  const [orgs, setOrgs] = useState([]);
  const [data, setData] = useState();
  const [pen, setPen] = useState({
    id: 0,
    name: "",
    length_mts: "",
    breadth_mts: "",
    barn: "",
    barn_id: "",
    organisation: "",
    farm: "",
  });
  const [show, setShow] = useState({
    add: false,
    edit: false,
    delete: false,
  });

  useEffect(() => {
    allPens();
    // allBarns();
    // allFarms();
    allOrgs();
  }, []);
  const onHandleModal = () => {
    // eslint-disable-next-line
    return setShow({ add: true });
  };
  const handleClose = () => {
    return (
      setPen({
        id: 0,
        name: "",
        length_mts: "",
        breadth_mts: "",
        barn: "",
        barn_id: "",
      }),
      setShow(false),
      setShow({ delete: false })
    );
  };
  const editModal = (e) => {
    return (
      setShow({ edit: true }),
      setPen({
        id: e.id,
        name: e.name,
        length_mts: e.length_mts,
        breadth_mts: e.breadth_mts,
        barn_id: e.barn_id,
        barn: e.barn,
        organisation: e.organization,
        farm: e.farm,
      })
    );
  };
  const onDeleteClick = (e) => {
    // eslint-disable-next-line
    return setShow({ delete: true }), setData(e);
  };
  const allPens = () => {
    getPens()
      .then((res) => setPens(res.data))
      .catch((error) => alert(error.message));
  };
  const allBarns = (id) => {
    getBarns(id)
      .then((res) => setBarns(res.data))
      .catch((error) => alert(error));
  };
  const allFarms = (id) => {
    getFarms(id)
      .then((res) => setFarms(res.data))
      .catch((error) => alert(error));
  };
  const allOrgs = () => {
    getOrganization()
      .then((res) => setOrgs(res.data))
      .catch((error) => alert(error));
  };
  const filterOrg = () => {
    return orgs.filter((o) =>
       o.org_type === "CUSTOMER"
     );
   };
  const columns = [
    { field: "name", header: "Name" },
    { field: "length_mts", header: "Length(mts)" },
    { field: "breadth_mts", header: "Breadth(mts)" },
    { field: "organization", header: "Organization" },
    { field: "farm", header: "Farm" },
    { field: "barn", header: "Barn" },
    { field: "action", header: "Action" },
  ];
  const removePen = (e) => {
    const id = e.id;
    return (
      deletePen(id)
        .then((res) => (res.data.removed ? allPens() : alert(res.message)))
        .catch((error) => alert(error.message)),
      setShow(false)
    );
  };
  const addPen = () => {
    addNewPen(pen)
      .then((res) => (res.data.inserted ? allPens() : alert(res.message)))
      .catch((err) => alert(err.message));
    setShow(false);
    setPen({
      id: 0,
      name: "",
      length_mts: "",
      breadth_mts: "",
      barn: "",
      barn_id: "",
      organisation: "",
      farm: "",
    })
  };
  const updatePen = () => {
    editPens(pen)
      .then((res) => (res.data.inserted ? allPens() : alert(res.message)))
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
          Pens
          <Button className="add-info" onClick={onHandleModal}>
            Add
          </Button>
        </Card.Title>
        <MasterTable
          data={pens}
          column={columns}
          action={actionColumnTemplate}
        />
      </Card>
      <DeleteAlert
        data={data}
        show={show.delete}
        close={handleClose}
        delete={removePen}
      />
      <Modal
        className="info-modal"
        show={show.add || show.edit}
        onHide={handleClose}
      >
        <Modal.Header className="info-modal-header" closeButton>
          <Modal.Title className="info-modal-title">
            {" "}
            {show.edit ? " Edit Pen " : "Add Pen"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="info-modal-body">
          <p>Name</p>
          <input
            type="text"
            required
            className="form-control"
            placeholder="Name"
            value={pen.name}
            onChange={(e) => setPen({ ...pen, name: e.target.value })}
          />
          <p>Length(mts)</p>
          <input
            type="text"
            required
            className="form-control"
            placeholder="Length(mts)"
            value={pen.length_mts}
            onChange={(e) => setPen({ ...pen, length_mts: e.target.value })}
          />
          <p>Breadth(mts)</p>
          <input
            type="text"
            required
            className="form-control"
            placeholder="Bredth(mts)"
            value={pen.breadth_mts}
            onChange={(e) => setPen({ ...pen, breadth_mts: e.target.value })}
          />
          <p>Organisation</p>
          <select
            className="form-control"
            onChange={(e) =>
              e.target.value !== "Select"
                ? allFarms({ org_id: e.target.value })
                : null
            }
          >
            {show.edit ? (
              <option disabled selected >
                {pen.organisation}
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
            onChange={(e) =>
              e.target.value !== "Select"
                ? allBarns({ farm_id: e.target.value })
                : null
            }
          >
            {show.edit ? (
              <option disabled selected >
                {pen.farm}
              </option>
            ) : (
              <option>Select</option>
            )}
            {farms.map((o) => (
              <option key={o.id} value={o.id}>
                {" "}
                {o.name}{" "}
              </option>
            ))}
          </select>
          <p>Barn</p>
          <select
            className="form-control"
            onChange={(e) => setPen({ ...pen, barn_id: e.target.value })}
          >
            {show.edit ? (
              <option>
                {pen.barn}
              </option>
            ) : (
              <option>Select</option>
            )}
            {barns.map((f) => (
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
            <Button className="add-info" onClick={updatePen}>
              Save
            </Button>
          ) : (
            <Button className="add-info" onClick={addPen}>
              Add
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </React.Fragment>

    // <b>Pens</b>
  );
}

export default Pens;
