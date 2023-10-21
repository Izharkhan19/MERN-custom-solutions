import { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {
  AddNewUser,
  UpdateUserByID,
  getUserDetailsByID,
} from "../Service/UserServices";
import { ToastError, ToastSuccess } from "../CommonComponents/Toasters";

function UserDetailsModal(props) {
  let initOBJ = {
    id: "",
    name: "",
    email: "",
    password: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
  };

  const [UserData, setUserData] = useState(initOBJ);

  async function handleSubmit(e) {
    e.preventDefault();
    if (UserData.name) {
      if (UserData.id) {
        let input = {
          name: UserData.name,
          email: UserData.email,
          password: UserData.password,
          address1: UserData.address1,
          address2: UserData.address2,
          city: UserData.city,
          state: UserData.state,
          zip: UserData.zip,
        };
        let res = await UpdateUserByID(UserData.id, input);
        if (res.data) {
          props.fetchFormData();
          props.onHide(false);
          ToastSuccess("User Updated Successfully.");
        } else {
          ToastError("Sometning went wrong.");
        }
      } else {
        let res = await AddNewUser(UserData);
        if (res.data) {
          props.fetchFormData();
          props.onHide(false);
          ToastSuccess("User Added Successfully.");
        } else {
          ToastError("Sometning went wrong.");
        }
      }
    } else {
      ToastError("Sometning went wrong.");
    }
  }

  async function editData(userId) {
    let res = await getUserDetailsByID(userId);
    if (res.data) {
      setUserData({
        ...UserData,
        id: res.data._id,
        name: res.data.name,
        email: res.data.email,
        password: res.data.password,
        address1: res.data.address1,
        address2: res.data.address2,
        city: res.data.city,
        state: res.data.state,
        zip: res.data.zip,
      });
    } else {
      ToastError("Sometning went wrong.");
    }
  }

  useEffect(() => {
    setUserData(initOBJ);
    if (props.user_ID !== "") {
      editData(props.user_ID);
    }

    return () => {
      setUserData(initOBJ);
    };
  }, []);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          User Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              {/* <Form.Label> User_Name </Form.Label> */}
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={UserData.name}
                onChange={(e) =>
                  setUserData({
                    ...UserData,
                    name: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridEmail">
              {/* <Form.Label>Email</Form.Label> */}
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={UserData.email}
                onChange={(e) =>
                  setUserData({
                    ...UserData,
                    email: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              {/* <Form.Label>Password</Form.Label> */}
              <Form.Control
                type="password"
                placeholder="Password"
                value={UserData.password}
                onChange={(e) =>
                  setUserData({
                    ...UserData,
                    password: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="formGridAddress1">
            {/* <Form.Label>Address</Form.Label> */}
            <Form.Control
              placeholder="Enter Address 1"
              value={UserData.address1}
              onChange={(e) =>
                setUserData({
                  ...UserData,
                  address1: e.target.value,
                })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridAddress2">
            {/* <Form.Label>Address 2</Form.Label> */}
            <Form.Control
              placeholder="Enter Address 2"
              value={UserData.address2}
              onChange={(e) =>
                setUserData({
                  ...UserData,
                  address2: e.target.value,
                })
              }
            />
          </Form.Group>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridCity">
              {/* <Form.Label>City</Form.Label> */}
              <Form.Control
                value={UserData.city}
                placeholder="City"
                onChange={(e) =>
                  setUserData({
                    ...UserData,
                    city: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip">
              {/* <Form.Label>State</Form.Label> */}
              <Form.Control
                placeholder="State"
                value={UserData.state}
                onChange={(e) =>
                  setUserData({
                    ...UserData,
                    state: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridZip">
              {/* <Form.Label>Zip</Form.Label> */}
              <Form.Control
                placeholder="ZipCode"
                value={UserData.zip}
                onChange={(e) =>
                  setUserData({
                    ...UserData,
                    zip: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <div className="d-flex">
          <Button
            variant="success"
            type="submit"
            onClick={(e) => handleSubmit(e)}
          >
            Submit
          </Button>
          <Button className="ms-2" variant="danger" onClick={props.onHide}>
            Close
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default UserDetailsModal;
