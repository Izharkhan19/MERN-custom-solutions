import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { getRegisterUserList } from "../../Service/AuthLoginService";
import { toast } from "react-toastify";
import { ToastError, ToastSuccess } from "../../CommonComponents/Toasters";
import Map from "../map/Map";

const Login = () => {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    userName: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.userName !== "" && input.password !== "") {
      let res = await getRegisterUserList();
      if (res.data) {
        let data = res.data.filter(
          (itm) =>
            itm.userName === input.userName && itm.password === input.password
        );
        if (data.length !== 0) {
          navigate("/home");
          ToastSuccess("Logged in Successfully.");
        } else {
          ToastError("Unauthorize User Credentials...!");
        }
      }
    } else {
      ToastError("Enter username & password please.");
    }
  };

  const FetchRegisterUsers = async () => {
    let res = await getRegisterUserList();
    if (res.data) {
    } else {
      ToastError("Something went Wrong.");
    }
  };

  useEffect(() => {
    FetchRegisterUsers();
  });

  return (
    <div className="login-form-container">
      <Form onSubmit={handleSubmit}>
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
          {/* <Form.Label>Email address</Form.Label> */}
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
          {/* <Form.Label>Password</Form.Label> */}
        </Form.Group>
        <button className="btn btn-primary" type="submit">
          Login
        </button>
        <div className="text-center mt-3">
          <Link to={"/registeruser"}>Register User</Link>
        </div>
      </Form>
    </div>
  );
};

export default Login;
