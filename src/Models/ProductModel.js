import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import API_BASE_PATH from "../CommonServices";
import { ToastError, ToastSuccess } from "../CommonComponents/Toasters";

const ProductModel = ({ id, fetchData, showModel, setShowModel }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    cancelledprice: "",
    category: "",
    rating: "",
    stockstatus: "",
    productdescription: "",
    productimagethumb: "",
    productimages: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to handle file selection
  const handleFileChange = (event) => {
    const files = event.target.files;
    const selected = [];
    for (let i = 0; i < files.length; i++) {
      selected.push(URL.createObjectURL(files[i]));
    }
    setFormData({
      ...formData,
      ["productimages"]: selected,
    });
  };

  // Function to handle file selection
  const handleThumbnailFileChange = (event) => {
    const file = URL.createObjectURL(event.target.files[0]);
    setFormData({
      ...formData,
      ["productimagethumb"]: file,
    });
  };

  const handleSubmit = async () => {
    // Here you can use formData to perform any actions like sending data to the server

    try {
      if (id) {
        const response = await fetch(
          `${API_BASE_PATH.BasePath}/product/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        if (!response.ok) {
          ToastError("Network response was not ok");
          throw new Error("Network response was not ok");
        }
        ToastSuccess("Product Updated Successfully.");
      } else {
        const response = await fetch(`${API_BASE_PATH.BasePath}/product`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          ToastError("Network response was not ok");
          throw new Error("Network response was not ok");
        }
        ToastSuccess("Product Added Successfully.");
      }

      setFormData({
        name: "",
        price: "",
        cancelledprice: "",
        category: "",
        rating: "",
        stockstatus: "",
        productdescription: "",
        productimagethumb: "",
        productimages: [],
      });
      fetchData();
    } catch (error) {
      //   setError(error);
    } finally {
      //   setLoading(false);
    }

    // Reset form after submission
    setFormData({
      name: "",
      price: "",
      cancelledprice: "",
      category: "",
      rating: "",
      stockstatus: "",
      productdescription: "",
      productimagethumb: "",
      productimages: [],
    });
    setShowModel(false);
  };

  const getProductData = async (id) => {
    try {
      const response = await fetch(`${API_BASE_PATH.BasePath}/product/${id}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();

      setFormData({
        name: jsonData.name,
        price: jsonData.price,
        cancelledprice: jsonData.cancelledprice,
        category: jsonData.category,
        rating: jsonData.rating,
        stockstatus: jsonData.stockstatus,
        productdescription: jsonData.productdescription,
        productimagethumb: jsonData.productimagethumb,
        productimages: jsonData.productimages,
      });
    } catch (error) {
      //   setError(error);
    } finally {
      //   setLoading(false);
    }
  };

  useEffect(() => {
    if (id !== "") {
      getProductData(id);
    }
  }, []);

  return (
    <div>
      <Modal
        show={showModel}
        onHide={() => {
          setFormData({
            name: "",
            price: "",
            cancelledprice: "",
            category: "",
            rating: "",
            stockstatus: "",
            productdescription: "",
            productimagethumb: "",
            productimages: [],
          });
          setShowModel(false);
        }}
        dialogClassName="modal-90w"
        size="lg"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="productName">
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Product Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="productPrice">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="cancelledPrice">
                  <Form.Label>Cancelled Price</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Cancelled Price"
                    name="cancelledprice"
                    value={formData.cancelledprice}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="category">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="rating">
                  <Form.Label>Rating</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Rating"
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="stockStatus">
                  <Form.Label>Stock Status</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Stock Status"
                    name="stockstatus"
                    value={formData.stockstatus}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="productDescription">
                  <Form.Label>Product Description</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Product Description"
                    name="productdescription"
                    value={formData.productdescription}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="productImageThumb">
                  <Form.Label>Product Image Thumbnail</Form.Label>
                  <Form.Control
                    placeholder="Enter Product Image Thumbnail URL"
                    name="productimagethumb"
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailFileChange}
                  />
                </Form.Group>
                {formData.productimagethumb && (
                  <img
                    src={formData.productimagethumb}
                    alt={`selected-${formData.productimagethumb}`}
                    style={{
                      borderRadius: "50px",
                      maxWidth: "100px",
                      maxHeight: "100px",
                      margin: "5px",
                    }}
                  />
                )}
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="productImages">
                  <Form.Label>Product Images</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    multiple
                    placeholder="Enter Product Images URLs"
                    name="productimages"
                    onChange={handleFileChange}
                  />
                </Form.Group>
                <div className="d-flex">
                  {formData.productimages.length !== 0 &&
                    formData.productimages.slice(0, 2).map((image, index) => (
                      <>
                        <img
                          key={index}
                          src={image}
                          alt={``}
                          style={{
                            borderRadius: "50px",
                            maxWidth: "100px",
                            maxHeight: "100px",
                            margin: "5px",
                          }}
                        />
                      </>
                    ))}
                  {formData.productimages.length !== 0 &&
                    formData.productimages.length > 2 && (
                      <b className="mt-5">
                        <span>more...</span>
                      </b>
                    )}
                </div>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setFormData({
                name: "",
                price: "",
                cancelledprice: "",
                category: "",
                rating: "",
                stockstatus: "",
                productdescription: "",
                productimagethumb: "",
                productimages: [],
              });
              setShowModel(false);
            }}
          >
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProductModel;
