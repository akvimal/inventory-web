/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import { Grid } from "@material-ui/core";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useEffect, useState } from "react";
import { Button, Card, Form, Modal, Table } from "react-bootstrap";
import apconfig from "../../../config/apconfig";
import ReactSelect from "../../utils/ReactSelect";
import { getProjects } from "../setupService";
import AddDevice from "./AddDevice";
import DeviceStatus from "./DeviceStatus";

function Devices() {
  const [device, setDevice] = useState({
    id: 0,
    type: "",
    custom_id: "",
    alternate_id: "",
    comm_date: "",
    decomm_date: "",
    status: "",
    cost: 0,
    cycle: 0,
    type_id: 0,
  });
  const init_profile = {
    id: "",
    type: "",
    organization: "",
    location: "",
    abbreviation: "",
  };
  const [profile, setProfile] = useState(init_profile);

  const [lastValue, setLastValue] = useState([]);
  const [newStatus, setNewStatus] = useState({
    org_loc_id: "",
    to_status: "",
    sys_pig_id: "",
    pen_id: "",
    start_date: "",
    end_date: "",
    aggregators: "",
    comments: "",
    purpose: "",
    farm_pig_id: "",
    dob: "",
    project_id: "",
  });
  // eslint-disable-next-line no-unused-vars
  const [sendStatus, setSendStatus] = useState([]);

  const [filterDevice, setFilterDevice] = useState(false);

  const [showStatusUpdateModal, setShowStatusUpdateModal] = useState(false);
  const hideStatusUpdateForm = () => {
    setSendStatus([]);
    setSelectedProduct1(null);
    setDevice({
      ...device,
      custom_id: "",
      alternate_id: "",
      status: "",
      type_id: "",
    });
    setShowStatusUpdateModal(false);
    setRefresh(!refresh);
    setSelectedProduct1(null);
    setFilterDevice(false);
  };
  const [organizations, setOrganizations] = useState([]);

  const [addShow, setAddShow] = useState(false);
  const [addPiShow, setAddPiShow] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const handleAddShow = () => setAddShow(true);
  const handleAddPiShow = () => setAddPiShow(true);
  const handleAddHide = () => {
    setAddShow(false);
    setRefresh(!refresh);
  };
  const handleAddPiHide = () => {
    setAddPiShow(false);
  };
  const [devices, setDevices] = useState([]);
  const [devTypes, setDevTypes] = useState([]);
  const [status, setStatus] = useState([]);
  const [state, setState] = useState([]);
  const [orgLocations, setOrgLocations] = useState([]);
  const [workflow, setWorkflow] = useState([]);
  const [penId, setPenId] = useState([]);
  const [selectValue, setSelectValue] = useState("");
  const [currentStatus, setCurrentStatus] = useState("");

  const setProfileOrg = (org_loc) => {
    setProfile(org_loc);
  };
  const [org, setOrg] = useState();

  const [selectedProduct1, setSelectedProduct1] = useState(null);
  const [projects, setProjects] = useState([]);
  const getTokenFromStorage = () => localStorage.getItem("token");

  const headers = {
    headers: {
      Accept: "application/json",
      "auth-token": getTokenFromStorage(),
    }
  }

  // useEffect(() => {
  //   loadConfig();
  //   loadOrganizations();
  //   findAll();
  //   findDevTypes();
  //   findStatusTypes();
  // }, []);

  useEffect(() => {
    loadConfig();
    loadOrganizations();
    findAll();
    findDevTypes();
    findStatusTypes();
    findProjects();
    if (profile.id !== "") {
      findPenID(profile.id);
    }
  }, [refresh, profile]);

  const findProjects = () => {
    getProjects({ condition: "Date" })
      .then((response) => setProjects(response.data))
      .catch((error) => console.log(error));
  };
  const [checkDevTypes, setCheckDevTypes] = useState("");

  const showStatusUpdateForm = (e, d, f) => {
    setLastValue([]);
    setCheckDevTypes(f);
    d.forEach((v) => {
      const org = workflow.find((o) => o.org === profile.type.toLowerCase());

      const action = org.actions.find((a) => a.current === v.status);
      const to = action.next.find((t) => t.status === e.target.value);

      if (to !== undefined && to.org !== undefined) {
        const target_org =
          typeof to !== "string" && to.org !== undefined && to.org;
        const orgs = organizations.filter(
          (o) => o.type === target_org.toUpperCase()
        );
        setOrgLocations(orgs);
      }

      setNewStatus({ ...newStatus, ...d, to_status: e.target.value });

      sendStatus.push({
        alternate_id: v.alternate_id,
        comm_date: v.comm_date,
        cost: v.cost,
        custom_id: v.custom_id,
        cycle: v.cycle,
        decomm_date: null,
        id: v.id,
        status: v.status,
        status_date: v.status_date,
        status_id: v.status_id,
        type: v.type,
        org_loc_id: newStatus.org_loc_id,
        to_status: e.target.value,
        sys_pig_id: newStatus.sys_pig_id,
        pen_id: newStatus.pen_id,
        start_date: newStatus.start_date,
        end_date: newStatus.end_date,
        aggregators: newStatus.aggregators,
        comments: newStatus.comments,
        farm_pig_id: newStatus.farm_pig_id,
        purpose: "",
        abbreviation: profile.abbreviation,
        dob: newStatus.dob,
        project_id: newStatus.project_id,
      });

      setCurrentStatus(sendStatus[0].status);
    });

    setShowStatusUpdateModal(true);
  };

  function loadConfig() {
    apconfig.get("/statuses/workflow", headers).then((result) => {
      setWorkflow(result.data);
    });
  }

  function loadOrganizations() {
    apconfig.get(`/organizations/locations`, headers).then((result) => {
      const orgsCopy = [];
      result.data.forEach((element) => {
        orgsCopy.push({
          id: element.id,
          type: element.org_type,
          organization: element.name,
          location: element.city,
          abbreviation: element.abbreviation,
        });
      });
      setOrganizations(orgsCopy);
    });
  }

  function findDevTypes() {
    apconfig.get(`/settings/device/types`, headers).then((result) => {
      const copy = [];
      result.data.forEach((element) => {
        copy.push({ id: element.id, name: element.name });
      });
      setDevTypes(copy);
    });
  }

  function findPenID(id) {
    apconfig.get(`/customers/aggregators/${id}`, headers).then((result) => {
      const copy = [];
      // eslint-disable-next-line array-callback-return
      result.data.map((a) => {
        copy.push({ id: a.pen_id, name: a.pen_name });
      });
      setPenId(copy);
    });
  }
  function findStatusTypes() {
    const copy = [...workflow];

    const org = copy.find((f) => f.org === profile.type.toLowerCase());
    let statuses = [];
    if (org !== undefined && org.actions !== undefined) {
      statuses = org.actions.map((a) => {
        return typeof a === "string" ? a : a.current;
      });
    }
    setStatus(statuses);
  }

  function findAll() {
    console.log(profile.id);
    apconfig
      .get(`/devices?org=${profile.id}`, headers)
      .then((result) => {
        const copy = [];
        result.data.forEach((element) => {
          copy.push({
            id: element.id,
            status_id: element.status_id,
            type: element.type,
            custom_id: element.custom_id,
            alternate_id: element.alternate_id,
            status_date: element.begin_date,
            comm_date: element.comm_date,
            decomm_date: element.decomm_date,
            cost: element.cost_per_device,
            cycle: element.cycle,
            status: element.status,
          });
        });
        setDevices(copy);
      });
    setAddPiShow(false);
    setAddShow(false);
  }

  function findLastDetails() {
    const id = sendStatus[0].custom_id;
    apconfig
      .get(`/statuses/last_pig`, { params: { device: id }, headers })
      .then((result) => {
        setLastValue(result.data);
        setNewStatus({
          ...newStatus,
          pen_id: result.data[0].pen_id,
          sys_pig_id: result.data[0].sys_pig_id,
        });
      });

    console.log(lastValue);
  }
  function statuses(id) {
    const copy = [...devices];
    copy.forEach((element) => {
      element.statuses = element.id === id;
    });
    setDevices(copy);
  }

  function search() {
    apconfig
      .post(`/devices/filter`, { ...device, org: profile.id }, headers)
      .then((result) => {
        const copy = [];
        result.data.forEach((element) => {
          copy.push({
            id: element.id,
            type: element.type,
            custom_id: element.custom_id,
            status_id: element.status_id,
            alternate_id: element.alternate_id,
            status_date: element.begin_date,
            comm_date: element.comm_date,
            decomm_date: element.decomm_date,
            cost: element.cost_per_device,
            cycle: element.cycle,
            status: element.status,
          });
        });
        setDevices(copy);
        setSelectedProduct1(null);
        device.status !== "" && setFilterDevice(true);
      });
  }
  function submitChangeStatus() {
    sendStatus.forEach((v) => {
      if (v.pen_id === "") v.pen_id = newStatus.pen_id;
      if (v.sys_pig_id == "") v.sys_pig_id = newStatus.sys_pig_id;
      if (v.start_date == "") v.start_date = newStatus.start_date;
      if (v.end_date == "") v.end_date = newStatus.end_date;
      if (v.aggregators == "") v.aggregators = newStatus.aggregators;
      if (v.comments == "") v.comments = newStatus.comments;
      if (v.org_loc_id == "") v.org_loc_id = newStatus.org_loc_id;
      if (v.purpose == "") v.purpose = newStatus.purpose;
      if (v.farm_pig_id == "")
        v.farm_pig_id =
          newStatus.farm_pig_id === "" ? undefined : newStatus.farm_pig_id;
      if (v.dob == "") v.dob = newStatus.dob;
      if (v.project_id == "") v.project_id = newStatus.project_id;
    });

    apconfig.put(`/statuses/change`, { data: sendStatus }, headers).then((result) => {
      result.data.inserted
        ? setShowStatusUpdateModal(false)
        : alert(result.message);
      findAll();
    });

    setNewStatus({
      org_loc_id: "",
      to_status: "",
      sys_pig_id: "",
      pen_id: "",
      start_date: "",
      end_date: "",
      aggregators: "",
      comments: "",
      purpose: "",
      farm_pig_id: "",
      dob: "",
      project_id: ""
    });

    setSelectValue("");
    setSendStatus([]);
    setDevice({
      ...device,
      custom_id: "",
      alternate_id: "",
      status: "",
      type_id: "",
    });
    setFilterDevice(false);
  }
  const [checkBox, setCheckBox] = useState(false);
  const checkHandle = (e) => {
    setSelectedProduct1(e.value);
    const chk = devices.map((d) =>
      e.value.map((v) => d.custom_id === v.custom_id)
    );
    const cx = chk.map((c) => c.includes(true));
    const abc = cx.includes(true);
    setCheckBox(abc);
  };
  const getActions = (orgtype, devtype, status) => {
    const copy = [...workflow];
    const org = copy.find((f) => f.org === orgtype);
    const action = org && org.actions.find((a) => a.current === status);

    if (action !== undefined) {
      if (action.next !== undefined) {
        const ss = action.next.map((a) => {
          if (typeof a === "string") {
            return a;
          } else {
            if (a.devices === undefined || a.devices.indexOf(devtype) !== -1) {
              return a.status;
            } else return null;
          }
        });
        return ss;
      }
    }
    return null;
  };
  const sel =
    selectedProduct1 !== null ? selectedProduct1.map((s) => s.type) : null;
  const bulkUpdate = () => {
    const actions = [];
    selectedProduct1.forEach((d) => {
      const da = getActions(profile.type.toLowerCase(), d.type, d.status);
      actions.push(da);
    });
    return (
      <>
        {actions[0] && (
          <>
            <select
              className="form-control search-value "
              onChange={(e) => showStatusUpdateForm(e, selectedProduct1)}
              style={{ marginLeft: "-20px" }}
            >
              <option>Select</option>
              {actions[0].map(
                (s, i) => s !== null && <option key={i}>{s}</option>
              )}
            </select>
          </>
        )}
      </>
    );
  };
  const checkst = () => {
    const c = devices.map((e) => device.status === e.status);
    const l = c.includes(false);
    return l !== false ? false : true;
  };
  const columns = [
    { field: "type", header: "TYPE" },
    { field: "custom_id", header: "CUSTOM ID" },
    { field: "alternate_id", header: "ALTERNATE ID" },
    { field: "status_date", header: "DATE" },
    {
      field: "status",
      header:
        selectedProduct1 !== null &&
          device.status !== "" &&
          checkst() &&
          checkBox === true
          ? bulkUpdate()
          : "Status",
    },
    // { field: "actions", header: "ACTION" },
    // { field: "history", header: "HISTORY", expander: true },
  ];

  // const statusColumnTemplate = (d) => {
  //   console.log(d);
  //   return <>
  //   <option> {d.status} </option>
  //   </>;
  // };

  const customStyles = {
    control: (styles) => ({
      ...styles,

      background: "#545A61",
      borderRadius: "3px",
      width: "100%",
      height: "32px",
      border: "0px solid black",
    }),
    menu: (styles) => ({
      ...styles,
      background: "#29313a",
      color: "#f7b924",
    }),
    singleValue: () => ({
      color: "#ffffff",
      fontWeight: "Medium",
      fontFamily: "Montserrat",
      fontSize: "15px",
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
        fontSize: "15px",
      };
    },
  };

  const actionsColumnTemplate = (d) => {
    const actions = getActions(profile.type.toLowerCase(), d.type, d.status);
    return (
      <>
        {actions && (
          <select
            value={selectValue}
            className="form-control search-value"
            onChange={(e) => showStatusUpdateForm(e, [d], d.type)}
          // options={actions.map((s) => s !== null && { value: s, label: s })}
          // customStyles={customStyles}
          >
            <option> Select </option>
            {actions.map((s, i) => s !== null && <option key={i}>{s}</option>)}
          </select>
        )}
      </>
    );
  };

  const dynamicColumns = columns.map((col, i) => {
    return (
      <Column
        key={i}
        field={col.field}
        header={col.header}
        expander={col.expander}
      // body={
      //   col.field === "actions"
      //     ? device.status === ""
      //       ? actionsColumnTemplate
      //       : null
      //     : null
      // }
      />
    );
  });

  const rowExpansionTemplate = (data) => {
    return (
      <div className="orders-subtable">
        <DeviceStatus id={data.id} />
      </div>
    );
  };
  const onRowExpand = (e) => {
    statuses(e.id);
  };
  const isAllRequiredMet = () => {
    return (
      newStatus.to_status === "CALIBRATION-START" &&
      (newStatus.start_date === "" ||
        newStatus.end_date === "" ||
        newStatus.aggregators === "")
    );
  };

  const clearAll = () => {
    setRefresh(!refresh);
    setDevice({
      ...device,
      custom_id: "",
      alternate_id: "",
      status: "",
      type_id: 0,
    });
    setFilterDevice(false);
  };

  const go = () => {
    setProfileOrg(organizations.find((o) => o.id == org));
    setDevice({
      ...device,
      custom_id: "",
      alternate_id: "",
      status: "",
      type_id: "",
    });
  };

  return (
    <>
      <Card className="master-card">
        <div className="rpdashText">
          FARM
          <hr style={{ marginRight: "2.5vw" }} className="new4" />
          <Grid container>
            <Grid item xs={5}>
              <ReactSelect
                className="form-control org-type"
                value={organizations.id}
                customStyles={customStyles}
                onChange={(e) => {
                  setOrg(e.value);
                }}
                options={organizations.map(
                  (o) =>
                    o !== null && {
                      value: o.id,
                      label: `${o.type} , ${o.organization} - ${o.location}`,
                    }
                )}
              >
                {/* <option>Select</option>
                {organizations.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.type} - {o.organization}, {o.location}
                  </option>
                ))} */}
              </ReactSelect>
            </Grid>
            <Grid item xs={1}>
              <Button
                variant="warning"
                style={{
                  textTransform: "uppercase",
                  color: "white",
                  marginLeft: "50px",
                }}
                onClick={() => go()}
              >
                Go
              </Button>
            </Grid>
            <Grid item xs={5}>
              {profile.type.toLowerCase() == "manufacturer" && (
                <Button
                  variant="warning"
                  style={{
                    textTransform: "uppercase",
                    color: "white",
                    marginLeft: "30px",
                  }}
                  onClick={handleAddShow}
                >
                  Add Device
                </Button>
              )}

              {profile.type.toLowerCase() == "warehouse" && (
                <Button
                  variant="warning"
                  style={{
                    textTransform: "uppercase",
                    color: "white",
                    marginLeft: "30px",
                  }}
                  onClick={handleAddPiShow}
                >
                  Add Device
                </Button>
              )}
            </Grid>
          </Grid>
        </div>
        <Modal
          dialogClassName="my-modal"
          backdrop="static"
          show={addShow}
          onHide={handleAddHide}
          className="device-modal"
        >
          <Modal.Header className="device-modal-header" closeButton>
            <Modal.Title>Add Device</Modal.Title>
          </Modal.Header>
          <Modal.Body className="device-modal-body">
            <AddDevice findDevice={findAll} />
          </Modal.Body>
        </Modal>

        <Modal
          dialogClassName="my-modal"
          backdrop="static"
          show={addPiShow}
          onHide={handleAddPiHide}
          className="device-modal"
        >
          <Modal.Header className="device-modal-header" closeButton>
            <Modal.Title>Add Device</Modal.Title>
          </Modal.Header>
          <Modal.Body className="device-modal-body">
            <AddDevice findDevice={findAll} />
          </Modal.Body>
        </Modal>
      </Card>
      <Card className="test-card">
        <Card className="table-card">
          {/* <Card.Title id="farm-title">Devices</Card.Title> */}
          <Card.Title>
            <p id="farm-title">Devices</p>
            <Table>
              <tbody>
                <tr>
                  <td>
                    <label style={{ color: "#f7b924", fontSize: "9pt" }}>
                      Type
                    </label>
                    <select
                      className="form-control search-value"
                      value={device.type_id}
                      onChange={(e) =>
                        setDevice({ ...device, type_id: e.target.value })
                      }
                    >
                      <option value="">Select</option>
                      {devTypes.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <label style={{ color: "#f7b924", fontSize: "9pt" }}>
                      status
                    </label>
                    <select
                      className="form-control search-value"
                      value={device.status}
                      onChange={(e) =>
                        setDevice({ ...device, status: e.target.value })
                      }
                    >
                      <option value="">Select</option>
                      {status.map((s, i) => (
                        <option key={i}>{s}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <label style={{ color: "#f7b924", fontSize: "9pt" }}>
                      Custom ID / Alternate ID
                    </label>
                    <input
                      type="text"
                      className="form-control search-value"
                      onChange={(e) =>
                        e.target.value.length >= 12
                          ? setDevice({
                            ...device,
                            alternate_id: e.target.value,
                            custom_id: "",
                          })
                          : setDevice({
                            ...device,
                            custom_id: e.target.value,
                            alternate_id: "",
                          })
                      }
                    ></input>
                  </td>
                  <td>
                    <Button
                      variant="warning"
                      style={{
                        marginTop: "30px",
                        color: "white",
                        textTransform: "uppercase",
                      }}
                      onClick={search}
                    >
                      Search
                    </Button>
                  </td>
                  {filterDevice ? (
                    <td>
                      <label className="clear-label" onClick={() => clearAll()}>
                        Clear All
                      </label>
                    </td>
                  ) : null}
                </tr>
              </tbody>
            </Table>
            {/* <div className="row mb-3">
              <div className="col-6">{head()}</div>
            </div> */}
          </Card.Title>
          <Card.Body>
            <DataTable
              className="info-table"
              expandedRows={state}
              selection={selectedProduct1}
              onSelectionChange={(e) => checkHandle(e)}
              dataKey="id"
              onRowToggle={(e) => setState(e.data)}
              onRowExpand={onRowExpand}
              rowExpansionTemplate={rowExpansionTemplate}
              value={devices}
              paginator
              paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
              currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
              paginatorLeft
              rows={10}
            // selectionMode="checkbox"
            >
              {filterDevice ? (
                <Column
                  selectionMode="multiple"
                  headerStyle={{ width: "3em" }}
                ></Column>
              ) : null}
              {dynamicColumns}
              {(filterDevice === false || device.type_id !== "") &&
                filterDevice === false ? (
                <Column
                  field="action"
                  header="Action"
                  body={actionsColumnTemplate}
                ></Column>
              ) : null}
              <Column field="history" header="History" expander={true}></Column>
            </DataTable>
            {devices.statuses ? alert("Success") : null}
          </Card.Body>
        </Card>
      </Card>

      <div className="row">
        <div id="devices">
          <div className="card"></div>

          <Modal
            backdrop="static"
            show={showStatusUpdateModal}
            onHide={hideStatusUpdateForm}
            className="status-modal"
          >
            <Modal.Header closeButton className="status-modal-header">
              <Modal.Title style={{ color: "#999" }}>Change Status</Modal.Title>
            </Modal.Header>
            <Modal.Body className="status-modal-body">
              <Form>
                <Form.Group>
                  <Form.Label className="status-label">
                    Custom ID:&nbsp;
                  </Form.Label>
                  <label style={{ color: "white" }}>
                    {sendStatus.map((e) => `${e.custom_id},  `)}
                  </label>
                  <br />
                  {sendStatus.length > 1 ? null : (
                    <>
                      <Form.Label className="status-label">
                        Alternate ID:&nbsp;
                      </Form.Label>
                      <label style={{ color: "white" }}>
                        {sendStatus.map((e) => ` ${e.alternate_id}`)}
                      </label>
                    </>
                  )}
                </Form.Group>
                {newStatus.to_status.endsWith("SHIPPED") && (
                  <Form.Group>
                    <Form.Label className="status-label">
                      Organization
                    </Form.Label>
                    <Form.Control
                      className="search-value"
                      as="select"
                      value={newStatus.org_loc_id}
                      onChange={(e) =>
                        setNewStatus({
                          ...newStatus,
                          org_loc_id: e.target.value,
                        })
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
                )}

                {newStatus.to_status === "INSTALLED-ACTIVE" ? (
                  <>
                    {checkDevTypes === "BaconBit" ||
                      checkDevTypes === "SowBitC" ||
                      (sel !== null && sel.includes("BaconBit")) ||
                      (sel !== null && sel.includes("SowBitC")) ? (
                      <>
                        <Form.Group>
                          {lastValue.length > 0 ? (
                            <>
                              {" "}
                              <Form.Label className="status-label">
                                Sys Pig ID:{" "}
                              </Form.Label>{" "}
                              {lastValue[0].sys_pig_id}
                            </>
                          ) : null}
                          <Form.Label className="status-label">
                            Farm Pig ID
                          </Form.Label>
                          <Form.Control
                            className="search-value"
                            type="text"
                            value={newStatus.farm_pig_id}
                            placeholder={newStatus.farm_pig_id}
                            onChange={(e) =>
                              setNewStatus({
                                ...newStatus,
                                farm_pig_id: e.target.value,
                              })
                            }
                          />
                        </Form.Group>
                        <Form.Group>
                          <Form.Label className="status-label">DOB</Form.Label>
                          <Form.Control
                            className="search-value"
                            type="date"
                            value={newStatus.dob}
                            onChange={(e) =>
                              setNewStatus({
                                ...newStatus,
                                dob: e.target.value,
                              })
                            }
                          />
                        </Form.Group>
                        <Form.Group>
                          <Form.Label className="status-label">
                            Project
                          </Form.Label>
                          <Form.Control
                            className="search-value"
                            as="select"
                            value={newStatus.project_id}
                            onChange={(e) =>
                              setNewStatus({
                                ...newStatus,
                                project_id: e.target.value,
                              })
                            }
                          >
                            <option>Select</option>
                            {projects.map((p) => (
                              <option key={p.id} value={p.id}>
                                {" "}
                                {p.name}{" "}
                              </option>
                            ))}
                          </Form.Control>
                        </Form.Group>
                      </>
                    ) : null}
                    {checkDevTypes === "RaspberryPi" ||
                      checkDevTypes === "RaspberryPiEnv" ||
                      checkDevTypes === "BaconBit" ||
                      checkDevTypes === "SowBitC" ||
                      checkDevTypes === "Env Sensor" ||
                      (sel !== null && sel.includes("BaconBit")) ||
                      (sel !== null && sel.includes("SowBitC")) ||
                      (sel !== null && sel.includes("RaspberryPi")) ||
                      (sel !== null && sel.includes("RaspberryPiEnv")) ||
                      (sel !== null && sel.includes("Env Sensor")) ? (
                      <Form.Group>
                        <Form.Label className="status-label">Pen</Form.Label>
                        <Form.Control
                          className="search-value"
                          as="select"
                          value={
                            lastValue.length > 0
                              ? lastValue[0].pen
                              : newStatus.pen_id
                          }
                          onChange={(e) =>
                            setNewStatus({
                              ...newStatus,
                              pen_id:
                                lastValue.length > 0
                                  ? lastValue[0].pen_id
                                  : e.target.value,
                            })
                          }
                        >
                          <option>
                            {" "}
                            {lastValue.length > 0
                              ? lastValue[0].pen
                              : "Select"}{" "}
                          </option>
                          {penId.map((p) => {
                            return (
                              <option key={p.id} value={p.id}>
                                {p.name}
                              </option>
                            );
                          })}
                        </Form.Control>
                      </Form.Group>
                    ) : null}
                    {currentStatus === "INSTALLED-TAGFELLOFF" ? (
                      <Form.Group>
                        <Form.Check
                          type="checkbox"
                          onClick={() => findLastDetails(sendStatus.custom_id)}
                          label="Same as before"
                          style={{ paddingLeft: "23px" }}
                        />
                      </Form.Group>
                    ) : null}
                  </>
                ) : null}

                <Form.Group>
                  <Form.Label className="status-label">
                    Effective Date
                  </Form.Label>
                  <Form.Control
                    className="search-value"
                    type="date"
                    value={newStatus.start_date}
                    onChange={(e) =>
                      setNewStatus({
                        ...newStatus,
                        start_date: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                {(checkDevTypes === "RaspberryPi" ||
                  checkDevTypes === "RaspberryPiEnv" ||
                  checkDevTypes === "Env Sensor" ||
                  (sel !== null && sel.includes("RaspberryPi")) ||
                  (sel !== null && sel.includes("RaspberryPiEnv")) ||
                  (sel !== null && sel.includes("Env Sensor"))) &&
                  newStatus.to_status === "INSTALLED-ACTIVE" ? (
                  <Form.Group>
                    <Form.Label className="status-label">Purpose</Form.Label>
                    <Form.Control
                      className="search-value"
                      as="select"
                      value={newStatus.purpose}
                      onChange={(e) =>
                        setNewStatus({ ...newStatus, purpose: e.target.value })
                      }
                    >
                      <option>Select</option>
                      <option value="Feed">Feed</option>
                      <option value="Water">Water</option>
                      <option value="Environment">Environment</option>
                      <option value="Temperature">Temperature</option>
                      <option value="Ammonia">Ammonia</option>
                      <option value="Humidity">Humidity</option>
                    </Form.Control>
                  </Form.Group>
                ) : null}
                {newStatus.to_status === "CALIBRATION-START" && (
                  <>
                    <Form.Group>
                      <Form.Label className="status-label">End Date</Form.Label>
                      <Form.Control
                        className="search-value"
                        type="date"
                        value={newStatus.end_date}
                        onChange={(e) =>
                          setNewStatus({
                            ...newStatus,
                            end_date: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label className="status-label">
                        Aggregator
                      </Form.Label>
                      <Form.Control
                        className="search-value"
                        type="text"
                        value={newStatus.aggregators}
                        onChange={(e) =>
                          setNewStatus({
                            ...newStatus,
                            aggregators: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                  </>
                )}
                <Form.Group>
                  <Form.Label className="status-label">Comments</Form.Label>
                  <Form.Control
                    className="search-value"
                    as="textarea"
                    rows={3}
                    value={newStatus.comments}
                    onChange={(e) =>
                      setNewStatus({
                        ...newStatus,
                        comments: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer className="status-modal-footer">
              <Button
                variant="warning"
                style={{ color: "white" }}
                disabled={isAllRequiredMet()}
                onClick={() => submitChangeStatus(newStatus.to_status)}
              >
                {newStatus.to_status}
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </>
  );
}

export default Devices;
