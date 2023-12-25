
import React, { useContext } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import '../web/login/login.css'
import { UserContext } from "../web/context/User.jsx";
import Input from "../pages/Input.jsx";
export default function Order()  {
    let { userToken} = useContext(UserContext);
  const navigate = useNavigate();
  const initialValues = {
    copon: "",
    address: "",
    phone: "",
  };
  const onSubmit = async (users) => {
    const { data } = await axios.post(
      "https://ecommerce-node4.vercel.app/order",
      users,
      {headers : {Authorization:`Tariq__${userToken}`}}
    );
    if (data.message == "success") {
    
      toast.success("order added successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/cart");
    }
  };
  const orderSchema = yup.object({
    address: yup.string().required("address is required"),
    phone: yup
      .number()
      .required("phone is required")
  });

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: orderSchema,
  });
  const inputs = [
    {
      id: "address",
      type: "text",
      name: "address",
      title: "address",
      value: formik.values.address,
    },
    {
      id: "phone",
      type: "tel",
      name: "phone",
      title: "Phone",
      value: formik.values.phone,
    },
    {
        id: "copon",
        type: "text",
        name: "copon",
        title: "copon",
        value: formik.values.copon,
      },
  ];
  const renderInputs = inputs.map((input, index) => (
    <Input
      type={input.type}
      id={input.id}
      name={input.name}
      value={input.value}
      title={input.title}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      touched={formik.touched}
      errors={formik.errors}
      key={index}
    />
  ));

  return (
    <>
      <div className="container createCard border mt-5 p-5 w-50 m-auto">
        <div className="title text-center p-5">
          <h2>Order</h2>
        </div>
        <div className="d-flex justify-content-center">
          <form onSubmit={formik.handleSubmit}>
            {renderInputs}
            <div className="text-center mt-3 loginActions">
              <button
                className="m-2 btn "
                type="submit"
                disabled={!formik.isValid}
              >
               Submit
              </button>
             
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
