import React, { useState } from "react";
import { Form } from "react-bootstrap";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { getRegisterUserList } from "../../Service/AuthLoginService";
import { ToastError, ToastSuccess } from "../../CommonComponents/Toasters";

const Login = () => {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    userName: "",
    password: "",
  });
  const [handleLoding, setHandleLoding] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.userName !== "" && input.password !== "") {
      setHandleLoding(true);
      let res = await getRegisterUserList();
      if (res.data) {
        let data = res.data.filter(
          (itm) =>
            itm.userName === input.userName && itm.password === input.password
        );
        if (data.length !== 0) {
          localStorage.setItem("authorized", true);
          navigate("/home");
          ToastSuccess("Logged in Successfully.");
        } else {
          ToastError("Unauthorize User Credentials...!");
        }
      }
      setHandleLoding(false);
    } else {
      ToastError("Enter username & password please.");
      setHandleLoding(false);
    }
  };

  // const FetchRegisterUsers = async () => {
  //   let res = await getRegisterUserList();
  //   if (res.data) {
  //   } else {
  //     ToastError("Something went Wrong.");
  //   }
  // };

  // useEffect(() => {
  //   FetchRegisterUsers();
  // });

  return (
    <>
      <Form className="custom-form" onSubmit={handleSubmit}>
        <h1 className="text-white mb-4">Login</h1>

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
        <Form.Group>
          <Form.Control
            id="floatingPasswordCustom"
            type="password"
            placeholder="Password"
            onChange={(e) =>
              setInput({
                ...input,
                password: e.target.value,
              })
            }
          />
        </Form.Group>
        <button
          className="btn btn-primary"
          type="submit"
          disabled={handleLoding}
        >
          Login
        </button>
        <button
          style={{ marginLeft: "15px" }}
          className="btn btn-secondary"
          type="button"
          disabled={handleLoding}
          onClick={() => navigate("/getpassword")}
        >
          Get Forgetted Details
        </button>
        <div className="text-center mt-3">
          <Link to={"/registeruser"}>Register User</Link>
        </div>
      </Form>
    </>
  );
};

export default Login;
