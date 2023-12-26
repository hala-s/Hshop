import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import "./Categories.css";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";

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
            <div className="col-md-4 mt-5">
              <div
                className="card"
                style={{ width: "18rem"}}
                key={product._id}
              >
                <Link to={`/product/${product._id}`}>
                  <img
                    src={product.mainImage.secure_url}
                    className="card-img-top img-fluid "
                    alt="category"
                  />
                  <div className="card-body bg-body-secondary">
                    <h3 className="card-text fs-6">{product.name}</h3>
                    <div className="d-flex justify-content-between">
                    <Box
                        sx={{
                          "& > legend": { mt: 2 },
                        }}
                        className="d-inline-block "
                      >
                        <Rating
                          name="read-only"
                          value={product.avgRating}
                          readOnly
                        />
                      </Box>
                      <p className="d-inline-block mt-3 text-black " >{product.price}$</p>
                    </div>

                    

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
