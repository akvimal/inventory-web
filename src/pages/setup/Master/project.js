import React, { useEffect, useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import MasterTable from "../table";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteAlert from "../Master/deleteAlert";
import {
  createProject,
  editProject,
  findFarmTypes,
  getProjects,
  removeProject,
} from "../setupService";

function Project() {
  useEffect(() => {
    findProjects();
    findFarm();
  }, []);
  const [projects, setProjects] = useState([]);
  const [data, setData] = useState();
  const [project, setProject] = useState({
    id: 0,
    name: "",
    start_date: "",
    end_date: null,
    description: undefined,
    farm_id: 0,
    farm: "",
  });

  const [show, setShow] = useState({
    add: false,
    edit: false,
    delete: false,
  });

  const onHandleModal = () => setShow({ add: true });
  const handleClose = () => {
    return (
      setProject({
        id: 0,
        name: "",
        start_date: "",
        end_date: undefined,
        description: undefined,
        farm_id: "",
        farm: "",
      }),
      setShow(false),
      setShow({ delete: false })
    );
  };
  const editModal = (e) => {
    // eslint-disable-next-line
    return setShow({ edit: true }), dateCheck(e);
  };
  const onDeleteClick = (e) => {
    // eslint-disable-next-line
    return setShow({ delete: true }), setData(e);
  };
  const [farms, setFarms] = useState([]);
  const columns = [
    { field: "name", header: "Name" },
    { field: "start_date", header: "Start Date" },
    { field: "end_date", header: "End Date" },
    { field: "description", header: "Description" },
    { field: "farm", header: "Farm" },
    { field: "action", header: "Action" },
  ];
  const findProjects = () => {
    getProjects({ condtion: undefined })
      .then((response) => setProjects(response.data))
      .catch((error) => alert(error));
  };
  const deleteProject = (e) => {
    const id = e.id;
    return removeProject(id)
      .then((result) =>
        result.data.removed ? findProjects() : alert(result.message)
      )
      .catch((err) => alert(err), setShow(false));
  };
  const saveEdit = () => {
    updateProject();
    return (
      setProject({
        id: 0,
        name: "",
        start_date: "",
        end_date: undefined,
        description: undefined,
        farm_id: "",
        farm: "",
      }),
      setShow(false)
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

  function addProject() {
    createProject(project).then((res) => {
      res.data.inserted ? findProjects() : alert(res.message);
    });
    setShow(false);
    setProject({
      id: 0,
      name: "",
      start_date: "",
      end_date: undefined,
      description: undefined,
      farm_id: 0,
    });
  }
  const findFarm = () => {
    findFarmTypes()
      .then((res) => setFarms(res.data))
      .catch((err) => alert(err.message));
  };
  const updateProject = () => {
    editProject(project).then((result) =>
      result.data.inserted === true ? findProjects() : alert(result.message)
    );
  };
  function dateCheck(s) {
    const sd = s.start_date;
    const sDate = new Date(sd);
    sDate.setDate(sDate.getDate() + 1);
    const sdt = sDate.toISOString().substring(0, 10);
    const ed = s.end_date;
    if (ed !== null) {
      const eDate = new Date(ed);
      eDate.setDate(eDate.getDate() + 1);
      var edt = eDate.toISOString().substring(0, 10);
    }
    setProject({
      id: s.id,
      name: s.name,
      start_date: sdt,
      end_date: edt,
      farm: s.farm,
      farm_id: s.farm_id,
      description: s.description,
    });
  }
  return (
    <>
      <Card className="table-card">
        <Card.Title className="setup-title">
          Projects
          <Button className="add-info" onClick={onHandleModal}>
            Add
          </Button>
        </Card.Title>
        <MasterTable
          data={projects}
          column={columns}
          action={actionColumnTemplate}
        />
      </Card>
      <DeleteAlert
        data={data}
        show={show.delete}
        close={handleClose}
        delete={deleteProject}
      />
      <Modal
        className="info-modal"
        show={show.add || show.edit}
        onHide={handleClose}
      >
        <Modal.Header className="info-modal-header" closeButton>
          <Modal.Title className="info-modal-title">
            {" "}
            {show.edit ? " Edit Project " : "Add Project"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="info-modal-body">
          <p>Name</p>
          <input
            type="text"
            required
            className="form-control"
            placeholder="Name"
            value={project.name}
            onChange={(e) => setProject({ ...project, name: e.target.value })}
          />
          <p>Start Date</p>
          <input
            type="date"
            required
            className="form-control"
            value={project.start_date}
            onChange={(e) =>
              setProject({ ...project, start_date: e.target.value })
            }
          />
          <p>End Date</p>
          <input
            type="date"
            className="form-control"
            value={project.end_date}
            onChange={(e) =>
              setProject({ ...project, end_date: e.target.value })
            }
          />
          <p>Description</p>
          <input
            type="text"
            className="form-control"
            placeholder="Description"
            value={project.description}
            onChange={(e) =>
              setProject({ ...project, description: e.target.value })
            }
          />
          <p>Farm</p>
          <select
            className="form-control"
            onChange={(e) =>
              setProject({ ...project, farm_id: e.target.value })
            }
          >
            {project.farm !== "" ? (
              <option>{project.farm}</option>
            ) : (
              <option>Select</option>
            )}
            {farms.map((f) => (
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
            <Button className="add-info" onClick={saveEdit}>
              Save
            </Button>
          ) : (
            <Button className="add-info" onClick={addProject}>
              Add
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Project;
