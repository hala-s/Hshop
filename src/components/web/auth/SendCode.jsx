import React, { useContext } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../pages/Input.jsx";
import { UserContext } from "../context/User.jsx";
export default function SendCode() {
  let { userToken, setUserToken } = useContext(UserContext);
 const  navigate=useNavigate();
  const initialValues = {
    email: "",
  };
  const onSubmit = async (users) => {
    const { data } = await axios.patch(
      "https://ecommerce-node4-five.vercel.app/auth/sendcode",
      users
    );
    if (data.message == "success") {
      toast.success("code sended successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/forgetPassword");
    }
  };
  const loginSchema = yup.object({
    email: yup.string().required("email is required").email(),
    password: yup
      .string()
      .required("password is required")
      .min(3, "must be at least 3 character")
      .max(12, "must be at max 12 character"),
  });
  const SendCodeSchema = yup.object({
    email: yup.string().required("email is required").email(),
  
  });
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema:SendCodeSchema,
  });
  const inputs = [
    {
      id: "email",
      type: "email",
      name: "email",
      title: "Email",
      value: formik.values.email,
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
          <h2>Send Code</h2>
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
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
