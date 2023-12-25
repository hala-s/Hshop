import axios from "axios";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import SearchIcon from '@mui/icons-material/Search';
import { Search } from "@mui/icons-material";
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

export default function Products() {
  const [sort,setSort] =useState('');
  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));
  
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/products?page=${page}&limit=4&&sort=${sort}`
    );
    console.log(data.products);
    setProducts(data.products);
  };

  useEffect(() => {
    getProducts();
  }, [page, sort]);

  const changeSort=(data) => {
    setSort(data);
  }

  return (
    <div className="container">
      <div className="categories-title text-center my-5">
        <h2>Products</h2>
      </div>
      <div className="d-flex justify-content-end me-5">
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
              <button className="dropdown-item" onClick={()=>changeSort('name')}>
                Name
              </button>
            </li>
            <li>
            <button className="dropdown-item" onClick={()=>changeSort('price')}>
                Price
              </button>
            </li>
            <li>
            <button className="dropdown-item" onClick={()=>changeSort('discount')}>
                Discount
              </button>
            </li>
            <li>
            <button className="dropdown-item" onClick={()=>changeSort('avgRating')}>
            Highest Rating
              </button>
            </li>
            <li>
            <button className="dropdown-item" onClick={()=>changeSort('')}>
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
              <a className="dropdown-item" href="#">
                Name
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Price
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Something else here
              </a>
            </li>
          </ul>
        </div>
        <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
      </div>

      <div className="row my-5">
        {products.length ? (
          products.map((product) => (
            <div className="col-md-4 mt-5">
              <div
                className="card"
                style={{ width: "18rem" }}
                key={product._id}
              >
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
