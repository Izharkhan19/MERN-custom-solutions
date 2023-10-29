import { useEffect, useState } from "react";
import { Button, Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import { DeleteUserByID, getUserList } from "../../Service/UserServices";
import { ToastError, ToastSuccess } from "../../CommonComponents/Toasters";
import BreadcrumPath from "../../CommonComponents/BreadCrum";
import UserDetailsModal from "../../Models/UserDetailsModal";
import Spinner from "../../CommonComponents/Spinner";

function UserDetails() {
  const pageNav = [
    {
      name: "Home",
      link: "/home",
      active: false,
    },
    {
      name: "Users",
      link: "/users",
      active: true,
    },
  ];
  const [ShowHide, setShowHide] = useState(false);
  const [fetchUserAllData, setfetchUserAllData] = useState([]);
  const [user_ID, setUser_ID] = useState("");
  const [loading, setLoading] = useState(false);

  async function fetchFormData(filters, sortBy, sortOrder, page, limit) {
    setLoading(true);
    let res = await getUserList(filters, sortBy, sortOrder, page, limit);
    setLoading(false);
    if (res.data) {
      let prevDataMerge = fetchUserAllData;
      let OldPostID = "";
      prevDataMerge.forEach((element) => {
        OldPostID = OldPostID + "#" + element._id + "#";
      });
      res.data.forEach((element) => {
        if (OldPostID.indexOf("#" + element._id + "#") < 0) {
          prevDataMerge.push(element);
        }
      });
      if (fetchUserAllData.length !== prevDataMerge.length) {
        setfetchUserAllData([...prevDataMerge]);
      }

      // setfetchUserAllData(res.data);
    } else {
      setfetchUserAllData([]);
    }
  }

  function getAllRecords() {
    let totalPost = document.getElementsByClassName("data-post");
    let _Page = totalPost.length / 4 + 1;
    fetchFormData("", "", "", _Page, 4);
  }

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 5) {
      getAllRecords();
    }
  };

  useEffect(() => {
    getAllRecords();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // useEffect(() => {
  //   getAllRecords();
  // }, []);

  async function DeleteData(id) {
    let input = {
      userId: id,
    };
    let res = await DeleteUserByID(input);
    if (res.data) {
      getAllRecords();
      ToastSuccess("User Deleted Successfully.");
    } else {
      ToastError(res.data.message);
    }
  }

  return (
    <>
      <BreadcrumPath pageNav={pageNav} />
      <Container className="" fluid>
        <Row>
          <Card>
            <Card.Body>
              <Row xs={1} md={2} className="g-4">
                {!loading ? (
                  fetchUserAllData && fetchUserAllData ? (
                    fetchUserAllData.map((itm, idx) => (
                      <Col md="3" key={itm._id} className="data-post">
                        <Card style={{ width: "20rem" }} className="d-flex">
                          <Card.Img
                            variant="top"
                            src={`https://picsum.photos/300/200?${itm.name}`}
                          />
                          <ListGroup className="list-group-flush">
                            <ListGroup.Item>
                              <b>Name : </b> {itm.name}
                            </ListGroup.Item>
                            <ListGroup.Item>
                              <b>Email : </b> {itm.email}
                            </ListGroup.Item>
                            <ListGroup.Item>
                              <b>Password : </b> {itm.password}
                            </ListGroup.Item>
                            <ListGroup.Item>
                              <b>City : </b> {itm.city}
                            </ListGroup.Item>
                            <ListGroup.Item>
                              <b>State : </b> {itm.state}
                            </ListGroup.Item>
                            <ListGroup.Item>
                              <b>Zip : </b> {itm.zip}
                            </ListGroup.Item>
                            {/* <ListGroup.Item>
                          <b>Address : </b> {itm.address1} {"," + itm.address2}{" "}
                        </ListGroup.Item> */}
                          </ListGroup>

                          <Card.Body className="d-flex">
                            <Button
                              variant="info"
                              onClick={() => {
                                setUser_ID(itm._id);
                                setShowHide(true);
                              }}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="danger"
                              className="ms-2"
                              onClick={() => DeleteData(itm._id)}
                            >
                              Delete
                            </Button>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))
                  ) : (
                    <div className="text-center">
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/9841/9841555.png"
                        width={"300px"}
                        height={"350px"}
                        alt=""
                      />
                    </div>
                  )
                ) : (
                  <div
                    style={{ width: "100%", height: "61vh" }}
                    className="text-center"
                  >
                    <Spinner />
                  </div>
                )}
              </Row>
              <Row className="mt-5 mb-5">
                <Col md={5}></Col>
                <Col md={2}>
                  <Button
                    onClick={() => {
                      setShowHide(true);
                    }}
                  >
                    Add New User
                  </Button>
                </Col>
                <Col md={5}></Col>
              </Row>
            </Card.Body>
          </Card>
        </Row>

        {ShowHide && (
          <UserDetailsModal
            user_ID={user_ID}
            fetchFormData={getAllRecords}
            show={ShowHide}
            onHide={() => {
              setShowHide(false);
              setUser_ID("");
            }}
          />
        )}
      </Container>
    </>
  );
}

export default UserDetails;
