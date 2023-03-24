import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { apiUrl } from "../config";

import { format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const NewUserForm = ({
  closeModal,
  setUsers,
  setError,
  selectedUser,
  editing,
  setFilteredUsers,
}) => {
  const [fullName, setFullName] = useState(selectedUser.fullName);
  const [rut, setRut] = useState(selectedUser.rut);
  const [email, setEmail] = useState(selectedUser.email);
  const [birthDate, setBirthDate] = useState(selectedUser.birthDate);
  const [validated, setValidated] = useState(false);

  const postUser = (newUser) => {
    var requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    };

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setUsers(result);
        setFilteredUsers(result);
      })
      .catch(setError);
  };

  const editUser = (editedUser) => {
    var requestOptions = {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedUser),
    };

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setUsers(result);
        setFilteredUsers(result);
      })
      .catch(setError);
  };

  const onChangeFullName = (event) => {
    const regex = /^[a-zñA-ZÑ ]+$/;
    const value = event.target.value
    if (regex.test(value) || value === '') {
      setFullName(value);
    }
  };

  const onChangeRut = (event) => {
    const regex = /^[0-9k\b]+$/;
    const value = event.target.value
    if (regex.test(value) || value === '') {
      setRut(event.target.value);
    }
  };

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    } else {
      if (editing) {
        const editedUser = {
          id: selectedUser.id,
          fullName,
          rut,
          email,
          birthDate: format(birthDate, "yyyy-MM-dd"),
        };
        editUser(editedUser);
      } else {
        const newUser = {
          fullName,
          rut,
          email,
          birthDate: format(birthDate, "yyyy-MM-dd"),
        };
        postUser(newUser);
      }
      closeModal();
    }
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Nombre completo</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Ingresar nombre completo"
          value={fullName}
          onChange={onChangeFullName}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicRUT">
        <Form.Label>RUT</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Ingresar RUT, sin puntos, ni guión."
          value={rut}
          onChange={onChangeRut}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Correo</Form.Label>
        <Form.Control
          type="email"
          placeholder="Ingresar Correo"
          value={email}
          onChange={onChangeEmail}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicBirthDate">
        <Form.Label>Fecha de Nacimiento</Form.Label>
        <DatePicker
          required
          dateFormat="dd/MM/yyyy"
          selected={birthDate}
          onChange={(date) => setBirthDate(date)}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        {editing ? "Guardar cambios" : "Crear Usuario"}
      </Button>
    </Form>
  );
};
