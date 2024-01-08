import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;

 const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        .split("=")[1];


export const createProduct = async (productData) => {
  try {
    const response = await axios.post(`${apiUrl}/product/create`, productData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

export const getAllProducts = async () => {
  try {
    const response = await axios.get(`${apiUrl}/products/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

export const getProductDetails = async (productId) => {
  try {

    const response = await axios.get(`${apiUrl}/product/id/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

export const updateProduct = async (productId, updatedProductData) => {


  try {
     updatedProductData.minimumBid = parseInt(updatedProductData.minimumBid);

    const response = await axios.patch(
      `${apiUrl}/product/${productId}`,
      updatedProductData,
      {
        headers: {
           Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
     if (error.response) {
      console.error("Error response from server:", error.response.data);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error setting up the request:", error.message);
    }
    throw new Error(error.response ? error.response.data : error.message);

  }
};

export const getAllUserProducts = async () => {
  try {
    const response = await axios.get(`${apiUrl}/product`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};
