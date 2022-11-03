import React, { useEffect, useState } from "react";
import {
  getUserRoles,
  getUser,
  addNewUser,
  editUser,
  deleteUser,
  getOrganization,
} from "../setupService";
import MasterTable from "../table";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { Modal, Button, Card } from "react-bootstrap";
import DeleteAlert from "../Master/deleteAlert";
function UserPage() {
  useEffect(() => {
    allUsers();
    allRoles();
    findAll();
  }, []);
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [orgs, setOrgs] = useState([]);
  const [data, setData] = useState();
  const [user, setUser] = useState({
    id: 0,
    name: "",
    email: "",
    category: "",
    org_id: "",
    role_id: "",
    password: "",
  });
  const [show, setShow] = useState({
    add: false,
    edit: false,
    delete: false,
  });
  const onHandleModal = () => {
    return setShow({ add: true });
  };
  const allUsers = () => {
    getUser()
      .then((res) => setUsers(res.data))
      .catch((err) => alert(err));
  };
  const allRoles = () => {
    getUserRoles()
      .then((res) => setRoles(res.data))
      .catch((err) => alert(err));
  };
  const addUser = () => {
    addNewUser(user)
      .then((res) => (res.data.registered ? allUsers() : alert(res.message)))
      .catch((err) => alert(err.message));
    setShow(false);
    setUser({
      id: 0,
      name: "",
      email: "",
      category: "",
      org_id: "",
      role_id: "",
      password: "",
    })
  };
  const updateUser = () => {
    editUser(user)
      .then((res) => (res.data.inserted ? allUsers() : alert(res.message)))
      .catch((err) => alert(err.message));
    setShow(false);
  };
  const removeUser = (e) => {
    const id = e.id;
    return (
      deleteUser(id)
        .then((res) => (res.data.removed ? allUsers() : alert(res.message)))
        .catch((error) => alert(error.message)),
      setShow(false)
    );
  };
  const findAll = () => {
    getOrganization().then((result) => {
      setOrgs(result.data);
    });
  };
  const filterOrg = () => {
    return orgs.filter((o) =>
       o.org_type === "CUSTOMER"
     );
   };
  const columns = [
    { field: "name", header: "Name" },
    { field: "email", header: "E-Mail" },
    { field: "category", header: "Category" },
    { field: "organization", header: "Organization" },
    { field: "role_name", header: "Role" },
    { field: "action", header: "Action" },
  ];
  const actionColumnTemplate = (e) => {
    return (
      <>
        {/* onClick={() => removePen(e)} */}
        <DeleteOutlineIcon onClick={() => onDeleteClick(e)} />
        <EditOutlinedIcon
          style={{ marginLeft: "16px" }}
          onClick={() => editModal(e)}
        />
      </>
    );
  };
  const handleClose = () => {
    return (
      setUser({
        id: 0,
        name: "",
        email: "",
        category: "",
        organization: "",
        role_name: "",
        password: "",
      }),
      setShow(false),
      setShow({ delete: false })
    );
  };
  const editModal = (e) => {
    return (
      setShow({ edit: true }),
      setUser({
        id: e.id,
        name: e.name,
        email: e.email,
        category: e.category,
        organization: e.organization,
        role_name: e.role_name,
      })
    );
  };
  const onDeleteClick = (e) => {
    // eslint-disable-next-line
    return setShow({ delete: true }), setData(e);
  };
  return (
    <React.Fragment>
      <Card className="table-card">
        <Card.Title className="setup-title">
          Users
          <Button className="add-info" onClick={onHandleModal}>
            Add
          </Button>
        </Card.Title>
        <MasterTable
          data={users}
          column={columns}
          action={actionColumnTemplate}
        />
      </Card>
      <DeleteAlert
        data={data}
        show={show.delete}
        close={handleClose}
        delete={removeUser}
      />
      <Modal
        className="info-modal"
        show={show.add || show.edit}
        onHide={handleClose}
      >
        <Modal.Header className="info-modal-header" closeButton>
          <Modal.Title className="info-modal-title">
            {" "}
            {show.edit ? " Edit User " : "Add User"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="info-modal-body">
          <p>Name</p>
          <input
            type="text"
            required
            className="form-control"
            placeholder="Name"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
          <p>E-Mail</p>
          <input
            type="text"
            required
            className="form-control"
            placeholder="E-Mail"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <p>Organisation</p>
          <select
            className="form-control"
            onChange={(e) => setUser({ ...user, org_id: e.target.value })}
          >
            {user.name !== "" ? (
              <option>{user.organization}</option>
            ) : (
              <option>Select</option>
            )}
            {filterOrg().map((r) => (
              <option key={r.org_id} value={r.org_id}>
                {" "}
                {r.name}{" "}
              </option>
            ))}
          </select>
          <p>Role</p>
          <select
            className="form-control"
            onChange={(e) => setUser({ ...user, role_id: e.target.value })}
          >
            {user.name !== "" ? (
              <option>{user.role_name}</option>
            ) : (
              <option>Select</option>
            )}
            {roles.map((r) => (
              <option key={r.id} value={r.id}>
                {" "}
                {r.role_name}{" "}
              </option>
            ))}
          </select>
          <p>Category</p>
          <select
            className="form-control"
            onChange={(e) => setUser({ ...user, category: e.target.value })}
          >
            {user.name !== "" ? (
              <option>{user.category}</option>
            ) : (
              <option>Select</option>
            )}
            <option>VETERINARIAN</option>
            <option>PARTNER</option>
            <option>CUSTOMER</option>
            <option>EMPLOYEE</option>
          </select>
          {show.edit ? null : (
            <>
              <p>Password</p>
              <input
                type="text"
                required
                className="form-control"
                placeholder="Password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </>
          )}
        </Modal.Body>
        <Modal.Footer className="info-modal-footer">
          <Button className="add-info" onClick={handleClose}>
            Cancel
          </Button>

          {show.edit ? (
            <Button className="add-info" onClick={updateUser}>
              Save
            </Button>
          ) : (
            <Button className="add-info" onClick={addUser}>
              Add
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}

export default UserPage;
