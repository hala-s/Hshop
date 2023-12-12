import React from "react";
import Input from "../../pages/Input.jsx";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function ForgetPassword() {
    const navigate= useNavigate();
  
  const initialValues = {
    
    email: "",
    password: "",
    code: "",
  };
  const onSubmit = async (users) => {
   
    const { data } = await axios.patch(
      "https://ecommerce-node4.vercel.app/auth/forgotPassword",
      users
    );
    if (data.message == "success") {
      formik.resetForm();
      toast.success(
        "password updated successfully",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
      navigate('/login');
    }
  };
  const ForgetPasswordSchema = yup.object({
    code: yup
      .string()
      .required("code is required")
      .length(4,'must be 4 characters'),
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
    validationSchema: ForgetPasswordSchema,
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
    {
        id: "code",
        type: "text",
        name: "code",
        title: "code",
        value: formik.values.code,
      },
  ];
  const renderInputs = inputs.map((input, index) => (
    <Input
      type={input.type}
      id={input.id}
      name={input.name}
      value={input.value}
      title={input.title}
      onChange={input.onChange || formik.handleChange}
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
          <h2>Reset Password</h2>
        </div>
        <div className="d-flex justify-content-center">
          <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
            {renderInputs}
            <div className="text-center mt-3">
            <button
              className="m-2 btn "
              type="submit"
              disabled={!formik.isValid}
            >
              submit
            </button>
            </div>
            
          </form>
        </div>
      </div>
    </>
  );
}
