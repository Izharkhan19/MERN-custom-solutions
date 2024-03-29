import React, { useEffect, useState } from "react";
// import AddPlayListModal from "../../Manage Note CRUD/Models/AddPlayListModal";
import { Button, Card, Col, Container, Dropdown, Row } from "react-bootstrap";
import BreadcrumPath from "../../CommonComponents/BreadCrum";
import { DeleteSongByID, getSongList } from "../../Service/PlaylistService";
import moment from "moment/moment";
import { ToastError, ToastSuccess } from "../../CommonComponents/Toasters";
import AddPlayListModal from "../../Models/AddPlayListModal";
import "./playlist.css";
import ShareComponent from "../Share/CommonShareButton";
import Spinner from "../../CommonComponents/Spinner";

const Playlist = () => {
  const pageNav = [
    {
      name: "Home",
      link: "/home",
      active: false,
    },
    {
      name: "Play List",
      link: "/playlist",
      active: true,
    },
  ];
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [fetchSongsData, setfetchSongsData] = useState([]);
  const [selectSongClass, setSelectSongClass] = useState("");
  const [selectSong, setSelectSong] = useState("");

  async function fetchSongListData() {
    setLoading(true);
    let res = await getSongList();
    if (res.data) {
      setfetchSongsData(res.data.reverse());
      setSelectSong(res.data[0]?.filelink);
      setSelectSongClass(res.data[0]?.filelink);
      setLoading(false);
    } else {
      setfetchSongsData([]);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSongListData();
  }, []);

  async function DeleteData(id) {
    let input = {
      userId: id,
    };
    let res = await DeleteSongByID(input);
    if (res.data) {
      fetchSongListData();
      ToastSuccess("Song Deleted Successfully.");
    } else {
      ToastError(res.data.message);
    }
  }

  return (
    <>
      <BreadcrumPath pageNav={pageNav} />
      <Container fluid>
        <div>
          <Row xs={1} md={1} className="g-4">
            <Col
              md={4}
              style={{
                overflow: "auto",
                height: "77vh",
              }}
            >
              <div
                style={
                  !showModal
                    ? {
                        position: "sticky",
                        top: "0",
                        zIndex: "888888",
                        backgroundColor: "white",
                      }
                    : {}
                }
                className={`${
                  !showModal && "my_play_list"
                } justify-content-between d-flex`}
              >
                <h5
                  style={{
                    marginTop: "12px",
                  }}
                >
                  My Play List
                </h5>
                <div
                  style={{
                    cursor: "pointer",
                    border: "2px solid",
                    borderRadius: "8px",
                    padding: "5px",
                    margin: "5px",
                  }}
                  onClick={() => {
                    setShowModal(true);
                  }}
                >
                  Add Song
                  <img
                    src="https://cdn2.iconfinder.com/data/icons/picol-vector/32/music_add-512.png"
                    width={"25px"}
                    height={"25px"}
                    className="ms-2"
                    alt=""
                  />
                </div>
              </div>
              {!loading ? (
                fetchSongsData && fetchSongsData.length !== 0 ? (
                  fetchSongsData.map((itm, idx) => (
                    <Col key={idx}>
                      <Card>
                        <Card.Body
                          className={
                            selectSongClass === itm.filelink
                              ? "selectSongClass"
                              : ""
                          }
                        >
                          <blockquote className="blockquote mb-0">
                            <p
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                setSelectSong(itm.filelink);
                                setSelectSongClass(itm.filelink);
                              }}
                            >
                              {itm.fileTitle}
                            </p>

                            <footer className="blockquote-footer">
                              <cite title="Source Title">{itm.yourName}</cite>
                              <Row>
                                <Col md={8}>
                                  <div>
                                    <ShareComponent
                                      imageUrl={"https://www.google.com/"}
                                      linkUrl={itm.filelink}
                                      title={""}
                                    />
                                  </div>
                                </Col>

                                <Col md={2} className="px-4"></Col>
                                <Col md={2}>
                                  <Button
                                    variant=""
                                    style={{
                                      width: "50px",
                                      border: "1px solid black",
                                    }}
                                  >
                                    <div>
                                      <cite title="Source Title">
                                        <svg
                                          style={{
                                            cursor: "pointer",
                                          }}
                                          xmlns="http://www.w3.org/2000/svg"
                                          x="0px"
                                          y="0px"
                                          width="25"
                                          height="25"
                                          viewBox="0 0 24 24"
                                          style={{ cursor: "pointer" }}
                                          onClick={() => DeleteData(itm._id)}
                                        >
                                          <path d="M3 3H21V5H3z"></path>
                                          <path d="M16.1,22H7.9c-1,0-1.9-0.7-2-1.7L4,4.1l2-0.2L7.9,20l8.2,0L18,3.9l2,0.2l-1.9,16.1C18,21.3,17.1,22,16.1,22z"></path>
                                          <path
                                            d="M5,4l1.9,16.1c0.1,0.5,0.5,0.9,1,0.9h8.2 c0.5,0,0.9-0.4,1-0.9L19,4H5z"
                                            opacity=".3"
                                          ></path>
                                          <path d="M15 3L15 4 9 4 9 3 10 2 14 2z"></path>
                                        </svg>
                                      </cite>
                                    </div>
                                  </Button>
                                </Col>
                              </Row>
                            </footer>
                          </blockquote>
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
                <div className="text-center">
                  <Spinner />
                </div>
              )}
              }
            </Col>
            <Col md={8}>
              <iframe
                src={selectSong}
                title={"Title"}
                width={"100%"}
                height={"200%"}
                style={{
                  position: "fixed",
                  maxWidth: "60%",
                  maxHeight: "470px",
                }}
              ></iframe>
            </Col>
          </Row>

          {showModal && (
            <AddPlayListModal
              fetchSongListData={fetchSongListData}
              show={showModal}
              onHide={() => {
                setShowModal(false);
              }}
            />
          )}
        </div>
      </Container>
    </>
  );
};

export default Playlist;
