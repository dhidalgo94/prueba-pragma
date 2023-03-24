import Modal from "react-bootstrap/Modal";
import { NewUserForm } from "./NewUserForm";

export const NewUserModal = ({
  show,
  onHide,
  setUsers,
  setError,
  selectedUser,
  editing,
  setFilteredUsers
}) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {editing ? "Editar Usuario" : "Nuevo Usuario"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <NewUserForm
          closeModal={onHide}
          setUsers={setUsers}
          setError={setError}
          selectedUser={selectedUser}
          editing={editing}
          setFilteredUsers={setFilteredUsers}
        />
      </Modal.Body>
    </Modal>
  );
};
