import React, { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { ToastError, ToastSuccess } from "../../CommonComponents/Toasters";
const RegisterUser = () => {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const handleRegister = (e) => {
    e.preventDefault();
    if (input.userName !== "" && input.email !== "" && input.password !== "") {
      fetch(`http://localhost:3000/api/registeruser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
        });
      navigate("/");
      ToastSuccess("Registration Successfull");
    } else {
      ToastError("All Fields are required.");
    }
  };

  return (
    <div className="login-form-container">
      <Form onSubmit={handleRegister}>
        <Form.Group className="mb-3">
          <Form.Control
            id="floatingInputCustom"
            type="text"
            placeholder="UserName"
            onChange={(e) =>
              setInput({
                ...input,
                userName: e.target.value,
              })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            id="floatingInputCustom"
            type="text"
            placeholder="email"
            onChange={(e) =>
              setInput({
                ...input,
                email: e.target.value,
              })
            }
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            id="floatingPasswordCustom"
            type="text"
            placeholder="Password"
            onChange={(e) =>
              setInput({
                ...input,
                password: e.target.value,
              })
            }
          />
        </Form.Group>
        <Row>
          <Col md={6}>
            <button className="btn btn-secondary" onClick={() => navigate("/")}>
              Back
            </button>
          </Col>
          <Col md={6}>
            <button className="btn btn-primary" type="submit">
              Save
            </button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default RegisterUser;
