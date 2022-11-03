import React from "react";
import { Modal, Button } from "react-bootstrap";
function DeleteAlert(props) {
  return (
    <React.Fragment>
      <Modal className="info-modal" show={props.show} onHide={props.close}>
        <Modal.Header className="info-modal-header" closeButton>
          <Modal.Title className="info-modal-title">Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body className="info-modal-body">
          {props.data !== undefined
            ? `Are you sure you want to delete "${
                props.data.city
                  ? props.data.city
                  : props.data.user
                  ? props.data.user
                  : props.data.name
              }" ?`
            : null}
        </Modal.Body>
        <Modal.Footer className="info-modal-footer">
          <Button className="add-info" onClick={props.close}>
            No
          </Button>
          <Button
            className="delete-info"
            style={{ backgroundColor: "red" }}
            onClick={() => props.delete(props.data)}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}

export default DeleteAlert;
