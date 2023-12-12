import axios from "axios";
import React, { useContext } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { CartContext } from "../web/context/Cart.jsx";

export default function Product() {
  const { product } = useParams();
  const getProduct = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/products/${product}`
    );
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
      <div className="row">
        <div className="col-md-4">
          {data.subImages.map((img, index) => (
            <div key={index}>
              <img src={img.secure_url} alt=""  className="img-fluid mt-2"/>
            </div>
          ))}
        </div>
        <div className="col-md-4">
          <h2>{data.name}</h2>
          <p>{data.price}</p>
          <button className="btn " onClick={() => addToCart(data._id)}>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
