import React from "react";
import Input from "../../pages/Input.jsx";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";

export default function Register() {
  const handelFieldChang = (event) => {
    formik.setFieldValue("image", event.target.files[0]);
  };
  const initialValues = {
    userName: "",
    email: "",
    password: "",
    image: "",
  };
  const onSubmit = async (users) => {
    const formData = new FormData();
    formData.append("userName", users.userName);
    formData.append("email", users.email);
    formData.append("password", users.password);
    formData.append("image", users.image);
    const { data } = await axios.post(
      "https://ecommerce-node4-five.vercel.app/auth/signup",
      formData
    );
    if (data.message == "success") {
      formik.resetForm();
      toast.success(
        "account created successfully, please verify your email to login",
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
    }
  };
  const validationSchema = yup.object({
    userName: yup
      .string()
      .required("user name is required")
      .min(3, "must be at least 3 character")
      .max(12, "must be at max 12 character"),
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
    validationSchema: validationSchema,
  });
  const inputs = [
    {
      id: "username",
      type: "text",
      name: "userName",
      title: "User Name",
      value: formik.values.userName,
    },
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
      id: "image",
      type: "file",
      name: "image",
      title: "user image",
      onChange: handelFieldChang,
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
          <h2>Create account</h2>
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
              Register
            </button>
            </div>
            
          </form>
        </div>
      </div>
    </>
  );
}
