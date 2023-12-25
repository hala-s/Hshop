import React, { useContext, useEffect } from "react";
import axios from "axios";
import { useQuery } from "react-query";

export default function Orders() {
  const getOrder = async () => {
    const token = localStorage.getItem("user token");
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/order`, {
      headers: { Authorization: `Tariq__${token}` },
    });
    
    console.log(data);
    return data;
  };
  const cancelOrder = async(orderId)=>{
    const token = localStorage.getItem("user token");
    const { data } = await axios.patch(`${import.meta.env.VITE_API_URL}/order/cancel/6585eba808eb1e7b5dca5c08`,
     {
      headers: { Authorization: `Tariq__${token}` },
    });
    console.log(data);
   }
  const { data, isLoading } = useQuery("orders", getOrder);
  if (isLoading) {
    return <p>loading... </p>;
  }

  return (
    <div>
      <div className="title text-center p-5">
        <h2>All Orders</h2>
      </div>

      {data.orders.length ? (
        data.orders.map((order, index) => (
          <div key={order._id}>
            <div className="title mb-3">
              <h2>Order {index + 1}</h2>
            </div>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">Address</th>
                  <th scope="col">Created At</th>
                  <th scope="col">Final Price</th>
                  <th scope="col">Payment Type</th>
                  <th scope="col">Phone Number</th>
                  <th scope="col">Coupon Name</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{order.address}</td>
                  <td>{order.createdAt}</td>
                  <td>{order.finalPrice}</td>
                  <td>{order.paymentType}</td>
                  <td>{order.phoneNumber}</td>
                  <td>{order.couponName}</td>
                  <td>{order.status}</td>
                </tr>
              </tbody>
            </table>
            {order.status=='pending'&&
              <div className=" text-center p-3">
               <button className="btn" onClick={()=>cancelOrder(order._id)}>
              cancel Order
              </button>
            </div>}
           
          </div>
        ))
      ) : (
        <p> No data</p>
      )}
    </div>
  );
}
