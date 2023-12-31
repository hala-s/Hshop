import axios from "axios";
import React, { useContext, useState } from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { CartContext } from "../web/context/Cart.jsx";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "./product.css";
import { UserContext } from "../web/context/User.jsx";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import Review from "./Review.jsx";

export default function Product() {
const [avgRting, setAvgRating] =useState();
  let { userToken,  userData} =
    useContext(UserContext);
  const { product } = useParams();
  const getProduct = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/products/${product}`
    );
    console.log(data);
    setAvgRating(data.avgRating);
    return data.product;
  };
  const { data, isLoading } = useQuery("products", getProduct);
  if (isLoading) {
    return <p>Loading...</p>;
  }
  const { addToCartContext } = useContext(CartContext);

  const addToCart = async (productId) => {
    const res = await addToCartContext(productId);
  };
  

  return (
    <div className="container">
      <div className="row my-5">
        <div className="col-md-6">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            loop={true}
            autoplay={{
              delay: 2000,
            }}
            pagination={{
              clickable: true,
            }}
            className="m-5 pb-5 "
          >
            {data.subImages.map((img, index) => (
              <SwiperSlide key={index}>
                <div className="product">
                  <div>
                    <img src={img.secure_url} alt="" className="" />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="col-md-6">
        <div className="details mt-5">
                <h3>{data.name}</h3>
                <h5>
                  <span>Price : </span>
                  {data.price}$
                </h5>
                <h5>
                  <span >Avarage Rating : </span>
                  <Box
                        sx={{
                          "& > legend": { mt: 2 },
                        }}
                        className="d-inline-block m-0 "
                      >
                        <Rating
                          name="read-only"
                          value={avgRting}
                          readOnly
                        />
                      </Box>
                </h5>
                <h5>
                  <span>Discount : </span>
                  {data.discount}$
                </h5>
                <div className="mt-3">
                  {userToken ? (
                    <button
                      className="btn "
                      onClick={() => addToCart(data._id)}
                    >
                      Add to cart
                    </button>
                  ) : (
                    <Link className="btn " to="/login">
                      Add to cart
                    </Link>
                  )}
                </div>
              </div>
        </div>
     
        <div className="details  mt-5 border p-5 border-3 ">
          <ul className="nav nav-tabs d-flex justify-content-center" id="myTab" role="tablist">
            <li className="nav-item " role="presentation">
              <button
                className="nav-link active"
                id="home-tab"
                data-bs-toggle="tab"
                data-bs-target="#home-tab-pane"
                type="button"
                role="tab"
                aria-controls="home-tab-pane"
                aria-selected="true"
              >
                Details
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="profile-tab"
                data-bs-toggle="tab"
                data-bs-target="#profile-tab-pane"
                type="button"
                role="tab"
                aria-controls="profile-tab-pane"
                aria-selected="false"
              >
                Review
              </button>
            </li>
          </ul>

          <div className="tab-content " id="myTabContent">
            <div
              className="tab-pane fade show active"
              id="home-tab-pane"
              role="tabpanel"
              aria-labelledby="home-tab"
              tabIndex="0"
            >
              <div className="details mt-3">
                <p className="p-2">{data.description}</p>
                
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="profile-tab-pane"
              role="tabpanel"
              aria-labelledby="profile-tab"
              tabIndex="0"
            >
              {" "}
              {data.reviews.length ? (
                data.reviews.map((review, index) => (
                  <div className="" key={review._id}>
                    <div className="d-flex">
                      <p className="fw-bold mt-3 me-3">
                        {" "}
                        <img
                          src={review.createdBy.image.secure_url}
                          alt="hugenerd"
                          width={30}
                          height={30}
                          className="rounded-circle me-2"
                        />
                        {review.createdBy.userName}
                      </p>

                      <Box
                        sx={{
                          "& > legend": { mt: 2 },
                        }}
                      >
                        <Rating
                          name="read-only"
                          value={review.rating}
                          readOnly
                        />
                      </Box>
                    </div>

                    <p className="ms-3">{review.comment}</p>
                  </div>
                ))
              ) : (
                <p>No Product</p>
              )}
              {userToken &&userData &&  (
                <div className="row border border-2">
                  <div className="col-md-2">
                    <img
                      src={userData.image.secure_url}
                      alt="hugenerd"
                      width={30}
                      height={30}
                      className="rounded-circle m-4"
                    />
                  </div>
                  <div className="col-md-9">
                    <Review productId ={data._id}/>
                    
                  </div>
                </div>
              )}
            </div>
        
        </div>
        </div>
        
      </div>
    </div>
  );
}

