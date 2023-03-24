import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { format } from "date-fns";
import { apiUrl } from "../config";
import { useState } from "react";

export const UsersTable = ({
  loading,
  setUsers,
  setError,
  setLoading,
  setModalShow,
  setSelectedUser,
  setEditing,
  filteredUsers,
  setFilteredUsers,
}) => {
  const [sortByIdAsc, setSortByIdAsc] = useState(false);
  const [sortByNameAsc, setSortByNameAsc] = useState(false);
  const [sortByRutAsc, setSortByRutAsc] = useState(false);
  const [sortByEmailAsc, setSortByEmailAsc] = useState(false);
  const [sortByBirthDateAsc, setSortByBirthDateAsc] = useState(false);

  const handleEdit = (user) => {
    setEditing(true);
    setModalShow(true);
    const selectedUser = {
      id: user.id,
      fullName: user.fullName,
      rut: user.rut,
      email: user.email,
      birthDate: new Date(user.birthDate),
    };
    setSelectedUser(selectedUser);
  };

  const handleDelete = (user) => {
    deleteUser(user.id);
  };

  const deleteUser = (id) => {
    setLoading(true);
    fetch(`${apiUrl}/${id}`, { method: "DELETE" })
      .then((response) => response.json())
      .then((result) => {
        setUsers(result);
        setFilteredUsers(result);
      })
      .catch(setError)
      .finally(() => setLoading(false));
  };

  const handleSortById = () => {
    setSortByIdAsc(!sortByIdAsc);
    let sortedUsers = [];
    if (sortByIdAsc) {
      sortedUsers = filteredUsers.sort((user1, user2) => user2.id - user1.id);
    } else {
      sortedUsers = filteredUsers.sort((user1, user2) => user1.id - user2.id);
    }

    setFilteredUsers(sortedUsers);
  };

  const handleSortByName = () => {
    setSortByNameAsc(!sortByNameAsc);
    let sortedUsers = [];
    if (sortByNameAsc) {
      sortedUsers = filteredUsers.sort((user1, user2) => {
        if (user1.fullName.toLowerCase() > user2.fullName.toLowerCase())
          return 1;
        if (user1.fullName.toLowerCase() < user2.fullName.toLowerCase())
          return -1;
        return 0;
      });
    } else {
      sortedUsers = filteredUsers.sort((user1, user2) => {
        if (user1.fullName.toLowerCase() < user2.fullName.toLowerCase())
          return 1;
        if (user1.fullName.toLowerCase() > user2.fullName.toLowerCase())
          return -1;
        return 0;
      });
    }

    setFilteredUsers(sortedUsers);
  };

  const handleSortByRut = () => {
    setSortByRutAsc(!sortByRutAsc);
    let sortedUsers = [];
    if (sortByRutAsc) {
      sortedUsers = filteredUsers.sort(
        (user1, user2) => parseInt(user2.rut) - parseInt(user1.rut)
      );
    } else {
      sortedUsers = filteredUsers.sort(
        (user1, user2) => parseInt(user1.rut) - parseInt(user2.rut)
      );
    }

    setFilteredUsers(sortedUsers);
  };

  const handleSortByEmail = () => {
    setSortByEmailAsc(!sortByEmailAsc);
    let sortedUsers = [];
    if (sortByEmailAsc) {
      sortedUsers = filteredUsers.sort((user1, user2) => {
        if (user1.email.toLowerCase() > user2.email.toLowerCase()) return 1;
        if (user1.email.toLowerCase() < user2.email.toLowerCase()) return -1;
        return 0;
      });
    } else {
      sortedUsers = filteredUsers.sort((user1, user2) => {
        if (user1.email.toLowerCase() < user2.email.toLowerCase()) return 1;
        if (user1.email.toLowerCase() > user2.email.toLowerCase()) return -1;
        return 0;
      });
    }

    setFilteredUsers(sortedUsers);
  };

  const handleSortByBirthDate = () => {
    setSortByBirthDateAsc(!sortByBirthDateAsc);
    let sortedUsers = [];
    if (sortByBirthDateAsc) {
      sortedUsers = filteredUsers.sort(
        (user1, user2) => (new Date(user2.birthDate) - new Date(user1.birthDate))
      );
    } else {
      sortedUsers = filteredUsers.sort(
        (user1, user2) => (new Date(user1.birthDate) - new Date(user2.birthDate))
      );
    }

    setFilteredUsers(sortedUsers);
  };

  return (
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>
            Id
            {sortByIdAsc ? (
              <i className="bi bi-caret-up-fill" onClick={handleSortById}></i>
            ) : (
              <i className="bi bi-caret-down-fill" onClick={handleSortById}></i>
            )}
          </th>
          <th>
            Nombre
            {sortByNameAsc ? (
              <i className="bi bi-caret-up-fill" onClick={handleSortByName}></i>
            ) : (
              <i
                className="bi bi-caret-down-fill"
                onClick={handleSortByName}
              ></i>
            )}
          </th>
          <th>
            Rut
            {sortByRutAsc ? (
              <i className="bi bi-caret-up-fill" onClick={handleSortByRut}></i>
            ) : (
              <i
                className="bi bi-caret-down-fill"
                onClick={handleSortByRut}
              ></i>
            )}
          </th>
          <th>
            Correo
            {sortByEmailAsc ? (
              <i
                className="bi bi-caret-up-fill"
                onClick={handleSortByEmail}
              ></i>
            ) : (
              <i
                className="bi bi-caret-down-fill"
                onClick={handleSortByEmail}
              ></i>
            )}
          </th>
          <th>
            Fecha de Nacimiento
            {sortByBirthDateAsc ? (
              <i
                className="bi bi-caret-up-fill"
                onClick={handleSortByBirthDate}
              ></i>
            ) : (
              <i
                className="bi bi-caret-down-fill"
                onClick={handleSortByBirthDate}
              ></i>
            )}
          </th>
          <th>Acciones</th>
        </tr>
      </thead>
      {!loading && (
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.fullName}</td>
              <td>{user.rut}</td>
              <td>{user.email}</td>
              <td>{format(new Date(user.birthDate), "dd-MM-yyyy")}</td>
              <td>
                <Button
                  variant="light"
                  style={{ backgroundColor: "#e9e6e6" }}
                  onClick={() => handleEdit(user)}
                >
                  <i className="bi bi-pencil-square"></i>
                </Button>{" "}
                <Button
                  variant="light"
                  style={{ backgroundColor: "#e9e6e6" }}
                  onClick={() => handleDelete(user)}
                >
                  <i className="bi bi-trash"></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      )}
    </Table>
  );
};
