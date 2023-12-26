import axios from "axios";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";


export default function Products() {
  const [sort, setSort] = useState("");
  const [limit, setLimit] = useState(4);
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    const { data } = await axios.get(
      `${
        import.meta.env.VITE_API_URL
      }/products?page=${page}&limit=${limit}&&sort=${sort}${`${category}`}${`${price}`}`
    );
    console.log(data);
    setProducts(data.products);
  };

  useEffect(() => {
    getProducts();
  }, [page, sort, category, limit, price]);

  const changeSort = (data) => {
    setSort(data);
  };
  const changeLimit = (data) => {
    setLimit(data);
  };
  const changeCategory = (data) => {
    if (data == "All") {
      setCategory(``);
    } else {
      setCategory(`&categoryId=${data}`);
    }
  };
  const test = (e) => {
    setPrice(`&price=${e.target.value}`);
  };

  return (
    <div className="container">
      <div className="categories-title text-center my-5">
        <h2>Products</h2>
      </div>
      <div className="d-flex justify-content-end me-5">
        <div className="dropdown d-inline-block me-3">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Show
          </button>
          <ul className="dropdown-menu">
            <li>
              <button
                className="dropdown-item"
                onClick={() => changeLimit("2")}
              >
                2 products
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={() => changeLimit("4")}
              >
                4 products
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={() => changeLimit("6")}
              >
                6 products
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={() => changeLimit("8")}
              >
                8 products
              </button>
            </li>
          </ul>
        </div>
        <div className="dropdown d-inline-block">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Sort By
          </button>
          <ul className="dropdown-menu">
            <li>
              <button
                className="dropdown-item"
                onClick={() => changeSort("name")}
              >
                Name
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={() => changeSort("price")}
              >
                Price
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={() => changeSort("discount")}
              >
                Discount
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={() => changeSort("avgRating")}
              >
                Highest Rating
              </button>
            </li>
            <li>
              <button className="dropdown-item" onClick={() => changeSort("")}>
                Default
              </button>
            </li>
          </ul>
        </div>
        <div className="dropdown d-inline-block ms-3">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Filter By
          </button>
          <ul className="dropdown-menu">
            <li>
              <FormControl className="ps-3">
                <FormLabel id="demo-radio-buttons-group-label" className="m-2">
                  Category
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="All"
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value="All"
                    control={<Radio />}
                    label="All"
                    onClick={() => changeCategory("All")}
                  />
                  <FormControlLabel
                    value="women's fashion"
                    control={<Radio />}
                    label="women's fashion"
                    onClick={() => changeCategory("656b5ceb7ef25cbb5771636f")}
                  />
                  <FormControlLabel
                    value="men's fashion"
                    control={<Radio />}
                    label="men's fashion"
                    onClick={() => changeCategory("656afd2a5f24a07ecd5a5090")}
                  />
                  <FormControlLabel
                    value="appliances"
                    control={<Radio />}
                    label="appliances"
                    onClick={() => changeCategory("656b5cc47ef25cbb5771636b")}
                  />
                  <FormControlLabel
                    value="mobiles"
                    control={<Radio />}
                    label="mobiles"
                    onClick={() => changeCategory("656b5cf97ef25cbb57716373")}
                  />
                  <FormControlLabel
                    value="electronics"
                    control={<Radio />}
                    label="electronics"
                    onClick={() => changeCategory("656b5d0c7ef25cbb5771637a")}
                  />
                  <FormControlLabel
                    value="laptops & accessories"
                    control={<Radio />}
                    label="laptops & accessories"
                    onClick={() => changeCategory("656b5d1c7ef25cbb5771638a")}
                  />
                  <FormControlLabel
                    value="home & kitchen"
                    control={<Radio />}
                    label="home & kitchen"
                    onClick={() => changeCategory("656b5d2e7ef25cbb57716392")}
                  />
                  <FormControlLabel
                    value="fragrances"
                    control={<Radio />}
                    label="fragrances"
                    onClick={() => changeCategory("656b5d3f7ef25cbb57716396")}
                  />
                  <FormControlLabel
                    value="beauty"
                    control={<Radio />}
                    label="beauty"
                    onClick={() => changeCategory("656b5d4f7ef25cbb577163a0")}
                  />
                </RadioGroup>
              </FormControl>
            </li>
            <li>
              <FormControl className="ps-3">
                <FormLabel id="demo-radio-buttons-group-label">Price</FormLabel>
                <div className="d-flex justify-content-center">
                  <input
                    type="number"
                    className="form-control w-50 "
                    onClick={() => test(event)}
                  />
                </div>
              </FormControl>
            </li>
          </ul>
        </div>
        
      </div>

      <div className="row my-5">
        {products.length ? (
          products.map((product) => (
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

      <div className="d-flex justify-content-center">
        <Stack spacing={2}>
          <Pagination
            count={5}
            color="secondary"
            defaultPage={page}
            onChange={(event, value) => setPage(value)}
          />
        </Stack>
      </div>
    </div>
  );
}
