import { Button, Col, Row } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastSuccess } from "../CommonComponents/Toasters";
import { useState } from "react";

function BasicExample() {
  let navigate = useNavigate();
  let location = useLocation();
  const [ActiveTab, setActiveTab] = useState("/home");
  ;
  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container fluid>
        <Navbar.Brand onClick={() => navigate("/home")}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnHdepasuGrlgoqdvx9lP0b5KJ1a06TJm83A&usqp=CAU"
            alt=""
            width={"100px"}
            height={"70px"}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              className={location.pathname === "/home" && "active"}
              onClick={() => {
                navigate("/home");
                setActiveTab("/home");
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              className={location.pathname === "/playlist" && "active"}
              onClick={() => {
                navigate("/playlist");
                setActiveTab("/playlist");
              }}
            >
              My Play List
            </Nav.Link>

            <Nav.Link
              className={location.pathname === "/users" && "active"}
              onClick={() => {
                navigate("/users");
                setActiveTab("/users");
              }}
            >
              Users
            </Nav.Link>
            <Nav.Link
              className={location.pathname === "/datatable" && "active"}
              onClick={() => {
                navigate("/datatable");
                setActiveTab("/datatable");
              }}
            >
              Data Table
            </Nav.Link>
            <Nav.Link
              className={location.pathname === "/calendar" && "active"}
              onClick={() => {
                navigate("/calendar");
                setActiveTab("/calendar");
              }}
            >
              Calendar
            </Nav.Link>
            <Nav.Link
              className={location.pathname === "/map" && "active"}
              onClick={() => {
                navigate("/map");
                setActiveTab("/map");
              }}
            >
              Map
            </Nav.Link>
            <Nav.Link onClick={() => navigate("/chat-gpt")}>Chat-GPT</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Row>
          <Col md="2"></Col>
          <Col md="10">
            <Button
              variant="transparent"
              className="logout-button ms-2"
              onClick={() => {
                navigate("/");
                ToastSuccess("Logged out Successfully.");
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                height="25px"
                width="25px"
              >
                <path d="M288 256C288 273.7 273.7 288 256 288C238.3 288 224 273.7 224 256V32C224 14.33 238.3 0 256 0C273.7 0 288 14.33 288 32V256zM80 256C80 353.2 158.8 432 256 432C353.2 432 432 353.2 432 256C432 201.6 407.3 152.9 368.5 120.6C354.9 109.3 353 89.13 364.3 75.54C375.6 61.95 395.8 60.1 409.4 71.4C462.2 115.4 496 181.8 496 255.1C496 388.5 388.5 496 256 496C123.5 496 16 388.5 16 255.1C16 181.8 49.75 115.4 102.6 71.4C116.2 60.1 136.4 61.95 147.7 75.54C158.1 89.13 157.1 109.3 143.5 120.6C104.7 152.9 80 201.6 80 256z" />
              </svg>
            </Button>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
}

export default BasicExample;
