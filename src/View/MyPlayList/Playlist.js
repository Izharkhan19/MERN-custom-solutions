import React, { useEffect, useState } from "react";
// import AddPlayListModal from "../../Manage Note CRUD/Models/AddPlayListModal";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import BreadcrumPath from "../../CommonComponents/BreadCrum";
import { DeleteSongByID, getSongList } from "../../Service/PlaylistService";
import moment from "moment/moment";
import { ToastError, ToastSuccess } from "../../CommonComponents/Toasters";
import AddPlayListModal from "../../Models/AddPlayListModal";
import "./playlist.css";

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

  const [showModal, setShowModal] = useState(false);
  const [fetchSongsData, setfetchSongsData] = useState([]);
  const [selectSongClass, setSelectSongClass] = useState("");
  const [selectSong, setSelectSong] = useState("");

  async function fetchSongListData() {
    let res = await getSongList();
    if (res.data) {
      setfetchSongsData(res.data.reverse());
      setSelectSong(res.data[0]?.filelink);
      setSelectSongClass(res.data[0]?.filelink);
    } else {
      setfetchSongsData([]);
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

              {fetchSongsData !== 0 &&
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
                            <div className="text-end">
                              <cite title="Source Title">
                                Remove Song
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
                          </footer>
                        </blockquote>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
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
