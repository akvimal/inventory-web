import React, { useEffect, useState } from "react";
import {
  addNewAlertMail,
  getAlertUser,
  getBarns,
  getFarms,
  getOrganization,
  getUser,
  removeAlertMail,
  updateAlertMail,
} from "../setupService";
import { Modal, Button, Card } from "react-bootstrap";
import MasterTable from "../table";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteAlert from "../Master/deleteAlert";
import ReactSelect from "../../utils/ReactSelect";

function AlertMail() {
  useEffect(() => {
    allAlertMail();
    allOrgs();
    // allUsers();
    // eslint-disable-next-line
  }, []);
  const customStyles = {
    control: (styles) => ({
      ...styles,

      background: "#545A61",
      borderRadius: "3px",
      // width: "80%",
      height: "32px",
      border: "0px solid black",
    }),
    valueContainer: (base) => ({
      ...base,
      width: "192px",
      height: 25,
    }),
    menu: (styles) => ({
      ...styles,
      background: "#29313a",
      width: "80%",
    }),
    option: (provided) => ({
      ...provided,
      color: "#EBAF00",
    }),
    singleValue: () => ({
      color: "#ffffff",
      fontWeight: "Medium",
      fontFamily: "Montserrat",
      fontSize: "12px",
    }),
    input: () => ({
      color: "#ffffff",
      fontWeight: "Medium",
      fontFamily: "Montserrat",
      fontSize: "12px",
    }),
    dropdownIndicator: () => ({
      marginRight: "5px",
      color: "#EBAF00 0% 0% no-repeat padding-box",
      opacity: "1",
    }),
    indicatorSeparator: () => ({
      display: "block",
    }),
    placeholder: (defaultStyles) => {
      return {
        ...defaultStyles,
        color: "#ffffff",
        fontWeight: "Medium",
        fontFamily: "Montserrat",
        fontSize: "12px",
      };
    },
  };
  const [alerts, setAlerts] = useState([]);
  const [orgs, setOrgs] = useState([]);
  const [farms, setFarms] = useState([]);
  const [barns, setBarns] = useState([]);
  const [users, setUsers] = useState([]);
  const [alertData, setAlertData] = useState([]);
  const [dupBarn, setDupBarn] = useState([]);
  const [data, setData] = useState();
  const [show, setShow] = useState({ add: false, edit: false, delete: false });
  const [alert, setAlert] = useState({
    id: 0,
    user_id: 0,
    barn_id: 0,
    status: "",
    user_name: "",
    org_id: 0,
    org: "",
    farm: "",
    farm_id: 0,
    barn: "",
    barns: [],
  });
  const filterOrg = () => {
    return orgs.filter((o) =>
       o.org_type === "CUSTOMER"
     );
   };
  const onHandleModal = () => {
    // eslint-disable-next-line
    return setShow({ add: true });
  };
  const allAlertMail = () => {
    getAlertUser()
      .then((res) => setAlerts(res.data))
      .catch((err) => alert(err));
  };
  const columns = [
    { field: "user", header: "Name" },
    { field: "org", header: "Organization" },
    { field: "farm", header: "Farm" },
    { field: "barn", header: "Barn" },
    { field: "email", header: "E-Mail" },
    { field: "status", header: "Status" },
    { field: "action", header: "Action" },
  ];
  const onDeleteClick = (e) => {
    // eslint-disable-next-line
    return setShow({ delete: true }), setData(e);
  };
  const handleClose = () => {
    return (
      setAlert({
        id: 0,
        user_id: 0,
        barn_id: 0,
        status: "",
        user_name: "",
        org_id: 0,
        org: "",
        farm: "",
        farm_id: 0,
        barn: "",
        barns: [],
      }),
      setShow(false),
      setShow({ delete: false }),
      setBarns([]),
      setAlertData([])
    );
  };
  const ar = [];
  useEffect(() => {
    allBarns({
      condition: "barn",
      organization_id: alert.org_id,
      farm_id: alert.farm_id,
    });
    alert.barns.map((a) =>
      ar.push({
        user_id: alert.user_id,
        status: alert.status,
        barn_id: a.id,
      })
    );
    setDupBarn(ar);
    ck();
    // eslint-disable-next-line
  }, [alert.org_id, alert.farm_id, alert.barns, alertData]);
  const editModal = (e) => {
    return (
      setAlert({
        id: e.id,
        barn_id: e.barn_id,
        user_id: e.user_id,
        user_name: e.user,
        org: e.org,
        org_id: e.org_id,
        barn: e.barn,
        farm: e.farm,
        farm_id: e.farm_id,
        status: e.status,
        barns: e.barns,
      }),
      setShow(false),
      setShow({ edit: true }),
      setAlertData([]),
      setDupBarn([])
    );
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
  const barnColumnTemplate = (e) => {
    return e.barns.map((b, i) => (
      <label key={b.name}>
        {i ? "," : ""}&nbsp;{b.name}
      </label>
    ));
  };
  const allUsers = (id) => {
    getUser(id)
      .then((res) => setUsers(res.data))
      .catch((err) => alert(err));
  };
  const allOrgs = () => {
    getOrganization()
      .then((res) => setOrgs(res.data))
      .catch((error) => alert(error));
  };
  const allFarms = (id) => {
    getFarms(id)
      .then((res) => setFarms(res.data))
      .catch((err) => alert(err));
  };
  const allBarns = (id) => {
    return getBarns(id)
      .then((res) => setBarns(res.data))
      .catch((err) => alert(err));
  };
  const addAlertMail = () => {
    return (
      addNewAlertMail(alertData)
        .then((res) =>
          res.data.inserted ? allAlertMail() : alert(res.message)
        )
        .catch((err) => alert(err)),
      setShow(false),
      setAlert({
        id: 0,
        user_id: 0,
        barn_id: 0,
        status: "",
        user_name: "",
        org_id: 0,
        org: "",
        farm: "",
        farm_id: 0,
        barn: "",
        barns: [],
      })
    );
  };
  const editAlertMail = () => {
    return (
      s !== []
        ? addNewAlertMail(s)
            .then((res) => (res.data.inserted ? allAlertMail() : null))
            .catch((err) => console.log(err))
        : null,
      alert.status
        ? updateAlertMail({ user_id: alert.user_id, status: alert.status })
            .then((res) => (res.data.inserted ? allAlertMail() : null))
            .catch((err) => console.log(err))
        : null,
      d !== []
        ? removeAlertMail(d)
            .then((res) => (res.data.removed ? allAlertMail() : null))
            .catch((err) => console.log(err))
        : null,
      setShow(false)
    );
  };
  // const editAlertMail = () => {
  //   return axios
  //     .all([
  //       s !== [] ? addNewAlertMail(s) : null,
  //       !alert.status
  //         ? updateAlertMail({ user_id: alert.user_id, status: alert.status })
  //         : null,
  //       d !== [] ? removeAlertMail(d) : null,
  //     ])
  //     .then(
  //       axios.spread((...res) => {
  //         const resOne = res[0];
  //         const resTwo = res[1];
  //         console.log(res);
  //         console.log(resOne);
  //         console.log(resTwo);
  //         // resOne.data.inserted && resTwo.data.inserted
  //         //   ? allAlertMail()
  //         //   : alert(res.message);
  //       })
  //     )
  //     .catch((err) => alert(err), setShow(false));
  // };
  const deleteAlertMail = (e) => {
    const id = [{ user_id: e.user_id }];
    return (
      removeAlertMail(id)
        .then((res) => (res.data.removed ? allAlertMail() : alert(res.message)))
        .catch((err) => alert(err)),
      setShow(false),
      setBarns([])
    );
  };
  const onOrgChange = (e) => {
    const id = e.target.value;
    // eslint-disable-next-line
    return (
      allFarms({ org_id: id }), allUsers({ org_id: id, condition: "user" })
    );
  };
  const options = barns.map((b) => {
    return {
      label: b.name,
      value: b.id,
    };
  });
  const onBarnChange = (e) => {
    const test = [];
    return (
      e !== null
        ? e.map((b) =>
            test.push({
              user_id: alert.user_id,
              status: alert.status,
              barn_id: b.value,
            })
          )
        : null,
      setAlertData(test)
    );
  };
  const listValues =
    alert.barns !== []
      ? alert.barns.map((b) => {
          return { label: b.name, value: b.id };
        })
      : null;
  const [s, setS] = useState([]);
  const [d, setD] = useState([]);
  const ck = () => {
    const results = alertData.filter(
      ({ barn_id: id1 }) => !dupBarn.some(({ barn_id: id2 }) => id2 === id1)
    );
    const results2 = dupBarn.filter(
      ({ barn_id: id1 }) => !alertData.some(({ barn_id: id2 }) => id2 === id1)
    );
    setD(results2);
    return show.edit ? setS(results) : null;
  };
  const onFarmChange = (e) => {
    return (
      allBarns({ farm_id: e.target.value, condition: "barn" }),
      setAlert({ ...alert, farm_id: e.target.value })
    );
  };
  return (
    <React.Fragment>
      <Card className="table-card">
        <Card.Title className="setup-title">
          Alert Mail
          <Button className="add-info" onClick={onHandleModal}>
            Add
          </Button>
        </Card.Title>
        <MasterTable
          data={alerts}
          column={columns}
          action={actionColumnTemplate}
          barn={barnColumnTemplate}
        />
      </Card>
      <DeleteAlert
        data={data}
        show={show.delete}
        close={handleClose}
        delete={deleteAlertMail}
      />
      <Modal
        className="info-modal"
        show={show.add || show.edit}
        onHide={handleClose}
      >
        <Modal.Header className="info-modal-header" closeButton>
          <Modal.Title className="info-modal-title">
            {" "}
            {show.edit ? " Edit Alert " : "Add Alert"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="info-modal-body">
          <p>Organisations</p>
          <select
            className="form-control"
            onChange={(e) =>
              e.target.value !== "Select" ? onOrgChange(e) : null
            }
          >
            {show.edit ? (
              <option disabled selected>
                {alert.org}
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
          <p>Farms</p>
          <select
            className="form-control"
            onChange={(e) =>
              e.target.value !== "Select" ? onFarmChange(e) : null
            }
          >
            {show.edit ? (
              <option disabled selected>
                {alert.farm}
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
          <p>Users</p>
          <select
            className="form-control"
            onChange={(e) => setAlert({ ...alert, user_id: e.target.value })}
          >
            {show.edit ? (
              <option>{alert.user_name}</option>
            ) : (
              <option>Select</option>
            )}
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>
          <p>Status</p>
          <select
            className="form-control"
            onChange={(e) => setAlert({ ...alert, status: e.target.value })}
          >
            {show.edit ? (
              <option> {alert.status} </option>
            ) : (
              <option>Select</option>
            )}
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <p>Barn</p>
          {/* {show.edit
            ? alert.barns.map((b) => (
                <>
                  <span
                    className="badge badge-secondary"
                    style={{ fontSize: "15px", marginRight: "10px" }}
                  >
                    {b.name}
                    <DeleteIcon
                      htmlFor={b.name}
                      style={{ backgroundColor: "black" }}
                      onClick={(e) => console.log(e.target.value)}
                    />
                  </span>
                </>
              ))
            : null} */}
          <ReactSelect
            // value={selectedValues}
            defaultValue={listValues}
            customStyles={customStyles}
            Multi={true}
            options={options}
            onChange={(e) => onBarnChange(e)}
          />
          {/* <p>Status</p>
          <input
            type="radio"
            id="active"
            name="status"
            value="Active"
            checked={alert.status === "Active"}
            onChange={(e) => onStatusChange(e)}
          />
          &nbsp;&nbsp;
          <label htmlFor="Active">Active</label>{" "}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <input
            type="radio"
            id="inactive"
            name="status"
            value="Inactive"
            checked={alert.status === "Inactive"}
            onChange={(e) => onStatusChange(e)}
          />
          &nbsp;&nbsp;
          <label htmlFor="Inactive">Inactive</label> */}
        </Modal.Body>
        <Modal.Footer className="info-modal-footer">
          <Button className="add-info" onClick={handleClose}>
            Cancel
          </Button>

          {show.edit ? (
            <Button className="add-info" onClick={editAlertMail}>
              Save
            </Button>
          ) : (
            <Button className="add-info" onClick={addAlertMail}>
              Add
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}

export default AlertMail;
