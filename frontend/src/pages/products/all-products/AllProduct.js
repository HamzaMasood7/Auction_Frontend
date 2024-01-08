import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllUserProducts } from "../../../api/product";
import { NavbarComponent } from "../../../components/navbar/Navbar";

const AllProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllUserProducts()
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <div>
      <NavbarComponent/>
      <h1>All Products</h1>
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <Link to={`/product/${product.id}`} className="btn btn-primary">
                  Show Details

                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProduct;
