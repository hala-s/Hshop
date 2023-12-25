import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import "./Categories.css";

export default function categoriesDetails() {
  
  const { category } = useParams();

  const getCategoriesDetails = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/products/category/${category}`
    );
    return data.products;
  };
  const { data, isLoading } = useQuery(
    "category-details",
    getCategoriesDetails
  );
  if (isLoading) {
    return <p>loading... </p>;
  }
  return (
    <div className="container">
      <div className="categories-title text-center my-5">
        <h2>
         Categories
        </h2>
      </div>
      <div className="row my-5">
        {data.length ? (
          data.map((product) => (
            <div className="col-md-4"  key={product._id}>
              <div className="card" style={{ width: "18rem" }} >
                <Link to={`/product/${product._id}`}>
                  <img
                    src={product.mainImage.secure_url}
                    className="card-img-top img-fluid "
                    alt="category"
                  />
                  <div className="card-body">
                  <h3 className="card-text fs-5">{product.name}</h3>
                </div>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p>No Product</p>
        )}
      </div>
    </div>
  );
}
