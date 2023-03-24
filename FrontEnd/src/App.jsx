import { useState, useEffect } from "react";
import { NewUserModal } from "./components/NewUserModal";
import { UsersTable } from "./components/UsersTable";
import { apiUrl } from "./config";

import { CSVLink } from "react-csv";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";



function App() {
  const [modalShow, setModalShow] = useState(false);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [selectedUser, setSelectedUser] = useState({
    fullName: "",
    rut: "",
    email: "",
    birthDate: new Date(),
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const csvHeaders = [
    { label: "Id", key: "id" },
    { label: "Nombre", key: "fullName" },
    { label: "Rut", key: "rut" },
    { label: "Correo", key: "email" },
    { label: "FechaDeNacimiento", key: "birthDate" }
  ];
  

  const fetchUsers = () => {
    setLoading(true);
    fetch(apiUrl)
      .then((response) => response.json())
      .then((result) => {
        setUsers(result);
        setFilteredUsers(result);
      })
      .catch(setError)
      .finally(() => {
        setLoading(false);
      });
  };

  const onClickNewUser = () => {
    setModalShow(true);
    setEditing(false);
    setSelectedUser({
      fullName: "",
      rut: "",
      email: "",
      birthDate: new Date(),
    });
  };

  const handleSearchUser = (event) => {
    const value = event.target.value.toLowerCase();
    const filtered = users.filter(user => user.fullName.toLowerCase().includes(value));
    setFilteredUsers(filtered);
  }

  return (
    <>
      <Container>
        <Row className="mt-2">
          <Col md={2}>
            <h1>Usuarios</h1>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col md={{ span: 4, offset: 8 }}>
            <Button variant="primary" style={{float: 'right'}} onClick={onClickNewUser}>
              Nuevo usuario
            </Button>

            <NewUserModal
              show={modalShow}
              onHide={() => setModalShow(false)}
              setUsers={setUsers}
              setError={setError}
              selectedUser={selectedUser}
              editing={editing}
              setFilteredUsers={setFilteredUsers}
            />
          </Col>
        </Row>
        <Row className="mt-2">
          <Col md={4}>
            <Button variant="primary">
              <CSVLink
                style={{ color: "white", textDecoration: 'none' }}
                data={users}
                filename={"usuarios.csv"}
                headers={csvHeaders}
              >
                Descargar Excel
              </CSVLink>
            </Button>
          </Col>
          <Col md={{ span: 4, offset: 4 }}>
            <Form.Control type="text" placeholder="Buscar por nombre" onChange={handleSearchUser}/>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col md={12}>
            <UsersTable
              users={users}
              filteredUsers={filteredUsers}
              loading={loading}
              setUsers={setUsers}
              setError={setError}
              setLoading={setLoading}
              setModalShow={setModalShow}
              setSelectedUser={setSelectedUser}
              setEditing={setEditing}
              setFilteredUsers={setFilteredUsers}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
