import React, { useState } from "react";
import { createProduct } from "../../../api/product";
import { NavbarComponent } from "../../../components/navbar/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const CreateProduct = () => {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    minimumBid: 0,
    images: [],
  });

  const [imageFiles, setImageFiles] = useState([]);

  const handleFileChange = (e) => {
    const files = e.target.files;
    setImageFiles([...files]);
  };

  const handleCreateProduct = async () => {
    try {
      // Upload images to Cloudinary
      const imageUrls = await Promise.all(
        imageFiles.map(async (file) => {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", "your_cloudinary_upload_preset");

          const response = await fetch(
            "https://api.cloudinary.com/v1_1/your_cloud_name/image/upload",
            {
              method: "POST",
              body: formData,
            }
          );

          const data = await response.json();
          return data.secure_url;
        })
      );

      // Update the product data with image URLs
      const updatedProductData = { ...productData, images: imageUrls };

      // Call the createProduct API function
      const createdProduct = await createProduct(updatedProductData);

      console.log("Product created:", createdProduct);
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <NavbarComponent />
          <h1 className="mb-4">Create Product</h1>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Product Name"
                value={productData.name}
                onChange={(e) =>
                  setProductData({ ...productData, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Product Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Product Description"
                value={productData.description}
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    description: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Minimum Bid</Form.Label>
              <Form.Control
                type="number"
                placeholder="Minimum Bid"
                value={productData.minimumBid}
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    minimumBid: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Upload Images</Form.Label>
              <Form.Control type="file" onChange={handleFileChange} multiple />
            </Form.Group>
            <Button
              variant="primary"
              type="button"
              onClick={handleCreateProduct}
            >
              Create Product
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateProduct;
