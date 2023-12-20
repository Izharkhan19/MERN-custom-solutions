import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Image, Nav } from "react-bootstrap";
import { ToastError } from "../../../CommonComponents/Toasters";

const Mainpage = () => {
  let Token = JSON.parse(localStorage.getItem("userData"));
  const [data, setData] = useState([]);

  const FetchMainData = async () => {
    let res = await axios(
      `https://graph.facebook.com/me?access_token=` + Token
    );
    // {
    //   method: "post",
    //   url: `https://graph.facebook.com/me?access_token=` + Token,
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: Token,
    //   },
    // });
    if (res?.data) {
      console.log("Chaar", res);
      await FetchDependentData(res.data);
    } else {
      ToastError("Somethin went wrong.");
    }
  };

  const FetchDependentData = async (data) => {
    let res = await axios(
      `https://graph.facebook.com/${data.id}?fields=id,name,email,picture&access_token=` +
        Token
    );

    if (res?.data) {
      console.log("Fivey", res);
      setData(res.data);
    } else {
      ToastError("Somethin went wrong.");
    }
  };

  useEffect(() => {
    FetchMainData();
    return () => {};
  }, []);

  return (
    <div>
      <Card>
        <Card.Header>
          <Nav variant="tabs" defaultActiveKey="#first">
            <Nav.Item>
              <Nav.Link href="#first">Active</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#link">Link</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#disabled" disabled>
                Disabled
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Card.Header>
        <Card.Body>
          {/* <Card.Title></Card.Title>
          <Card.Text>
            With supporting text below as a natural lead-in to additional
            content.
          </Card.Text>
          <Button variant="primary">Go somewhere</Button> */}

          {/* <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>{data?.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {"ID " + data?.id}
              </Card.Subtitle>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              <Card.Link href="#">Card Link</Card.Link>
              <Card.Link href="#">Another Link</Card.Link>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card> */}

          <Card>
            <Card.Header>
              {" "}
              <Image src={data?.picture?.data?.url} roundedCircle />{" "}
              {data?.name}
            </Card.Header>
            <Card.Body>
              <blockquote className="blockquote mb-0">
                <p>{"ID " + data?.id}</p>
                <footer className="blockquote-footer">
                  Someone famous in{" "}
                  <cite title="Source Title">Source Title</cite>
                </footer>
              </blockquote>
            </Card.Body>
          </Card>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Mainpage;
