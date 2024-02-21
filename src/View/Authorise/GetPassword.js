import React, { useState } from "react";
import { Form } from "react-bootstrap";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { getregisteruserDetails } from "../../Service/AuthLoginService";
import { ToastError, ToastSuccess } from "../../CommonComponents/Toasters";

const GetPassword = () => {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    email: "",
  });
  const [handleLoding, setHandleLoding] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.email !== "") {
      setHandleLoding(true);
      let response = await getregisteruserDetails({ email: input.email });

      if (response?.data.statusCode === 200) {
        setInput({
          ...input,
          email: "",
        });
        navigate("/");
        ToastSuccess(response?.data.message);
      } else {
        ToastError(response?.data.message);
      }

      setHandleLoding(false);
    } else {
      ToastError("Enter email please.");
      setHandleLoding(false);
    }
  };

  return (
    <>
      <Form className="custom-form" onSubmit={handleSubmit}>
        <h1 className="text-white mb-4">Get Password</h1>

        <Form.Group className="mb-3">
          <Form.Control
            id="floatingInputCustom"
            type="text"
            placeholder="email"
            value={input.email}
            onChange={(e) =>
              setInput({
                ...input,
                email: e.target.value,
              })
            }
          />
        </Form.Group>

        <button
          className="btn btn-primary"
          type="submit"
          disabled={handleLoding}
        >
          Get Details
        </button>
        <button
          style={{ marginLeft: "15px" }}
          className="btn btn-secondary"
          type="button"
          onClick={() => navigate("/")}
        >
          Back
        </button>
        <div className="text-center mt-3">
          <Link to={"/registeruser"}>Register User</Link>
        </div>
      </Form>
    </>
  );
};

export default GetPassword;
