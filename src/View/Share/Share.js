import React, { useState } from "react";
import ShareModel from "./ShareModel";
import Button from "react-bootstrap/esm/Button";
import { Dropdown, Card, Container } from "react-bootstrap/esm";
import googleImage from "../../assets/googleImage.jpg";
import ShareComponent from "./CommonShareButton";

const Share = () => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Container className="mt-5">
        <Card style={{ backgroundColor: "gray" }}>
          <Card.Header>Share Tutorial</Card.Header>
          <Card.Body className="d-flex justify-content-center">
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={googleImage} />
              <Card.Body>
                <Card.Text>
                  <div className="d-flex">
                    <Dropdown>
                      <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Share with...
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => setModalShow(true)}>
                          Share with...
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>

                    <Button className="mx-2" onClick={() => setModalShow(true)}>
                      Share with...
                    </Button>
                  </div>
                </Card.Text>
              </Card.Body>
            </Card>
            <div className="px-5">
              <ShareComponent
                imageUrl={"https://www.google.com/"}
                linkUrl={"https://www.google.com/"}
                title={""}
              />
            </div>
          </Card.Body>
        </Card>
      </Container>
      {modalShow && (
        <ShareModel
          googleImage={"https://www.google.com/"}
          show={"https://www.google.com/"}
          onHide={() => setModalShow(false)}
        />
      )}
    </>
  );
};

export default Share;
