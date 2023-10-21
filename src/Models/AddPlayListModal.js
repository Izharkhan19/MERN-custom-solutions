import { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ToastError, ToastSuccess } from "../CommonComponents/Toasters";
import { AddNewSong } from "../Service/PlaylistService";
import { UpdateUserByID, getUserDetailsByID } from "../Service/UserServices";

function AddPlayListModal(props) {
  ;
  //   props;
  let initOBJ = {
    id: "",
    yourName: "",
    fileTitle: "",
    filelink: "",
  };

  const [UserData, setUserData] = useState(initOBJ);

  async function handleSubmit(e) {
    e.preventDefault();
    ;
    if (UserData.filelink) {
      if (UserData.id) {
        let input = {
          yourName: UserData.yourName,
          fileTitle: UserData.fileTitle,
          filelink: UserData.filelink,
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
        ;
        if (UserData.yourName === "") {
          UserData.yourName = "Unknown";
        }
        if (UserData.fileTitle === "") {
          UserData.fileTitle = "Unknown";
        }
        let res = await AddNewSong(UserData);
        if (res.data) {
          props.fetchSongListData();
          props.onHide(false);
          ToastSuccess("Song Added Successfully.");
        } else {
          ToastError("Something went wrong.");
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
        yourName: res.data.yourName,
        fileTitle: res.data.fileTitle,
        filelink: res.data.filelink,
      });
    } else {
      ToastError("Sometning went wrong.");
    }
  }

  //   useEffect(() => {
  //     setUserData(initOBJ);
  //     if (props.user_ID !== "") {
  //       editData(props.user_ID);
  //     }

  //     return () => {
  //       setUserData(initOBJ);
  //     };
  //   }, []);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Your Song
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Control
                type="text"
                placeholder="Enter Your Name"
                value={UserData.yourName}
                onChange={(e) =>
                  setUserData({
                    ...UserData,
                    yourName: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Control
                type="text"
                placeholder="Enter File Title"
                value={UserData.fileTitle}
                onChange={(e) =>
                  setUserData({
                    ...UserData,
                    fileTitle: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Control
              placeholder="Enter File Link"
              value={UserData.filelink}
              onChange={(e) =>
                setUserData({
                  ...UserData,
                  filelink: e.target.value,
                })
              }
            />
          </Form.Group>
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

export default AddPlayListModal;
