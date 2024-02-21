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
      let response = await registeruser(input);
      debugger;
      if (response?.status === 200) {
        navigate("/");
        ToastSuccess("Registration Successfull");
      } else {
        ToastError(response?.data.message);
      }
    } else {
      ToastError("All Fields are required.");
    }
  };

  return (
    <Form className="custom-form" onSubmit={handleRegister}>
      <h1 className="text-white mb-4">Register</h1>

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

      <button className="btn btn-primary" type="submit">
        Register
      </button>

      <button
        className="btn btn-secondary"
        style={{ marginLeft: "15px" }}
        onClick={() => navigate("/")}
      >
        Back
      </button>
    </Form>
  );
};

export default RegisterUser;
