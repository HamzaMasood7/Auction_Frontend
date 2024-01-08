import React, { useState, useEffect } from "react";
import { getProductDetails, updateProduct } from "../../../api/product";
import { NavbarComponent } from "../../../components/navbar/Navbar";
import { useParams } from "react-router-dom";

const Product = () => {
  const [product, setProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    minimumBid: 0,
  });
  const [editMode, setEditMode] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    // Fetch single product details
    getProductDetails(id)
      .then((data) => {
        setProduct(data);
        setFormData({
          name: data.name,
          description: data.description,
          minimumBid: data.minimumBid,
        });
      })
      .catch((error) =>
        console.error("Error fetching product details:", error)
      );
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleToggleEditMode = () => {
    setEditMode(!editMode);
    setErrorMessages([]); // Clear error messages when toggling edit mode
  };

  const handleSaveChanges = async () => {
    try {
      // Call the updateProduct API function with updated form data
      await updateProduct(id, formData);
      // Optionally, you can fetch and set the updated product details
      const updatedProduct = await getProductDetails(id);
      setProduct(updatedProduct);
      setEditMode(false); // Turn off edit mode after saving changes
      setErrorMessages([]); // Clear error messages on successful update
      console.log("Product updated successfully!");
    } catch (error) {
      // Handle validation errors
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrorMessages(error.response.data.message);
      } else {
        console.error("Error updating product:", error);
      }
    }
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setErrorMessages([]); // Clear error messages when canceling edit
  };

  return (
    <div className="container mt-5">
      <NavbarComponent />
      <h1 className="text-center">Product Details</h1>
      {id}
      {product ? (
        <div className="text-center">
          <h2>{product.name}</h2>
          <p>Description: {product.description}</p>
          <p>Minimum Bid: {product.minimumBid}</p>
          {editMode ? (
            // Render editable form fields when in edit mode
            <div>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
              <label>Description:</label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
              <label>Minimum Bid:</label>
              <input
                type="number"
                name="minimumBid"
                value={formData.minimumBid}
                onChange={handleInputChange}
              />
              <button
                className="btn btn-secondary mt-3 mx-2"
                onClick={handleCancelEdit}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary mt-3"
                onClick={handleSaveChanges}
              >
                Save Changes
              </button>
            </div>
          ) : null}
          {errorMessages.length > 0 && (
            <div className="alert alert-danger mt-3" role="alert">
              {errorMessages.map((message, index) => (
                <p key={index}>{message}</p>
              ))}
            </div>
          )}
          {!editMode && (
            <button
              className="btn btn-primary mt-3"
              onClick={handleToggleEditMode}
            >
              Edit
            </button>
          )}
        </div>
      ) : (
        <p>Loading product details...</p>
      )}
    </div>
  );
};

export default Product;
