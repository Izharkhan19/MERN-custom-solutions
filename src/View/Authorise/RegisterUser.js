import React, { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { ToastError, ToastSuccess } from "../../CommonComponents/Toasters";
import { registeruser } from "../../Service/AuthLoginService";
const RegisterUser = () => {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    if (input.userName !== "" && input.email !== "" && input.password !== "") {
      let res = await registeruser(input);
      if (res.data) {
        navigate("/");
        ToastSuccess("Registration Successfull");
      } else {
        ToastError("Something went Wrong.");
      }
    } else {
      ToastError("All Fields are required.");
    }
  };

  return (
    <Form className="custom-form" onSubmit={handleRegister}>
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
        <Col md={4}>
          <button className="btn btn-primary" type="submit">
            Save
          </button>
        </Col>
        <Col md={4}>
          <button className="btn btn-secondary" onClick={() => navigate("/")}>
            Back
          </button>
        </Col>
        <Col md={4}></Col>
      </Row>
    </Form>
  );
};

export default RegisterUser;
