import React, { useEffect, useState } from "react";
import BreadcrumPath from "../../CommonComponents/BreadCrum";
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Dropdown,
  Row,
  Table,
} from "react-bootstrap";
import { DeleteUserByID, getUserList } from "../../Service/UserServices";
import "./dataTable.css";
import UserDetailsModal from "../../Models/UserDetailsModal";
import { ToastError, ToastSuccess } from "../../CommonComponents/Toasters";
import Spinner from "../../CommonComponents/Spinner";
const DataTable = () => {
  const pageNav = [
    {
      name: "Home",
      link: "/home",
      active: false,
    },
    {
      name: "Data Table",
      link: "/datatable",
      active: true,
    },
  ];
  const [ShowHide, setShowHide] = useState(false);
  const [user_ID, setUser_ID] = useState("");
  const [fetchUserAllData, setfetchUserAllData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  async function fetchFormData(filters, sortBy, sortOrder, page, limit) {
    let res = await getUserList(filters, sortBy, sortOrder, page, limit);
    setLoading(false);
    if (res.data) {
      setfetchUserAllData(res.data);
    } else {
      setfetchUserAllData([]);
    }
  }

  const handleSearch = (event) => {
    setLoading(true);
    setSearchTerm(event.target.value);
  };

  React.useEffect(() => {
    const getData = setTimeout(() => {
      fetchFormData(searchTerm, "", "", 1, 10000);
    }, 1000);

    return () => clearTimeout(getData);
  }, [searchTerm]);

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

  function getAllRecords() {
    fetchFormData("", "", "", 1, 10000);
  }

  useEffect(() => {
    setLoading(true);
    fetchFormData("", "", "", 1, 10000);
  }, []);

  return (
    <>
      <Row className="d-flex">
        <Col md={2}>
          <BreadcrumPath pageNav={pageNav} />
        </Col>
        <Col md={8} className="text-end ">
          <input
            className="search-input"
            type="text"
            placeholder="Search by name or email or city"
            value={searchTerm}
            onChange={handleSearch}
          />
        </Col>

        <Col md={2}>
          <div className="add-new-btn">
            <Button
              variant="success"
              onClick={() => {
                setShowHide(true);
              }}
            >
              Add New
            </Button>
          </div>
        </Col>
      </Row>

      <Container fluid>
        <Table responsive>
          <thead>
            <tr>
              <th>Index</th>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>City</th>
              <th>State</th>
              <th>Zip</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {!loading ? (
              fetchUserAllData && fetchUserAllData.length !== 0 ? (
                fetchUserAllData.map((itm, idx) => (
                  <tr key={idx}>
                    <td>{idx} </td>
                    <td>{itm.name} </td>
                    <td>{itm.email} </td>
                    <td>{itm.password} </td>
                    <td>{itm.city} </td>
                    <td>{itm.state} </td>
                    <td>{itm.zip} </td>
                    <td className="d-flex justify-content-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="25"
                        height="25"
                        viewBox="0 0 30 30"
                        onClick={() => {
                          setUser_ID(itm._id);
                          setShowHide(true);
                        }}
                      >
                        <path d="M 22.828125 3 C 22.316375 3 21.804562 3.1954375 21.414062 3.5859375 L 19 6 L 24 11 L 26.414062 8.5859375 C 27.195062 7.8049375 27.195062 6.5388125 26.414062 5.7578125 L 24.242188 3.5859375 C 23.851688 3.1954375 23.339875 3 22.828125 3 z M 17 8 L 5.2597656 19.740234 C 5.2597656 19.740234 6.1775313 19.658 6.5195312 20 C 6.8615312 20.342 6.58 22.58 7 23 C 7.42 23.42 9.6438906 23.124359 9.9628906 23.443359 C 10.281891 23.762359 10.259766 24.740234 10.259766 24.740234 L 22 13 L 17 8 z M 4 23 L 3.0566406 25.671875 A 1 1 0 0 0 3 26 A 1 1 0 0 0 4 27 A 1 1 0 0 0 4.328125 26.943359 A 1 1 0 0 0 4.3378906 26.939453 L 4.3632812 26.931641 A 1 1 0 0 0 4.3691406 26.927734 L 7 26 L 5.5 24.5 L 4 23 z"></path>
                      </svg>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="25"
                        height="25"
                        viewBox="0 0 24 24"
                        className="ms-3"
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
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="text-center">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/9841/9841555.png"
                      width={"300px"}
                      height={"350px"}
                      alt=""
                    />
                  </td>
                </tr>
              )
            ) : (
              <tr>
                <td colSpan={8} className="text-center">
                  <Spinner />
                </td>
              </tr>
            )}
          </tbody>
        </Table>
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
};

export default DataTable;
