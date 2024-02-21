import React, { useEffect, useState } from "react";
import { Button, Col, Container, Image, Row, Table } from "react-bootstrap";
import API_BASE_PATH from "../../CommonServices";
import ProductModel from "../../Models/ProductModel";
import { ToastError, ToastSuccess } from "../../CommonComponents/Toasters";
import BreadcrumPath from "../../CommonComponents/BreadCrum";
import Spinner from "../../CommonComponents/Spinner";

const Product = () => {
  const pageNav = [
    {
      name: "Home",
      link: "/home",
      active: false,
    },
    {
      name: "Product",
      link: "/product",
      active: true,
    },
  ];
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModel, setShowModel] = useState(false);
  const [prodId, setProdId] = useState("");

  const fetchData = async () => {
    setProdId("");
    try {
      setLoading(false);
      const response = await fetch(`${API_BASE_PATH.BasePath}/product`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_BASE_PATH.BasePath}/product/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          // Add any other headers as needed
        },
      });
      if (!response.ok) {
        ToastError("Network response was not ok");
        throw new Error("Network response was not ok");
      }
      ToastSuccess("Product Deleted Successfully.");
      // const jsonData = await response.json();
      fetchData();
    } catch (error) {
      setError(error);
      ToastError(error);
    } finally {
      // ToastError("Something went Wrong.");
      setLoading(false);
    }
  };

  return (
    <>
      <BreadcrumPath pageNav={pageNav} />
      <Container className="" fluid>
        <div className="mt-5">
          <div
            style={{ justifyContent: "space-between" }}
            className="d-flex p-3"
          >
            <h3>Product's</h3>
            <div className="text-end">
              <Button
                variant="info"
                onClick={() => {
                  setProdId("");
                  setShowModel(true);
                }}
              >
                Add Products
              </Button>
            </div>
          </div>
          <Container className="mt-2" fluid>
            <Row>
              <Col md={12} sm={12} lg={12}>
                <Table striped className="mt-3">
                  <thead>
                    <tr>
                      <th>PRODUCT_IMAGE</th>
                      <th>NAME</th>
                      <th>CATEGORY</th>
                      <th>PRICE</th>
                      <th>RATING</th>
                      <th>STATUS</th>
                      <th>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!loading ? (
                      data && data.length !== 0 ? (
                        data.map((item) => (
                          <tr key={item._id}>
                            <td>
                              <Image
                                src={item.productimagethumb}
                                roundedCircle
                                width={"30px"}
                                height={"30px"}
                              />
                            </td>
                            <td>{item.name}</td>

                            <td>{item.category}</td>
                            <td>{item.price}</td>
                            <td>{item.rating}</td>
                            <td>{item.stockstatus}</td>
                            <td>
                              <Button
                                variant="secondary"
                                onClick={() => {
                                  setProdId(item._id);
                                  setShowModel(true);
                                }}
                              >
                                EDIT
                              </Button>
                              <Button
                                onClick={() => handleDelete(item._id)}
                                variant="danger"
                              >
                                DELETE
                              </Button>
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
              </Col>
            </Row>
          </Container>
          {showModel && (
            <ProductModel
              id={prodId}
              fetchData={fetchData}
              showModel={showModel}
              setShowModel={setShowModel}
            />
          )}
        </div>
      </Container>
    </>
  );
};

export default Product;
