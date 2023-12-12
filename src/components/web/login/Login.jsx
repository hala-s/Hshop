import React, { useContext } from "react";
import Input from "../../pages/Input.jsx";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/User.jsx";
import './login.css'
export default function Login() {
  let { userToken, setUserToken ,userData} = useContext(UserContext);
  
  const navigate = useNavigate();
  if (userData) {
    navigate(-1);
  }
  const initialValues = {
    email: "",
    password: "",
  };
  const onSubmit = async (users) => {
    const { data } = await axios.post(
      "https://ecommerce-node4.vercel.app/auth/signin",
      users
    );
    if (data.message == "success") {
      localStorage.setItem("user token", data.token);
      setUserToken(data.token);
      toast.success("Login successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/");
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

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: loginSchema,
  });
  const inputs = [
    {
      id: "email",
      type: "email",
      name: "email",
      title: "Email",
      value: formik.values.email,
    },
    {
      id: "password",
      type: "password",
      name: "password",
      title: "Password",
      value: formik.values.password,
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
          <h2>Login</h2>
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
                Login
              </button>
              <Link  to='/sendCode'>Forget Password?</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
